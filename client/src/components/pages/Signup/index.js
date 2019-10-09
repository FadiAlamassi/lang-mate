/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import api from '../../../services/api';
import signupValidation from '../utils/signupValidation';
import BackButton from '../../common/BackButton';
import Input from '../../common/Input';
import Button from '../../common/Button';
import Dropdown from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import auth from '../../Auth/auth';
import './index.css';

export default class signup extends Component {
  state = {
    interests: [],
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nativeLangId: 1,
    learningLangId: 1,
    tab: 0,
    languages: [],
    errors: {},
  };

  componentDidMount() {
    const Allinterests = [
      { id: 1, name: 'music' },
      { id: 2, name: 'sports' },
      { id: 3, name: 'football' },
      { id: 4, name: 'reading' },
      { id: 5, name: 'novels' },
      { id: 6, name: 'games' },
      { id: 7, name: 'swimming' },
    ];

    const languagesList = [
      { id: 1, language: 'Arabic' },
      { id: 2, language: 'English' },
      { id: 3, language: 'Spanish' },
      { id: 4, language: 'Dutch' },
    ];
    this.setState({
      interests: Allinterests.map(e => ({ ...e, checked: false })),
      languages: [...languagesList],
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleCheck = ({ target: { id } }) => {
    const { interests } = this.state;
    const newIntersts = interests.map(e => ({ ...e }));
    newIntersts.forEach(e => {
      if (+e.id === +id) {
        e.checked = !e.checked;
      }
      return e;
    });

    this.setState({
      interests: newIntersts,
    });
  };

  nextTab = () => {
    this.setState({ errors: {} });
    const { tab, username, email, password, confirmPassword } = this.state;
    if (tab === 0) {
      signupValidation
        .validate(
          { username, email, password, confirmPassword },
          { abortEarly: false }
        )
        .then(() => {
          this.setState({
            tab: tab + 1,
          });
        })
        .catch(({ inner: validationErrors }) => {
          const errors = {};
          validationErrors.forEach(({ path, message }) => {
            errors[path] = message;
          });
          this.setState({ errors });
        });
    } else {
      this.setState({
        tab: tab + 1,
      });
    }
  };

  previousTab = () => {
    const { tab } = this.state;
    this.setState({ tab: tab - 1 });
  };

  filterInterests = array => array.filter(e => e.checked).map(e => e.id);

  handleSignup = e => {
    e.preventDefault();
    const {
      history: { push },
    } = this.props;
    const { setUserInfo } = this.props;
    const userInfo = { ...this.state };
    delete userInfo.errors;
    userInfo.interestsId = this.filterInterests(userInfo.interests);

    api
      .signUp(userInfo)
      .then(({ isSuccess, data, message }) => {
        if (isSuccess) {
          const { id: userId, username: userName } = data;
          const userInformation = { userId, userName };
          auth.isAuthenticated = true;
          auth.setUserInfo(userInformation);
          setUserInfo(data);
          push('/');
        }
        if (message) throw Error(message);
      })
      .catch(({ message }) => {
        this.setState({ errors: { [message.split(' ')[0]]: message } }, () =>
          this.setState({ tab: 0 })
        );
      });
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      nativeLangId,
      learningLangId,
      tab,
      interests,
      languages,
      errors: {
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      },
    } = this.state;
    const {
      history: {
        location: { state },
      },
    } = this.props;
    let newPathname;
    if (state) {
      const {
        history: {
          location: {
            state: {
              from: { pathname },
            },
          },
        },
      } = this.props;
      newPathname = pathname;
    } else {
      newPathname = '/';
    }

    const {
      history: { goBack },
      location,
    } = this.props;
    if (auth.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: `${newPathname}`,
            state: { from: location },
          }}
        />
      );
    }

    return (
      <div className="signup">
        <div className="signup__body">
          {tab === 0 && (
            <BackButton className="back__button" back={() => goBack()} />
          )}
          {tab !== 0 && (
            <BackButton
              className="back__button"
              back={() => this.previousTab()}
            />
          )}
          {tab === 0 && (
            <>
              <h2 className="signup__heading">Join Us Now</h2>
              <div className="signup__form">
                <Input
                  type="text"
                  name="username"
                  className="signup__input"
                  label="username"
                  placeholder="Username"
                  value={username}
                  errMsg={usernameError}
                  onChange={this.handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  className="signup__input"
                  label="email"
                  placeholder="Email"
                  value={email}
                  errMsg={emailError}
                  onChange={this.handleChange}
                />
                <Input
                  type="password"
                  name="password"
                  className="signup__input"
                  label="passeord"
                  placeholder="Password"
                  value={password}
                  errMsg={passwordError}
                  onChange={this.handleChange}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  className="signup__input"
                  label="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  errMsg={confirmPasswordError}
                  onChange={this.handleChange}
                />
                <Button
                  text="Next"
                  className="signup__button"
                  onClick={this.nextTab}
                />
              </div>
            </>
          )}
          {tab === 1 && (
            <>
              <h2 className="signup__heading">Choose Languages</h2>
              {languages && (
                <>
                  <Dropdown
                    labelText="Native Language"
                    name="nativeLangId"
                    languages={languages}
                    value={+nativeLangId}
                    onChange={this.handleChange}
                  />
                  <Dropdown
                    labelText="Learning Language"
                    name="learningLangId"
                    languages={languages}
                    value={+learningLangId}
                    onChange={this.handleChange}
                  />
                </>
              )}
              <Button
                text="Next"
                className="signup__button"
                onClick={this.nextTab}
              />
            </>
          )}
          {tab === 2 && (
            <>
              <h2 className="signup__heading">Choose Interests</h2>
              <div className="checkBoxes">
                {interests &&
                  interests.map(interest => (
                    <Checkbox
                      key={interest.id}
                      onClick={this.handleCheck}
                      checkName="interests"
                      {...interest}
                    />
                  ))}
              </div>
              <Button
                text="Sign Up"
                className="signup__button"
                onClick={this.handleSignup}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

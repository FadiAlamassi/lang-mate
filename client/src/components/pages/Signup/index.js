import React, { Component } from 'react';
// import { HashRouter } from 'react-router-dom';
// import BackButton from '../../common/BackButton';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';

export default class signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className="signup">
        <h2>Join Us Now</h2>
        <div className="signup__form">
          <form id="signup" className="signup__form" method="POST">
            {/* <BackButton onClick={() => HashRouter.push('/')} /> */}
            <Input
              type="text"
              name="username"
              className="signup__input"
              label="username"
              placeholder="Username"
              value={username}
              onChange={({ target: { value } }) =>
                this.setState({ username: value })
              }
              errMsg={<span>You entered an exist username</span>}
            />
            <Input
              type="email"
              name="email"
              className="signup__input"
              label="email"
              placeholder="Email"
              value={email}
              onChange={({ target: { value } }) => {
                this.setState({ email: value });
              }}
              errMsg={<span>You entered an exist email</span>}
            />
            <Input
              type="password"
              name="password"
              className="signup__input"
              label="passeord"
              placeholder="Password"
              value={password}
              onChange={({ target: { value } }) => {
                this.setState({ password: value });
              }}
              errMsg={<span>You entered weak password</span>}
            />
            <Input
              type="password"
              name="confirmPassword"
              className="signup__input"
              label="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={({ target: { value } }) => {
                this.setState({ confirmPassword: value });
              }}
              errMsg={<span>The password is not matching</span>}
            />
            <Button text="Next" className="" />
          </form>
        </div>
      </div>
    );
  }
}

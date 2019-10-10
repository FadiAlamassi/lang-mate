import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Avatar, UserMenu } from '../../common';
import People from './People';
import Messages from './Messages';
import api from '../../../services/api';
import { filter } from '../../assets/svgPaths';
import auth from '../../Auth/auth';
import './index.css';

class Home extends Component {
  state = {
    showMenu: false,
    showPeople: true,
    showMessages: false,
    search: '',

    people: { users: [] },
    messages: { user: [], channels: [], users: [] },
  };

  componentDidMount() {
    api.userNativeLang().then(res => this.setState({ people: { users: res } }));
  }

  changeSearch = ({ target: { value } }) => {
    this.setState({ search: value });
  };

  showMenu = () => {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  };

  handleMessage = () => {
    this.setState({ showMessages: true, showPeople: false });
  };

  handlePeople = () => {
    this.setState({ showMessages: false, showPeople: true });
  };

  handleLogout = () => {
    api.logout().then(() => {
      const {
        history: { push },
      } = this.props;
      auth.logout();
      auth.isAuthenticated = false;
      push('/login');
    });
  };

  render() {
    const { userInfo } = this.props;
    const {
      people: {
        users: { data },
      },
      search,
      showMenu,
      messages,
      showMessages,
      showPeople,
    } = this.state;
    return (
      <div className="main-feed">
        <header className="main-feed__header">
          <div className="main-feed__search-box">
            <Input
              type="text"
              name="search"
              className="main-feed__search"
              label="search-box"
              placeholder="Search"
              value={search}
              onChange={this.changeSearch}
              errMsg=""
            />
          </div>
          <div className="main-feed__filter">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={filter}
                fill="black"
                fillOpacity="0.54"
              />
            </svg>
          </div>
          <button
            type="button"
            className="main-feed__profile"
            onClick={this.showMenu}
          >
            <Avatar
              width="35"
              height="35"
              src="https://i.imgur.com/fLrnzVg.jpg"
              altText="user"
              className="main-feed__user"
            />
          </button>
        </header>
        {showMenu ? (
          <UserMenu
            username={userInfo.userName}
            handleLogout={this.handleLogout}
          />
        ) : (
          ''
        )}
        <section className="main-feed__options">
          <button
            type="button"
            className="main-feed__people-option"
            onClick={this.handlePeople}
          >
            people
          </button>
          <button
            type="button"
            className="main-feed__messages-option"
            onClick={this.handleMessage}
          >
            messages
          </button>
        </section>
        {showPeople && data ? <People users={data} /> : ''}
        {showMessages && Messages ? (
          <Messages messages={messages} userInfo={userInfo} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

Home.propTypes = {
  userInfo: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default Home;

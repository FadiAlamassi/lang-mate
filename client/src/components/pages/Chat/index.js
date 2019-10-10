import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Avatar, BackButton, Button } from '../../common';
import api from '../../../services/api';

import './index.css';

class Chat extends Component {
  state = {
    message: '',
    messages: [],
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    api
      .getMessages(id)
      .then(res => this.setState({ messages: res.data.messages }));
  }

  handelClick = () => {
    const { message, messages } = this.state;
    messages.push(message);
  };

  handelChange = ({ target: { value } }) => {
    this.setState({ message: value });
  };

  render() {
    const { messages, message } = this.state;
    const {
      history: { goBack },
      match: {
        params: { user },
      },
    } = this.props;
    return (
      <div className="chat">
        <header className="chat__header">
          <div className="chat__back">
            <BackButton back={goBack} />
          </div>
          <div className="chat__user">
            <Avatar
              src="https://i.imgur.com/fLrnzVg.jpg"
              width="25"
              height="25"
              altText="chat user"
              className="chat__avatar"
            />
            <h4 className="chat__username">{user}</h4>
          </div>
        </header>
        <div className="chat__body">
          {messages.map(messageItem => (
            <h4
              key={messageItem.id}
              className={messageItem.user_id === 2 ? 'green' : 'gray'}
            >
              {messageItem.content}
            </h4>
          ))}
        </div>
        <div className="chat__box">
          <Input
            type="text"
            name="message"
            className="chat__input"
            label="message filed"
            placeholder="type a message"
            value={message}
            onChange={this.handelChange}
            errMsg=""
          />
          <Button
            text="+"
            className="chat__button"
            onClick={this.handelClick}
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default Chat;

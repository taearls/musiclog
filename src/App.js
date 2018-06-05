import React, { Component } from 'react';
import LoginRegister from './SmartComponents/LoginRegister';
import UserContainer from './SmartComponents/UserContainer';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      loggedIn: false,
      justLoggedOut: false,
      message: '',
      logOutMessage: '',
      logInErrorMessage: ''
    }
  }

  // MESSAGE TIMEOUTS

  makeBlankMessage = () => {
    this.setState({
      message: ''
    });
  }
  clearError = () => {
    this.setState({
      logInErrorMessage: ''
    });
  }
  clearLogOutMessage = () => {
    this.setState({
      logOutMessage: ''
    });
  }

  // LOG OUT

  doLogOut = async () => {
    const logoutJson = await fetch('https://musiclog-api.herokuapp.com/users/logout', {
      credentials: 'include' // you MUST include in ALL ajax requests
    })
    const loggedOut = await logoutJson.json();
    if (loggedOut.success) {
      this.setState({
        loggedIn: false,
        justLoggedOut: true,
        logOutMessage: loggedOut.message
      });
    }
    return loggedOut;
  }

  // log out function if current user has just been deleted
  deleteLogOut = async (deleteMessage) => {
    const logoutJson = await fetch('https://musiclog-api.herokuapp.com/users/logout', {
      credentials: 'include' // you MUST include in ALL ajax requests
    })
    const loggedOut = await logoutJson.json();
    if (loggedOut.success) {
      this.setState({
        loggedIn: false,
        justLoggedOut: true,
        logOutMessage: deleteMessage
      });
    }
    return loggedOut;
  }

  // LOG IN

  doLogIn = async (email, password) => {
    const loginJson = await fetch('https://musiclog-api.herokuapp.com/users/login', {
      method: 'POST',
      credentials: 'include', // you MUST include in ALL ajax requests
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const loggedIn = await loginJson.json();
    if (loggedIn.success) {
      this.setState({
        loggedIn: true,
        justLoggedOut: false,
        logInErrorMessage: '',
        message: `Welcome back, ${email}!`,
        userId: loggedIn.user_id
      })
    } else {
      this.setState({
        logInErrorMessage: loggedIn.message
      });
    }
  }

  // REGISTER

  doRegister = async (email, password) => {
    const registerJson = await fetch('https://musiclog-api.herokuapp.com/users/register', {
      method: 'POST',
      credentials: 'include', // you MUST include in ALL ajax requests
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const parsedRegisterResponse = await registerJson.json();
    if (parsedRegisterResponse.success) {
      this.setState({
        loggedIn: true,
        justLoggedOut: false,
        logInErrorMessage: '',
        userId: parsedRegisterResponse.user_id
      })
    } else {
      this.setState({
        logInErrorMessage: parsedRegisterResponse.message
      });
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
            <div>
              <UserContainer doLogOut={this.doLogOut} userId={this.state.userId} message={this.state.message} deleteLogOut={this.deleteLogOut} />
            </div>
          : <LoginRegister doLogIn={this.doLogIn} doRegister={this.doRegister} makeBlankMessage={this.makeBlankMessage} makeBlankLogOutMessage={this.clearLogOutMessage} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage}  justLoggedOut={this.state.justLoggedOut} />
        }
      </div>
    );
  }
}

export default App;

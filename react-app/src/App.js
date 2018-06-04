import React, { Component } from 'react';
import LoginRegister from './SmartComponents/LoginRegister';
import UserContainer from './SmartComponents/UserContainer';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
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

  // CALL GET REQUESTS

  componentDidMount() {
    this.getUsers()
      .then((response) => {
        this.setState({
          users: response.users
        })
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  // DEFINE GET USER REQUEST

  getUsers = async () => {
    const usersJson = await fetch('http://localhost:9292/users', {
      credentials: 'include'
    });
    const users = await usersJson.json();
    return users;
  }

  // LOG OUT

  doLogOut = async () => {
    const logoutJson = await fetch('http://localhost:9292/users/logout', {
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

  // LOG IN

  doLogIn = async (email, password) => {
    const loginJson = await fetch('http://localhost:9292/users/login', {
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
    const registerJson = await fetch('http://localhost:9292/users/register', {
      method: 'POST',
      credentials: 'include', // you MUST include in ALL ajax requests
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const parsedRegisterResponse = await registerJson.json();
    if (parsedRegisterResponse.success) {
      console.log(parsedRegisterResponse, "parsedRegisterResponse");
      this.setState({
        loggedIn: true,
        justLoggedOut: false,
        logInErrorMessage: '',
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
              <UserContainer doLogOut={this.doLogOut} users={this.state.users} userId={this.state.userId} message={this.state.message} />
            </div>
          : <LoginRegister doLogIn={this.doLogIn} doRegister={this.doRegister} makeBlankMessage={this.makeBlankMessage} makeBlankLogOutMessage={this.clearLogOutMessage} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage}  justLoggedOut={this.state.justLoggedOut} />
        }
      </div>
    );
  }
}

export default App;

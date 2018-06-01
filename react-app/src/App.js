import React, { Component } from 'react';
import LoginRegister from './LoginRegister';
import UserContainer from './UserContainer';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: '',
      songs: [],
      practicelogs: [],
      loggedIn: false,
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
      this.getSongs()
      .then((response) => {
        this.setState({
          songs: response.songs
        })
      })
      .catch((err) => {
        console.log(err);
      })
      this.getPracticelogs()
      .then((response) => {
        this.setState({
          practicelogs: response.practicelogs
        })
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  // DEFINE GET REQUESTS

  getUsers = async () => {
    const usersJson = await fetch('http://localhost:9292/users', {
      credentials: 'include'
    });
    const users = await usersJson.json();
    return users;
  }
  getSongs = async () => {
    const songsJson = await fetch('http://localhost:9292/songs', {
      credentials: 'include'
    });
    const songs = await songsJson.json();
    return songs;
  }
  getPracticelogs = async () => {
    const practicelogsJson = await fetch('http://localhost:9292/practicelogs', {
      credentials: 'include'
    });
    const practicelogs = await practicelogsJson.json();
    return practicelogs;
  }

  // LOG OUT

  doLogout = async () => {
    const logoutJson = await fetch('http://localhost:9292/users/logout', {
      credentials: 'include' // you MUST include in ALL ajax requests
    })
    const loggedOut = await logoutJson.json();
    if (loggedOut.success) {
      this.setState({
        loggedIn: false,
        logOutMessage: loggedOut.message
      });
    }
    return loggedOut;
  }

  // LOG IN

  doLogin = async (email, password) => {
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
      this.setState({
        loggedIn: true,
        logInErrorMessage: '',
        message: `Welcome, ${email}!`,
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
            <UserContainer users={this.state.users} userId={this.state.userId} message={this.state.message}/>
          : <LoginRegister doLogin={this.doLogin} doRegister={this.doRegister} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage} makeBlankMessage={this.makeBlankMessage} makeBlankLogOutMessage={this.clearLogOutMessage} />
        }
      </div>
    );
  }
}

export default App;

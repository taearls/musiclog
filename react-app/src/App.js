import React, { Component } from 'react';
import './App.css';
import LoginRegister from './LoginRegister';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      practicelogs: [],
      loggedIn: false,
      message: '',
      logOutMessage: '',
      logInErrorMessage: ''
    }
  }
  makeBlankMessage = () => {
    this.setState({
      message: ''
    });
  }
  makeBlankLogOutMessage = () => {
    this.setState({
      logOutMessage: ''
    });
  }
  // GET METHODS
  getSongs = async () => {
    const songsJson = await fetch('http://localhost:9292/songs', {
      credentials: 'include'
    });
    const songs = await songsJson.json();
    return songs;
  }
  getPracticeLogs = async () => {
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
        message: `Welcome back, ${email}!`
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
      this.getPracticeLogs()
      .then((response) => {
        this.setState({
          practicelogs: response.practicelogs
        })
      })
      .catch((err) => {
        console.log(err);
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
        message: `Welcome, ${email}!`
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
      this.getPracticeLogs()
      .then((response) => {
        this.setState({
          practicelogs: response.practicelogs
        })
      })
      .catch((err) => {
        console.log(err);
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
              <h1>You're logged in.</h1>
            </div>
          : <LoginRegister doLogin={this.doLogin} doRegister={this.doRegister} logInErrorMessage={this.state.logInErrorMessage} logOutMessage={this.state.logOutMessage} makeBlankLogOutMessage={this.makeBlankLogOutMessage} />
        }
      </div>
    );
  }
}

export default App;

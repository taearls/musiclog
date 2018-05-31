import React, { Component } from 'react';
import './App.css';

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
  // GET METHODS
  getSongs = async () => {
    const songsJson = await fetch('https://localhost:9292/music_students/songs', {
      credentials: 'include'
    });
    const songs = await songsJson.json();
    return songs;
  }
  getPracticeLogs = async () => {
    const practicelogsJson = await fetch('https://localhost:9292/music_students/practicelogs', {
      credentials: 'include'
    });
    const practicelogs = await practicelogsJson.json();
    return practicelogs;
  }

  // LOG OUT

  doLogout = async () => {
    const logoutJson = await fetch('https://localhost:9292/music_students/logout', {
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
    const loginJson = await fetch('https://localhost:9292/music_students/login', {
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
    const registerJson = await fetch('https://localhost:9292/music_students/register', {
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
            <h1>You're logged in.</h1>
          : <h1>Please log in to the site.</h1>
        }
      </div>
    );
  }
}

export default App;

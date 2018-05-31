import React, { Component } from 'react';
import './style.css';

class LoginRegister extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			registering: false,
		}
	}
	componentDidMount() {
		{this.setMessageTimeout()}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.registering) this.props.doRegister(this.state.username, this.state.password)
		else this.props.doLogin(this.state.username, this.state.password)
	}
	handleInput = (e) => {
		const whichField = e.currentTarget.name
		if (whichField === "username") this.setState({"username": e.currentTarget.value})
		else this.setState({"password": e.currentTarget.value})
	}
	registration = (e) => {
		this.setState({registering: true});
	}
	loggingIn = (e) => {
		this.setState({registering: false});
	}
	setMessageTimeout = () => {
		setTimeout(this.props.makeBlankLogOutMessage, 1000);
	}
	render() {
		return (
			<div>
  				<h1>Welcome to the site!</h1>
					<h4> {this.props.logOutMessage} </h4>
					{this.props.logInErrorMessage.toString() !== '' ? <p className="login-error">{this.props.logInErrorMessage.toString()}</p> : null}

					<p><span className={this.state.registering ? "current" : null}onClick={this.registration}>Register</span> • <span className={!this.state.registering ? "current" : null} onClick={this.loggingIn}>Log In</span></p>
					<form onSubmit={this.handleSubmit}>
						<input type="text" name="email" placeholder="Email" onChange={this.handleInput}></input>
						<br/>
      					<input type="password" name="password" placeholder="Password" onChange={this.handleInput}></input>
      					<br/>
      					<button type="submit"> {this.state.registering ? "Register" : "Log In"}</button>
      				</form>
			</div>
		)
	}
}

export default LoginRegister;

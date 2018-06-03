import React, { Component } from 'react';

class LoginRegister extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			registering: false
		}
	}
	componentDidMount() {
		this.setLogOutTimeout();
		this.setErrorTimeOut();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.registering) this.props.doRegister(this.state.email, this.state.password)
		else this.props.doLogIn(this.state.email, this.state.password)
	}
	handleInput = (e) => {
		const whichField = e.currentTarget.name
		if (whichField === "email") this.setState({"email": e.currentTarget.value})
		else this.setState({"password": e.currentTarget.value})
	}
	registration = (e) => {
		this.setState({registering: true});
	}
	loggingIn = (e) => {
		this.setState({registering: false});
	}
	setLogOutTimeout = () => {
		setTimeout(this.props.clearLogOutMessage, 1000);
	}
	setErrorTimeOut = () => {
		setTimeout(this.props.makeBlankMessage, 1000);
	}
	render() {
		return (
			<div>
				<h1>Welcome to the Site!</h1>

  				{ this.props.justLoggedOut ? <h3> {this.props.logOutMessage} </h3> : <h3 className="hidden">User has Logged Out.</h3> } 

				{ this.props.logInErrorMessage.toString() !== '' ? 
					<p className="error">{this.props.logInErrorMessage.toString()}</p> 
				: <p className="error hidden">Invalid Email or Password.</p> }

				<h3 className="loginregister">
					<span className={this.state.registering ? "current" : null}onClick={this.registration}> Register </span>
					 • 
					<span className={!this.state.registering ? "current" : null} onClick={this.loggingIn}> Log In </span>
				</h3>
				<form onSubmit={this.handleSubmit}>
					<input className="input" type="text" name="email" placeholder="Email" onChange={this.handleInput}></input>
					<br/>
      				<input className="input" type="password" name="password" placeholder="Password" onChange={this.handleInput}></input>
      				<br/>
      				<button className="viewbutton" type="submit"> {this.state.registering ? "Register" : "Log In"}</button>
     			</form>

			</div>
		)
	}
}

export default LoginRegister;

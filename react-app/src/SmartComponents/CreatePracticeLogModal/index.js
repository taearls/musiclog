import React, { Component } from 'react';
import '../../index.css';

class CreatePracticeLogModal extends Component {
	constructor() {
		super();
		this.state = {
			song_name: '',
			goals: '',
			time_practiced: '',
			date_practiced: '',
			user_id: ''
		}
	}

	// sets the user_id to the current user's id
	componentDidMount() {
		this.setState({
			user_id: Number(this.props.userId)
		})
	}
	
	// this function handles all the different inputs in one fell swoop
	// thanks to the "name" property of the inputs
	handleInput = (e) => {
		e.preventDefault();
		const key = e.currentTarget.name;
		const value = e.currentTarget.value;
  		const obj = {}
  		obj[key] = value
  		this.setState(obj);
	}

	render() {
		// the submit button below calls the create function, which also hides the modal
		return(
			<div>
				<h1> Add a New Practice Log! </h1>
					Songs Worked On: <input className="input" type="text" name="song_name" placeholder="Songs Worked On" onChange={this.handleInput}></input> <br/>
					Practice Goals: <input className="input" type="text" name="goals" placeholder="Practice Goals" onChange={this.handleInput}></input> <br/>
					Time Practiced: <input className="input" type="text" name="time_practiced" placeholder="Time Practiced" onChange={this.handleInput}></input> <br/>
					Date Practiced: <input className="input" type="text" name="date_practiced" placeholder="Date Practiced" onChange={this.handleInput}></input> <br/>

					<button type="submit" onClick={this.props.createPracticeLog.bind(null, this.state)} className="createbutton">Create</button>

				<button className="viewbutton" onClick={this.props.hideCreatePracticeLogModal}>Return</button> <br/>
				<button className="logout" onClick={this.props.doLogOut}>Log Out</button>
			</div>
		);
	}
}

export default CreatePracticeLogModal;
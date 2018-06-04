import React, { Component } from 'react';
import '../../index.css';

class CreateSongModal extends Component {
	constructor() {
		super();
		this.state = {
			song_name: '',
			artist_name: '',
			notes: '',
			link_to_file: '',
			link_to_performance: ''
		}
	}

	// sets the user_id to the current user's id
	componentDidMount() {
		this.setState({
			user_id: parseInt(this.props.userId)
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
		return(
			<div>
				<h1> Add a New Song! </h1>
				<form>
					Song Name: <input className="input" type="text" name="song_name" placeholder="Song Name" onChange={this.handleInput}></input> <br/>
					Artist Name: <input className="input" type="text" name="artist_name" placeholder="Artist Name" onChange={this.handleInput}></input> <br/>
					Notes About Song: <input className="input" type="text" name="notes" placeholder="Notes About Song" onChange={this.handleInput}></input> <br/>
					Link to File: <input className="input" type="text" name="link_to_file" placeholder="Link to File" onChange={this.handleInput}></input> <br/>
					Link to Performance: <input className="input" type="text" name="link_to_performance" placeholder="Link to Performance" onChange={this.handleInput}></input> <br/>
					<button className="createbutton" onClick={this.props.createSong.bind(null, this.state)}>Create</button> <br/>
				</form>
				<button className="viewbutton" onClick={this.props.hideCreateSongModal}>Return</button> <br/>
				<button className="logout" onClick={this.props.doLogOut}>Log Out</button>
			</div>
		);
	}
}

export default CreateSongModal;
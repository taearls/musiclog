import React, { Component } from 'react';
import '../../index.css';

class CreateSongModal extends Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		return(
			<div>
				<h1> Add a New Song! </h1>
				<form>
					Song Name: <input className="input" type="text" name="song_name" placeholder="Song Name"></input> <br/>
					Artist Name: <input className="input" type="text" name="artist_name" placeholder="Artist Name"></input> <br/>
					Notes About Song: <input className="input" type="text" name="notes" placeholder="Notes About Song"></input> <br/>
					Link to File: <input className="input" type="text" name="link_to_file" placeholder="Link to File"></input> <br/>
					Link to Performance: <input className="input" type="text" name="link_to_performance" placeholder="Link to Performance"></input> <br/>
					<button className="createbutton">Create</button> <br/>
				</form>
				<button className="viewbutton" onClick={this.props.hideCreateSongModal}>Return</button> <br/>
				<button className="logout" onClick={this.props.doLogOut}>Log Out</button>
			</div>
		);
	}
}

export default CreateSongModal;
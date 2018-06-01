import React, { Component } from 'react';
import UserContainer from '../UserContainer';
import EditSongModal from '../../SmartComponents/EditSongModal';
import SongView from '../../DumbComponents/SongView';
import '../../index.css';

class SongContainer extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		return (
			<div>
				<h1> This is SongContainer.</h1>
			</div>
		)
	}
}

export default SongContainer;
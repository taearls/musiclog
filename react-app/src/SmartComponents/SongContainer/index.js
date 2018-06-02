import React, { Component } from 'react';
import UserContainer from '../UserContainer';
import EditSongModal from '../../SmartComponents/EditSongModal';
import SongView from '../../DumbComponents/SongView';
import '../../index.css';

class SongContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditSong: false
		}
	}
	render() {
		return(
			<div>
				{ this.state.showEditSong ?
					<EditSongModal />
				:	<SongView songs={this.props.songs} />
				}	
			</div>
		);
	}
}

export default SongContainer;
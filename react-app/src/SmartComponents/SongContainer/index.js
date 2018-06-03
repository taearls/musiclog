import React, { Component } from 'react';
import UserContainer from '../UserContainer';
import EditSongModal from '../../SmartComponents/EditSongModal';
import SongView from '../../DumbComponents/SongView';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class SongContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditSong: false
		}
	}
	editSong = async (editedSong, e) => {
	    const id = e.currentTarget.parentNode.id;
	    const song = await fetch('http://localhost:9292/songs/' + id, {
	    	credentials: 'include',
	    	method: 'PUT',
	    	body: JSON.stringify(editedSong)
	    })
	    const response = await song.json();

	    const editedSongIndex = this.props.songs.findIndex((song) => {
	    	return song.id == response.updated_song.id;
	    });
	    this.props.songs[editedSongIndex] = response.updated_song;
	    this.setState({
	    	editedSong: `${response.updated_song}`
	    })
	}
	deleteSong = async (e) => {
	    const id = e.currentTarget.parentNode.id;
	    const songs = await fetch ('http://localhost:9292/songs/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	songs: this.props.songs.filter((song) => song.id != id)
	    });
	}
	render() {
		return(
			<div>
				{ this.state.showEditSong ?
					<EditSongModal />
				:	<SongView songs={this.props.songs} userId={this.props.userId} doLogOut={this.props.doLogOut} hideSongView={this.props.hideSongView} showPracticeLogView={this.props.showPracticeLogView} deleteSong={this.deleteSong} editSong={this.editSong} />
				}	
			</div>
		);
	}
}

export default SongContainer;
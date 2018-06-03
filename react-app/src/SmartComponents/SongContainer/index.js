import React, { Component } from 'react';
// import UserContainer from '../UserContainer';
import CreateSongModal from '../../SmartComponents/CreateSongModal';
import EditSongModal from '../../SmartComponents/EditSongModal';
import SongView from '../../DumbComponents/SongView';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class SongContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditSong: false,
			showCreateSong: false
		}
	}
	showCreateSongModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreateSong: true,
			showEditSong: false
		})
	}
	hideCreateSongModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreateSong: false,
			showEditSong: false
		})
	}
	showEditSongModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditSong: true,
			showCreateSong: false
		})
	}
	hideEditSongModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditSong: false,
			showCreateSong: false
		})
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
	    	return Number(song.id) === Number(response.updated_song.id);
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
	      	songs: this.props.songs.filter((song) => Number(song.id) !== Number(id))
	    });
	}
	render() {
		return(
			<div>
				{ !this.state.showCreateSong ?
					<div>
						{ this.state.showEditSong ?
							<EditSongModal editSong={this.editSong} hideEditSongModal={this.hideEditSongModal} />
						:	<SongView songs={this.props.songs} userId={this.props.userId} doLogOut={this.props.doLogOut} hideSongView={this.props.hideSongView} showPracticeLogView={this.props.showPracticeLogView} deleteSong={this.deleteSong} showCreateSongModal={this.showCreateSongModal} showEditSongModal={this.showEditSongModal} />
						}	
					</div>
				:   <CreateSongModal hideCreateSongModal={this.hideCreateSongModal} hideSongView={this.props.hideSongView} doLogOut={this.props.doLogOut} />
				}
			</div>
		);
	}
}

export default SongContainer;
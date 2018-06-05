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
			songs: [],
			songId: '',
			showEditSong: false,
			showCreateSong: false
		}
	}
	componentDidMount() {
		this.getSongs()
      	.then((response) => {
	        this.setState({
	        	songs: response.songs
	        })
      	})
      	.catch((err) => {
        	console.log(err);
      	})
	}
	// SONG CRUD METHODS
	getSongs = async () => {
    	const songsJson = await fetch('http://localhost:9292/songs', {
      		credentials: 'include'
    	});
    	const songs = await songsJson.json();
    	return songs;
	}
	createSong = async (song, e) => {
	    e.preventDefault();
	    const songsJson = await fetch ('http://localhost:9292/songs', {
	      credentials: 'include',
	      method: 'POST',
	      body: JSON.stringify(song)
	    })
	    const songsParsed = await songsJson.json();
	    this.setState({
	      songs: [...this.state.songs, songsParsed.new_song],
	      showCreateSong: false
	    })
	}
	editSong = async (editedSong, e) => {
		e.preventDefault();
	    const id = this.state.songId;
	    const song = await fetch('http://localhost:9292/songs/' + id, {
	    	credentials: 'include',
	    	method: 'PUT',
	    	body: JSON.stringify(editedSong)
	    })
	    const response = await song.json();

	    const editedSongIndex = this.state.songs.findIndex((song) => {
	    	return parseInt(song.id) === parseInt(response.updated_song.id);
	    });
	    this.state.songs[editedSongIndex] = response.updated_song;
	    this.setState({
	    	showEditSong: false
	    })
	}
	deleteSong = async (e) => {
	    const id = e.currentTarget.parentNode.id;
	    const songs = await fetch ('http://localhost:9292/songs/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	songs: this.state.songs.filter((song) => parseInt(song.id) !== parseInt(id))
	    });
	}

	// SHOW / HIDE METHODS
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
		const id = e.currentTarget.parentNode.id;
		this.setState({
			showEditSong: true,
			showCreateSong: false,
			songId: id
		})
	}
	hideEditSongModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditSong: false,
			showCreateSong: false
		})
	}
	render() {
		return(
			<div>
				{ !this.state.showCreateSong ?
					<div>
						{ this.state.showEditSong ?
							<EditSongModal songs={this.state.songs} editSong={this.editSong} hideEditSongModal={this.hideEditSongModal} doLogOut={this.props.doLogOut} songId={this.state.songId} userId={this.props.userId} />
						:	<SongView songs={this.state.songs} userId={this.props.userId} doLogOut={this.props.doLogOut} hideSongView={this.props.hideSongView} showPracticeLogView={this.props.showPracticeLogView} deleteSong={this.deleteSong} showCreateSongModal={this.showCreateSongModal} showEditSongModal={this.showEditSongModal} />
						}	
					</div>
				:   <CreateSongModal createSong={this.createSong} hideCreateSongModal={this.hideCreateSongModal} hideSongView={this.props.hideSongView} doLogOut={this.props.doLogOut} userId={this.props.userId} />
				}
			</div>
		);
	}
}

export default SongContainer;
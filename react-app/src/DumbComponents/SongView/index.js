import React from 'react';
import '../../index.css';

const SongView = ({songs, userId, doLogOut, hideSongView, showPracticeLogView, deleteSong, showCreateSongModal, showEditSongModal}) => {
	// filter out the songs for the current user
	const userSongs = songs.filter(song => Number(song.user_id) === Number(userId));
	const songList = userSongs.map((song, i) => {
		return (
			<div key={i} id={song.id}>
				<p><b>Song Name:</b> {song.song_name}</p>
				<p><b>Artist Name:</b> {song.artist_name}</p>
				<p><b>Notes About Song: </b> {song.notes}</p>
				<p><b>Link to Song File:</b> <a className="linkdisplay" href={song.link_to_file} target="_blank">Song Link</a></p>
				<p><b>Link to Song Performance:</b> <a className="linkdisplay" href={song.link_to_performance} target="_blank">Performance Link</a></p>
				<button className="deletebutton" onClick={deleteSong}>Delete</button>
				<button className="editbutton" onClick={showEditSongModal}>Edit</button>
			</div>
		);
	});
	return (
		<div>
			<h1> Your Songs </h1>
			{songList}
			<button className="createbutton" onClick={showCreateSongModal}>Add Song</button> <br/>

			<button className="viewbutton" onClick={hideSongView}>Home</button>
			<button className="viewbutton" onClick={showPracticeLogView}>Logs</button> <br/>

			<button className="logout" onClick={doLogOut}>Log Out</button>
		</div>
	);
}
export default SongView;
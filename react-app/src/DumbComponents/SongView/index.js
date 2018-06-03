import React from 'react';
import '../../index.css';

const SongView = ({songs, userId, doLogOut}) => {
	// filter out the songs for the current user
	const userSongs = songs.filter(song => song.user_id == userId);
	const songList = songs.map((song, i) => {
		return (
			<ul className="notlist" key={i}>
				<li><b>Song Name:</b> {song.song_name}</li>
				<li><b>Artist Name:</b> {song.artist_name}</li>
				<li><b>Notes About Song: </b> {song.notes}</li>
				<li><b>Link to Song File:</b> <a href={song.link_to_file} target="_blank">Link to Song</a></li>
				<li><b>Link to Song Performance:</b> <a href={song.link_to_performance} target="_blank">Link to Performance</a></li>
				<button className="deletebutton">Delete</button>
				<button className="editbutton">Edit</button>
			</ul>
		);
	});
	return (
		<div>
			<h1> Songs View </h1>
			{songList}
			<button className="logout" onClick={doLogOut}>Log Out</button>
		</div>
	);
}
export default SongView;
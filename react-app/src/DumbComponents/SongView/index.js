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
				<li><b>Link to Song File:</b> {song.link_to_file}</li>
				<li><b>Link to Song Performance:</b> {song.link_to_performance}</li>
			</ul>
		);
	});
	return (
		<div>
			<h1> Songs View </h1>
			{songList}
		</div>
	);
}
export default SongView;
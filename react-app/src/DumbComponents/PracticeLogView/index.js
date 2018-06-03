import React from 'react';
import '../../index.css';

const PracticeLogView = ({practicelogs, userId, doLogOut, hidePracticeLogView, showSongView, deletePracticeLog, editPracticeLog}) => {
	// filter out the practicelogs for the current user
	const userPracticelogs = practicelogs.filter(practicelog => Number(practicelog.user_id) === Number(userId));
	const practicelogList = userPracticelogs.map((practicelog, i) => {
		return (
			<div key={i} id={practicelog.id}>
				<p><b>Songs Worked On:</b> {practicelog.song_name}</p>
				<p><b>Practice Goals:</b> {practicelog.goals}</p>
				<p><b>Time Practiced:</b> {practicelog.time_practiced}</p>
				<p><b>Date Practiced:</b> {practicelog.date_practiced}</p>
				<button className="deletebutton" onClick={deletePracticeLog}>Delete</button>
				<button className="editbutton" onClick={editPracticeLog}>Edit</button>
			</div>

		);
	});
	return (
		<div>
			<h1> Your Practice Logs </h1>
			{practicelogList}
			<button className="createbutton">Add Log</button> <br/>

			<button className="viewbutton" onClick={hidePracticeLogView}>Home</button>
			<button className="viewbutton" onClick={showSongView}>Songs</button> <br/>

			<button className="logout" onClick={doLogOut}>Log Out</button>
		</div>
	);
}
export default PracticeLogView;
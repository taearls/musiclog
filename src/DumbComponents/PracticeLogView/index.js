import React from 'react';
import '../../index.css';

const PracticeLogView = ({practicelogs, userId, doLogOut, hidePracticeLogView, showSongView, deletePracticeLog, showCreatePracticeLogModal, showEditPracticeLogModal}) => {
	// filter out the practicelogs for the current user
	const userPracticelogs = practicelogs.filter(practicelog => practicelog.user_id.toString() === userId.toString());
	const practicelogList = userPracticelogs.map((practicelog, i) => {
		return (
			<div key={i} id={practicelog.id}>
				<p><b>Songs Worked On:</b> {practicelog.song_name}</p>
				<p><b>Practice Goals:</b> {practicelog.goals}</p>
				<p><b>Time Practiced:</b> {practicelog.time_practiced}</p>
				<p><b>Date Practiced:</b> {practicelog.date_practiced}</p>
				<button className="deletebutton" onClick={deletePracticeLog}>Delete</button>
				<button className="editbutton" onClick={showEditPracticeLogModal}>Edit</button>
			</div>

		);
	});
	return (
		<div>
			<h1> Your Practice Logs </h1>

			<button className="viewbutton" onClick={hidePracticeLogView}>Home</button>
			<button className="viewbutton" onClick={showSongView}>Songs</button>

			<button className="logout" onClick={doLogOut}>Log Out</button> <br/>

			<button className="createbutton" onClick={showCreatePracticeLogModal}>Add Log</button>

			{practicelogList}
			
		</div>
	);
}
export default PracticeLogView;
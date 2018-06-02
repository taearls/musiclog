import React from 'react';
import '../../index.css';

const PracticeLogView = ({practicelogs, userId, doLogOut}) => {
	// filter out the practicelogs for the current user
	const userPracticelogs = practicelogs.filter(practicelog => practicelog.user_id == userId);
	const practicelogList = practicelogs.map((practicelog, i) => {
		return (
			<ul className="notlist" key={i}>
				<li><b>Songs Worked On:</b> {practicelog.song_name}</li>
				<li><b>Practice Goals:</b> {practicelog.goals}</li>
				<li><b>Time Practiced:</b> {practicelog.time_practiced}</li>
				<li><b>Date Practiced: </b> {practicelog.date_practiced}</li>
			</ul>
		);
	});
	return (
		<div>
			<h1> Practice Logs View </h1>
			{practicelogList}
		</div>
	);
}
export default PracticeLogView;
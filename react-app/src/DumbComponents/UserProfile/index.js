import React from 'react';
import '../../index.css';

const UserProfile = ({users, userId}) => {
	const currentUser = users.filter(user => user.id === userId);
	const shownUser = currentUser[0];
	const listUserAttributes = () => {
		return (
			<div>
				<p><b>Email:</b> {shownUser.email}</p>
				<p><b>Student's Name:</b> {shownUser.name === null ? "N/A" : shownUser.name }</p>
				<p><b>School:</b> {shownUser.school === null ? "N/A" : shownUser.school }</p>
				<p><b>Grade:</b> {shownUser.grade === null ? "N/A" : shownUser.grade }</p>
				<p><b>Student's Phone:</b> {shownUser.student_phone === null ? "N/A" : shownUser.student_phone }</p>
				<p><b>Student Texting Enabled:</b> { shownUser.text_student ? "Yes" : "No" } </p>
				<p><b>Parent Phone:</b> {shownUser.parent_phone == null ? "N/A" : shownUser.parent_phone }</p>
				<p><b>Parent Texting Enabled:</b> { shownUser.text_parent ? "Yes" : "No" } </p>
				<p><b>Lesson Location:</b> {shownUser.lesson_location === null ? "N/A" : shownUser.lesson_location}</p>
				<p><b>Lesson Day:</b> {shownUser.lesson_day === null ? "N/A" : shownUser.lesson_day }</p>
				<p><b>Lesson Time:</b> {shownUser.lesson_time === null ? "N/A" : shownUser.lesson_time }</p>
				<p><b>Additional Information:</b> {shownUser.additional_info === null ? "N/A" : shownUser.additional_info }</p>
			</div>
		)
	}
	return (
		// change header + button text depending on 
		// whether the user's name is defined or not
		<div>
			{shownUser.name !== null ? <h1>{shownUser.name}'s Profile</h1>
			: <h1>User Profile</h1>
			}
			<div>
				{listUserAttributes()}
			</div>
			<button className="viewbutton">Songs</button> <br/>
			<button className="viewbutton">Logs</button> <br/>

			<button className="editbutton">Edit</button> <br/>

			<button className="deletebutton">Delete</button> <br/>

			<button className="logout">Log Out</button>
		</div>
	);
}

export default UserProfile;
import React from 'react';
import '../../index.css';

const UserProfile = ({users, userId, doLogOut, deleteUser, showSongView, showPracticeLogView, showEditUserModal}) => {
	// only show the current user
	const currentUser = users.filter(user => parseInt(user.id) === parseInt(userId));
	const shownUser = currentUser[0];

	const listUserAttributes = () => {
		if (shownUser) {
			return (
				<div>
					<p><b>Email:</b> {shownUser.email}</p>
					<p><b>Student's Name:</b> {shownUser.name === "Name" ? "N/A" : shownUser.name }</p>
					<p><b>School:</b> {shownUser.school === "School" ? "N/A" : shownUser.school }</p>
					<p><b>Grade:</b> {shownUser.grade === "Grade" ? "N/A" : shownUser.grade }</p>
					<p><b>Student's Phone:</b> {shownUser.student_phone === "Phone" ? "N/A" : shownUser.student_phone }</p>
					<p><b>Student Texting Enabled:</b> { shownUser.text_student ? "Yes" : "No" } </p>
					<p><b>Parent Phone:</b> {shownUser.parent_phone == null ? "N/A" : shownUser.parent_phone }</p>
					<p><b>Parent Texting Enabled:</b> { shownUser.text_parent ? "Yes" : "No" } </p>
					<p><b>Lesson Location:</b> {shownUser.lesson_location === "Lesson Location" ? "N/A" : shownUser.lesson_location}</p>
					<p><b>Lesson Day:</b> {shownUser.lesson_day === "Lesson Day" ? "N/A" : shownUser.lesson_day }</p>
					<p><b>Lesson Time:</b> {shownUser.lesson_time === "Lesson Time" ? "N/A" : shownUser.lesson_time }</p>
					<p><b>Additional Information:</b> {shownUser.additional_info === "Additional Info" ? "N/A" : shownUser.additional_info }</p>
				</div>
			)
		} else { 
			// shownUser won't be defined upon initial registration
			// I set default values here
			// removed email parameter because it would be weird to say N/A after they just inputted the email
			return ( 
				<div>
					<p><b>Student's Name:</b> N/A</p>
					<p><b>School:</b> N/A</p>
					<p><b>Grade:</b> N/A</p>
					<p><b>Student's Phone:</b> N/A</p>
					<p><b>Student Texting Enabled:</b> No</p>
					<p><b>Parent Phone:</b> N/A</p>
					<p><b>Parent Texting Enabled:</b> No</p>
					<p><b>Lesson Location:</b> N/A</p>
					<p><b>Lesson Day:</b> N/A</p>
					<p><b>Lesson Time:</b> N/A</p>
					<p><b>Additional Information:</b> N/A</p>
				</div>
			);
		}
	}
	return (
		// change header + button text depending on 
		// whether the user's name is defined or not
		<div>

			<h1>User Profile</h1>

			<button className="viewbutton" onClick={showSongView}>Songs</button> 
			<button className="viewbutton" onClick={showPracticeLogView}>Logs</button>
			<button className="logout" onClick={doLogOut}>Log Out</button>

			<div>
				{listUserAttributes()}
			</div>
			<button className="editbutton" onClick={showEditUserModal}>Edit</button>
			<button className="deletebutton" onClick={deleteUser}>Delete</button>

		</div>
	);
}

export default UserProfile;
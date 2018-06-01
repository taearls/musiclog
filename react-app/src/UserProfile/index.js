import React from 'react';
import '../index.css';

const UserProfile = ({users, userId}) => {
	const currentUser = users.filter(user => user.id === userId);
	const shownUser = currentUser[0];
	const listUserAttributes = () => {
		return (
			<div>
				<li><b>Email:</b> {shownUser.email}</li>
				<li><b>Name:</b> {shownUser.name === null ? "N/A" : shownUser.name }</li>
				<li><b>School:</b> {shownUser.school === null ? "N/A" : shownUser.school }</li>
				<li><b>Grade:</b> {shownUser.grade === null ? "N/A" : shownUser.grade }</li>
				<li><b>Student Phone:</b> {shownUser.student_phone === null ? "N/A" : shownUser.student_phone }</li>
				<li><b>Student Text Enabled:</b> { shownUser.text_student ? "Yes" : "No" } </li>
				<li><b>Parent Phone:</b> {shownUser.parent_phone == null ? "N/A" : shownUser.parent_phone }</li>
				<li><b>Parent Text Enabled:</b> { shownUser.text_parent ? "Yes" : "No" } </li>
				<li><b>Lesson Location:</b> {shownUser.lesson_location === null ? "N/A" : shownUser.lesson_location}</li>
				<li><b>Lesson Day:</b> {shownUser.lesson_day === null ? "N/A" : shownUser.lesson_day }</li>
				<li><b>Lesson Time:</b> {shownUser.lesson_time === null ? "N/A" : shownUser.lesson_time }</li>
				<li><b>Additional Information:</b> {shownUser.additional_info === null ? "N/A" : shownUser.additional_info }</li>
			</div>
		)
	}
	return (
		// change header + button text depending on 
		// whether the user's name is defined or not
		<div>
			<h1>User Profile</h1>
			<ul>
				{listUserAttributes()}
			</ul>
			<button class="deletebutton">Delete User</button>
			<button class="editbutton">Edit User Information</button>
			<button class="createbutton">Add New Song</button>
			<button class="createbutton">Add New Practice Log</button>
			<button class="logout">Log Out</button>
		</div>
	);
}

export default UserProfile;
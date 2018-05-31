import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import EditUserModal from '../EditUserModal';
import './style.css';

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditUser: false
		}
	}

	render() {
		return(
			<div>
				<UserProfile users={this.props.users} userId={this.props.userId}/>
				<EditUserModal />
			</div>
		);
	}
}

export default UserContainer;
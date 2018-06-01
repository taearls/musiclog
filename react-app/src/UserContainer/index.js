import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import EditUserModal from '../EditUserModal';
import '../index.css';

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
				{ this.state.showEditUser ?
					<EditUserModal />
				:	<UserProfile users={this.props.users} userId={this.props.userId} />	
				}
			</div>
		);
	}
}

export default UserContainer;
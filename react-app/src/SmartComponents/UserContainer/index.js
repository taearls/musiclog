import React, { Component } from 'react';
import SongContainer from '../../SmartComponents/SongContainer';
import EditUserModal from '../../SmartComponents/EditUserModal';
import UserProfile from '../../DumbComponents/UserProfile';
import '../../index.css';


class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditUser: false,
			viewSongs: false,
			viewPracticeLogs: false
		}
	}

	render() {
		return(
			<div>
				{ !this.state.viewSongs ? 
					<div>
						{ this.state.showEditUser ?
							<EditUserModal />
						:	<UserProfile users={this.props.users} userId={this.props.userId} />	
						}
					</div>
				: <SongContainer />
				}
			</div>
		);
	}
}

export default UserContainer;
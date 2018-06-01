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
	editUser = async (editedUser) => {
	    const id = this.state.userId;
	    const user = await fetch('http://localhost:9292/users/' + id, {
	    	method: 'PUT',
	    	body: JSON.stringify(editedUser)
	    })
	    const response = await user.json();

	    const editedUserIndex = this.state.users.findIndex((user) => {
	    	return user.id == response.updated_users.id;
	    });
	    this.state.employees[editedUserIndex] = response.updated_user;
	    this.setState({
	    	editedUser: `${response.updated_user}`
	    })
	}
	deleteUser = async (e) => {
	    const id = e.currentTarget.parentNode.parentNode.id;
	    console.log(id, " this is the id of the employee we're trying to delete");
	    const users = await fetch ('http://localhost:9292/users/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	users: this.state.users.filter((user) => user.id != id)
	    });
	}
	render() {
		return(
			<div>
				{ !this.state.viewSongs ? 
					<div>
						{ this.state.showEditUser ?
							<EditUserModal />
						:	<UserProfile users={this.props.users} userId={this.props.userId} doLogOut={this.props.doLogOut} deleteUser={this.deleteUser}/>	
						}
					</div>
				: <SongContainer doLogOut={this.props.doLogOut}/>
				}
			</div>
		);
	}
}

export default UserContainer;
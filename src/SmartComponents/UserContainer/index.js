import React, { Component } from 'react';
import SongContainer from '../../SmartComponents/SongContainer';
import PracticeLogContainer from '../../SmartComponents/PracticeLogContainer';
import EditUserModal from '../../SmartComponents/EditUserModal';
import UserProfile from '../../DumbComponents/UserProfile';
import '../../index.css';

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			showEditUser: false,
			viewSongs: false,
			viewPracticeLogs: false
		}
	}
	componentDidMount() {
		this.getUsers()
      	.then((response) => {
        	this.setState({
          		users: response.users
        	})
      	})
      	.catch((err) => {
        	console.log(err);
      	})
	}

	// USER CRUD FUNCTIONS

	getUsers = async () => {
    	const usersJson = await fetch('https://musiclog-api.herokuapp.com/users', {
      		credentials: 'include'
    	});
    	const users = await usersJson.json();
    	return users;
  	}
	editUser = async (editedUser, e) => {
		e.preventDefault();
	    const id = this.props.userId;
	    const user = await fetch('https://musiclog-api.herokuapp.com/users/' + id, {
	    	method: 'PUT',
	    	credentials: 'include',
	    	body: JSON.stringify(editedUser)
	    })
	    const response = await user.json();

	    const editedUserIndex = this.state.users.findIndex((user) => {
	    	return parseInt(user.id) === parseInt(response.updated_user.id);
	    });
	    this.state.users[editedUserIndex] = response.updated_user;
	    this.setState({
	    	showEditUser: false
	    })
	}
	deleteUser = async (e) => {
	    const id = this.props.userId;
	    const user = await fetch ('https://musiclog-api.herokuapp.com/users/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    const response = await user.json();
	    this.state.users.filter((user) => parseInt(user.id) !== parseInt(id));
	    this.props.deleteLogOut(response.message);
	}

	// SHOW / HIDE FUNCTIONS

	showEditUserModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditUser: true
		})
	}
	hideEditUserModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditUser: false
		})
	}
	showSongView = (e) => {
		e.preventDefault();
		this.setState({
			viewSongs: true,
			viewPracticeLogs: false
		})
	}
	hideSongView = (e) => {
		e.preventDefault();
		this.setState({
			viewSongs: false,
			viewPracticeLogs: false
		})
	}
	showPracticeLogView = (e) => {
		e.preventDefault();
		this.setState({
			viewPracticeLogs: true,
			viewSongs: false
		})
	}
	hidePracticeLogView = (e) => {
		e.preventDefault();
		this.setState({
			viewPracticeLogs: false,
			viewSongs: false
		})
	}
	render() {
		return(
			<div>
				{ !this.state.viewPracticeLogs ?
					<div>
				    { !this.state.viewSongs ? 
						<div>
							{ this.state.showEditUser ?
								<EditUserModal users={this.state.users} userId={this.props.userId} hideEditUserModal={this.hideEditUserModal} doLogOut={this.props.doLogOut} editUser={this.editUser} />
							:	<UserProfile users={this.state.users} userId={this.props.userId} doLogOut={this.props.doLogOut} deleteUser={this.deleteUser} showSongView={this.showSongView} showPracticeLogView={this.showPracticeLogView} showEditUserModal={this.showEditUserModal} />	
							}
						</div>
					: <SongContainer songs={this.props.songs} userId={this.props.userId} doLogOut={this.props.doLogOut} hideSongView={this.hideSongView} showPracticeLogView={this.showPracticeLogView} />
					}
					</div>
				:   <PracticeLogContainer practicelogs={this.props.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} hidePracticeLogView={this.hidePracticeLogView} showSongView={this.showSongView} />
				}
			</div>
		);
	}
}

export default UserContainer;
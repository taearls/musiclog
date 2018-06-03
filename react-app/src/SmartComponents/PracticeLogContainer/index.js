import React, { Component } from 'react';
import UserContainer from '../UserContainer';
import EditPracticeLogModal from '../../SmartComponents/EditPracticeLogModal';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class PracticeLogContainer extends Component {
	constructor() {
		super();
		this.state = {
			showEditPracticeLog: false
		}
	}
	editPracticeLog = async (editedPracticeLog, e) => {
	    const id = e.currentTarget.parentNode.id;
	    const practicelog = await fetch('http://localhost:9292/practicelogs/' + id, {
	    	credentials: 'include',
	    	method: 'PUT',
	    	body: JSON.stringify(editedPracticeLog)
	    })
	    const response = await practicelog.json();

	    const editedPracticeLogIndex = this.props.practicelogs.findIndex((practicelog) => {
	    	return practicelog.id == response.updated_practicelog.id;
	    });
	    this.props.practicelogs[editedPracticeLogIndex] = response.updated_practicelog;
	    this.setState({
	    	editedPracticeLog: `${response.updated_practicelog}`
	    })
	}
	deletePracticeLog = async (e) => {
	    const id = e.currentTarget.parentNode.id;
	    const practicelogs = await fetch ('http://localhost:9292/practicelogs/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	practicelogs: this.props.practicelogs.filter((practicelog) => practicelog.id != id)
	    });
	}
	render() {
		return (
			<div>
				{ this.state.showEditPracticeLog ? 
					<EditPracticeLogModal />
				:   <PracticeLogView practicelogs={this.props.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} hidePracticeLogView={this.props.hidePracticeLogView} showPracticeLogView={this.props.showPracticeLogView} deletePracticeLog={this.deletePracticeLog} editPracticeLog={this.editPracticeLog} />
				}
			</div>
		)
	}
}

export default PracticeLogContainer;
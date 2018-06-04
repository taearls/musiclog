import React, { Component } from 'react';
// import UserContainer from '../UserContainer';
import CreatePracticeLogModal from '../../SmartComponents/CreatePracticeLogModal';
import EditPracticeLogModal from '../../SmartComponents/EditPracticeLogModal';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class PracticeLogContainer extends Component {
	constructor() {
		super();
		this.state = {
			practicelogs: [],
			practicelogId: '',
			showEditPracticeLog: false,
			showCreatePracticeLog: false
		}
	}
	componentDidMount() {
		this.getPracticelogs()
      	.then((response) => {
	        this.setState({
	        	practicelogs: response.practicelogs
	        })
      	})
      	.catch((err) => {
        	console.log(err);
      	})
	}
	showCreatePracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreatePracticeLog: true,
			showEditPracticeLog: false
		})
	}
	hideCreatePracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showCreatePracticeLog: false,
			showEditPracticeLog: false
		})
	}
	showEditPracticeLogModal = (e) => {
		e.preventDefault();
		const id = e.currentTarget.parentNode.id;
		this.setState({
			showEditPracticeLog: true,
			showCreatePracticeLog: false,
			practicelogId: id
		})
	}
	hideEditPracticeLogModal = (e) => {
		e.preventDefault();
		this.setState({
			showEditPracticeLog: false,
			showCreatePracticeLog: false		
		})
	}
	getPracticelogs = async () => {
	    const practicelogsJson = await fetch('http://localhost:9292/practicelogs', {
	      credentials: 'include'
	    });
	    const practicelogs = await practicelogsJson.json();
	    return practicelogs;
  	}
	createPracticeLog = async (newPracticeLog, e) => {
		e.preventDefault();
		const practicelog = await fetch('http://localhost:9292/practicelogs', {
	    	credentials: 'include',
	    	method: 'POST',
	    	body: JSON.stringify(newPracticeLog)
	    });
	    const practiceLogsParsed = await practicelog.json();
    	this.setState({
    		practicelogs: [...this.state.practicelogs, practiceLogsParsed.new_practicelog],
    		showCreatePracticeLog: false
    	});
	}
	editPracticeLog = async (editedPracticeLog, e) => {
		e.preventDefault();
	    const id = this.state.practicelogId;
	    const practicelog = await fetch('http://localhost:9292/practicelogs/' + id, {
	    	credentials: 'include',
	    	method: 'PUT',
	    	body: JSON.stringify(editedPracticeLog)
	    })
	    const response = await practicelog.json();

	    const editedPracticeLogIndex = this.state.practicelogs.findIndex((practicelog) => {
	    	return parseInt(practicelog.id) === parseInt(response.updated_practicelog.id);
	    });
	    this.state.practicelogs[editedPracticeLogIndex] = response.updated_practicelog;
	    this.setState({
	    	showEditPracticeLog: false
	    })
	}
	deletePracticeLog = async (e) => {
	    const id = e.currentTarget.parentNode.id;
	    const practicelogs = await fetch ('http://localhost:9292/practicelogs/' + id, {
	      	credentials: 'include',
	      	method: 'DELETE'
	    });
	    this.setState({
	      	practicelogs: this.state.practicelogs.filter((practicelog) => parseInt(practicelog.id) !== parseInt(id))
	    });
	}
	render() {
		return (
			<div>
				{ !this.state.showCreatePracticeLog ?
					<div>
						{ this.state.showEditPracticeLog ? 
							<EditPracticeLogModal practicelogs={this.state.practicelogs} editPracticeLog={this.editPracticeLog} hideEditPracticeLogModal={this.hideEditPracticeLogModal} doLogOut={this.props.doLogOut} userId={this.props.userId} practicelogId={this.state.practicelogId} />
						:   <PracticeLogView practicelogs={this.state.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} hidePracticeLogView={this.props.hidePracticeLogView} showSongView={this.props.showSongView} deletePracticeLog={this.deletePracticeLog} showCreatePracticeLogModal={this.showCreatePracticeLogModal} showEditPracticeLogModal={this.showEditPracticeLogModal} />
						}
					</div>
				:   <CreatePracticeLogModal createPracticeLog={this.createPracticeLog} hideCreatePracticeLogModal={this.hideCreatePracticeLogModal} hidePracticeLogView={this.props.hidePracticeLogView} doLogOut={this.props.doLogOut} userId={this.props.userId} />
				}
			</div>
		)
	}
}

export default PracticeLogContainer;
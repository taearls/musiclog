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
	render() {
		return (
			<div>
				{ this.state.showEditPracticeLog ? 
					<EditPracticeLogModal />
				:   <PracticeLogView practicelogs={this.props.practicelogs} userId={this.props.userId} doLogOut={this.props.doLogOut} />
				}
			</div>
		)
	}
}

export default PracticeLogContainer;
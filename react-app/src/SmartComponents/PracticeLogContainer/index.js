import React, { Component } from 'react';
import UserContainer from '../UserContainer';
import EditPracticeLogModal from '../../SmartComponents/EditPracticeLogModal';
import PracticeLogView from '../../DumbComponents/PracticeLogView';
import '../../index.css';

class PracticeLogContainer extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		return (
			<div>
				<h1> This is PracticeLogContainer.</h1>
			</div>
		)
	}
}

export default PracticeLogContainer;
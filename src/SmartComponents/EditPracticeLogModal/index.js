import React, { Component } from 'react';
import '../../index.css';

class EditPracticeLogModal extends Component {
    constructor() {
        super();
        this.state = {
            song_name: '',
            goals: '',
            time_practiced: '',
            date_practiced: '',
            user_id: ''
        }
    }
    // sets the user_id to the current user's id
    // and the current practice log values
    componentDidMount() {
        this.getCurrentPracticeLogValues();
        this.setState({
            user_id: parseInt(this.props.userId)
        });
    }
    // handles all the inputs in one function based on the "name" property of the input field
    handleInput = (e) => {
        e.preventDefault();
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    getCurrentPracticeLogValues = () => {
        const currentPracticeLog = this.props.practicelogs.filter(practicelog => parseInt(practicelog.id) === parseInt(this.props.practicelogId));
        const practiceLogToEdit = currentPracticeLog[0];
        this.setState({
            song_name: `${practiceLogToEdit.song_name}`,
            goals: `${practiceLogToEdit.goals}`,
            time_practiced: `${practiceLogToEdit.time_practiced}`,
            date_practiced: `${practiceLogToEdit.date_practiced}`
        })
    }

    render(){
        return (
            <div>
                <h1> Update Your Practice Log </h1>
                <form>
                    Songs Worked On: <input className="input" type="text" name="song_name" placeholder="Songs Worked On" value={this.state.song_name} onChange={this.handleInput}></input> <br/>
                    Practice Goals: <input className="input" type="text" name="goals" placeholder="Practice Goals" value={this.state.goals} onChange={this.handleInput}></input> <br/>
                    Time Practiced: <input className="input" type="text" name="time_practiced" placeholder="Time Practiced" value={this.state.time_practiced} onChange={this.handleInput}></input> <br/>
                    Date Practiced: <input className="input" type="text" name="date_practiced" placeholder="Date Practiced" value={this.state.date_practiced} onChange={this.handleInput}></input> <br/>
                    <button className="editbutton" onClick={this.props.editPracticeLog.bind(null, this.state)}>Submit</button> <br/>
                </form>
                <button className="viewbutton" onClick={this.props.hideEditPracticeLogModal}>Return</button> <br/>
                <button className="logout" onClick={this.props.doLogOut}>Log Out</button>
            </div>
        );
    }
}

export default EditPracticeLogModal;

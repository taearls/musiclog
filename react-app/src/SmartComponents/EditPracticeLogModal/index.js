import React, { Component } from 'react';
import '../../index.css';

class EditPracticeLogModal extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render(){
        return (
            <div>
                <h1> Update Your Practice Log </h1>
                <form>
                    Songs Worked On: <input className="input" type="text" name="song_name" placeholder="Songs Worked On"></input> <br/>
                    Practice Goals: <input className="input" type="text" name="goals" placeholder="Practice Goals"></input> <br/>
                    Time Practiced: <input className="input" type="text" name="time_practiced" placeholder="Time Practiced"></input> <br/>
                    Date Practiced: <input className="input" type="text" name="date_practiced" placeholder="Date Practiced"></input> <br/>
                    <button className="editbutton">Submit</button> <br/>
                </form>
                <button className="viewbutton" onClick={this.props.hideEditPracticeLogModal}>Return</button> <br/>
                <button className="logout" onClick={this.props.doLogOut}>Log Out</button>
            </div>
        );
    }
}

export default EditPracticeLogModal;

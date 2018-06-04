import React, { Component } from 'react';
import '../../index.css';

class EditUserModal extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    
    render(){
        return (
            <div>
                <h1> Edit User Information </h1>
                <form>
                    Email: <input className="input" type="text" name="email" placeholder="Email"></input> <br/>
                    Student's Name: <input className="input" type="text" name="name" placeholder="Name of Student"></input> <br/>
                    School: <input className="input" type="text" name="school" placeholder="Name of School"></input> <br/>
                    Grade: <input className="input" type="text" name="grade" placeholder="Grade"></input> <br/>
                    Student Phone: <input className="input" type="text" name="student_phone" placeholder="Student's Phone Number"></input> <br/>
                    Student Text Enabled: <input className="input" type="text" name="text_student" placeholder="Enable Texts to Student?"></input> <br/>
                    Parent Phone: <input className="input" type="text" name="parent_phone" placeholder="Parent's Phone Number"></input> <br/>
                    Parent Text Enabled: <input className="input" type="text" name="text_parent" placeholder="Enable Texts to Parent?"></input> <br/>
                    Lesson Location: <input className="input" type="text" name="lesson_location" placeholder="Lesson Location"></input> <br/>
                    Lesson Day: <input className="input" type="date" name="lesson_day" placeholder="Lesson Day"></input> <br/>
                    Lesson Time: <input className="input" type="time" name="lesson_time" placeholder="Lesson Time"></input> <br/>
                    Additional Information: <input className="input" type="text" name="additional_info" placeholder="Additional Information"></input> <br/>
                    <button className="editbutton">Submit</button> <br/>
                </form>
                <button className="viewbutton" onClick={this.props.hideEditUserModal}>Return</button> <br/>
                <button className="logout" onClick={this.props.doLogOut}>Log Out</button>
            </div>
        );
    }
}

export default EditUserModal;
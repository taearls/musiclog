import React, { Component } from 'react';
import '../../index.css';

class EditUserModal extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password_digest: '',
            name: '',
            school: '',
            grade: '',
            student_phone: '',
            text_student: '',
            parent_phone: '',
            text_parent: '',
            lesson_location: '',
            lesson_day: '',
            lesson_time: '',
            additional_info: ''
        }
    }
    
    // returns the values of the current user 
    componentDidMount() {
        this.getCurrentUserValues()
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

    getCurrentUserValues = () => {
        const currentUser = this.props.users.filter(user => parseInt(user.id) === parseInt(this.props.userId));
        const userToEdit = currentUser[0];
        this.setState({
            email: `${userToEdit.email}`,
            password_digest: `${userToEdit.password_digest}`,
            name: `${userToEdit.name}`,
            school: `${userToEdit.school}`,
            grade: `${userToEdit.grade}`,
            student_phone: `${userToEdit.student_phone}`,
            text_student: `${userToEdit.text_student}`,
            parent_phone: `${userToEdit.parent_phone}`,
            text_parent: `${userToEdit.email}`,
            lesson_location: `${userToEdit.lesson_location}`,
            lesson_day: `${userToEdit.lesson_day}`,
            lesson_time: `${userToEdit.lesson_time}`,
            additional_info: `${userToEdit.additional_info}`
        })
    }

    render(){
        return (
            <div>
                <h1> Edit User Information </h1>
                <form>
                    Email: <input className="input" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInput}></input> <br/>
                    Student's Name: <input className="input" type="text" name="name" placeholder="Name of Student" value={this.state.name} onChange={this.handleInput}></input> <br/>
                    School: <input className="input" type="text" name="school" placeholder="Name of School" value={this.state.school} onChange={this.handleInput}></input> <br/>
                    Grade: <input className="input" type="text" name="grade" placeholder="Grade" value={this.state.grade} onChange={this.handleInput}></input> <br/>
                    Student Phone: <input className="input" type="text" name="student_phone" placeholder="Student's Phone Number" value={this.state.student_phone} onChange={this.handleInput}></input> <br/>
                    Student Text Enabled: <input className="input" type="text" name="text_student" placeholder="Enable Texts to Student?" value={this.state.text_student} onChange={this.handleInput}></input> <br/>
                    Parent Phone: <input className="input" type="text" name="parent_phone" placeholder="Parent's Phone Number" value={this.state.parent_phone} onChange={this.handleInput}></input> <br/>
                    Parent Text Enabled: <input className="input" type="text" name="text_parent" placeholder="Enable Texts to Parent?" value={this.state.text_parent} onChange={this.handleInput}></input> <br/>
                    Lesson Location: <input className="input" type="text" name="lesson_location" placeholder="Lesson Location" value={this.state.lesson_location} onChange={this.handleInput}></input> <br/>
                    Lesson Day: <input className="input" type="text" name="lesson_day" placeholder="Lesson Day" value={this.state.lesson_day} onChange={this.handleInput}></input> <br/>
                    Lesson Time: <input className="input" type="text" name="lesson_time" placeholder="Lesson Time" value={this.state.lesson_time} onChange={this.handleInput}></input> <br/>
                    Additional Information: <input className="input" type="text" name="additional_info" placeholder="Additional Information" value={this.state.additional_info} onChange={this.handleInput}></input> <br/>
                    <button className="editbutton" onClick={this.props.editUser.bind(null, this.state)}>Submit</button> <br/>
                </form>
                <button className="viewbutton" onClick={this.props.hideEditUserModal}>Return</button> <br/>
                <button className="logout" onClick={this.props.doLogOut}>Log Out</button>
            </div>
        );
    }
}

export default EditUserModal;
import React, { Component } from 'react';
import '../../index.css';

class EditSongModal extends Component {
    constructor() {
        super();
        this.state = {
            song_name: '',
            artist_name: '',
            notes: '',
            link_to_file: '',
            link_to_performance: '',
            user_id: ''
        }
    }

    // sets user_id to current user's id
    // sets initial values to the current values of the selected song
    componentDidMount() {
        this.getCurrentSongValues();
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

    getCurrentSongValues = () => {
        const currentSong = this.props.songs.filter(song => parseInt(song.id) === parseInt(this.props.songId));
        const songToEdit = currentSong[0];
        this.setState({
            song_name: `${songToEdit.song_name}`,
            artist_name: `${songToEdit.artist_name}`,
            notes: `${songToEdit.notes}`,
            link_to_file: `${songToEdit.link_to_file}`,
            link_to_performance: `${songToEdit.link_to_performance}`
        })
    }

    render(){
        return (
            <div>
                <h1> Update Your Song </h1>
                <form>
                    Song Name: <input className="input" type="text" name="song_name" placeholder="Song Name" value={this.state.song_name} onChange={this.handleInput}></input> <br/>
                    Artist Name: <input className="input" type="text" name="artist_name" placeholder="Artist Name" value={this.state.artist_name} onChange={this.handleInput}></input> <br/>
                    Notes About Song: <input className="input" type="text" name="notes" placeholder="Notes About Song" value={this.state.notes} onChange={this.handleInput}></input> <br/>
                    Link to File: <input className="input" type="text" name="link_to_file" placeholder="Link to File" value={this.state.link_to_file} onChange={this.handleInput}></input> <br/>
                    Link to Performance: <input className="input" type="text" name="link_to_performance" placeholder="Link to Performance" value={this.state.link_to_performance} onChange={this.handleInput}></input> <br/>
                    <button className="editbutton" onClick={this.props.editSong.bind(null, this.state)}>Submit</button> <br/>
                </form>
                <button className="viewbutton" onClick={this.props.hideEditSongModal}>Return</button> <br/>
                <button className="logout" onClick={this.props.doLogOut}>Log Out</button>
            </div>
        );
    }
}

export default EditSongModal;

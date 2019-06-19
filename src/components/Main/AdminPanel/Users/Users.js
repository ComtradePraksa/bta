import React, { Component } from 'react';
import { postToDatabase } from '../../../../apis/btaApi';

class Users extends Component {
    state = {
        name: '',
        username: '',
        password: '',
        is_admin: 0,
        photo: ''
    };

    inputHandler = (e) => {
        if (e.target.name === 'photo') {
            const photoName = e.target.value.slice(12);
            const photo = `assets/profiles/${photoName}`;
            this.setState({ photo });
        } else { this.setState({ [e.target.name]: e.target.value }); }
    };

    saveHandler = () => {
        (async () => {
            await postToDatabase('/users', this.state);
        })();
    };

    render() {
        
        return (
            <div>
                <h2>Create new user</h2>
                <input onBlur={this.inputHandler} type="text" name="name" placeholder="Enter name" />
                <input onBlur={this.inputHandler} type="text" name="username" placeholder="Enter username" />
                <input onBlur={this.inputHandler} type="password" name="password" placeholder="Enter password" />
                <h3>Administrator privileges:</h3>
                <label htmlFor="admin1">Yes</label>
                <input onClick={this.inputHandler} type="radio" name="is_admin" value="1" id="admin1" />
                <label htmlFor="admin0">No</label>
                <input onClick={this.inputHandler} type="radio" name="is_admin" value="0" id="admin0" />
                <input onChange={this.inputHandler} type="file" name="photo" />
                <button onClick={this.saveHandler}>Save to database</button>
            </div>
        )
    }
}

export default Users;
import React, { Component } from 'react';
import {getFromDatabase , postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Users extends Component {
    state = {
        name: '',
        username: '',
        password: '',
        is_admin: 0,
        photo: '',
        users: []
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/users`);
            const users = [];
            data.data.map(user => (
                users.push({ id: user.id, name: user.name, username: user.username, is_admin: user.is_admin, photo: user.photo })
            ));
            this.setState({ users });
        })();
    };

    inputHandler = (e) => {
        if (e.target.name === 'photo') {
            const photoName = e.target.value.slice(12);
            const photo = `assets/profiles/${photoName}`;
            this.setState({ photo });
        } else { this.setState({ [e.target.name]: e.target.value }); }
    };

    saveHandler = () => {
        const newUser = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            is_admin: this.state.is_admin,
            photo: this.state.photo,
        };
        // this.setState(prevState=>({ users: [newUser, ...prevState.users]}));
        (async () => {
            await postToDatabase('/users', newUser);
            alert('Succesfuly added new user');
            this.getDatabase();
        })();
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/users', id);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        this.getDatabase();
    };

    render() {
        const users = this.state.users.map(user => {
            return (
                <div key={user.id}>
                    <img src={require(`../../../../${user.photo}`)} alt = "" /> 
                    {user.name} - username: {user.username}
                    <span>{user.is_admin === 1 ? ' - Admin privileges' : ' - User'}</span>
                    <span onClick={() => this.deleteHandler(user.id)}>
                        <FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                </div>
            )
        });

        return (
            <div>
                <h2>Create new user</h2>
                <div>
                    <input onBlur={this.inputHandler} type="text" name="name" placeholder="Enter name" />
                    <input onBlur={this.inputHandler} type="text" name="username" placeholder="Enter username" />
                    <input onBlur={this.inputHandler} type="password" name="password" placeholder="Enter password" />
                    <h4>Administrator privileges:</h4>
                    <label htmlFor="admin1">Yes</label>
                    <input onClick={this.inputHandler} type="radio" name="is_admin" value="1" id="admin1" />
                    <label htmlFor="admin0">No</label>
                    <input onClick={this.inputHandler} type="radio" name="is_admin" value="0" id="admin0" />
                    <input onChange={this.inputHandler} type="file" name="photo" />
                </div>
                <button onClick={this.saveHandler}>Save to database</button>
                <h2>All users:</h2>
                <div>
                    {users}
                </div>
            </div>
        )
    }
}

export default Users;
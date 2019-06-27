import React, { Component } from 'react';
import {getFromDatabase , postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Users.css';

class Users extends Component {
    _isMounted = false;
    state = {
        name: '',
        username: '',
        password: '',
        is_admin: 0,
        photo: 'assets/profiles/defaultPhoto.jpg',
        usersAll: [],
        users_onePage: [],
        showAll: false,
        regEx_message: '',
        true_message: ''
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/users`);
            const usersAll = [];
            data.data.map(user => (
                usersAll.push({ id: user.id, name: user.name, username: user.username, is_admin: user.is_admin, photo: user.photo })
            ));
            if (this._isMounted) {
                const users_onePage = usersAll.slice(0, 10);
                (this.state.showAll) ? this.setState({ usersAll, users_onePage: usersAll }) : this.setState({ usersAll, users_onePage });
            }
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
        const isEmpty = Object.values(newUser).every(input => (input !== ''));
        if (isEmpty) {
            // this.setState(prevState=>({ users: [newUser, ...prevState.users]}));
            (async () => {
                await postToDatabase('/users', newUser);
                this.setState({ showAll: true });
                this.getDatabase();
            })();
            this.setState({true_message: '- Successfully aded new user -'});
        } else { this.setState({regEx_message: 'Please complete all fields to add new user!'}); }
    };

    deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to permanently delete this user?')) {
            (async () => {
                await deleteFromDatabase('/users', id);
                this.getDatabase();
            })();
            this.setState({true_message: '- Successfully deleted user -'});
        }
    };

    showAllUsers = () => {
        if (this.state.showAll) {
            const users_onePage = this.state.usersAll.slice(0, 10);
            this.setState({ showAll: false, users_onePage });
        } else {
            this.setState({showAll: true, users_onePage: this.state.usersAll});
        }
    };

    componentDidMount() {
        this._isMounted = true;
        this.getDatabase();
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        const users = this.state.users_onePage.map(user => {
            return (
                <div key={user.id} className={classes.UsersDetailsFlex}>
                    <div className={classes.UsersImg}><img src={require(`../../../../${user.photo}`)} alt = "" /> </div>
                    <div>{user.name}</div>
                    <div>username: {user.username}</div>
                    <span>{user.is_admin === 1 ? 'Administrator' : 'User'}<FontAwesomeIcon onClick={() => this.deleteHandler(user.id)} icon="trash-alt" size="lg" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/></span>
                </div>
            )
        });

        return (
            <div className={classes.Users}>
                <h2>Create new user</h2>
                <div>
                    <input className={classes.UsersInputText} onBlur={this.inputHandler} type="text" name="name" placeholder="Enter name" />
                    <input className={classes.UsersInputText} onBlur={this.inputHandler} type="text" name="username" placeholder="Enter username" />
                    <input className={classes.UsersInputText} onBlur={this.inputHandler} type="password" name="password" placeholder="Enter password" />
                    <h4>Administrator privileges:</h4>
                    <div className={classes.AdminToggleYes}><label htmlFor="admin1">Yes</label>
                    <input onClick={this.inputHandler} type="radio" name="is_admin" value="1" id="admin1" />
                    <label htmlFor="admin0">No</label>
                    <input onClick={this.inputHandler} type="radio" name="is_admin" value="0" id="admin0" /></div>
                    <div className={classes.UsersPhotoInput}><input onChange={this.inputHandler} type="file" name="photo" /></div>
                </div>
                {
                    (this.state.regEx_message !== '' && this.state.true_message === '') ? 
                    <p className={classes.Message}>{this.state.regEx_message}</p> :
                    <p className={classes.MessageTrue}>{this.state.true_message}</p>
                }
                <button onClick={this.saveHandler}>Save to database</button>
                <h2>All users:</h2>
                <div className={classes.UsersFlex}>
                    {users}
                </div>
                <button onClick={this.showAllUsers}>{this.state.showAll ? 'Hide' : 'Show All'}</button>
            </div>
        )
    }
}

export default Users;
import React, { Component } from 'react';

class Users extends Component {
    state = {

    };

    render() {
        return(
            <div>
                <h2>Create new user</h2>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="Enter password"/>
                
            </div>
        )
    }
}

export default Users;
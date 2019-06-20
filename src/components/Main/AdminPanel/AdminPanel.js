import React, { Component } from 'react';
import Users from './Users/Users';
import City from './City/City';
import Accommodation from './Accommodation/Accommodation';
import Provider from './Provider/Provider';
import Route from './Route/Route';
import Feedback from './Feedback/Feedback';
import classes from './AdminPanel.css';

class AdminPanel extends Component {
    state = {
        option: ''
    };

    optionHandler = (e) => {
        this.setState ({ option: e.target.id });
    };

    render() {
        let optionForRender = '';
        if (this.state.option === 'Users') { optionForRender = <Users />; } 
        else if (this.state.option === 'City') { optionForRender = <City />; } 
        else if (this.state.option === 'Accommodation') { optionForRender = <Accommodation />; } 
        else if (this.state.option === 'Provider') { optionForRender = <Provider />; } 
        else if (this.state.option === 'Route') { optionForRender = <Route />; } 
        else if (this.state.option === 'Feedback') { optionForRender = <Feedback />; }

        return (
            <div className={classes.AdminPanel}>
                <h1>Admin panel</h1>
                <div className={classes.AdminContainer}>
                    <div onClick={this.optionHandler} id='Users'>Users</div>
                    <div onClick={this.optionHandler} id='City'>City</div>
                    <div onClick={this.optionHandler} id='Accommodation'>Accommodation</div>
                    <div onClick={this.optionHandler} id='Provider'>Provider</div>
                    <div onClick={this.optionHandler} id='Route'>Route</div>
                    <div onClick={this.optionHandler} id='Feedback'>Feedback</div>
                </div>
                {optionForRender}
            </div>
        );
    }
}

export default AdminPanel;
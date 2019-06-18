<<<<<<< HEAD
import React, { Component } from 'react';
import classes from './Welcome.css';

class Welcome extends Component {

    render() {
        let admin = '';
        if (this.props.loggedUser.is_admin === 1) {
            admin = ' - admin';
        }

        return (
            <div className={classes.Container}>
                <div className={classes.Welcome}>Welcome</div>
                <img className={classes.Photo} src={require(`../../../${this.props.loggedUser.photo}`)} alt={this.props.loggedUser.username} />
                <div className={classes.Title}>{this.props.loggedUser.username}{admin}</div>
=======
import React from 'react';
import classes from './Welcome.css';

const welcome = (props) => {

        let admin = '';
        if (props.loggedUser.is_admin === 1) {
            admin = ' - admin';
        }

        return (
            <div className={classes.Container}>
                <div className={classes.Welcome}>Welcome</div>
                <img className={classes.Photo} src={require(`../../../${props.loggedUser.photo}`)} alt={props.loggedUser.username} />
                <div className={classes.Title}>{props.loggedUser.username}{admin}</div>
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0
            </div>
        )
};

export default welcome;
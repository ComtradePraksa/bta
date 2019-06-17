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
            </div>
        )
    };
}

export default Welcome;

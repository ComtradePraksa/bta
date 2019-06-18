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
            </div>
        )
};

export default welcome;
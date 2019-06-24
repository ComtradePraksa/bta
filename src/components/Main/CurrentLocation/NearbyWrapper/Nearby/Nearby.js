import React from 'react';
import classes from './Nearby.css';

const nearby = props => {
    return (
        <div className={classes.Nearby}>
            <img className={classes.icon} src={props.icon} alt="poi icon"/>
            <h3 className={classes.title}>{props.title}</h3>
            <p className={classes.category}>{props.category}</p>
            <p className={classes.address}>{props.address}</p>
        </div>
    )
};

export default nearby;
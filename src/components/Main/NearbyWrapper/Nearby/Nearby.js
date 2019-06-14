import React from 'react';
import classes from './Nearby.css';

const nearby = props => {
    return (
        <div className={classes.Nearby}>
            <img src={props.icon} alt="poi icon" />
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <p>{props.address}</p>
        </div>
    )
}

export default nearby;


import React, { Component } from 'react';
import classes from "./FeedbackTicket.css"


const FeedbackTicket = (props) => {
    console.log(props.fb.photo)
    return (
        <div className={classes.ticketContainer}>
            <div className={classes.feedbackType}>{props.fb.category}</div>
            {/* <div className={classes.userPicture}><img src={require(`../../../${props.fb.photo}`)} alt="cao" /></div> */}
            <p className={classes.userName}>{props.fb.name}</p>
            <p className={classes.feedbackTitle}>{props.fb.title}</p>
            <div className={classes.feedbackProgress}></div>
            <p className={classes.feedbackRaiting}>{props.fb.raiting}</p>
            <p className={classes.feedbackText}>{props.fb.feedback.slice(0, 100)}...</p>
            <div className={classes.numberOfComments}>4</div>
            <button className={classes.readMore}>READ MORE</button>
        </div>
    );
}


export default FeedbackTicket;
import React, { Component } from 'react';
import classes from "./FeedbackComment.css"
import {formatDate } from "../FeedbackFunction/FeedbackFunction"

class FeedbackComment extends Component{
    render() {
        return(
            <div className={classes.commentContainer}>
                <div className={classes.userName}>
                    <p>{this.props.comments.name}</p>
                </div>
                <div className={classes.userPicture}>
                    <img src={require(`../../../../${this.props.comments.photo}`)} alt="profilePicture"/>
                </div>
                <div className={classes.commentDate}>{formatDate(this.props.comments.comment_date)}</div>
                <div className={classes.commentText}>{this.props.comments.comments}</div>
            </div>
        )
    }
}
export default FeedbackComment
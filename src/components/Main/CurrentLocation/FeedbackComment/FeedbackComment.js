import React, { Component } from 'react';
import classes from "./FeedbackComment.css"
import { formatDate } from "../FeedbackFunction/FeedbackFunction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FeedbackComment extends Component {

    render() {
        return (
            <div className={classes.commentContainer}>
                <div className={classes.userName}>
                    <p>{this.props.comments.name}</p>
                </div>
                <div className={classes.userPicture}>
                    <img src={require(`../../../../${this.props.comments.photo}`)} alt="profilePicture"/>
                </div>
                <div className={classes.commentDate}>{formatDate(this.props.comments.comment_date)}</div>
                <div className={classes.commentText}>{this.props.comments.comments}</div>
                <div className={classes.deleteComment}>
                    {(this.props.loggedUser.id === this.props.comments.id) 
                        && <FontAwesomeIcon icon="trash-alt" onClick={() => this.props.deleteComment(this.props.comments.id_comment)}/>}
                </div>
            </div>
        )
    }
}

export default FeedbackComment;
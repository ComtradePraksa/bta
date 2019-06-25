import classes from "./FeedbackPopup.css"
import React, { Component } from 'react';
import { getType, getStyle, formatDate, stringForDb } from "../FeedbackFunction/FeedbackFunction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackComment from "../FeedbackComment/FeedbackComment";
import jwt from 'jsonwebtoken';
import axios from 'axios';

class FeedbackPopup extends Component {
    state = {
        commentVisible: false,
        commentValue: ""
    };

    toggleComment = () => {
        this.setState({ commentVisible: !this.state.commentVisible });
    };

    getCommentValue = event => {
        this.setState({ commentValue: event.target.value });
    };

    getData = () => {
        document.querySelector("#commentText").value = "";
        this.setState({ commentValue: "" });
        const commentData = {
            userId: jwt.decode(localStorage.getItem("jwtoken")).id,
            fbId: this.props.fb.id_feedback,
            com: this.state.commentValue,
            dt: stringForDb()
        };
        
        axios({
            method: 'post',
            url: 'http://localhost:3001/location_comments',
            data: commentData,
            config: { headers: { 'Content-Type': 'application/json' } }
        }).then(res => {
            const dbResults = res.data;
            const newCom = {
                id_comment: dbResults.insertedId,
                comment_date: dbResults.newComment.dt,
                comments: dbResults.newComment.com,
                id_feedback: dbResults.newComment.fbId,
                id: dbResults.newComment.userId,
                name: dbResults.user.name,
                photo: dbResults.user.photo
            };
            this.props.addNewComent(newCom);
        });
    };

    render() {
        return (
            <div className={classes.feedbackPopupWindow}>
                <div className={classes.feedbackPopup}>
                    <div className={classes.feedbackPopupHeader} >
                        <FontAwesomeIcon icon="times" onClick={this.props.toggleComponents} />
                    </div>
                    <div className={classes.feedbackPopupMain}>
                        <div className={classes.feedbackPopupUserInfo}>
                            <div className={classes.feedbackPopupUserPhoto}>
                                <img src={require(`../../../../${this.props.fb.photo}`)} alt="userPicture" />
                            </div>
                            <div className={classes.feedbackPopupUserName}>{this.props.fb.name}</div>
                            <div className={classes.feedbackPopupTitle}>{this.props.fb.title}</div>
                            <div className={classes.feedbackPopupProgress}>
                                <div className={classes.feedbackPopupInnerProgress}>
                                    <div className={classes.feedbackPopupProgressColor} style={getStyle(this.props.fb.rating)}></div>
                                </div>
                            </div>
                            <div className={classes.feedbackPopupRate}>{this.props.fb.rating}</div>
                            <div className={classes.feedbackContent}>{this.props.fb.feedback}</div>
                            <div className={classes.feedbackPopupDate}>{formatDate(this.props.fb.date)}</div>
                            <div className={classes.feedbackPopupTypeIcon}>
                                <FontAwesomeIcon icon={getType(this.props.fb.category).icon} style={{ color: getType(this.props.fb.category).color }} />
                            </div>
                        </div>
                        <div className={classes.feedbackPopupComments}>
                            <div className={classes.feedbackPopupCommentTitleContainer}>
                                <p className={classes.feedbackPopupCommentTitle}>Comments</p>
                                <div className={classes.feedbackPopupNumberOfComments}>
                                    <FontAwesomeIcon icon="comment-alt" style={{ color: "lightgray", marginLeft: "8px" }} />
                                    <p>{this.props.numberOfComments}</p>
                                </div>
                                <button onClick={this.toggleComment}> <FontAwesomeIcon icon="plus" /> Add Comment</button>
                            </div>
                            {this.state.commentVisible && <div className={classes.feedbackNewComment}>
                                <textarea id={`commentText`} onChange={this.getCommentValue} placeholder = "Enter your comment"/>
                              {/* <FontAwesomeIcon onClick={this.getData} icon="chevron-circle-right" style={{ width: "40px", height: "40px" }} /> */}
                                <button onClick={this.getData} className={classes.postButton}>Post Comment</button>
                            </div>}
                            <div className={classes.feedbackPopupCommentsContainer}>
                                {this.props.comments.map((com) => {
                                    if (com.id_feedback === this.props.fb.id_feedback) {
                                        return (
                                            <FeedbackComment loggedUser={this.props.loggedUser} key={com.id_comment} comments={com} deleteComment={this.props.deleteComment}/>
                                        )
                                    }
                                    return true;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeedbackPopup;
import classes from "./FeedbackPopup.css"
import React, { Component } from 'react';
import { getType, getStyle, formatDate } from "../FeedbackFunction/FeedbackFunction"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackComment from "../FeedbackComment/FeedbackComment";


class FeedbackPopup extends Component {
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
                                    <FontAwesomeIcon icon="comment-alt" style={{ color: "lightgray" }} />
                                    <p>{this.props.numberOfComments}</p>
                                </div>
                            </div>
                            <div className={classes.feedbackPopupCommentsContainer}>
                                {this.props.comments.map((com) => {
                                    if (com.id_feedback === this.props.fb.id_feedback) {
                                        return (
                                            <FeedbackComment key={com.id_comment} comments={com} />
                                        )
                                    }
                                    return true
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

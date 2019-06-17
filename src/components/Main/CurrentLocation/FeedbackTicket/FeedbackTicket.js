import React, { Component } from 'react';
import classes from "./FeedbackTicket.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackPopup from '../FeedbackPopup/FeedbackPopup';
import { throws } from 'assert';
import {getType,getStyle} from "../FeedbackFunction/FeedbackFunction"

class FeedbackTicket extends Component {
    state = {
        popupVisible : false
    }

    toggleComponents = ()=>{
        this.setState({
            popupVisible: !this.state.popupVisible
        })
    }

    render() {
        return (
            <div className={classes.ticketContainer}>
                <div className={classes.feedbackType}>
                    <FontAwesomeIcon icon="map-marker-alt" style={{ marginRight: "10%", color: "#FD6087" }} />
                    <FontAwesomeIcon icon={getType(this.props.fb.category).icon} style={{ color: getType(this.props.fb.category).color }} />
                </div>
                <div className={classes.userPicture}><img src={require(`../../../../${this.props.fb.photo}`)} alt="userPicture" /></div>
                <p className={classes.userName}>{this.props.fb.name}</p>
                <p className={classes.feedbackTitle}>{this.props.fb.title}</p>
                <div className={classes.feedbackProgress}>
                    <div className={classes.innerProgress}>
                        <div style={getStyle(this.props.fb.rating)} className={classes.colorProgress}></div>
                    </div>
                </div>
                <p className={classes.feedbackRaiting}>{this.props.fb.rating}</p>
                <p className={classes.feedbackText}>{this.props.fb.feedback.slice(0, 150)}...</p>
                <div className={classes.numberOfComments}>
                    <div className={classes.numberOfCommentsWrapper}>
                        <p style={{ marginRight: "10px" }}>4</p>
                        <FontAwesomeIcon icon="comment-alt" style={{ color: "lightgray" }} />
                    </div>
                </div>
                <button className={classes.readMore} onClick={this.toggleComponents}>READ MORE</button>
                {this.state.popupVisible && <FeedbackPopup toggleComponents={this.toggleComponents} fb={this.props.fb} />}
            </div>
        );
    }
}

export default FeedbackTicket;
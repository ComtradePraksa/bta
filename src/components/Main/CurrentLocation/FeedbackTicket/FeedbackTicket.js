import React, { Component } from 'react';
import classes from "./FeedbackTicket.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackPopup from '../FeedbackPopup/FeedbackPopup';
import { getType, getStyle } from "../FeedbackFunction/FeedbackFunction"
import { getFromDatabase } from '../../../../apis/btaApi';

class FeedbackTicket extends Component {
    state = {
        popupVisible: false,
        comments: []
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase('/location_comments');
            const comments = [];
            data.data.map(fb => (
                comments.push(fb)
            ));
            this.setState({ comments: comments })
        })();
    };

    toggleComponents = () => {
        this.setState({ popupVisible: !this.state.popupVisible });
    };

    componentDidMount() {
        this.getDatabase();
    };

    addNewComent = (newComment) => {
        const copy = this.state.comments;
        this.setState({
            comments: [newComment, ...copy]
        });
    };

    getNumberOfComments = () => {
        let sum = 0
        this.state.comments.map(comment => {
            if (comment.id_feedback === this.props.fb.id_feedback) {
                sum++;
            }
            return true;
        })
        return sum;
    };

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
                        <FontAwesomeIcon icon="comment-alt" style={{ color: "lightgray" }} />
                        <p style={{ marginLeft: "8px", color: "gray" }}>{this.getNumberOfComments()}</p>
                        {(this.props.loggedUser.id === this.props.fb.id_user) && <FontAwesomeIcon onClick={() => this.props.getClickedId(this.props.fb.id_feedback)} icon="trash-alt" />}

                    </div>
                </div>
                <button className={classes.readMore} onClick={this.toggleComponents}>READ MORE</button>
                {this.state.popupVisible && <FeedbackPopup loggedUser={this.props.loggedUser} addNewComent={this.addNewComent} numberOfComments={this.getNumberOfComments()} comments={this.state.comments} toggleComponents={this.toggleComponents} fb={this.props.fb} />}
            </div>
        );
    }
}

export default FeedbackTicket;
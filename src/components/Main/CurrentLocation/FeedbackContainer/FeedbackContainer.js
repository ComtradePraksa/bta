import React, { Component } from 'react';
import FeedbackTicket from '../FeedbackTicket/FeedbackTicket';
import { getFromDatabase, deleteFromDatabase } from '../../../../apis/btaApi';
import classes from "./FeedbackContainer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class FeedbackContainer extends Component {
    state = {
        feedbacks: [],
        users: [],
        userfeedbacks: []
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase('/location_feedbacks');
            const feedback = [];
            const userfeedback = []
            data.data.map(fb => {
                feedback.push(fb)
                if (data.user.id === fb.id) {
                    userfeedback.push(fb.id_feedback);
                    this.setState({ userfeedbacks: userfeedback });
                }
                return true;
            });
            this.setState({ feedbacks: feedback });
        })();
    };

    componentDidMount() {
        this.getDatabase();

    };
    getClickedId = (params) => {
        (async () => {
            await deleteFromDatabase(`/location_feedbacks`, params);
            this.getDatabase();
        })();
    };

    render() {

        return (
            <div className={classes.feedbackContainer}>
                <div className={classes.sortTicket}>
                </div>
                <div className={classes.ticketsWrapper}>
                    {
                        this.state.feedbacks.map(fb => (
                            <FeedbackTicket getClickedId={this.getClickedId} loggedUser={this.props.loggedUser} key={fb.id_feedback} fb={fb} />
                        ))
                    }
                </div>
                <div className={classes.addFeedback}>
                <FontAwesomeIcon icon="plus" style={{color:"white"}}/>
                </div>
            </div>
        );
    }
}

export default FeedbackContainer;
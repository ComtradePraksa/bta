import React, { Component } from 'react';
import FeedbackTicket from '../FeedbackTicket/FeedbackTicket';
import { getFromDatabase } from '../../../../apis/btaApi'
import classes from "./FeedbackContainer.css"


class FeedbackContainer extends Component {
    state = {
        feedbacks: [],
        users: []
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase('/location_feedbacks');
            const feedback = [];
            data.data.map(fb => (
                feedback.push(fb)
            ));
            this.setState({ feedbacks: feedback })
        })();
    };

    render() {
        return (
            <div className={classes.feedbackContainer}>
                <div className={classes.sortTicket}></div>
                <div className={classes.ticketsWrapper}>
                    {this.state.feedbacks.map((fb, index) => (
                        <FeedbackTicket key={index} fb={fb} />
                    ))}

                </div>
            </div>
        );
    }
}

export default FeedbackContainer;

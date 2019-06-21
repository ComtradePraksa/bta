import React, { Component } from 'react';
import FeedbackTicket from '../FeedbackTicket/FeedbackTicket';
import { getFromDatabase } from '../../../../apis/btaApi';
import classes from "./FeedbackContainer.css"

class FeedbackContainer extends Component {
    state = {
        feedbacks: [],
        users: [],
        userfeedbacks: []
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase('/location_feedbacks');
            const feedback = [];
            const userfeedback = []
           
            data.data.map(fb => {
                feedback.push(fb)
                if (data.user.id === fb.id) {
                    userfeedback.push(fb.id_feedback)
                     this.setState({ userfeedbacks: userfeedback })
                }
                return true
            });
            this.setState({ feedbacks: feedback });
        }

        )();
    };



    render() {
        
        return (
            <div className={classes.feedbackContainer}>
                <div className={classes.sortTicket}>

                </div>
                <div className={classes.ticketsWrapper}>
                    {
                        this.state.feedbacks.map(fb => (
                            <FeedbackTicket loggedUser={this.props.loggedUser} key={fb.id_feedback} fb={fb} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default FeedbackContainer;
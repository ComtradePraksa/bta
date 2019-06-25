import React, { Component } from 'react';
import FeedbackTicket from './FeedbackTicket/FeedbackTicket';
import { getFromDatabase, deleteFromDatabase } from '../../../apis/btaApi'
import classes from "./FeedbackContainer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddNewFeedback from "./AddNewFeedback/AddNewFeedback"

class FeedbackContainer extends Component {
    state = {
        feedbacks: [],
        users: [],
        userfeedbacks: [],
        newComentVisible: false
    };

    toggle = () => {
        this.setState({ newComentVisible: !this.state.newComentVisible });
    };

    getDatabase = (cityId) => {
        (async () => {
            const data = await getFromDatabase(`/location_feedbacks/location/${cityId}`);
            const feedback = [];
            const userfeedback = [];
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

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.cityId!==this.props.cityId) {
            this.getDatabase(this.props.cityId);
        }
    };

    componentDidMount() {
        this.getDatabase(this.props.cityId);
    };
    
    deleteFeedback = (params) => {
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
                            <FeedbackTicket deleteFeedback={this.deleteFeedback} loggedUser={this.props.loggedUser} key={fb.id_feedback} fb={fb}/>
                        ))
                    }
                </div>
                <div onClick={this.toggle} className={classes.addFeedback}>
                    <FontAwesomeIcon icon="plus" style={{ color: "white" }}/>
                </div>
                {this.state.newComentVisible && <AddNewFeedback toggle={this.toggle}/>}
            </div>
        );
    }
}

export default FeedbackContainer;
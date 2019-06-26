import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';
import FeedbackTicket from '../../FeedbackContainer/FeedbackTicket/FeedbackTicket';
import classes from './Feedback.css';

class Feedback extends Component {
    state = {
        // location_feedbacks: '',
        // acc_feedbacks: '',
        // transportation_feedbacks: '',
        feedbacks: '',
        regEx_message: ''
    };

    getDatabase = (tableName, saveLocation) => {
        (async () => {
            const data = await getFromDatabase(`${tableName}`);
            let feedbacks = data.data;
            this.setState({ [saveLocation]: feedbacks });
        })();
    };

    render() {
        return (
            <div className={classes.Feedback}>
                <div onClick={() => this.getDatabase('/location_feedbacks', 'feedbacks')}>Location Feedbacks</div>
                <div onClick={() => this.getDatabase('/acc_feedbacks', 'feedbacks')}>Accommodation Feedbacks</div>
                <div onClick={() => this.getDatabase('/transportation_feedbacks', 'feedbacks')}>Transportation Feedbacks</div>
                <p>
                {   (this.state.feedbacks !== '') ? 
                    this.state.feedbacks.map((fb,index) => (<FeedbackTicket loggedUser={this.props.loggedUser} key={index} fb={fb}/>)) : null 
                }
                </p>
            </div>
        )
    }
}

export default Feedback;
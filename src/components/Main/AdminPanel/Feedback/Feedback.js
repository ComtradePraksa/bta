import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';
import classes from './Feedback.css';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class Feedback extends Component {
    state = {
        location_feedbacks: '',
        acc_feedbacks: '',
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
            <React.Fragment>
                <div className={classes.Feedback}>
                    <div onClick={() => this.getDatabase('/location_feedbacks', 'feedbacks')}>Location Feedbacks</div>
                    <div onClick={() => this.getDatabase('/acc_feedbacks', 'feedbacks')}>Accommodation Feedbacks</div>
                </div>
                <FeedbackContainer loggedUser={this.props.loggedUser} url='/location_feedbacks' id=''/>
            </React.Fragment>
        )
    }
}

export default Feedback;
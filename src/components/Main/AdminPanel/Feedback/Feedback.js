import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';
// import FeedbackCL from '../../CurrentLocation/FeedbackCL/FeedbackCL';
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
                {/* <div className={classes.FeedbackCL}>
                    <FeedbackCL loggedUser={this.props.loggedUser}/>
                </div> */}
            </div>
        )
    }
}

export default Feedback;
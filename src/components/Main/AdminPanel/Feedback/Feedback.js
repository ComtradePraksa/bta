import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';
import classes from './Feedback.css';

class Feedback extends Component {
    state = {
        location_feedbacks: '',
        acc_feedbacks: '',
        transportation_feedbacks: ''
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
                <div onClick={() => this.getDatabase('/location_feedbacks', 'location_feedbacks')}>Location Feedbacks</div>
                <div onClick={() => this.getDatabase('/acc_feedbacks', 'acc_feedbacks')}>Accommodation Feedbacks</div>
                <div onClick={() => this.getDatabase('/transportation_feedbacks', 'transportation_feedbacks')}>Transportation Feedbacks</div>
            </div>
        )
    }
}

export default Feedback;
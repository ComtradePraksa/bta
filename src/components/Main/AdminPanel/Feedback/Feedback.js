import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';
import classes from './Feedback.css';

class Feedback extends Component {
    state = {
        location_feedbacks: []
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/location_feedbacks`);
            const location_feedbacks = data.data;
            this.setState({ location_feedbacks });
        })();
    };

    render() {
        return (
            <div className={classes.Feedback}>
                <div>
                    <h2>City feedbacks:</h2>
                    <div>

                    </div>
                </div>
                <div>
                    <h2>Accommodation feedbacks:</h2>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Feedback;
import React, { Component } from 'react';
import {getFromDatabase} from '../../../../apis/btaApi';

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
            <div>
                <div>
                    <h3>City feedbacks:</h3>
                    <div>

                    </div>
                </div>
                <div>
                    <h3>Accommodation feedbacks:</h3>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Feedback;
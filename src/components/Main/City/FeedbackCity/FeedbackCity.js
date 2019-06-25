import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackCity extends Component {

    render(){
        return(
            <FeedbackContainer loggedUser={this.props.loggedUser} url='/location_feedbacks' id={`/location/${this.props.cityId}`}/>
        );
    }
}

export default FeedbackCity;
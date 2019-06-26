import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackCity extends Component {

    render(){
        return(
            <FeedbackContainer cityId = {this.props.cityId} loggedUser={this.props.loggedUser} url='/location_feedbacks' id={`/location/${this.props.cityId}`}/>
        );
    }
}

export default FeedbackCity;
import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackHotel extends Component {

    render(){
        return(
            <FeedbackContainer cityId={this.props.cityId} loggedUser={this.props.loggedUser} url='/acc_feedbacks' id={`/accommodation/${this.props.id}`}/>
        );
    }
}

export default FeedbackHotel;
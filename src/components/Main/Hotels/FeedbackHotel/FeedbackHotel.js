import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackHotel extends Component {

    render(){
        return(
            <FeedbackContainer loggedUser={this.props.loggedUser} url='/acc_feedbacks' id={`/accommodation/${this.props.id}`}/>
        );
    }
}

export default FeedbackHotel;
import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackCL extends Component {

    render(){
        return(
            <FeedbackContainer loggedUser={this.props.loggedUser}  url='/location_feedbacks' id=''/>
        );
    }
}

export default FeedbackCL;
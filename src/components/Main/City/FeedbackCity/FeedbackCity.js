import React, { Component } from 'react';
import FeedbackContainer from '../../FeedbackContainer/FeedbackContainer';

class FeedbackCity extends Component {

    render(){
        return(
<<<<<<< HEAD
            <FeedbackContainer cityId= {this.props.cityId} loggedUser={this.props.loggedUser} url='/location_feedbacks' id={`/location/${this.props.cityId}`}/>
=======
            <FeedbackContainer cityId = {this.props.cityId} loggedUser={this.props.loggedUser} url='/location_feedbacks' id={`/location/${this.props.cityId}`}/>
>>>>>>> 05c4ce2b31efce1cca56c7bcfc15737164cfb325
        );
    }
}

export default FeedbackCity;
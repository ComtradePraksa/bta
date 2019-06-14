import React, { Component } from 'react';
import FeedbackTicket from '../FeedbackTicket/FeedbackTicket';
import { getFromDatabase } from '../../../apis/btaApi';


class FeedbackContainer extends Component {
    state={
        feedbacks:[],
        users:[]
    };
    componentDidMount() {
        (async () => {
            const data = await getFromDatabase('/location_feedbacks');
            const feedback = [];
            data.data.map(fb => (
                feedback.push(fb)
            ));
            this.setState({feedbacks:feedback});
            console.log('FB: '+this.state.feedbacks)
        })();
    }

  render() {
    return (
        <div>
        {this.state.feedbacks.map((fb,index)=>(
            <FeedbackTicket key={index} fb={fb}/>
        ))}

        </div>
    );
  }
}

export default FeedbackContainer;

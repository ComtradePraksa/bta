import React, { Component } from 'react';
import FeedbackTicket from './FeedbackTicket/FeedbackTicket';
import { getFromDatabase, deleteFromDatabase } from '../../../apis/btaApi'
import classes from "./FeedbackContainer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddNewFeedback from "./AddNewFeedback/AddNewFeedback"

class FeedbackContainer extends Component {
    state = {
        feedbacks: [],
        users: [],
        userfeedbacks: [],
        newComentVisible: false
    };

    toggle = () => {
        this.setState({ newComentVisible: !this.state.newComentVisible });
    };

    getDatabase = (url, id) => {
        (async () => {
            const data = await getFromDatabase(`${url}${id}`);
            const feedback = [];
            const userfeedback = [];
            if (data !== undefined) {
                data.data.map(fb => {
                    feedback.push(fb)
                    if (data.user.id === fb.id) {
                        userfeedback.push(fb.id_feedback);
                        this.setState({ userfeedbacks: userfeedback });
                    }
                    return true;
                });
            }
            this.setState({ feedbacks: feedback });
        })();
    };

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.id !== this.props.id ) {
            this.getDatabase(this.props.url, this.props.id);
        }
    };

    componentDidMount() {
        this.getDatabase(this.props.url, this.props.id);
    };
    
    deleteFeedback = (params) => {
        (async () => {
            await deleteFromDatabase(`${this.props.url}`, params);
            this.getDatabase(`${this.props.url}`, this.props.id);
        })();
    };

    render() {

        return (
            <div className={classes.feedbackContainer}>
                <div className={classes.Heading}>Feedbacks</div>
                <div className={classes.sortTicket}></div>
                <div className={classes.ticketsWrapper}>
                    {
                        this.state.feedbacks.slice(-6).reverse().map((fb,index) => (
                            <FeedbackTicket deleteFeedback={this.deleteFeedback} loggedUser={this.props.loggedUser} key={index} fb={fb}/>
                        ))
                    }
                </div>
                {this.props.cityId !==undefined ?
                <div onClick={this.toggle} className={classes.addFeedback}>
                    <FontAwesomeIcon icon="plus" style={{ color: "white" }}/>
                </div> :""}
                {this.state.newComentVisible && <AddNewFeedback getDatabase={this.getDatabase} url={this.props.url} cityId = {this.props.cityId} toggle={this.toggle} id={this.props.id}/>}
            </div>
        );
    }
}

export default FeedbackContainer;
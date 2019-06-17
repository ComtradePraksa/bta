import React,{Component} from 'react';
import classes from "./FeedbackTicket.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FeedbackTicket extends Component {
    
    getStyle = () => {
        const rating = this.props.fb.rating
        switch (true) {
            case (rating <= 3):
                return {
                    backgroundColor: "red",
                    width: this.props.fb.rating * 10 + "%"
                }
            case (rating <= 7):
                return {
                    backgroundColor: "orange",
                    width: this.props.fb.rating * 10 + "%"
                }
            default:
                return {
                    backgroundColor: "green",
                    width: this.props.fb.rating * 10 + "%"
                }
        }
    };

    getType = () => {
        switch (this.props.fb.category) {
            case "culture":
                return {
                    icon:"landmark",
                    color:"#5DBCD2"
                }
            case "transportation":
                return {
                    icon:"bus",
                    color:"#7FBF7F"
                }
            case "food":
                return {
                    icon:"hamburger",
                    color:"#EE82EE"
                }
            case "sightseeing":
                return {
                    icon:"binoculars",
                    color:"#384685"
                }
            case "safety":
                return {
                    icon:"hard-hat",
                    color:"#98615B"
                }
            default:
                return {
                    icon:"map-signs",
                    color:"#ffa500"
                }

        }
    };

    render() {
        return (
            <div className={classes.ticketContainer}>
                <div className={classes.feedbackType}>
                    <FontAwesomeIcon icon="map-marker-alt" style={{marginRight:"10%",color:"#FD6087"}}/>
                    <FontAwesomeIcon icon={this.getType().icon} style={{color:this.getType().color}}/>
                </div>
                {console.log(this.props.fb.photo)}
                <div className={classes.userPicture}><img src={require(`../../../${this.props.fb.photo}`)} alt="cao" /></div>
                <p className={classes.userName}>{this.props.fb.name}</p>
                <p className={classes.feedbackTitle}>{this.props.fb.title}</p>
                <div className={classes.feedbackProgress}>
                    <div className={classes.innerProgress}>
                        <div style={this.getStyle()} className={classes.colorProgress}></div>
                    </div>
                </div>
                <p className={classes.feedbackRaiting}>{this.props.fb.rating}</p>
                <p className={classes.feedbackText}>{this.props.fb.feedback.slice(0, 150)}...</p>
                <div className={classes.numberOfComments}>
                    <div className={classes.numberOfCommentsWrapper}>
                        <p style={{ marginRight: "10px" }}>4</p>
                        <FontAwesomeIcon icon="comment-alt" style={{ color: "lightgray" }} />
                    </div>
                </div>
                <button className={classes.readMore}>READ MORE</button>
            </div>
        );
    }
}

export default FeedbackTicket;

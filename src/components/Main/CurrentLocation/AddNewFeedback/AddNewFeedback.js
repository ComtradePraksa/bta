import React, { Component } from 'react';
import classes from "./AddNewFeedback.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddNewFeedback extends Component {
    state = {
        rate: 0,
        dropdownVisible:false,
        category:""
    }
    getNewValue = (event) => {
        this.setState({ rate: event.target.value })
    }

toggle = ()=>{
    this.setState({dropdownVisible:!this.state.dropdownVisible})
}

    render() {
        console.log(this.state.rate)

        return (
            <div className={classes.newFeedbackWindow}>
                <div className={classes.newFeedbackPopup}>
                    <div className={classes.newFeedbackHeader}>
                        <FontAwesomeIcon icon="times" onClick={this.props.toggle} />
                        <button className={classes.saveFeedback}>SAVE</button>
                    </div>
                    <div className={classes.newFeedbackMain}>
                        <div className={classes.inputTitle}>
                            <input classes={classes.title} type="text" placeholder="Enter Title" />
                        </div>
                        <div className={classes.chooseType}>
                        
                            <div className={classes.dropdownWrapper}>
                                <div className={classes.dropdown} >
                                    <div className={classes.overlay}></div>
                                    <div className={classes.dropdownTileWrapper}>
                                        <input placeholder="Category" readOnly  onClick={this.toggle}/>
                                        <FontAwesomeIcon icon="chevron-down" style={{ color: '#fff' }} />
                                    </div>
                                    {this.state.dropdownVisible && <ul className={classes.dropdownItemList}>
                                        <li className={classes.dropdownItem}>Food</li>                                        
                                        <li className={classes.dropdownItem}>Transportation</li>
                                        <li className={classes.dropdownItem}>Culture</li>
                                        <li className={classes.dropdownItem}>Safety</li>
                                        <li className={classes.dropdownItem}>Sightseeing</li>
                                        <li className={classes.dropdownItem}>Other</li>
                                    </ul> }
                                </div>
                            </div>
                        </div>
                        <div className={classes.feedbackRate}>
                            <div className={classes.title}>
                                Your rate
                        </div>
                            <div className={classes.rateContainer}>
                                <FontAwesomeIcon id="iconmove" style={{ height: "40px", width: "40px", left: `${this.state.rate * 10}%` }} icon="map-marker" />
                                <p style={{ left: `${this.state.rate * 10}%` }} id="text">{this.state.rate}</p>
                                <input type="range" min="0" max="10" step="0.1" onChange={this.getNewValue} value={this.state.rate} />
                            </div>
                        </div>
                        <div className={classes.feedbackField}>
                        <div className={classes.title}>
                        Your feedback
                        </div>
                        <div className={classes.textarea}>
                        <textarea/>
                        </div>
                        </div>
     

                    </div>
                </div>
            </div>
        )
    }
}

export default AddNewFeedback
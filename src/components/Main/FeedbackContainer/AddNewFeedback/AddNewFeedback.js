import React, { Component } from 'react';
import classes from "./AddNewFeedback.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddNewFeedback extends Component {
    state = {
        rate: 0,
        dropdownVisible:false,
        category:'',
        title:'',
        text:''
    };

    getRate = (event) => {
        this.setState({ rate: event.target.value });
    };

    toggle = () => {
        this.setState({ dropdownVisible:!this.state.dropdownVisible });
    };

    getFeedbackValue = (event) => {
        this.setState({ text: event.target.value });
    };

    getCategory = (e) => {
        this.setState({category:e.target.innerText.toLowerCase()});
        this.toggle();
    };

    render() {
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
                                        <input placeholder="Category" className={classes.categoryInput}  readOnly onClick={this.toggle}/>
                                        <FontAwesomeIcon icon="chevron-down" style={{ color: '#gray' }} />
                                    </div>
                                    {this.state.dropdownVisible && <ul className={classes.dropdownItemList}>
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Food</li>                                        
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Transportation</li>
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Culture</li>
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Safety</li>
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Sightseeing</li>
                                        <li className={classes.dropdownItem} onClick={this.getCategory}>Other</li>
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
                                <input type="range" min="0" max="10" step="0.1" onChange={this.getRate} value={this.state.rate} />
                            </div>
                        </div>
                        <div className={classes.feedbackField}>
                        <div className={classes.title}>
                        Your feedback
                        </div>
                        <div className={classes.textarea}>
                        <textarea onChange={this.getFeedbackValue} placeholder="Enter your feedback"/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNewFeedback;
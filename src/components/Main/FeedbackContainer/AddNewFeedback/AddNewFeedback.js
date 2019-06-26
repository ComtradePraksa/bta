import React, { Component } from 'react';
import classes from "./AddNewFeedback.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { stringForDb } from "../FeedbackFunction/FeedbackFunction"


class AddNewFeedback extends Component {
    state = {
        rate: 0,
        dropdownVisible:false,
        category:'',
        title:'',
        text:'',
        placeholder:"Select category..."
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
    getTitle = (event) =>{
        this.setState({title:event.target.value})
    }

    getCategory = (e) => {
        this.setState({category:e.target.innerText.toLowerCase()});
        this.setState({placeholder:e.target.innerText})
        this.toggle();
    };
    getData = () => {
        const commentData = {
            userId: jwt.decode(localStorage.getItem("jwtoken")).id,
            fb: this.state.text,
            dt: stringForDb(),
            cat:this.state.category,
            rate:this.state.rate,
            title:this.state.title,
            cityId:this.props.cityId
        };
        
        axios({
            method: 'post',
            url: `http://localhost:3001${this.props.url}`,
            data: commentData,
            config: { headers: { 'Content-Type': 'application/json' } }
        })
     
    };

    render() {
        return (
            <div className={[classes.newFeedbackWindow, classes.flex, classes.center, classes.fullWidth].join(' ')}>
                <div className={classes.newFeedbackPopup}>
                    <div className={[classes.newFeedbackHeader, classes.flex].join(' ')}>
                        <FontAwesomeIcon icon="times" onClick={this.props.toggle} />
                        <button onClick={this.getData} className={[classes.saveFeedback, classes.pointer].join(' ')}>SAVE</button>
                    </div>
                    <div className={classes.newFeedbackMain}>
                        <div className={[classes.inputTitle, classes.flex].join(' ')}>
                            <input className={[classes.title, classes.flex, classes.fullWidth].join(' ')} onChange={this.getTitle} type="text" placeholder="Enter Title" />
                        </div>
                        <div className={classes.chooseType}>
                        
                            <div className={classes.dropdownWrapper}>
                                <div className={[classes.dropdown, classes.fullWidth].join(' ')} >
                                    <div className={classes.overlay}></div>
                                    <div className={classes.dropdownTileWrapper}>
                                        <input placeholder={this.state.placeholder} className={[classes.categoryInput, classes.pointer].join(' ')}  readOnly onClick={this.toggle}/>
                                        <FontAwesomeIcon icon="chevron-down" style={{ color: '#gray' }} />
                                    </div>
                                    {this.state.dropdownVisible && <ul className={classes.dropdownItemList}>
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Food</li>                                        
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Transportation</li>
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Culture</li>
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Safety</li>
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Sightseeing</li>
                                        <li className={[classes.dropdownItem, classes.flex, classes.center, classes.pointer].join(' ')} onClick={this.getCategory}>Other</li>
                                    </ul> }
                                </div>
                            </div>
                        </div>
                        <div className={[classes.feedbackRate, classes.fullWidth].join(' ')}>
                            <div className={[classes.title, classes.flex].join(' ')}>
                                Your rate
                        </div>
                            <div className={[classes.rateContainer, classes.flex, classes.center].join(' ')}>
                                <FontAwesomeIcon id="iconmove" style={{ height: "40px", width: "40px", left: `${this.state.rate * 10}%` }} icon="map-marker" />
                                <p style={{ left: `${this.state.rate * 10}%` }} id="text">{this.state.rate}</p>
                                <input type="range" min="0" max="10" step="0.1" onChange={this.getRate} value={this.state.rate} className={[classes.fullWidth, classes.pointer].join(' ')}/>
                            </div>
                        </div>
                        <div className={classes.feedbackField}>
                        <div className={[classes.title, classes.flex].join(' ')}>
                        Your feedback
                        </div>
                        <div className={[classes.textarea, classes.flex, classes.center].join(' ')}>
                                <textarea onChange={this.getFeedbackValue} placeholder="Enter your feedback" className={classes.fullWidth}/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNewFeedback;
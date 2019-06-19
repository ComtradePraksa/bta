import React, { Component } from 'react';
import {postToDatabase} from '../../../../apis/btaApi';

class City extends Component {
    state = {
        city_name: '',
        geolocation: '',
        state: ''
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {

        (async () => {
            await postToDatabase('/locations', this.state);
        })();
    };

    render() {
        console.log(this.state);
        return(
            <div>
                <h2>Enter new city for travel</h2>
                <input onBlur={this.inputHandler} type="text" name="city_name" placeholder="Enter city"/>
                <input onBlur={this.inputHandler} type="text" name="state" placeholder="Enter state for city"/>
                <button onClick={this.saveHandler}>Save to database</button>
            </div>
        )
    }
}

export default City;
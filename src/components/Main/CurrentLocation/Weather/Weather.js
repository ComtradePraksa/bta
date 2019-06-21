import React, { Component } from 'react';
import classes from './Weather.css';
import axios from 'axios';
import {removeAuthHeader} from '../../../../apis/removeAuthHeader';

class Weather extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
            axios.get(`http://api.apixu.com/v1/forecast.json?key=937e493fb43842b4a90103252191706&q=${this.props.latitude},${this.props.longitude}`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                })
        }
    };

    render() {
        let weather = '';
        if (this.state.weatherData !== "") {
            let imgLink = this.state.weatherData.current.condition.icon.substring(2).replace('64x64', '128x128');
            weather = <div className={classes.Weather}>
            <div>{this.state.weatherData.location.name},</div>
            <div>{this.state.weatherData.current.condition.text}</div>
            <div><img src={`http://${imgLink}`} alt={this.state.userName} /></div>  
            <div> {Math.round(this.state.weatherData.current.temp_c) + ' ‎°C'}</div>  
            </div>
        }
        return (
            <React.Fragment>{weather}</React.Fragment>
        );
    }
}

export default Weather;
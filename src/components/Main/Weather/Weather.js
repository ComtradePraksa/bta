import React, { Component } from 'react';
import classes from './Weather.css';
import axios from 'axios';

class Weather extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
            function removeAuthHeader() {
                let options = {
                    transformRequest: [function (data, headers) {
                        delete headers.common.Authorization;
                        return data;
                    }]
                };
                return options;
            };
    
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.latitude}&lon=${this.props.longitude}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                })
        }
    };

    render() {
        let weather = '';
        if (this.state.weatherData !== "") {
            weather = <div className={classes.Weather}>{this.state.weatherData.weather[0].main}
                <img src={`http://openweathermap.org/img/w/${this.state.weatherData.weather[0].icon}.png`} alt={this.state.userName} />
                {Math.round(this.state.weatherData.main["temp"])}</div>
        }
        return (
            <React.Fragment>{weather}</React.Fragment>
        );
    }
}

export default Weather;
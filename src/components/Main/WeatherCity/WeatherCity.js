import React, { Component } from 'react';
import classes from './WeatherCity.css';
import axios from 'axios';

class WeatherCity extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.city !== this.props.city) {
            function removeAuthHeader() {
                let options = {
                    transformRequest: [function (data, headers) {
                        delete headers.common.Authorization;
                        return data;
                    }]
                };
                return options;
            };
            let city = this.props.city.toLowerCase();
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                })
        }
    };

    render() {
        let weather = '';
        if (this.state.weatherData !== "") {
            weather = <div className={classes.WeatherCity}>{this.state.weatherData.weather[0].main}
                <img src={`http://openweathermap.org/img/w/${this.state.weatherData.weather[0].icon}.png`} alt={this.state.userName} />
                {Math.round(this.state.weatherData.main["temp"])}</div>
        }
        return (
            <React.Fragment>{weather}</React.Fragment>
        );
    }
}

export default WeatherCity;
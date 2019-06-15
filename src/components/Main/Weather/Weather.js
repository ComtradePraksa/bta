import React, { Component } from 'react';
//import { getWeather } from '../../../apis/weatherApi';
//import classes from './Weather.css';
import axios from 'axios';

class Weather extends Component {
    state = {
        weather: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude) {
            function removeAuthHeader() {
                let options = {
                  transformRequest: [function (data, headers) {
                    delete headers.common.Authorization;
                    return data;
                    }]
                  }
                  return options;
              }
            // (async () => {
            //     const weather = await getWeather(this.props.latitude, this.props.longitude);
            //     this.setState({ weather: weather });
            // })();
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.props.latitude}&lon=${this.props.longitude}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, removeAuthHeader())
            .then(res => {
               let weatherData = res.data;
               this.setState({ weather: weatherData });
            })
        }
    }

    render() {
        let weather = '';
        if (this.state.weather !== "") {
            weather = <div>{this.state.weather.weather[0].main}
                <img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt={this.state.userName} />
                {Math.round(this.state.weather.main["temp"])}</div>
        }
        return (
            <React.Fragment>{weather}</React.Fragment>
        );
    }
}

export default Weather;
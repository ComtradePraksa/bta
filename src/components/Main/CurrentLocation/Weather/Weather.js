import React, { Component } from 'react';
import classes from './Weather.css';
import axios from 'axios';
<<<<<<< HEAD
=======
import {removeAuthHeader} from '../../../../apis/removeAuthHeader';
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0

class Weather extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
<<<<<<< HEAD
            function removeAuthHeader() {
                let options = {
                    transformRequest: [function (data, headers) {
                        delete headers.common.Authorization;
                        return data;
                    }]
                };
                return options;
            };

=======
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0
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
            weather = <div className={classes.Weather}>{this.state.weatherData.location.name},&nbsp;{this.state.weatherData.current.condition.text}
                <img src={`http://${imgLink}`} alt={this.state.userName} />
                {Math.round(this.state.weatherData.current.temp_c) + ' ‎°C'}</div>
        }
        return (
            <React.Fragment>{weather}</React.Fragment>
        );
    }
}

export default Weather;
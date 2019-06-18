import React, { Component } from 'react';
import classes from './WeatherCity.css';
<<<<<<< HEAD
import axios from 'axios';
=======
import {removeAuthHeader} from '../../../../apis/removeAuthHeader'
import axios from 'axios'
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0

class WeatherCity extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
<<<<<<< HEAD
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
            axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                })
               
        }
    };

    componentDidMount() {
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
            axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                })       
=======
       if (prevProps.city !== this.props.city) {
        let city = this.props.city.toLowerCase();
        axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
        .then(res => {
            const weatherData = res.data;
            this.setState({ weatherData });
        })
       }
    };

    componentDidMount() {
               let city = this.props.city.toLowerCase();
               axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
               .then(res => {
                   const weatherData = res.data;
                   this.setState({ weatherData });
               })       
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0
    };

    render() {
        let weather = '';
<<<<<<< HEAD
        if (this.state.weatherData !== "") {
=======
        if (this.state.weatherData !== '') {
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0
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

export default WeatherCity;
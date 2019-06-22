import React, { Component } from 'react';
import classes from './WeatherCity.css';
import { removeAuthHeader } from '../../../../apis/removeAuthHeader'
import axios from 'axios';


class WeatherCity extends Component {
    state = {
        weatherData: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.city.city !== this.props.city.city) {
            let city = this.props.city.city.toLowerCase();
            axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
                .then(res => {
                    const weatherData = res.data;
                    this.setState({ weatherData });
                });
        }
    };

    componentDidMount() {
        let city = this.props.city.city.toLowerCase();
        axios.get(`http://api.apixu.com/v1/current.json?key=937e493fb43842b4a90103252191706&q=${city}`, removeAuthHeader())
            .then(res => {
                const weatherData = res.data;
                this.setState({ weatherData });
            });
    };

    render() {
        let weather = '';
        if (this.state.weatherData !== '') {
            let imgLink = this.state.weatherData.current.condition.icon.substring(2).replace('64x64', '128x128');
            weather = <div className={classes.WeatherCity}>
                        <div>{this.state.weatherData.location.name},</div>
                        <div>{this.state.weatherData.current.condition.text}</div>
                        <div><img src={`http://${imgLink}`} alt={this.state.userName} /></div>
                        <div> {Math.round(this.state.weatherData.current.temp_c) + ' ‎°C'}</div>
                    </div>;
        }
        return (<React.Fragment>{weather}</React.Fragment>);
    }
}

export default WeatherCity;
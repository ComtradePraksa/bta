import React, { Component } from 'react';
import { getWeather } from '../../../apis/weatherApi';
import Map from './Map/HereMap';
//import classes from './Weather.css';

class Weather extends Component {
    state = {
        weather: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.latitude !== this.props.latitude) {
            (async () => {
                const weather = await getWeather(this.props.latitude, this.props.longitude);
                this.setState({ weather: weather });
            })();
        }
    };

    render() {
        let view = ''
        if (this.state.weather !== "") {
            view = <div>{this.state.weather.weather[0].main}
                <img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt={this.state.userName} />
                {Math.round(this.state.weather.main.temp)}<Map latitudeFromWeather={this.props.latitude} longitudeFromWeather={this.props.longitude} /></div>
        }
        return (
            <React.Fragment>{view}</React.Fragment>
        );
    }
}

export default Weather;
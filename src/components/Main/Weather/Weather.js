import React, { Component } from 'react';
import { getCLWeather } from '../../../apis/weatherApi';
//import classes from './Weather.css';

class Weather extends Component {
    state = {
        location: '',
        weather: ''
    }
    
    componentDidMount() {
        (async () => {
           const weather = await getCLWeather();
           this.setState( {weather:weather} );
        })();
    };

    render() {
        // let temp, icon, type;
        // if (this.state.weather !== '') {
        //     temp = Math.round(this.state.weather.main.temp);
        //     icon = this.state.weather.weather[0].icon;
        //     type = this.state.weather.weather[0].main;
        // }
        // return (
        //     <div>{type}<img src={`http://openweathermap.org/img/w/${icon}.png`} alt={this.state.userName} />{temp}</div>
        // );
        let view = ''
        if(this.state.weather!==""){
            view = <div>{this.state.weather.weather[0].main}<img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt={this.state.userName} />{Math.round(this.state.weather.main.temp)}</div>
        }
        return (
            <React.Fragment>{view}</React.Fragment>
        );
    }
}

export default Weather;

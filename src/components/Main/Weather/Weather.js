import React, { Component } from 'react';
import { getCLWeather } from '../../../apis/weatherApi';
//import classes from './Main.css';

class Weather extends Component {
    state ={
        location:'',
        weather:''
    }
    componentDidMount() {
        (async () => {
           const weather = await getCLWeather();
           console.log(weather);
           this.setState({weather:weather})
        })();
    };
    render() {
        if(this.state.weather!==""){
            var temp = Math.round(this.state.weather.main.temp);
            var icon = this.state.weather.weather[0].icon;
            var type = this.state.weather.weather[0].main;
        }
        return (
            <div>{type}<img src={`http://openweathermap.org/img/w/${icon}.png`} alt={this.state.userName} />{temp}</div>
        );
    }
}

export default Weather;
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
           this.setState({weather:weather})
        })();
    };
    render() {
        let view = ''
        if(this.state.weather!==""){
            view = <div>{this.state.weather.weather[0].main}<img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt='icon' />{Math.round(this.state.weather.main.temp)}</div>
        }
        return (
            <React.Fragment>{view}</React.Fragment>
        );
    }
}

export default Weather;
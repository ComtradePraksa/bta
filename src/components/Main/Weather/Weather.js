import React, { Component } from 'react';
import axios from 'axios';
//import classes from './Main.css';

class Weather extends Component {
    state ={
        location:'',
        weather:'',
    }
    
    componentDidMount() {
        const location = {};

        navigator.geolocation.getCurrentPosition(function (position){
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            location['latitude'] = latitude;
            location['longitude'] = longitude;
        });

        console.log(location['latitude']);
        const headers = { 'Content-Type': 'application/json' };
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, { headers })
        .then( res => {
            const data = res.data;
            this.setState({weather:data});
        });
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
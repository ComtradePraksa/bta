import React, { Component } from 'react';
import { getCLWeather, asyncGetCurrentPosition } from '../../../apis/weatherApi';
import Map from './Map/HereMap'
//import classes from './Weather.css';

class Weather extends Component {
    state = {
        weather: '',
        latitude: '',
        longitude: ''
    }

    componentDidMount() {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000
        };
        (async () => {
            let {coords: {latitude, longitude}} = await asyncGetCurrentPosition(options);
            this.setState({latitude, longitude});
           const weather = await getCLWeather(this.state.latitude, this.state.longitude);
           this.setState( {weather:weather} );
        })();
    };

    render() {
        // let temp, icon, type, lat, lng;
        // if (this.state.weather !== '') {
        //     temp = Math.round(this.state.weather.main.temp);
        //     icon = this.state.weather.weather[0].icon;
        //     type = this.state.weather.weather[0].main;
        //     lat = this.state.weather.coord.lat;
        //     lng = this.state.weather.coord.lon;
        // }
        // return (
        //     <div>{type}<img src={`http://openweathermap.org/img/w/${icon}.png`} alt={this.state.userName} />{temp}<Map lat={lat} lng={lng}/></div>
        // );
        let view = ''
        if(this.state.weather!==""){
            view = <div>{this.state.weather.weather[0].main}
                    <img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt={this.state.userName} />
                    {Math.round(this.state.weather.main.temp)}<Map lat={this.state.latitude} lng={this.state.longitude}/></div>
        }
        return (
            <React.Fragment>{view}</React.Fragment>
        );
    }
}

export default Weather;

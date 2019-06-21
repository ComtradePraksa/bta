import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'
import MapCity from './MapCity/MapCity';
import HotelsCity from './HotelsCity/HotelsCity';

class City extends Component {

    render() {     
        return (<div>
                <WeatherCity city={this.props.city}/>
                <MapCity city={this.props.city}/>
                <HotelsCity city={this.props.city}/>
                </div>
        );
    }
}

export default City;
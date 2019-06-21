import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'
import MapCity from './MapCity/MapCity';
import HotelsCity from './HotelsCity/HotelsCity';

class City extends Component {

    render() {     
        return (<React.Fragment>
                <WeatherCity city={this.props.city}/>
                <MapCity city={this.props.city}/>
                <HotelsCity city={this.props.city}/>
                </React.Fragment>
        );
    }
}

export default City;
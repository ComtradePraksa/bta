import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'

class City extends Component {
 
    render() {
       
        return (<React.Fragment>
                <WeatherCity city={this.props.city}/>
                </React.Fragment>
        );
    }
}

export default City;
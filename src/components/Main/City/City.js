import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'
import MapCity from './MapCity/MapCity';
import HotelsCity from './HotelsCity/HotelsCity';

class City extends Component {
    state ={
        hotelsInfo:[],
    }
    getHotelsInfo=(hotelsInfo)=>{
        this.setState({hotelsInfo})
        console.log(hotelsInfo)
    }
    render() {     
        return (<React.Fragment>
                <WeatherCity city={this.props.city}/>
                <MapCity hotelsInfo={this.state.hotelsInfo} city={this.props.city}/>
                <HotelsCity getHotelsInfo={this.getHotelsInfo} city={this.props.city}/>
                </React.Fragment>
        );
    }
}

export default City;
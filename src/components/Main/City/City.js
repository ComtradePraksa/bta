import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'
import MapCity from './MapCity/MapCity';
import HotelsCity from './HotelsCity/HotelsCity';
import axios from 'axios';
import classes from './City.css';

class City extends Component {
    state = {
        hotelsInfo: [],
        location: []
    }
    getHotelsInfo = (hotelsInfo) => {
        this.setState({ hotelsInfo })
    }

    locationInfo = (hotelName, image) => {

        axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=${this.props.city.latlon}&q=${hotelName}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw`)
            .then(res => {
                const info = res.data.results.items[0];
                if (info !== undefined) {
                    this.setState(state => { const location = state.location.concat({ position: info.position, icon: image }); return { location }; });
                }
            })
    }
    createLocation = () => {
        this.setState({ location: [] })
        this.state.hotelsInfo.map(e => (this.setState(state => { state.location.concat(this.locationInfo(e.name, e.image)) })))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hotelsInfo !== this.state.hotelsInfo) {

            this.createLocation()
        }
    };

    render() {
        return (
            <div className={classes.CityWrapper}>
            <HotelsCity getHotelsInfo={this.getHotelsInfo} city={this.props.city} className={classes.HotelsCity} />
            <WeatherCity city={this.props.city} className={classes.WeatherCity} />
            <MapCity location={this.state.location} city={this.props.city} className={classes.MapCity}/>
            </div>
        );
    }
}

export default City;
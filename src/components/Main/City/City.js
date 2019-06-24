import React, { Component } from 'react';
import WeatherCity from './WeatherCity/WeatherCity'
import MapCity from './MapCity/MapCity';
import HotelsCity from './HotelsCity/HotelsCity';
import CityLife from './CityLife/CityLife';
import axios from 'axios';
import classes from './City.css';

class City extends Component {
    _isMounted = false;
    state = {
        hotelsInfo: [],
        location: []
    };
    
    getHotelsInfo = (hotelsInfo) => {
        if (this._isMounted) {
            this.setState({ hotelsInfo });
        }
    };

    locationInfo = (hotelName, image) => {
        axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=${this.props.city.latlon}&q=${hotelName}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw`)
            .then(res => {
                if (this._isMounted) {
                    const info = res.data.results.items[0];
                    if (info !== undefined) {
                        this.setState(state => { const location = state.location.concat({ position: info.position, icon: image }); return { location }; });
                    }
                }
            });
    };

    createLocation = () => {
        if (this._isMounted) {
            this.setState({ location: [] });
            this.state.hotelsInfo.map(e => (this.setState(state => { state.location.concat(this.locationInfo(e.name, e.image)); })));
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hotelsInfo !== this.state.hotelsInfo) {
            this.createLocation();
        }
    };

    componentDidMount() {
        this._isMounted= true;
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        return (
            <div className={classes.City}>
                {this.props.city === undefined ? <div></div> : <div className={classes.CityWrapper}>
                <HotelsCity getHotelsInfo={this.getHotelsInfo} city={this.props.city} className={classes.HotelsCity}/>
                <WeatherCity city={this.props.city} className={classes.WeatherCity}/>
                <MapCity location={this.state.location} city={this.props.city} className={classes.MapCity}/></div>}
                <CityLife />
            </div>
        );
    }
}

export default City;
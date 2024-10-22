import React, { Component } from 'react';
import Weather from './Weather/Weather';
import Map from './Map/Map'
import NearbyWrapper from './NearbyWrapper/NearbyWrapper';
import classes from './CurrentLocation.css';
import FeedbackCL from './FeedbackCL/FeedbackCL';

class CurrentLocation extends Component {
    state = {
        location: 'Dortmund',
        value: '0,0',
        latitude: '',
        longitude: '',
        error: null,
        nearbyPlaces: ''
    };

    asyncGetCurrentPosition = options => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    getNearbyPlaces = (nearbyPlaces) => {
        this.setState({ nearbyPlaces });
    };

    componentDidMount() {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000
        };

        (async () => {
            let { coords: { latitude, longitude } } = await this.asyncGetCurrentPosition(options);
            const value = `${latitude},${longitude}`;
            this.setState({ value, latitude, longitude });
        })();
    };

    render() {
        return (
        <React.Fragment>
            <div className={classes.CurrentLocationWrapper}>
                <Weather latitude={this.state.latitude} longitude={this.state.longitude}/>
                <NearbyWrapper location={this.state.value} getNearbyPlaces={this.getNearbyPlaces}/>
                <Map latitude={this.state.latitude} longitude={this.state.longitude} nearbyPlaces={this.state.nearbyPlaces}/>
            </div>
            <FeedbackCL loggedUser={this.props.loggedUser}/>
        </React.Fragment>
        );
    }
}

export default CurrentLocation;
import React, { Component } from 'react';
import classes from './Map.css';
import map from '../../../../apis/mapsApi'

class Map extends Component {
    state = {
        platform: null,
        map: null
    };
    componentDidUpdate(prevProps) {
        if (this.props.nearbyPlaces !== prevProps.nearbyPlaces) {
           map(this.props.latitude,this.props.longitude,this.props.nearbyPlaces);
        }
    };

    render() {
        return (
            <div className={classes.Map} id="here-map" style={{ width: '30vw', height: '30vw', background: 'grey' }} />
        );
    }
}

export default Map;
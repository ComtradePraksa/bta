import React, { Component } from 'react';
import classes from './Map.css';
import map from '../../../../apis/mapsApi'

class Map extends Component {
    state = {
        platform: null,
        map: null
    };

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.longitude && this.props.longitude !== prevProps.longitude) {
           map(this.props.latitude,this.props.longitude);
        }
    };

    render() {
        return (
            <div className={classes.Map} id="here-map" />
        );
    }
}

export default Map;
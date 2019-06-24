import React, { Component } from 'react';
import classes from './MapCity.css';
import map from '../../../../apis/mapsApi'

class MapCity extends Component {
    
    renderMap = async () => {
        document.getElementById('here-map').innerHTML = "";
        let index = this.props.city.latlon.indexOf(',');
        let cityLat = Number(this.props.city.latlon.substr(0, index));
        let cityLon = Number(this.props.city.latlon.substr(index + 1));
        map(cityLat, cityLon, this.props.location);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.renderMap();
        }
    };

    componentDidMount() {
        this.renderMap();
    };

    render() {
        return (<div className={classes.MapCity} id="here-map"> </div>);
    }
}

export default MapCity;
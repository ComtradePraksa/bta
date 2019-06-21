import React, { Component } from 'react';
import classes from './MapCity.css';
import axios from 'axios';
import { removeAuthHeader } from '../../../../apis/removeAuthHeader';
import map from '../../../../apis/mapsApi'

class MapCity extends Component {
    state = {
        location:[]
    };

    renderMap = () => {
            document.getElementById('here-map').innerHTML = "";
        this.props.hotelsInfo.map(e=>this.locationInfo(e.name))
        map(51.5079705, 7.4002231);
    };

    locationInfo =(hotelName) =>{
        axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=51.5079705,7.4002231,12&q=${hotelName}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw`)
        .then(res=>{
            const info = res.data.results.items[0];
            if(info!==undefined){
            console.log(info.position)
            }
        })
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.hotelsInfo!== this.props.hotelsInfo) {
            this.props.hotelsInfo.map(e=>this.locationInfo(e))
            
            this.renderMap();
        }
    };

    render() {
        return ( <div className={classes.Map} id="here-map" style={{ background: 'grey' }}> </div>);
    }
}

export default MapCity;
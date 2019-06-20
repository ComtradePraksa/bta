import React, { Component } from 'react';
import classes from './MapCity.css';
import axios from 'axios';
import {removeAuthHeader} from '../../../../apis/removeAuthHeader';
import map from '../../../../apis/mapsApi'

class MapCity extends Component {
    state = {
        view: <div className={classes.Map} id="here-map" style={{background: 'grey' }}> </div>
    };
    
    componentDidUpdate(prevProps) {
       if(prevProps.city!==this.props.city){
            this.setState({view:<div> </div>})
            axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=${this.props.city}&app_id=bIV674hGvmDcJyBxVMjW&app_code=pZnLTja-QcfDIq6mwL63og&gen=8`, removeAuthHeader())
            .then(res => {
                this.setState({view:<div className={classes.Map} id="here-map" style={{ width: '30vw', height: '30vw', background: 'grey'}}></div>});
                const locationData = res.data;
                map(locationData.Response.View[0].Result[0].Location.DisplayPosition.Latitude,locationData.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
            })         
       }
    };

    componentDidMount() {
        axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=${this.props.city}&app_id=bIV674hGvmDcJyBxVMjW&app_code=pZnLTja-QcfDIq6mwL63og&gen=8`, removeAuthHeader())
        .then(res => {
            const locationData = res.data;
            map(locationData.Response.View[0].Result[0].Location.DisplayPosition.Latitude, locationData.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
        })       
    };

    render() {
        return (
            <React.Fragment>{this.state.view}</React.Fragment>
        );
    }
}

export default MapCity;
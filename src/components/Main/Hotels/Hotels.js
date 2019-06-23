import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from '../Hotels/Hotels.css';
import axios from 'axios'
import map from '../../../apis/mapsApi'

class Hotels extends Component {
    state = {
        hotel: {}
    };

    locationInfo = () => {
        axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=0,0&q=${this.state.hotel.name}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw`)
            .then(res => {
                const position = res.data.results.items[0].position;
                map(position[0], position[1], undefined);
            });
    };
    renderMap = async () => {
        
    };


    componentDidMount() {
        (async () => {
            const res = await getFromDatabase(`/accommodations/${this.props.match.params.id}`);
            const hotel = res.data[0]
            this.setState({ hotel });
            this.locationInfo()
        })();
    };

    render() {
        return (<React.Fragment>
            <div className={classes.HotelWrapper}>
                <h3>{this.state.hotel.name}</h3>
                <p>{this.state.hotel.hotel_descr}</p>
                <div><img src={`${this.state.hotel.hotel_img}`} alt={this.state.hotel.image} /></div>
                <a href={`${this.state.hotel.link}`} target="_blank">{`${this.state.hotel.link}`}</a>
                
            </div>
            <div className={classes.MapCity} id="here-map"> </div>
            </React.Fragment>
        );
    }
}

export default Hotels;
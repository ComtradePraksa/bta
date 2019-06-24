import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from '../Hotels/Hotels.css';
import axios from 'axios'
import map from '../../../apis/mapsApi'

class Hotels extends Component {
    _isMounted = false;
    state = {
        hotel: {},
        phone: '/',
        email: '/',
        address: ' '
    };

    locationInfo = () => {
        axios.get(`https://places.cit.api.here.com/places/v1/discover/search?at=0,0&q=${this.state.hotel.name}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw`)
            .then(res => {
                const position = res.data.results.items[0].position;
                map(position[0], position[1], undefined);
                axios.get(`${res.data.results.items[0].href}`)
                .then(res => {
                    if (this._isMounted) {
                        if (res.data.contacts.phone !==undefined) {
                            const phone = res.data.contacts.phone[0].value;
                            this.setState({phone});
                        }
                        if (res.data.contacts.email !==undefined) {
                            const email = res.data.contacts.email[0].value;
                            this.setState({email});
                        }    
                    const address = res.data.location.address.text.replace(/<br\/>/g,' ');
                    this.setState({address});
                    }
                })
            });
    };
   
    componentDidMount() {
        this._isMounted=true;
        if (this._isMounted) {
            (async () => {
                const res = await getFromDatabase(`/accommodations/${this.props.match.params.id}`);
                const hotel = res.data[0];
                this.setState({ hotel });
                this.locationInfo();
            })();
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        return (
            <React.Fragment>
                <div className={classes.HotelWrapper}>
                    <h3>{this.state.hotel.name}</h3>
                    <p>{this.state.hotel.hotel_descr}</p>
                    <div><img src={`${this.state.hotel.hotel_img}`} alt={this.state.hotel.image}/></div>
                    <a href={`${this.state.hotel.link}`} target="_blank">{`${this.state.hotel.link}`}</a>
                </div>
                <div className={classes.MapCity} id="here-map"></div>
                <div>Adress: {this.state.address}</div>
                <div>Phone: {this.state.phone}</div>
                <div>Email: {this.state.email}</div>
            </React.Fragment>
        );
    }
}

export default Hotels;
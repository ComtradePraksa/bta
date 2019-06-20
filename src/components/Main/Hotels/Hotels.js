import React, { Component } from 'react';
import {removeAuthHeader} from '../../../apis/removeAuthHeader';
import {getFromDatabase} from '../../../apis/btaApi';
import {getHotel} from '../../../apis/hotelScrapersApi'
import classes from '../Hotels/Hotels.css';

class Hotels extends Component{
    state = {
        hotel: {}
    };

    componentDidMount() {
        (async () => {
            const hotelLink = await getFromDatabase('/accommodations/2');
            const res = await getHotel(hotelLink.data.link, removeAuthHeader())
                const hotel = res.page.meta_tags;
                this.setState({ hotel });
            })();
    };

    render(){
        return(
            <div className = {classes.HotelWrapper}>
                <h3>{this.state.hotel['og:title']}</h3>
                <p>{this.state.hotel['og:description']}</p>
                <div><img src = {`${this.state.hotel['og:image']}`} alt = {this.state.hotel.image} /></div>
                <a href = {`${this.state.hotel['og:url']}`} target = "_blank">{`${this.state.hotel['og:url']}`}</a>
            </div>
        );
    }
}

export default Hotels;
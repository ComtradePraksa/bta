import React, { Component } from 'react';
import classes from './HotelCity.css';
import { getHotel } from '../../../../../apis/hotelScrapersApi';
import {removeAuthHeader} from '../../../../../apis/removeAuthHeader';


class HotelsCity extends Component {
    state = {
        hotel:{}
      };

 
        componentDidMount(){
            (async()=>{
                const res = await getHotel(this.props.hotelLink,removeAuthHeader())
                const hotel = res.page.meta_tags
                this.setState(hotel)
                console.log(hotel)
            })();
        }
        
    render() {
       
       return(
        <div className={classes.Nearby}>
        <img src = {`${this.state.hotel['og:image']}`} alt = {this.state.hotel.image} />
        <h3>{this.state.hotel['og:title']}</h3>
        <p>{this.state.hotel['og:description']}</p>
        <p className={classes.address}></p>
    </div>
       )
    }
}

export default HotelsCity;
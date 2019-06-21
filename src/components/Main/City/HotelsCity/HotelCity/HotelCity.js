import React, { Component } from 'react';
import classes from './HotelCity.css';

class HotelsCity extends Component {
   
    render() {

        return (
            <div className={classes.Nearby}>
                        <img src={`${this.props.hotel.hotel_img}`} alt={this.props.hotel.image} />
                        <h3>{this.props.hotel.name}</h3>
                        <p>{this.props.hotel.hotel_descr}</p>
                        <p className={classes.address}></p>
                    </div>
        )
    }
}

export default HotelsCity;
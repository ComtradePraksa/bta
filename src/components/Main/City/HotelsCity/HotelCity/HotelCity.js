import React from 'react';
import classes from './HotelCity.css';

const HotelCity = props => {
    return (
        <div className={classes.Nearby}>
            <img src={`${props.hotel.hotel_img}`} alt={props.hotel.image}/>
            <h3>{props.hotel.name}</h3>
            <p>{props.hotel.hotel_descr}</p>
            <p className={classes.address}></p>
        </div>
    )
};

export default HotelCity;
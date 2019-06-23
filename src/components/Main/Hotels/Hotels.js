import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from '../Hotels/Hotels.css';

class Hotels extends Component {
    state = {
        hotel: {}
    };

    componentDidMount() {
        (async () => {
            const res = await getFromDatabase(`/accommodations/${this.props.match.params.id}`);
            const hotel = res.data[0]
            this.setState({ hotel });
        })();
    };

    render() {
        return (
            <div className={classes.HotelWrapper}>
                <h3>{this.state.hotel.name}</h3>
                <p>{this.state.hotel.hotel_descr}</p>
                <div><img src={`${this.state.hotel.hotel_img}`} alt={this.state.hotel.image} /></div>
                <a href={`${this.state.hotel.link}`} target="_blank">{`${this.state.hotel.link}`}</a>
            </div>
        );
    }
}

export default Hotels;
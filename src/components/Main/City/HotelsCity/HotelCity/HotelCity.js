import React, { Component } from 'react';
import classes from './HotelCity.css';
import { getHotel } from '../../../../../apis/hotelScrapersApi';
import { removeAuthHeader } from '../../../../../apis/removeAuthHeader';


class HotelsCity extends Component {
    state = { view: <div></div> }
    renderHotel = () => {
        (async () => {
            const res = await getHotel(this.props.hotelLink, removeAuthHeader())
            const hotel = res.page.meta_tags
            console.log(hotel['og:title'])
            this.setState({
                view:
                    <div className={classes.Nearby}>
                        <img src={`${hotel['og:image']}`} alt={hotel.image} />
                        <h3>{hotel['og:title']}</h3>
                        <p>{hotel['og:description']}</p>
                        <p className={classes.address}></p>
                    </div>
            })
        })();

    }

    componentDidMount() {
        this.renderHotel()
    }

    render() {

        return (
            <React.Fragment>{this.state.view}</React.Fragment>
        )
    }
}

export default HotelsCity;
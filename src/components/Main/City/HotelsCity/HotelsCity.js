import React, { Component } from 'react';
//import classes from './HotelsCity.css';
import { getFromDatabase } from '../../../../apis/btaApi';
import HotelCity from './HotelCity/HotelCity';
import classes from './HotelsCity.css';

class HotelsCity extends Component {
    state = {
        hotels: []
    };

    getHotelLinkS = () => {
        (async () => {
            const res = await getFromDatabase(`/accommodations/id_city/${this.props.city.id}`);
            const hotelsByCityId = res.data;
            const hotels = [];
            const hotelsInfo = [];
            hotelsByCityId.map(e => (hotels.push({ name: e.name, hotel_descr: e.hotel_descr, hotel_img: e.hotel_img })));
            hotelsByCityId.map(e => (hotelsInfo.push({ name: e.name, image: e.hotel_img })));
            this.setState({ hotels });
            this.props.getHotelsInfo(hotelsInfo);
        })();
    };

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.getHotelLinkS();
        }
    };

    componentDidMount() {
        this.getHotelLinkS();
    };

    render() {
        const view = this.state.hotels.slice(0, 5).map((e, index) => <HotelCity key={index} hotel={e} />)

        return (
            <div className = {classes.HotelsCity}>{view}</div>
        )
    }
}

export default HotelsCity;
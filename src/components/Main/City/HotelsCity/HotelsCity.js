import React, { Component } from 'react';
//import classes from './HotelsCity.css';
import { getFromDatabase } from '../../../../apis/btaApi';
import HotelCity from './HotelCity/HotelCity'

class HotelsCity extends Component {
    state = {
        hotels:[]
    };

    getHotelLinkS = () => {
        (async () => {
            const res = await getFromDatabase(`/accommodations/id_city/${this.props.city.id}`)
            const hotelsByCityId = res.data;
            const hotels=[];
            hotelsByCityId.map(e => hotels.push({name:e.name,hotel_descr:e.hotel_descr,hotel_img:e.hotel_img}));
            this.setState({ hotels });
        })();
    }

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.getHotelLinkS();
        }
    };

    componentDidMount() {
        this.getHotelLinkS();
    }

    render() {
        const view = this.state.hotels.slice(0, 5).map((e, index) => <HotelCity key={index} hotel={e} />)

        return (
            <React.Fragment>{view}</React.Fragment>
        )
    }
}

export default HotelsCity;
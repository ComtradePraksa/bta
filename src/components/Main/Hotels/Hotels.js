import React, { Component } from 'react';
import axios from 'axios';
import {getFromDatabase} from '../../../apis/btaApi'
import classes from '../Hotels/Hotels.css'

class Hotels extends Component{

    state = {
        hotel: {}
    }

    componentDidMount(){
        function removeAuthHeader() {
            let options = {
                transformRequest: [function (data, headers) {
                    delete headers.common.Authorization;
                    return data;
                }]
            };
            return options;
        };
        (async () => {
            const hotel = await getFromDatabase('/accomodations/2');
            axios.get(`http://scrappet.herokuapp.com/api/scrape?url=${hotel.data.link}`,removeAuthHeader())
            .then(res => {
                const hotel = res.data.page.meta_tags;
                this.setState({
                    hotel
                })
            })
        })();
        
    }

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
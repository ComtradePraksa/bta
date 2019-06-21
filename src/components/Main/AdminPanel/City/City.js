import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import axios from 'axios';
import {removeAuthHeader} from '../../../../apis/removeAuthHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class City extends Component {
    state = {
        city_name: '',
        state: '',
        city_lat_lon: '',
        locations: []
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, name: city.city_name, state: city.state})
            ));
            this.setState({ locations });
        })();
    };

    getGeolocation = () => {
        if (this.state.city_name !== '') {
            axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw&searchtext=${this.state.city_name}`, removeAuthHeader())
            .then(res => {
                const data = res.data['Response']['View'][0]['Result'][0]['Location']['NavigationPosition'][0];
                const city_lat_lon = `${data['Latitude']},${data['Longitude']}`;
                this.setState({city_lat_lon});
            });
        }
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        this.getGeolocation();

        const newCity = {
            city_name: this.state.city_name,
            state: this.state.state,
            city_lat_lon: this.state.city_lat_lon
        };
        
        (async () => {
            await postToDatabase('/locations', newCity);
            this.getDatabase();
        })();
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/locations', id);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        this.getDatabase();
    };

    render() {
        const locations = this.state.locations.map(city => {
            return (
                <div key={city.id}>
                    {city.id}. {city.name} - state: {city.state}
                    <span onClick={() => this.deleteHandler(city.id)}>
                        <FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                </div>
            )
        });

        return(
            <div>
                <h2>Enter new city for travel</h2>
                <div>
                    <input onBlur={this.inputHandler} type="text" name="city_name" placeholder="Enter city"/>
                    <input onBlur={this.inputHandler} type="text" name="state" placeholder="Enter state for city"/>
                </div>
                <button onClick={this.saveHandler}>Save to database</button>
                <div>
                    {locations}
                </div>
            </div>
        )
    }
}

export default City;
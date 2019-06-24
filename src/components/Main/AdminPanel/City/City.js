import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import axios from 'axios';
import {removeAuthHeader} from '../../../../apis/removeAuthHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './City.css';

class City extends Component {
    _isMounted = false;
    state = {
        city_name: '',
        state: '',
        city_lat_lon: '',
        locations: [],
        regEx_message: ''
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, name: city.city_name, state: city.state})
            ));
            if (this._isMounted) {
                this.setState({ locations });
            }
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
        if (this.state.city_name && this.state.state !== '') {
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
        } else { this.setState({regEx_message: 'Please, enter city-name and state'}); }
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/locations', id);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        this._isMounted = true;
        this.getDatabase();
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const locations = this.state.locations.map(city => {
            return (
                <div key={city.id} className={classes.CityDb}>
                    <div className={classes.CityNameDb}>{city.name}</div>
                    <div onClick={() => this.deleteHandler(city.id)}>state:&nbsp;{city.state}<FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/></div>
                </div>
            )
        });

        return(
            <div className={classes.City}>
                <h2>Enter new city for travel</h2>
                <div className={classes.AdminCityInput}>
                    <input onBlur={this.inputHandler} type="text" name="city_name" placeholder="Enter city"/>
                    <input onBlur={this.inputHandler} type="text" name="state" placeholder="Enter state for city"/>
                </div>
                <p>{this.state.regEx_message}</p>
                <button onClick={this.saveHandler}>Save to database</button>
                <h2>Cities in database:</h2>
                <div className={classes.CitiesFromDb}>
                    {locations}
                </div>
            </div>
        )
    }
}

export default City;
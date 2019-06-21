import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class City extends Component {
    state = {
        city_name: '',
        geolocation: '',
        state: '',
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

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        const newCity = {
            city_name: this.state.city_name,
            geolocation: this.state.geolocation,
            state: this.state.state
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
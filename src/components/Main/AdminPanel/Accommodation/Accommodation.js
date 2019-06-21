import React, { Component } from 'react';
import {getFromDatabase, postToDatabase} from '../../../../apis/btaApi';

class Accommodation extends Component {
    state = {
        name: '',
        link: '',
        id_city: '',
        city_lat_lon: ''
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/accommodations`);
            const accommodations = data.data;
            this.setState(accommodations);
        })();
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        (async () => {
            await postToDatabase('/accommodations', this.state);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        this.getDatabase();
    };

    render() {
        
        return(
            <div>
                <h2>Enter new accomodation for travel</h2>
                <input onBlur={this.inputHandler} type="text" name="link" placeholder="Enter link of accomodation here"/>
                <button>Get data</button>
                <div>

                </div>
                <button onClick={this.saveHandler}>Add to database</button>
            </div>
        )
    }
}

export default Accommodation;
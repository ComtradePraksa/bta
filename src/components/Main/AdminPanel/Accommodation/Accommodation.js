import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import {getHotel} from '../../../../apis/hotelScrapersApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Accommodation.css';

class Accommodation extends Component {
    state = {
        link: '',
        id_city: '',
        locations: [],
        accommodationsData: [],
        accommodationsNew: ''
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/accommodations`);
            const accommodationsData = data.data;
            this.setState({accommodationsData});
        })();
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    getDataHandler = () => {
        (async () => {
            const data = await getHotel(`${this.state.link}`);
            const hotelData = data.page.meta_tags;
            let accommodationsNew = {
                    name: hotelData['og:title'],
                    hotel_descr: hotelData['og:description'],
                    hotel_img: hotelData['og:image'],
                    link: hotelData['og:url'],
                    id_city: this.state.id_city };
            this.setState({accommodationsNew});
        })();
    };

    saveHandler = () => {
        (async () => {
            await postToDatabase('/accommodations', this.state.accommodationsNew);
            this.getDatabase();
        })();
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/accommodations', id);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, city: city.city_name })
            ));
            this.setState({ locations });
        })();
        this.getDatabase();
    };

    render() {
        const locations = this.state.locations.map(city => {
            return (
                <option key={city.id} value={city.id}>{city.city}</option>
            )
        });

        const accommodationsData = this.state.accommodationsData.map(acc => {
            return (
                <div key={acc.id} className={classes.AccommodationDetails}>
                    <div className={classes.AccommodationsDescr}>
                    <h3>{acc.name}</h3>
                    <p>{acc.hotel_descr}</p>
                    <div><a href = {`${acc.link}`} target="_blank">website: {`${acc.link}`}</a></div>
                    <span onClick={() => this.deleteHandler(acc.id)}>
                        <FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                    </div> 
                    <div><img src = {`${acc.hotel_img}`} alt = {acc.hotel_img} /></div>
                </div>
            )
        });

        let inputForGetData = '';
        if (this.state.id_city !== '') {
            inputForGetData = <React.Fragment>
                                <input onBlur={this.inputHandler} type="text" name="link" placeholder="Enter link of accomodation here"/>
                                <button onClick={this.getDataHandler}>Get data</button><br/>
                            </React.Fragment>;
        }

        let accommodationCheck = ''; 
        if (this.state.accommodationsNew !== '') {
            accommodationCheck = <div>
                                    <h3>{this.state.accommodationsNew.name}</h3>
                                    <p>{this.state.accommodationsNew.hotel_descr}</p>
                                    <div><img src = {`${this.state.accommodationsNew.hotel_img}`} alt = {this.state.accommodationsNew.name} /></div>
                                    <a href = {`${this.state.accommodationsNew.link}`} target="_blank">{`${this.state.accommodationsNew.link}`}</a>
                                </div>;
        }
        
        return (
            <div className={classes.Accommodation}>
                <h2>Enter new accomodation for travel</h2>
                <select onClick={this.inputHandler} name="id_city">
                        <option value="" defaultChecked>Select location:</option>
                        {locations}
                </select>
                {inputForGetData}
                {accommodationCheck}
                <button onClick={this.saveHandler}>Add to database</button>
                <h2>All accommodations</h2>
                <div className={classes.AllAcomodations}>
                    {accommodationsData}
                </div>
            </div>
        )
    }
}

export default Accommodation;
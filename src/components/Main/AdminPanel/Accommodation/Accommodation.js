import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, patchToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import {getHotel} from '../../../../apis/hotelScrapersApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Accommodation.css';

class Accommodation extends Component {
    _isMounted = false;
    state = {
        link: '',
        id_city: '',
        id_city_selected: '',
        locations: [],
        accommodationsData: [],
        accommodationsNew: '',
        updateId: '',
        regEx_message: '',
        true_message: ''
    };

    getDatabase = (idCity) => {
        if (idCity !== '') {
            (async () => {
                const data = await getFromDatabase(`/accommodations${idCity}`);
                const accommodationsData = data.data;
                if (this._isMounted) {
                    this.setState({accommodationsData});
                }
            })();
        }
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    getDataHandler = (link=this.state.link, idCity=this.state.id_city) => {
        if (link !== '') {
            (async () => {
                const data = await getHotel(`${link}`);
                const hotelData = data.page.meta_tags;
                let accommodationsNew = {
                        name: hotelData['og:title'],
                        hotel_descr: hotelData['og:description'],
                        hotel_img: hotelData['og:image'].replace('max300', 'max600'),
                        link: hotelData['og:url'],
                        id_city: idCity };
                this.setState({accommodationsNew});
            })();
        } else { this.setState({regEx_message: 'Please, enter link to get accommodation info!'}); }
    };

    saveHandler = () => {
        if (this.state.accommodationsNew !== '') {
            (async () => {
                await postToDatabase('/accommodations', this.state.accommodationsNew);
                this.getDatabase(`/id_city/${this.state.accommodationsNew.id_city}`);
            })();
            this.setState({true_message: '- Successfully aded new accommodation -'});
        } else { this.setState({regEx_message: 'Please, enter accommodation info!'}); }
    };

    updateHandler = () => {
        (async () => {
            await patchToDatabase('/accommodations', this.state.updateId, this.state.accommodationsNew);
            this.getDatabase(`/id_city/${this.state.accommodationsNew.id_city}`);
        })();
        this.setState({true_message: '- Successfully updated! -'});
        this.setState({updateId: ''});
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/accommodations', id);
            this.getDatabase(`/id_city/${this.state.id_city_selected}`);
        })();
        this.setState({true_message: '- Successfully deleted accommodation -'});
    };

    getDataForUpdate = (link, idCity, id) => {
        this.setState({updateId: id});
        this.getDataHandler(link, idCity);
    };

    getHotelsByCity = (e) => {
        this.getDatabase(`/id_city/${e.target.value}`);
        this.setState({[e.target.name]: e.target.value});
    };

    componentDidMount() {
        this._isMounted = true;
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, city: city.city_name })
            ));
            if (this._isMounted) {
                this.setState({ locations, id_city_selected: locations[0].id });
                this.getDatabase(`/id_city/${locations[0].id}`);
            }
        })();
    };

    componentWillUnmount() {
        this._isMounted = false;
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
                        <FontAwesomeIcon icon="trash-alt" size="lg" style={{color: "red", cursor: "pointer", padding: "0.5vw"}}/>
                    </span>
                    <span onClick={() => this.getDataForUpdate(acc.link, acc.id_city, acc.id)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} size="lg" style={{color: "lightgreen", cursor: "pointer", padding: "0.5vw"}}/>
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
                                <button onClick={() => this.getDataHandler()}>Get data</button><br/>
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

        const buttonSwitch = (this.state.updateId === '') ? <button onClick={this.saveHandler}>Add to database</button> 
                                                          : <button onClick={this.updateHandler}>Update info</button>;

        const inputSwitch = (this.state.updateId === '') ? <select onClick={this.inputHandler} name="id_city">
                                                                <option value="" defaultChecked>Select location:</option>
                                                                {locations}
                                                           </select> : null;

        return (
            <div className={classes.Accommodation}>
                <h2>Enter new accomodation for travel</h2>
                {inputSwitch}
                {inputForGetData}
                {accommodationCheck}
                {
                    (this.state.regEx_message !== '' && this.state.true_message === '') ? 
                    <p className={classes.Message}>{this.state.regEx_message}</p> :
                    <p className={classes.MessageTrue}>{this.state.true_message}</p>
                }
                {buttonSwitch}
                <h2>All accommodations</h2>
                <div>
                    <h3>Accommodations from city:</h3>
                    <select onClick={this.getHotelsByCity} name="id_city_selected">
                            <option value="" disabled>Select location:</option>
                            {locations}
                    </select>
                </div>
                <div className={classes.AllAcomodations}>
                    {accommodationsData}
                </div>
            </div>
        )
    }
}

export default Accommodation;
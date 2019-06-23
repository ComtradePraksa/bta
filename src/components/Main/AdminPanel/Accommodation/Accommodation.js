import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, patchToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import {getHotel} from '../../../../apis/hotelScrapersApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Accommodation.css';

class Accommodation extends Component {
    state = {
        link: '',
        id_city: '',
        locations: [],
        accommodationsData: [],
        accommodationsNew: '',
        updateId: ''
    };

    getDatabase = (idCity='') => {
        if (idCity !== undefined) {
            (async () => {
                const data = await getFromDatabase(`/accommodations${idCity}`);
                const accommodationsData = data.data;
                this.setState({accommodationsData});
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
                        hotel_img: hotelData['og:image'],
                        link: hotelData['og:url'],
                        id_city: idCity };
                this.setState({accommodationsNew});
            })();
        } else { alert('Enter link to get accommodation info'); }
    };

    saveHandler = () => {
        if (this.state.accommodationsNew !== '') {
            (async () => {
                await postToDatabase('/accommodations', this.state.accommodationsNew);
                this.getDatabase();
            })();
        } else { alert('Enter accommodation info'); }
    };

    updateHandler = () => {
        (async () => {
            await patchToDatabase('/accommodations', this.state.updateId, this.state.accommodationsNew);
            this.getDatabase();
        })();
        this.setState({updateId: ''});
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/accommodations', id);
            this.getDatabase();
        })();
    };

    getDataForUpdate = (link, idCity, id) => {
        this.setState({updateId: id});
        this.getDataHandler(link, idCity);
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
                    <span onClick={() => this.getDataForUpdate(acc.link, acc.id_city, acc.id)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} style={{color: "lightgreen", cursor: "pointer", paddingLeft: "1vw"}}/>
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
                {buttonSwitch}
                <h2>All accommodations</h2>
                <div>
                    <h3>Accommodations from city:</h3>
                    <select onClick={(e) => this.getDatabase(`/id_city/${e.target.value}`)} name="id_city">
                            <option value="" defaultChecked disabled>Select location:</option>
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
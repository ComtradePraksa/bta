import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from './ChooseCityVersionTwo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from 'axios';


class ChooseCity extends Component {
    state = {
        cities: [],
        dropdownVisible: false,
        placeholderMessage: "City..."
    };

    componentDidMount() {
        // const citiesArray = [];
        // axios.get('http://localhost:3001/locations')
        // .then(res => {
        //     const cities = res.data.data;
        //     cities.map((city) => {
        //        return citiesArray.push({ id: city.id, city: city.city_name })
        //     })
        //     this.setState({ cities: citiesArray });
        // });
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const citiesArray = [];
            data.data.map(city => (
                citiesArray.push({ id: city.id, city: city.city_name })
            ));
            this.setState({ cities: citiesArray });
        })();
    };

    toggleDropdown = () => {
        this.setState({
            dropdownVisible: !this.state.dropdownVisible
        })
    };

    getClickedCity = (item) => {
        this.setState({ placeholderMessage: item.city });
        this.props.getCity(item.city)
        return item.city
    };
    
    render() {
        const list = this.state.cities.map(city => {
            return (
                <li key={city.id} className={classes.dropdownItem}
                    onClick={this.getClickedCity.bind(this, city)}>{city.city}</li>
            )
        });
        return (
            <div className={[classes.chooseCity, classes.flex].join(' ')}>
                <h2>I would like to get some info on the</h2><div>&nbsp;</div>
                {!this.state.dropdownVisible &&

                    <h2 className={[classes.cityLink, classes.pointer].join(' ')} onClick={this.toggleDropdown}>city</h2>}
                {this.state.dropdownVisible &&

                    <div className={classes.dropdownWrapper}>
                        <div className={classes.dropdown} >
                            <div className={[classes.dropdownTileWrapper, classes.fullHeight, classes.pointer].join(' ')}>
                            <input placeholder={this.state.placeholderMessage} readOnly className={[classes.fullHeight, classes.pointer].join(' ')}/>
                                <FontAwesomeIcon icon="chevron-down" style={{color:"whitesmoke"}}/>
                            </div>
                            <ul className={[classes.dropdownItemList, classes.flex].join(' ')}>
                                {list}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        )
    };
}

export default ChooseCity;

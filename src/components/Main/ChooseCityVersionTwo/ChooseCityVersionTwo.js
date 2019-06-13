import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from './ChooseCityVersionTwo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ChooseCity extends Component {
    state = {
        cities: [],
        dropdownVisible: false,
        placeholderMessage: "City..."
    }

    componentDidMount() {
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
    }
    getClickedCity = (item) => {
        this.setState({ placeholderMessage: item.city })
        return item.city
    }
    render() {
        const list = this.state.cities.map(city => {
            return (
                <li key={city.id} className={classes.dropdownItem}
                    onClick={this.getClickedCity.bind(this, city)}>{city.city}</li>
            )
        })
        return (
            <div className={classes.chooseCity}>
                <h2>I would like to get some info on the</h2><div>&nbsp;</div>
                {!this.state.dropdownVisible &&

                <h2 className={classes.cityLink} onClick={this.toggleDropdown}>city</h2>}
                {this.state.dropdownVisible &&

                <div className={classes.dropdownWrapper}>
                    <div className={classes.dropdown} >
                        <div className={classes.dropdownTileWrapper}>
                            <input placeholder={this.state.placeholderMessage} readOnly />
                            <FontAwesomeIcon icon="chevron-down" />
                        </div>
                            <ul className={classes.dropdownItemList}>
                                {list}
                            </ul>
                        
                    </div>
                </div>}
            </div>
        )
    };
}

export default ChooseCity;

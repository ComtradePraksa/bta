import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from './ChooseCity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ChooseCity extends Component {
    state = {
        cities: [],
        dropdownVisible: false,
        placeholderMessage: "City..."
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const citiesArray = [];
            data.data.map(city => (
                citiesArray.push({ id: city.id, city: city.city_name, latlon:city.city_lat_lon})
            ));
            this.setState({ cities: citiesArray });
        })();
    };

    toggleDropdown = () => {
        this.setState({ dropdownVisible: !this.state.dropdownVisible });
    };

    getClickedCity = (item) => {
        this.setState({ placeholderMessage: item.city });
        this.props.getCity({city:item.city,id:item.id, latlon:item.latlon});
        return item.city;
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
                    <h2 className={[classes.cityLink, classes.pointer].join(' ')} onClick={this.toggleDropdown}>city
                    <FontAwesomeIcon icon="chevron-down" style={{fontSize: "1rem", padding: "0 8px", color: "rgba(1, 1, 34, 0.979)"}}/></h2>}
                {this.state.dropdownVisible &&
                    <div className={[classes.dropdownWrapper, classes.fullHeight].join(' ')}>
                        <div className={[classes.dropdown, classes.fullHeight].join(' ')} >
                            <div className={[classes.dropdownTileWrapper, classes.fullHeight, classes.pointer].join(' ')}>
                            <input placeholder={this.state.placeholderMessage} readOnly className={[classes.fullHeight, classes.pointer].join(' ')}/>
                                <FontAwesomeIcon icon="chevron-down" style={{color: '#fff'}}/>
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
import React, { Component } from 'react';
//import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCity from './ChooseCity/ChooseCity';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import FeedbackContainer from './FeedbackContainer/FeedbackContainer';
import Weather from './Weather/Weather';
import NearbyWrapper from './NearbyWrapper/NearbyWrapper';
import Map from './Map/Map';


class Main extends Component {
    state = {
        location: 'Dortmund',
        value: '0,0',
        latitude: '',
        longitude: '',
        error: null,
        city:''
    };

    asyncGetCurrentPosition = options => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    getCity = (city)=>{
        this.setState({city})
      }

    componentDidMount() {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000
        };

        (async () => {
            let { coords: { latitude, longitude } } = await this.asyncGetCurrentPosition(options);
            const value = `${latitude},${longitude}`;
            this.setState({value, latitude, longitude});
        })();
    }

    render() {
        return (
            <div>
                <Welcome />
                <ChooseCity getCity={this.getCity}/>
                <ChooseCityVersionTwo getCity={this.getCity} />
                <Weather latitude={this.state.latitude} longitude={this.state.longitude} />
                <Map latitude={this.state.latitude} longitude={this.state.longitude} />
                <NearbyWrapper location={this.state.value} />
                <FeedbackContainer/>
            </div>
        );
    }
}

export default Main;
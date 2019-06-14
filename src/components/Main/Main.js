import React, { Component } from 'react';
//import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCity from './ChooseCity/ChooseCity';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import { asyncGetCurrentPosition } from '../../apis/weatherApi';

import FeedbackContainer from './FeedbackContainer/FeedbackContainer';
import Weather from './Weather/Weather';
import NearbyWrapper from './NearbyWrapper/NearbyWrapper';


class Main extends Component {

    state = {
        location: 'Dortmund',
        value: '0,0',
        latitude: '',
        longitude: '',
        error: null
    }

    componentDidMount() {
        const options = {
            //enableHighAccuracy: true,
            timeout: 10000
        };

        (async () => {
            let { coords: { latitude, longitude } } = await asyncGetCurrentPosition(options);
            this.setState({
                value: latitude + ',' + longitude,
                latitude: latitude,
                longitude: longitude,
                error: null,
            });
        })();
    }

    render() {
        return (
            <div>
                <Welcome />
                <ChooseCity />
                <ChooseCityVersionTwo />
                <Weather latitude={this.state.latitude} longitude={this.state.longitude} />
                <NearbyWrapper location={this.state.value} />
                <FeedbackContainer/>
            </div>
        );
    }
}

export default Main;
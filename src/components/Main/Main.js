import React, { Component } from 'react';
//import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCity from './ChooseCity/ChooseCity';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import FeedbackContainer from './FeedbackContainer/FeedbackContainer';
import Weather from './Weather/Weather';
import NearbyWrapper from './NearbyWrapper/NearbyWrapper';


class Main extends Component {
    state ={
        location:'Dortmund'
    }

    render() {
        return (
            <div>
            <Welcome />
            <ChooseCity/>
            <ChooseCityVersionTwo/>
            <Weather/>
            <NearbyWrapper />
            <FeedbackContainer/>
            </div>
        );
    }
}

export default Main;
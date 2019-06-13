import React, { Component } from 'react';
//import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCity from './ChooseCity/ChooseCity';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';

import Weather from './Weather/Weather';


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
            </div>
        );
    }
}

export default Main;
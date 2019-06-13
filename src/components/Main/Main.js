import React, { Component } from 'react';
//import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCity from './ChooseCity/ChooseCity';


class Main extends Component {
    

    render() {
        return (
            <div>
            <Welcome />
            <ChooseCity/>
            </div>
        );
    }
}

export default Main;
import React, { Component } from 'react';
import classes from './Main.css';
import Welcome from './Welcome/Welcome';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import CurrentLocation from './CurrentLocation/CurrentLocation'
import City from './City/City'
import AdminPanel from './AdminPanel/AdminPanel';


class Main extends Component {
    state = {
        city:''
    };
    
    getCity = (city) => {
        this.setState({city});
    };
    
    render() {
        return (
            <div className={classes.Main}>
                <Welcome loggedUser={this.props.loggedUser}/>
                <ChooseCityVersionTwo getCity={this.getCity}/>
                {this.state.city ==='' ? <CurrentLocation/> : <City city={this.state.city}/>}
                <AdminPanel />
            </div>
        );
    }
}

export default Main;
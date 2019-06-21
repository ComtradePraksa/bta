import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import classes from './Main.css';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import CurrentLocation from './CurrentLocation/CurrentLocation'
import City from './City/City'
import AdminPanel from './AdminPanel/AdminPanel';
import Nav from './Nav/Nav';

class Main extends Component {
    state = {
        city:'',
        is_admin: this.props.loggedUser.is_admin,
        adminToggle: false
    };
    
    getCity = (city) => {
        this.setState({city});
    };

    adminToggleHandler = (status) => {
        this.setState({ adminToggle: status })
    }

    render() {
        let main;
        if (this.state.adminToggle) {
            main = <BrowserRouter><AdminPanel/></BrowserRouter>
        }
        if (this.state.adminToggle === false && this.state.city === '') {
            main = [<ChooseCityVersionTwo key="1" getCity={this.getCity}/>,<CurrentLocation loggedUser={this.props.loggedUser} key="2"/>]
        }
        if (this.state.adminToggle === false && this.state.city !== '') {
            main = [<ChooseCityVersionTwo key="1" getCity={this.getCity}/>,<City key='2' city={this.state.city}/>]
        }
        return (
            <div className={classes.Main}>
                <Nav loginStatus = {this.props.loginStatus} loggedUser={this.props.loggedUser} adminToggle={this.adminToggleHandler}/>
                {main}
            </div>
        );
    }
}

export default Main;
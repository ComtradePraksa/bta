import React, { Component } from 'react';
import classes from './Main.css';
import ChooseCityVersionTwo from './ChooseCityVersionTwo/ChooseCityVersionTwo';
import CurrentLocation from './CurrentLocation/CurrentLocation'
import City from './City/City'
import Nav from './Nav/Nav';
import { ProtectedRoute } from '../../ProtectedRoute'
import { Route, Redirect } from 'react-router-dom';

class Main extends Component {
    state = {
        city: '',
        is_admin: this.props.loggedUser.is_admin,
        adminToggle: false
    };

    getCity = (city) => {
        this.setState({ city });
    };

    render() {
        return (
            <div className={classes.Main}>
                <Nav loggedUser={this.props.loggedUser} loginStatus={this.props.loginStatus} />
                <ChooseCityVersionTwo key="1" getCity={this.getCity} />
                <ProtectedRoute key="2" loggedUser={this.props.loggedUser} exact path="/home" component={CurrentLocation} />
                
                <Route path="/home/city" key="4" render={(props) => (
                    (this.state.city !== '')
                        ? <City city={this.state.city} {...props} />
                        : <Redirect to='/home' />
                )} />
            </div>
        );
    }
}

export default Main;
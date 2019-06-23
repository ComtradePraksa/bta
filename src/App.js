import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faChevronCircleRight, faPlus, faCity, faHotel, faPlane, faRoute, faComments, faTimes, faKey, faUser, faUsers, faChevronDown, faCommentAlt, faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Main from './components/Main/Main';
import jwt from 'jsonwebtoken';
import AdminPanel from './components/Main/AdminPanel/AdminPanel';
import { ProtectedRoute } from './ProtectedRoute'

library.add(faTrashAlt, faChevronCircleRight, faPlus, faCity, faHotel, faPlane, faRoute, faComments, faTimes, faKey, faUser, faUsers, faChevronDown, faCommentAlt, faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt, faEdit);

class App extends Component {
  state = {
    isLogged: false,
    loggedUser: {}
  };

  componentDidMount() {
    const token = localStorage.jwtoken;
    if (token) {
      const exp = jwt.decode(token).exp * 1000;
      const now = new Date().getTime();
      if (now > exp) {
        localStorage.removeItem('jwtoken');
        this.LoginStatus(false, {});
      }
      else { this.LoginStatus(true, jwt.decode(token)); }
    }
    else { this.LoginStatus(false, {}); }
  };

  LoginStatus = (isLogged, loggedUser) => {
    this.setState({ isLogged, loggedUser });
  };

  render() {
    return (
      <div className={classes.App}>
        <Router>
          <Switch>
            <Route exact path="/" render={
              (props) => <Login {...props} loginStatus={this.LoginStatus} loggedUser={this.loggedUser} />
            } />
            <ProtectedRoute loginStatus={this.LoginStatus} loggedUser={this.state.loggedUser} path="/home" component={Main} />
            <ProtectedRoute loginStatus={this.LoginStatus} loggedUser={this.state.loggedUser} path="/admin" component={AdminPanel} />
            <Route path="*" component={() => ':( Error 404, page not found'} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
<<<<<<< HEAD
import {faTimes, faKey, faUser, faChevronDown, faCommentAlt , faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import Main from './components/Main/Main';
import jwt from 'jsonwebtoken';

library.add( faTimes,faKey, faUser, faChevronDown, faCommentAlt, faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt);
=======
import {faChevronCircleRight,faPlus,faTimes, faKey, faUser, faChevronDown, faCommentAlt , faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import Main from './components/Main/Main';
import jwt from 'jsonwebtoken';

library.add(faChevronCircleRight,faPlus, faTimes,faKey, faUser, faChevronDown, faCommentAlt, faHamburger, faBus, faHardHat, faBinoculars, faLandmark, faMapSigns, faMapMarkerAlt);
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0

class App extends Component {
  state = {
    isLogged: false,
    loggedUser:{}
  };

  componentDidMount() {
    const token = localStorage.jwtoken;
    if (token) {
      const exp = jwt.decode(token).exp * 1000;
      const now = new Date().getTime();
      if (now > exp) {
        localStorage.removeItem('jwtoken');
        this.LoginStatus(false,{});
      }
      else { this.LoginStatus(true,jwt.decode(token)); }
    }
    else { this.LoginStatus(false,{}); }
  };
  
  LoginStatus = (isLogged, loggedUser) => {
    this.setState({ isLogged, loggedUser });
  };

  render() {
    return (
      <div className={classes.App}>
        {this.state.isLogged ? <Main loggedUser={this.state.loggedUser}/> : <Login loginStatus={this.LoginStatus}/>}
      </div>
    );
  }
}

export default App;

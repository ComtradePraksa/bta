import React, { Component } from 'react';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faKey, faUser, faChevronDown,faCommentAlt ,faHamburger,faBus,faHardHat,faBinoculars,faLandmark,faMapSigns,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import Main from './components/Main/Main';

library.add( faKey, faUser,faChevronDown,faCommentAlt,faHamburger,faBus,faHardHat,faBinoculars,faLandmark,faMapSigns,faMapMarkerAlt);

class App extends Component {
  state = {
    login: false,
    loggedUser: []
  };
  
  render() {
    let app;
    this.state.login !== false ?
    app = <Login /> : 
    app = <Main />;
    return (
      <div className={classes.App}>
         {app}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faKey, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Main from './components/Main/Main';

library.add( faKey, faUser,faChevronDown);

class App extends Component {
  state = {
    login: false
  };
  
  render() {
    let app;
    this.login === false ?
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

import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faKey, faUser);

class App extends Component {
  state = {
    accomodations: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/accomodations`)
      .then(res => {
        const accomodations = (res.data).data[0];
        this.setState({ accomodations });
        console.log(accomodations);
      })
  };

  render() {
    return (
      <div className={classes.App}>
        <Login /> 
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';
import Login from './components/Login'

class App extends Component {
  state = {
    hotels: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/hotels`)
      .then(res => {
        const hotels = (res.data).data[0];
        this.setState({ hotels });
      })
      
  }

  render() {
    let name = (this.state.hotels.name);
    return (
      <div className={classes.App}>
        <Login/> 
      </div>
    );
  }
}

export default App;

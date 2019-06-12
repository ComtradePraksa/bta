import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';

class App extends Component {
  state = {
    hotels: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/hotels`)
      .then(res => {
        const hotels = (res.data).data[0];
        this.setState({ hotels });
      });
  }

  render() {
    const name = (this.state.hotels.name);
    return (
      <div className={classes.App}>
          <h1 className="App-title">BTA</h1>
          <p>{name}</p>
      </div>
    );
  }
}

export default App;

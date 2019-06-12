import React, { Component } from 'react';
//import axios from 'axios';
import classes from './App.css';
import Login from './components/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faUser);

class App extends Component {
  state = {
    accomodations: []
  }

  // componentDidMount() {
  //   const url = 'https://www.booking.com/hotel/de/hotel-dortmund.html';
  //   axios.get(`https://scrappet.herokuapp.com/api/scrape?url=${url}`)
  //     .then(res => {
  //       const accomodations = res.data.page.meta_tags;
  //       this.setState({ accomodations });
  //     })
  // };
        // <h1>{this.state.accomodations['og:title']}</h1>
        // <div>{this.state.accomodations['og:description']}</div>
        // <div><img src={this.state.accomodations['og:image']} alt="Hotel"></img></div>
        // <div>{this.state.accomodations['og:url']}</div>

  render() {
    return (
      <div className={classes.App}>
        <Login /> 
      </div>
    );
  }
}

export default App;

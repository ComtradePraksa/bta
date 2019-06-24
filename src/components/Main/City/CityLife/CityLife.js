import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './CityLife.css';

class CityLife extends Component {
  
  render() {
    return (
            <div className={classes.CityLifeWrapper}>
              <h3 className="Title">City Life</h3>
              <div className={classes.CityLifeCategoriesWrapper}>
                <div className={`${classes.CityLifeCategory} ${classes.FoodAndDrinks}`}>
                  <FontAwesomeIcon icon="hamburger" style={{fontSize: '40px', marginBottom: '10px'}}/>
                  <p className= {classes.CategoryName}>Food and Drinks</p>
                </div>
                <div className={`${classes.CityLifeCategory} ${classes.Safety}`}>
                  <FontAwesomeIcon icon="hard-hat" style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <p className={classes.CategoryName}>Safety</p>
                </div>
                <div className={`${classes.CityLifeCategory} ${classes.Sightseeing}`}>
                  <FontAwesomeIcon icon="binoculars" style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <p className={classes.CategoryName}>Sightseeing</p>
                </div>
                <div className={`${classes.CityLifeCategory} ${classes.LocalTransport}`}>
                  <FontAwesomeIcon icon="bus" style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <p className={classes.CategoryName}>Local Transport</p>
                </div>
                <div className={`${classes.CityLifeCategory} ${classes.LocalCulture}`}>
                  <FontAwesomeIcon icon="landmark" style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <p className={classes.CategoryName}>Local Culture</p>
                </div>
                <div className={`${classes.CityLifeCategory} ${classes.Other}`}>
                  <FontAwesomeIcon icon="map-signs" style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <p className="CategoryName">Other</p>
                </div>
              </div>
            </div>
    );
  }
}

export default CityLife;
import React, { Component } from 'react';
import classes from './NearbyWrapper.css';
import axios from 'axios';
import Nearby from './Nearby/Nearby';

class NearbyWrapper extends Component {
    state = {
        value: '0,0',
        error: null,
        nearbyPlaces: []
      }

      componentDidMount() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                value: position.coords.latitude + ',' + position.coords.longitude,
                error: null,
              });
              axios.get(`https://places.cit.api.here.com/places/v1/discover/around?app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw&at=${this.state.value}&pretty`)
        .then(res => {
            const nearbyPlaces = res.data.results.items;
            this.setState({ nearbyPlaces: nearbyPlaces });
        })
            },
            (error) => this.setState(
              {error: error.message}
            )
          );
        }
      }

    render() {
        let nearbyPlacesToRender = null;

        if (true) {
            nearbyPlacesToRender = (
                <div>
                    {this.state.nearbyPlaces.slice(0,5).map((nearbyPlace) => {
                        return <Nearby
                        title={nearbyPlace.title}
                        icon={nearbyPlace.icon}
                        address={nearbyPlace.vicinity.replace('<br/>',' ')}
                        category={nearbyPlace.category.title}
                        key={nearbyPlace.id} />
                    })}
                </div>
            );
        }
        return (
            <div className={classes.NearbyWrapper}>
               {nearbyPlacesToRender}
            </div>
        );
    }
}

export default NearbyWrapper;
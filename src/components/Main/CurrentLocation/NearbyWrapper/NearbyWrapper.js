import React, { Component } from 'react';
import classes from './NearbyWrapper.css';
import axios from 'axios';
import Nearby from './Nearby/Nearby';

class NearbyWrapper extends Component {
    state = {
        error: null,
        nearbyPlaces: []
      };

    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location){
            axios.get(`https://places.cit.api.here.com/places/v1/discover/around?app_id=oAYeL0kErguvl8l584Tn&app_code=1XgtGSFk3UzuYMqCKiRRSw&at=${this.props.location}&pretty`)
            .then(res => {
                const nearbyPlaces = res.data.results.items;
                this.setState({ nearbyPlaces: nearbyPlaces });
                this.props.getNearbyPlaces(this.state.nearbyPlaces.slice(0,6))
            });
        }
    }
    
    render() {
        let nearbyPlacesToRender = null;

        if (this.state.nearbyPlaces !== []) {
            nearbyPlacesToRender = (
                <div>
                    {this.state.nearbyPlaces.slice(0,6).map((nearbyPlace) => {
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
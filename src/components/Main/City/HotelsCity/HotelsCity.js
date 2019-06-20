import React, { Component } from 'react';
import classes from './HotelsCity.css';
import { getFromDatabase } from '../../../../apis/btaApi';

class HotelsCity extends Component {
    state = {
        error: null,
        nearbyPlaces: []
      };

    componentDidUpdate(prevProps) {
        if (this.props.city!== prevProps.city) {
            (async()=>{
                const hotelLinks = await getFromDatabase(`/accommodations?id_city=${this.props.city.id}`)
                console.log(hotelLinks)
            });
        }
    }

    componentDidMount(){
        (async()=>{
            const hotelLinks = await getFromDatabase(`/accommodations?id_city=${this.props.city.id}`)
            console.log(hotelLinks)
        })();
    }
    
    render() {
        /*
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

        */
       return(
       <div>Lalala</div>
       )
    }
}

export default HotelsCity;
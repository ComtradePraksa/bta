import React, { Component } from 'react';
import classes from './Map.css';
<<<<<<< HEAD
=======
import map from '../../../../apis/mapsApi'
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0

class Map extends Component {
    state = {
        platform: null,
        map: null
    };

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.longitude && this.props.longitude !== prevProps.longitude) {
<<<<<<< HEAD
            this.platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

            const layer = this.platform.createDefaultLayers();
            const container = document.getElementById('here-map');

            this.map = new window.H.Map(container, layer.normal.map, {
                center: { lat: this.props.latitude, lng: this.props.longitude },
                zoom: 12,
            });
            let marker = new window.H.map.Marker({ lat: this.props.latitude, lng: this.props.longitude  });
            this.map.addObject(marker); 
        }
    }
=======
           map(this.props.latitude,this.props.longitude);
        }
    };
>>>>>>> 138ab09f0b4def01c0e5e0c7cad7562ab41f34e0

    render() {
        return (
            <div className={classes.Map} id="here-map" style={{ width: '30vw', height: '30vw', background: 'grey' }} />
        );
    }
}

export default Map;
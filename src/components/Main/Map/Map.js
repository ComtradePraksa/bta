import React, { Component } from 'react';

class Map extends Component {
    state = {
        latitude: '',
        longitude: '',
        platform: null,
        map: null
    }

    componentDidUpdate(prevProps) {
        if (this.props.latitude !== prevProps.longitude && this.props.longitude !== prevProps.longitude) {
            this.setState({ latitude: this.props.latitude, longitude: this.props.longitude })
            this.platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

            const layer = this.platform.createDefaultLayers();
            const container = document.getElementById('here-map');

            this.map = new window.H.Map(container, layer.normal.map, {
                center: { lat: this.props.latitude, lng: this.props.longitude },
                zoom: 12,
            })
            let marker = new window.H.map.Marker({ lat: this.props.latitude, lng: this.props.longitude  });
            this.map.addObject(marker); 
        }
    }

    render() {
        return (
            <div id="here-map" style={{ width: '25vw', height: '25vw', background: 'grey' }} />
        );
    }
}

export default Map;
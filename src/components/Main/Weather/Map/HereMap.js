import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: this.props.lat,
                lng: this.props.lng,
            },
        }
        this.platform = null;
        this.map = null;
    }

    componentDidMount() {
        this.platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og', center: this.state.center, zoom: 12, });

        const layer = this.platform.createDefaultLayers();
        const container = document.getElementById('here-map');

        this.map = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: 12,
        })
        let marker = new window.H.map.Marker({ lat: this.state.center.lat, lng: this.state.center.lng });
        this.map.addObject(marker);
    }

    render() {
        return (
            <div id="here-map" style={{ width: '25vw', height: '25vw', background: 'grey' }} />
        );
    }
}

export default Map;
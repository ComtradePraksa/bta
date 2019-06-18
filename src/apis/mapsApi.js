const map = (latitude,longitude) => {

this.platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

const layer = this.platform.createDefaultLayers();
const container = document.getElementById('here-map');

this.map = new window.H.Map(container, layer.normal.map, {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
});
let marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
this.map.addObject(marker); 
}

export default map;
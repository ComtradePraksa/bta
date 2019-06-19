const map = (latitude,longitude) => {

    const platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

    const layer = platform.createDefaultLayers();
    const container = document.getElementById('here-map');

    const map = new window.H.Map(container, layer.normal.map, {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
    });
    const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
    map.addObject(marker); 
    window.H.ui.UI.createDefault(map, layer);

    const mapEvents = new window.H.mapevents.MapEvents(map);  
    const behavior = new window.H.mapevents.Behavior(mapEvents);
}

export default map;
const map = (latitude, longitude, location) => {

    const platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

    const layer = platform.createDefaultLayers();
    const container = document.getElementById('here-map');

    const map = new window.H.Map(container, layer.normal.map, {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
    });
   
    var pngIcon2 = new window.H.map.Icon(location[0].icon);
    var pngIcon3 = new window.H.map.Icon(location[1].icon);
    var pngIcon4 = new window.H.map.Icon(location[2].icon);
    var pngIcon5 = new window.H.map.Icon(location[3].icon);
    var pngIcon6 = new window.H.map.Icon(location[4].icon);
    var pngIcon7 = new window.H.map.Icon(location[5].icon);
    const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
    const marker2 = new window.H.map.Marker({ lat: location[0].position[0], lng: location[0].position[1] },{icon:pngIcon2});
    const marker3 = new window.H.map.Marker({ lat: location[1].position[0], lng: location[1].position[1] },{icon:pngIcon3});
    const marker4 = new window.H.map.Marker({ lat: location[2].position[0], lng: location[2].position[1] },{icon:pngIcon4});
    const marker5 = new window.H.map.Marker({ lat: location[3].position[0], lng: location[3].position[1] },{icon:pngIcon5});
    const marker6 = new window.H.map.Marker({ lat: location[4].position[0], lng: location[4].position[1] },{icon:pngIcon6});
    const marker7 = new window.H.map.Marker({ lat: location[5].position[0], lng: location[5].position[1] },{icon:pngIcon7});
    /*eslint-disable */
    const ui = window.H.ui.UI.createDefault(map, layer);

    map.addObject(marker); 
    map.addObject(marker2);
    map.addObject(marker3); 
    map.addObject(marker4);
    map.addObject(marker5);
    map.addObject(marker6); 
    map.addObject(marker7);
   
    const mapEvents = new window.H.mapevents.MapEvents(map);  
    const behavior = new window.H.mapevents.Behavior(mapEvents);
    /*eslint-enable */
}

export default map;
const map = (latitude, longitude, location) => {

    const platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

    const layer = platform.createDefaultLayers();
    const container = document.getElementById('here-map');

    const map = new window.H.Map(container, layer.normal.map, {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
    });
    const ui = window.H.ui.UI.createDefault(map, layer);
    const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
    map.addObject(marker); 
   if(location !== undefined){
       location.map((e,index)=> map.addObject(new window.H.map.Marker({ lat: location[index].position[0], lng: location[index].position[1] },{icon:new window.H.map.Icon(location[index].icon)})))
   }
    /*eslint-disable */
    
   
   
    const mapEvents = new window.H.mapevents.MapEvents(map);  
    const behavior = new window.H.mapevents.Behavior(mapEvents);
    /*eslint-enable */
}

export default map;
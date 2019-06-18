import axios from 'axios';
  
const map = (latitude,longitude) => {

const platform = new window.H.service.Platform({ app_id: 'bIV674hGvmDcJyBxVMjW', app_code: 'pZnLTja-QcfDIq6mwL63og'});

const layer = platform.createDefaultLayers();
const container = document.getElementById('here-map');

const map = new window.H.Map(container, layer.normal.map, {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
});
let marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
map.addObject(marker); 
}

const headers = { 'Content-Type': 'application/json', 'App-Id':'bIV674hGvmDcJyBxVMjW', 'App-code':'pZnLTja-QcfDIq6mwL63og' };
const getCityLocation = async (city) => {
    try {
        const response = await axios.get(`https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=${city}&app_id=bIV674hGvmDcJyBxVMjW&app_code=pZnLTja-QcfDIq6mwL63og&gen=8`, {headers}) ;
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error)
    }
}
export {getCityLocation,map};
export default map;

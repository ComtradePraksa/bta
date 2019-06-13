import axios from 'axios'

let lat = 0;
let lon = 0;
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;

    lat = crd.latitude;
    lon = crd.longitude;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options)

const headers = { 'Content-Type': 'application/json' };
const getCLWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, { headers });
        const data = await response.data;
        return data
    } catch (error) {
        console.log(error)
    }
};

export { getCLWeather }


//https://api.openweathermap.org/data/2.5/weather?q=belgrade&units=metric&appid=7126e4ea78f69676d33c761f723dd918



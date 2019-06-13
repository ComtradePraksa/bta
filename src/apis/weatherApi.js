import axios from 'axios'

const asyncGetCurrentPosition = options => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

const headers = { 'Content-Type': 'application/json' };
const getCLWeather = async () => {
     let {coords: {latitude, longitude}} = await asyncGetCurrentPosition();
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, { headers });
        const data = await response.data;
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
};

export {getCLWeather }


//https://api.openweathermap.org/data/2.5/weather?q=belgrade&units=metric&appid=7126e4ea78f69676d33c761f723dd918



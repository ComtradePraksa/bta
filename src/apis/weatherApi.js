import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };
const getWeather = async (latitude, longitude) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7126e4ea78f69676d33c761f723dd918`, { headers });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getWeather };
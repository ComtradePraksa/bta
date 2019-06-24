import axios from 'axios';

const url = `https://davidesantangelo-scrappet-v1.p.rapidapi.com/api/scrape?url=`;
const headers = {
    "X-RapidAPI-Host": "davidesantangelo-scrappet-v1.p.rapidapi.com",
    "X-RapidAPI-Key" : "98533b8f86mshe857bd09d846a6cp1cf65ejsn823f3051d35c"
};

const getHotel = async (hotelUrl) => {
    try {
        const response = await axios.get(`${url}${hotelUrl}`, {headers});
        const hotel = response.data;
        return hotel;
    } catch (error) {
        console.log(error);
    }
};

export {getHotel};
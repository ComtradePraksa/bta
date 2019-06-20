import axios from 'axios';

const url = `https://scrappet.herokuapp.com/api/scrape?url=`;
const headers = { 'Content-Type': 'application/json' };

const getHotel = async (hotelUrl) => {
    try {
        const response = await axios.get(`${url}${hotelUrl}`, { headers });
        const hotel = await response.data;
        return (hotel);
    } catch (error) {
        console.log(error);
    }
};

export { getHotel };
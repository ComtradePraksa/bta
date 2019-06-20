import axios from 'axios';

const url = `https://scrappet.herokuapp.com/api/scrape?url=`;

const getHotel = async (hotelUrl,removeAuthHeader) => {
    try {
        const response = await axios.get(`${url}${hotelUrl}`, removeAuthHeader);
        const hotel = await response.data;
        return hotel;
    } catch (error) {
        console.log(error);
    }
};

export {getHotel}
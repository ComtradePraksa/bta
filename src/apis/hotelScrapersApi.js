import axios from 'axios';

const rawUrl = 'https://www.booking.com/hotel/de/hotel-dortmund.sr.html';
const urlEncoded = encodeURIComponent(rawUrl);
const requestUrl = `https://opengraph.io/api/1.1/site/${urlEncoded}`
const headers = {
    'Content-Type': 'application/json',
    'Api-Key': 'fb1fde18-4402-4c35-863c-4009aa50f6d3'
}

let getHotel = async () => {
    try {
        const response = await axios.get(`${requestUrl}`, {
            headers
        });
        const hotel = await response.data;
        console.log(hotel)
    } catch (error) {
        console.log(error)
    };
}

export {
    getHotel
}

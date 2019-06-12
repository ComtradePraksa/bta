import axios from 'axios';

const url = `http://localhost:3001`;
const headers = {
    'Content-Type': 'application/json',
}

let get = async () => {
    try {
        const response = await axios.get(`${url}`, {
            headers
        });
        const data = await response.data;
        console.log(data)
    } catch (error) {
        console.log(error)
    };
}

export {
    get
}
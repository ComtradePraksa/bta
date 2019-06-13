import axios from 'axios';

const url = `http://localhost:3001`;
const headers = { 'Content-Type': 'application/json' };

const get = async () => {
    try {
        const response = await axios.get(`${url}`, { headers });
        const data = await response.data;
        console.log(data)
    } catch (error) {
        console.log(error)
    }
};

// data is object

const post = async (data) => {
    try {
        await axios.post(`${url}/tablename/`, data, { headers });
    } catch (error) {
        console.log(error)
    }
};

const put = async (data,id) => {
    try {
        await axios.put(`${url}/tablename/${id}`, data, { headers });
    } catch (error) {
        console.log(error)
    }
};


const del = async(id)=>{
    try {
        await axios.delete(`${url}/tablename/${id}`, { headers });
    } catch (error) {
        console.log(error)
    }
};
export default {get, post, del, put};

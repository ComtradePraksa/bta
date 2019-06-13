import axios from 'axios';

const url = `http://localhost:3001`;
const headers = { 'Content-Type': 'application/json' };

const get = async (table) => {
    try {
        const response = await axios.get(`${url}/${table}`, { headers });
        const data = await response.data;
        return data
    } catch (error) {
        console.log(error)
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}`, { headers });
        const data = await response.data;
        return data;
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
export {get, getById, post, del, put};

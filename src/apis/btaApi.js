import axios from 'axios';

const url = `http://localhost:3001`;
const headers = { 'Content-Type': 'application/json' };

const getFromDatabase = async (query) => {
    try {
        const response = await axios.get(`${url}${query}`, { headers });
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

// data is object
const postToDatabase = async (tableName, data) => {
    try {
        await axios.post(`${url}${tableName}`, data, { headers });
    } catch (error) {
        console.log(error);
    }
};

const putInDatabase = async (data, id) => {
    try {
        await axios.put(`${url}/tablename/${id}`, data, { headers });
    } catch (error) {
        console.log(error);
    }
};

const deleteFromDatabase = async (id) => {
    try {
        await axios.delete(`${url}/tablename/${id}`, { headers });
    } catch (error) {
        console.log(error);
    }
};

export {getFromDatabase, postToDatabase, putInDatabase, deleteFromDatabase};
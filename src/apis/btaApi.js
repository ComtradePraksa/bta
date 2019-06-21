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

const patchToDatabase = async (tableName, data, id) => {
    try {
        await axios.patch(`${url}${tableName}/${id}`, data, { headers });
    } catch (error) {
        console.log(error);
    }
};

const deleteFromDatabase = async (tableName, id) => {
    try {
        await axios.delete(`${url}${tableName}/${id}`, { headers })
        .then(res=>console.log(res.data));
    } catch (error) {
        console.log(error);
    }
};

export {getFromDatabase, postToDatabase, patchToDatabase, deleteFromDatabase};
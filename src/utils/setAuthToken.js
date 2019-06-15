import axios from 'axios';

export default function setAuthToken(token){
  if(token){
    //if there is a token then send auth header with every request by default
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  else{
    //if there is no token then delete the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}
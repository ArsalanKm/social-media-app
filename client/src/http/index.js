import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
const instance = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: {
    Authorization: token && 'Bearer-' + token,
    'Content-Type': 'application/json',
    timeout: 2000,
  },
});

export default instance;

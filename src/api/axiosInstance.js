import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8080/api' 
  : 'https://gineracollegemain-01.onrender.com/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
});

export default axiosInstance;

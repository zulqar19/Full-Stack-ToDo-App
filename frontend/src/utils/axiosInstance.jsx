import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';


const baseURL = 'http://127.0.0.1:8000';

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

const axiosInstance = axios.create({
    baseURL,
    headers : {Authorization : `Bearer ${authTokens?.access}`}
})

export default axiosInstance;
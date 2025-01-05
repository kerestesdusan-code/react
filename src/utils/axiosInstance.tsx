import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, //Base URL loaded from .env
    headers: {
        'Content-type': 'application/json',
    },
});

export default axiosInstance;
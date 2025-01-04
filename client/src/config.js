import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/', // Set your base API URL here
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user').token;
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
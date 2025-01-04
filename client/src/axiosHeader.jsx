import axios from 'axios';
// Create an Axios instance
const axiosHeader = axios.create({
  baseURL: 'http://localhost:5000/api/', // Replace with your API base URL
});
// Add a request interceptor
axiosHeader.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['x-auth-token'] = user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosHeader;

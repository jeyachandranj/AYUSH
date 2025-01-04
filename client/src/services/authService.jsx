import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { 'x-auth-token': user.token } : {};
};
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};


export const verifyToken = async () => {
  const response = await axios.get(`${API_URL}/verifyToken`, {
    headers: getAuthHeader(),
    withCredentials: true,
  });
  return response.data;
};
export const verifyOtp = async (otpData) => {
  const response = await axios.post(`${API_URL}/verifyOTP`, otpData);
  return response.data;
};

export const sendOtp = async (otpData) => {
  const response = await axios.post(`${API_URL}/sendOTP`, otpData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data.token) {
    const user = {
      token: response.data.token,
      userInfo: response.data.userInfo,
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Login failed');
  }
};
export const resetPassword = async ({ mobile, otp, newPassword }) => {
  const response = await axios.post(`${API_URL}/resetPassword`, {
      mobile,
      otp,
      newPassword
  });
  return response.data;
};

export const forgotPassword = async ({mobile}) => {
  try {
      const response = await axios.post(`${API_URL}/forgotPassword`, { mobile });
      return response.data;
  } catch (error) {
      throw new Error('Error sending password reset mobile.');
  }
};
export const logout = () => {
  localStorage.removeItem('user');
};

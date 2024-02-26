import { API_BASE_URL } from '@/config/serverApiConfig';

import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

export const login = async ({ loginData }) => {
  try {
    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const response = await axiosInstance.post('login_user', JSON.stringify(loginData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { data } =  response;
    successHandler(
      { data, status:data.status },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
export const logout = async () => {
  axios.defaults.withCredentials = true;
  try {
    window.localStorage.clear();
    await axios.post(API_BASE_URL + `logout?timestamp=${new Date().getTime()}`);
    window.location.reload(); 
  } catch (error) {
    return errorHandler(error);
  }
};

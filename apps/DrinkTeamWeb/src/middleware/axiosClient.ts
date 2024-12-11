import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import queryClient from './queryClient';

const axiosClient = axios.create({
  baseURL:
    'http://drinkteambackend.aahch9eccpd3c4g9.germanywestcentral.azurecontainer.io:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    queryClient.invalidateQueries('Auth');
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

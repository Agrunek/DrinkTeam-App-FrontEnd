import axios from 'axios';

const axiosClient = axios.create({
  baseURL:
    'http://drink-team-backend.btdbb2gwh4ggakgx.germanywestcentral.azurecontainer.io:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

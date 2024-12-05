import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from './axiosClient';

export const signUp = async (userData) => {
  const response = await axiosClient.post('/user/register', userData);
  return response.data;
};

export const signIn = async (credentials) => {
  const response = await axiosClient.post('/user/login', credentials);
  const { token } = response.data;

  await AsyncStorage.setItem('token', token);
  return token;
};

export const signOut = async () => {
  await AsyncStorage.removeItem('token');
};

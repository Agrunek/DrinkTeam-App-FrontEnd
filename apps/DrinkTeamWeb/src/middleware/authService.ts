import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from './axiosClient';

export const signUp = async (userData) => {
  let response;
  try{
    response = await axiosClient.post('/user/register', userData);
  }catch(err){
    console.log(err)
    return null;
  }
  
  return response.status;
};

export const signIn = async (credentials) => {
  let response;
  try{
    response = await axiosClient.post('/user/login', credentials);
  }catch(err){
    console.log(err)
    return null;
  }
  const { access_token } = response.data;
  const { status } = response;
  await AsyncStorage.setItem('token', access_token);

  return {status, access_token};
};

export const signOut = async () => {
  await AsyncStorage.removeItem('token');
};

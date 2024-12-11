import { useQuery, useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { signIn, signOut, signUp} from '../middleware/authService'

export const useAuth = () => {
  const queryClient = useQueryClient() ;

  const { data: user, isLoading } = useQuery(
    'auth',
    async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return null;

      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        await AsyncStorage.removeItem('token');
        return null;
      }

      return decodedToken;
    },
    { staleTime: 0, cacheTime: 30000 }
  );

  const login = async (credentials) => {
    const {status} = await signIn(credentials);
    queryClient.invalidateQueries('auth');
    return status;
  };

  const register = async (user) => {
    return await signUp(user);
  }; 

  const logout = async () => {
    await signOut();
    queryClient.invalidateQueries('auth');
  };

  return { user, isLoading, login, logout, register };
};

import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
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
    { staleTime: Infinity, cacheTime: Infinity }
  );

  return { user, isLoading };
};

import axiosClient from './axiosClient';
import { useQuery } from '@tanstack/react-query';

export const fetchRecipies = async (searchString) => {
  const response = await axiosClient.get('/recipies', {
    params: {
      search: searchString,
    },
  });
  return response.data;
};

export const usePosts = (searchString) => {
  return useQuery({
    queryKey: ['recipies', searchString],
    queryFn: () => fetchRecipies(searchString),
    enabled: !!searchString,
  });
};

export const fetchTest = async (testString) => {
  const response = await axiosClient.get('/drink_team_test', {
    params: {
      name: testString
    }
  });
  return response.data;
}

export const useTest = (testString) => {
  return useQuery({
    queryKey: ['test', testString],
    queryFn: () => fetchTest(testString),
    enabled: true,
  });
};

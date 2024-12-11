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
      name: testString,
    },
  });
  return response.data;
};

export const useTest = (testString) => {
  return useQuery({
    queryKey: ['test', testString],
    queryFn: () => fetchTest(testString),
    enabled: true,
  });
};

export const fetchSearch = async () => {
  const response = await axiosClient.get('/recipe/all');
  return response.data;
};

export const useSearch = <T>() => {
  return useQuery<T>({
    queryKey: ['recipies', 'search'],
    queryFn: () => fetchSearch(),
    enabled: true,
  });
};

export const fetchExtra = async (id: number) => {
  const response = await axiosClient.get(`/recipe/${id}/recipe_extra`);
  return response.data;
};

export const useExtra = <T>(id: number) => {
  return useQuery<T>({
    queryKey: ['recipe', id, 'extra'],
    queryFn: () => fetchExtra(id),
    enabled: true,
  });
};

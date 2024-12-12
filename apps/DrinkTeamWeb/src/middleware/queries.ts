import axiosClient from './axiosClient';
import { useQuery } from 'react-query';

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

export const fetchSearch = async (value?: string) => {
  const response = await axiosClient.get(
    `/recipe/all${value ? `?search_by_name=${value}` : ''}`
  );
  return response.data;
};

export const useSearch = <T>(value?: string) => {
  return useQuery<T>({
    queryKey: ['recipies', 'search', value],
    queryFn: () => fetchSearch(value),
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

export const uploadReview = async (recipeId: number) => {
  const response = await axiosClient.post('/review/add', {
    comment: '',
    rating: 5,
    recipe_id: recipeId,
  });
  return response.data;
};

export const fetchProgress = async (recipeId: number) => {
  const response = await axiosClient.get(`/user_progress/${recipeId}`);
  return response.data;
};

export const useProgress = <T>(recipeId: number) => {
  return useQuery<T>({
    queryKey: ['recipe', recipeId, 'progress'],
    queryFn: () => fetchProgress(recipeId),
    enabled: true,
  });
};

export const postProgress = async (recipeId: number) => {
  const response = await axiosClient.post(`/user_progress/init/${recipeId}`);
  return response.data;
};

export const putProgres = async (recipeId: number, forward: boolean) => {
  const response = await axiosClient.put(
    `/user_progress/update/${recipeId}/${forward ? '1' : '0'}`
  );
  return response.data;
};

export const fetchUserProgress = async () => {
  const response = await axiosClient.get('/user_progress/recipe/all');
  return response.data;
};

export const useUserProgress = <T>() => {
  return useQuery<T>({
    queryKey: ['recipies', 'user-progress'],
    queryFn: () => fetchUserProgress(),
    enabled: true,
  });
};

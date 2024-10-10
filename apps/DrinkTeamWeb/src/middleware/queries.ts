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

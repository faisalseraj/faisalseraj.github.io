import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/shared/services';

export const useUser = (userId?: string) => {
  const { isLoading, isFetching, data, error } = useQuery(
    ['user', userId],
    () => getUser(userId!),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: userId !== undefined
    }
  );

  return {
    userLoading: isLoading,
    userFetching: isFetching,
    user: data,
    userError: error
  };
};

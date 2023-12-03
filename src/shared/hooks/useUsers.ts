import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getUsers, GetUsersOptions } from '@/shared/services';

export const useUsers = (options: GetUsersOptions) => {
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, error } = useQuery(
    ['users', options],
    async () => {
      const res = await getUsers(options);
      return res?.users ?? null;
    }
  );

  const refresh = () => {
    queryClient.invalidateQueries(['users', options]);
  };

  return {
    usersLoading: isLoading,
    users: data ?? null,
    usersError: error,
    refetch,
    refresh
  };
};

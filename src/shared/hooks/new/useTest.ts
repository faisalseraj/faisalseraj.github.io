import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GetUsersOptions } from '@/shared/services';
import { getTests } from '@/shared/services/new/tests';

export const useTests = (
  options: GetUsersOptions,
  enabled = true,
  type = ''
) => {
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, error } = useQuery(
    ['tests', options, type],
    async () => {
      const res = await getTests(options);
      return res?.data ?? null;
    },
    {
      enabled
    }
  );

  const refresh = () => {
    queryClient.invalidateQueries(['tests', options]);
  };

  return {
    testsLoading: isLoading,
    tests: data ?? null,
    testsError: error,
    refetch,
    refresh
  };
};

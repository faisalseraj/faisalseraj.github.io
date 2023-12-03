import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserSelf } from '../services/new/users';

const PARTICIPANT_AGE_NOT_TO_REQUIRE_PARENT_APPROVAL = 18;

export const useSelf = () => {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data, error, refetch, isRefetching } =
    useQuery(['self'], () => getUserSelf(), {
      staleTime: Infinity,
      cacheTime: Infinity,
      onError: (err) => {
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          // We can get stuck impersonating a user that no longer exists.
          // Stop the impersonation and refetch

          refetch();
          window.location.reload();
        }
      }
    });

  const refreshSelf = useCallback(() => {
    queryClient.invalidateQueries(['self']);
  }, [queryClient]);

  return {
    selfLoading: isLoading || isRefetching,
    selfFetching: isFetching,
    self: data,
    selfError: error,
    refreshSelf
  };
};

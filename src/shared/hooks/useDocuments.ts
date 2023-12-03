import { useInfiniteQuery } from '@tanstack/react-query';
import { getDocuments } from '@/shared/services/documents';

const PAGE_SIZE = 5;

export const useDocuments = () => {
  return useInfiniteQuery(
    ['documents'],
    ({ pageParam }) =>
      getDocuments({
        pageSize: PAGE_SIZE,
        pageKey: pageParam
      }),
    {
      getNextPageParam: (lastPage) => lastPage?.nextPageKey
    }
  );
};

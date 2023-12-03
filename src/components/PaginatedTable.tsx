import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  CircularProgress,
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react';

import { PaginatedParams } from '@/shared/services/index';
import { FormattedMessage } from '@/utils/intl';

import {
  FormattedRow,
  FormattedTable,
  FormattedTableProps
} from '@/components/FormattedTable';
import { TableSkeleton } from './pages/Reports/JudgesFormattedTable';

const PAGE_SIZE = 25;

type PaginatedTableProps<T, R extends { nextPageKey?: string }> = {
  queryKey: unknown[];
  resultsKey: keyof R;
  getPage: (query: PaginatedParams) => Promise<R | null>;
  pageSize?: number;
  formatRow?: (row: T) => FormattedRow<T>;
  filterRows?: (rows: T[]) => T[];
  cacheTime?: number;
  onSubmittingStatusChange?: (submitting: boolean) => void;
  onFetchMore?: () => void;
} & Omit<FormattedTableProps<T>, 'rows'>;

export const PaginatedTable = <T, R extends { nextPageKey?: string }>({
  queryKey,
  resultsKey,
  getPage,
  pageSize,
  formatRow,
  filterRows,
  onSubmittingStatusChange,
  cacheTime = 20 * 60 * 1000,
  onFetchMore = () => {
    return;
  },
  ...rest
}: PaginatedTableProps<T, R>) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    error
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam }) =>
      getPage({
        pageSize: pageSize ?? PAGE_SIZE,
        pageKey: pageParam
      }),
    {
      getNextPageParam: (lastPage) => lastPage?.nextPageKey,
      cacheTime,
      staleTime: Infinity
    }
  );

  const platform =
    useBreakpointValue({ base: 'mobile', md: 'desktop' }) ?? 'desktop';

  useEffect(() => {
    if (onSubmittingStatusChange) onSubmittingStatusChange(isLoading);
  }, [isLoading, onSubmittingStatusChange]);

  if (error) {
    console.log(error);
    return (
      <Alert status="error" variant="subtle">
        <AlertIcon />
        <FormattedMessage id="errors.ERR_UNKNOWN_ERROR_CALLING_ENDPOINT" />
      </Alert>
    );
  }

  const pages = data?.pages ?? [];
  const rows = pages.reduce<Array<T | FormattedRow<T>>>((acc, page) => {
    let rows = page ? (page[resultsKey] as unknown as T[]) : [];
    if (filterRows) rows = filterRows(rows);

    if (formatRow) return [...acc, ...(rows.map(formatRow) ?? [])];
    return [...acc, ...rows];
  }, []);

  if (isLoading || isRefetching) {
    if (platform === 'desktop') {
      return <TableSkeleton headings={rest.headings} />;
    } else {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
  }
  return (
    <>
      <>
        <FormattedTable rows={rows} {...rest} />

        {hasNextPage ? (
          <Box mt={4} textAlign="center">
            <Button
              isLoading={isFetchingNextPage}
              onClick={() => {
                fetchNextPage();
                onFetchMore && onFetchMore();
              }}
            >
              <FormattedMessage id="app.fetchMore" />
            </Button>
          </Box>
        ) : null}
      </>
    </>
  );
};

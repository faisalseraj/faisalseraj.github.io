import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  GetReportOptions,
  getReports,
  getReportsCount
} from '@/shared/services/new/reports';

export const useReports = (
  options: GetReportOptions,
  enabled = true,
  type = ''
) => {
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, error } = useQuery(
    ['tests', options, type],
    async () => {
      const res = await getReports(options);
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
    reportsLoading: isLoading,
    reports: data ?? null,
    reportsError: error,
    refetch,
    refresh
  };
};

export const useReportsCounts = (enabled = true, type = '') => {
  const queryClient = useQueryClient();

  const { isLoading, data, refetch, error } = useQuery(
    ['tests', type],
    async () => {
      const res = await getReportsCount();
      return res?.count ?? null;
    },
    {
      enabled
    }
  );

  const refresh = () => {
    queryClient.invalidateQueries(['tests']);
  };

  return {
    reportsCountLoading: isLoading,
    reportsCount: data ?? null,
    reportsCountError: error,
    refetch,
    refresh
  };
};

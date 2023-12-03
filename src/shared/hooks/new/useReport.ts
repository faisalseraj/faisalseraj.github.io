import { useQuery } from '@tanstack/react-query';

import { getReportById } from '@/shared/services/new/reports';
import { useReportRoute } from './useReportRoute';

export const useReport = (reportId?: string | null) => {
  const { id: urlId } = useReportRoute();
  const id = reportId ?? urlId;
  const { isLoading, isFetching, data, error, refetch } = useQuery(
    ['report', id],
    () => getReportById(id),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: id !== undefined
    }
  );

  return {
    reportLoading: isLoading,
    reportFetching: isFetching,
    report: data,
    reportError: error,
    refetch
  };
};

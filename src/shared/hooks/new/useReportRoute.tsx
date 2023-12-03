import { useRouter } from 'next/router';

export const useReportRoute = () => {
  const { query, pathname } = useRouter();
  const { id } = query || {};

  return {
    id: id?.[0] as unknown as string,
    pathname
  };
};

export const useReportPrintRoute = () => {
  const { query, pathname } = useRouter();
  const { id } = query || {};

  return {
    id: id as unknown as string,
    pathname
  };
};

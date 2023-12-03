import { useRouter } from 'next/router';

export const useQueryParams = () => {
  const router = useRouter();
  const setQueryParams = (key: string, value: string) => {
    router.replace({
      query: { ...router.query, [key]: value }
    });
  };

  return {
    setQueryParams
  };
};

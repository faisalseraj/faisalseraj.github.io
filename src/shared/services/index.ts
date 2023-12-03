export * from './new/users';

export type RegionPaginatedParams = {
  pageSize?: number;
  artRegionPageKey?: string;
  writingRegionPageKey?: string;
  pageNo?: number;
  status?: string;
};
export type PaginatedParams = {
  pageSize?: number;
  pageKey?: string;

  pageNo?: number;
};

export const regionPaginatedQueryParams = ({
  pageSize,
  artRegionPageKey,
  writingRegionPageKey
}: RegionPaginatedParams) => ({
  ...(pageSize ? { pageSize: `${pageSize}` } : undefined),
  ...(artRegionPageKey ? { artRegionPageKey } : undefined),
  ...(writingRegionPageKey ? { writingRegionPageKey } : undefined)
});

export const paginatedQueryParams = ({
  pageSize,
  pageKey,
  pageNo
}: PaginatedParams) => ({
  ...(pageSize ? { pageSize: `${pageSize}` } : undefined),
  ...(pageNo ? { pageNo: `${pageNo}` } : undefined),
  ...(pageKey ? { pageKey } : undefined)
});

export const call = async <T>(options: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  query?: Record<string, string>;
  data?: Record<string, unknown>;
  public?: boolean;
  partnerCode?: string;
}): Promise<T | null> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  try {
    if (!options.public) {
      const idToken = await localStorage.getItem('token');
      headers.append('Authorization', `Bearer ${idToken}`);
    }

    const method = options.method ?? 'GET';

    const url = `${process.env.NEXT_PUBLIC_API_URL}/${options.path}${
      options.query ? `?${new URLSearchParams(options.query).toString()}` : ''
    }`;

    const body = options.data ? JSON.stringify(options.data) : undefined;
    const res = await fetch(url, {
      mode: 'cors',
      method,
      headers,
      body
    });

    const resData = await res.json();

    // Commenting this code because I believe error handling is performed  on backend now, unComment if anything breaks
    // if (res.status !== 200 && res.status !== 201) {
    //   const errorData = resData as { code?: string; message?: string };

    //   // Ideally the server should throw error codes so that we can output a localized
    //   // error message.  This isn't currently the case.
    //   if (errorData.message !== undefined) throw new Error(errorData.message);
    //   if (errorData.code !== undefined) throw new Error(errorData.code);
    //   throw new Error(`ERR_${res.status}`);
    // }

    return resData ?? null;
  } catch (err) {
    console.log(err);
    // Auth.currentSession throws undefined errors when calling Auth.currentSession when not authenticated...
    if (err === undefined)
      throw new Error('ERR_UNKNOWN_ERROR_CALLING_ENDPOINT');

    throw err;
  }
};

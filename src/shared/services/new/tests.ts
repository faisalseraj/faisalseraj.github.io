import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import { call, PaginatedParams, paginatedQueryParams } from '..';

export type Tests = {
  _id: string;
  testName: string;
  category:
    | 'HAEMOTOLOGY'
    | 'DLC'
    | 'BIO-CHEMISTRY'
    | 'SEROLOGY'
    | 'BRUCELLA TEST'
    | 'WIDAL TEST'
    | 'TYPHIDOT'
    | 'URINE COMPLETE'
    | 'MICROSCOPY';
  normalRange: string;
  price: number;
};
export type GetTestOptions = PaginatedParams & {
  search?: string;
  sort?: 'asc' | 'desc';
};

export type UsersCountResponse = {
  entries: { count: number };
};

export type TestsResponse = {
  data: Tests[];
  nextPageKey: string;
  count?: string;
};

export const getTests = async (options: GetTestOptions) => {
  const data = await call<TestsResponse>({
    method: 'GET',
    path: `api/test/getAll`,
    query: {
      ...omit(omitBy(options, isNil), 'partnerCode'),
      ...paginatedQueryParams(options)
    }
  });

  return data ?? null;
};

export const getAllTests = async () => {
  const data = await call<TestsResponse>({
    method: 'GET',
    path: `api/test/getAll`
  });

  return data ?? null;
};

export const getTestsCount = async (options: GetTestOptions) => {
  const data = await call<UsersCountResponse>({
    method: 'GET',
    path: `/users`,
    query: {
      ...omit(omitBy(options, isNil), 'partnerCode'),
      ...paginatedQueryParams(options),
      count: 'true'
    }
  });

  return data ?? null;
};

export const updateUser = async (
  partnerCode: string,
  id: string,
  data: Partial<Tests>
) => {
  await call({
    method: 'POST',
    path: `/users/${id}`,
    data,
    partnerCode
  });
};

export const updateUserSelf = async (data: Partial<Tests>) => {
  await call({
    method: 'POST',
    path: '/users/self',
    data
  });
};

export const addTest = async (data: Partial<Tests>): Promise<Tests | null> => {
  return await call({
    method: 'POST',
    path: `api/test/create`,
    data
  });
};

export const updateTest = async (
  data: Partial<Tests>
): Promise<Tests | null> => {
  return await call({
    method: 'POST',
    path: `api/test/update`,
    data
  });
};

export const deleteTest = async (id: string[]): Promise<Tests | null> => {
  return await call({
    method: 'DELETE',
    path: `api/test/delete`,
    data: { id }
  });
};

export const addNewTest = async (
  data: Partial<Tests>
): Promise<Tests | null> => {
  return await call({
    method: 'POST',
    path: `/users`,
    data
  });
};

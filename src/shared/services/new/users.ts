import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import { User, UserSettings, UserType } from '@/shared/types';
import { call, PaginatedParams, paginatedQueryParams } from '..';

export const getUser = async (id: string) => {
  return await call<User>({
    method: 'GET',
    path: `/users/${id}`
  });
};

export const getUserSelf = async () => {
  return await call<User>({
    method: 'GET',
    path: 'api/auth/getMe'
  });
};

export const updateLastLogin = async () => {
  return await call({
    method: 'POST',
    path: '/user/update/lastLogin'
  });
};

export const login = async (data: { email: string; password: string }) => {
  return await call<{ message?: string; token?: string; error: 'string' }>({
    method: 'POST',
    path: 'api/auth/login',
    data
  });
};

export const register = async (data: Partial<User>) => {
  return await call<{ message?: string; token?: string; error: 'string' }>({
    method: 'POST',
    path: 'api/auth/register',
    data
  });
};

export type GetUsersOptions = PaginatedParams & {
  partnerCode?: string;
  type?: UserType;
  search?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  grade?: number;
  city?: string;
  state?: string;
  country?: string;
  schoolId?: string;
  educatorId?: string;
  parentFirstName?: string;
  parentLastName?: string;
  parentEmail?: string;
  hasEntries?: boolean;
  seasonYear?: number;
  sortBy?: string;
  withEntries?: boolean;
  withSchools?: boolean;
};

export type UsersCountResponse = {
  entries: { count: number };
};

export type UsersResponse = {
  users: User[];
  nextPageKey?: string;
};

export const getUsers = async (options: GetUsersOptions) => {
  const data = await call<UsersResponse>({
    method: 'GET',
    path: `/users`,
    query: {
      ...omit(omitBy(options, isNil), 'partnerCode'),
      ...paginatedQueryParams(options)
    },
    partnerCode: options.partnerCode
  });

  return data ?? null;
};

export const getUsersCount = async (options: GetUsersOptions) => {
  const data = await call<UsersCountResponse>({
    method: 'GET',
    path: `/users`,
    query: {
      ...omit(omitBy(options, isNil), 'partnerCode'),
      ...paginatedQueryParams(options),
      count: 'true'
    },
    partnerCode: options.partnerCode
  });

  return data ?? null;
};

export const updateUser = async (data: Partial<UserSettings>) => {
  return await call({
    method: 'POST',
    path: `api/auth/updateSettings`,
    data
  });
};

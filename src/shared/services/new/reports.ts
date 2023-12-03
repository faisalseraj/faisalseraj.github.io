import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

import { call, PaginatedParams, paginatedQueryParams } from '..';

export type ReportReports = {
  result: string;
  status: string;
  test: {
    id: string;
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
      | 'MICROSCOPY'
      | string;
    normalRange: string;
    price: number;
  };
};
export type Reports = {
  _id: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientContact: string;
  amount: number;
  discount: number;
  isFree: boolean;
  tests: ReportReports[];
  totalPayable: number;
  remarks: string;
  date: string;
};
export type GetReportOptions = PaginatedParams & {
  search?: string;
  sort?: 'asc' | 'desc';
};

export type UsersCountResponse = {
  entries: { count: number };
};

export type ReportsResponse = {
  data: Reports[];
  nextPageKey: string;
  count?: string;
};

export type ReportGenerateResponse = {
  report: Reports;
  message: string;
};

export const getReports = async (options: Partial<GetReportOptions>) => {
  const data = await call<ReportsResponse>({
    method: 'GET',
    path: `api/report/getAll`,
    query: {
      ...omit(omitBy(options, isNil), 'partnerCode'),
      ...paginatedQueryParams(options)
    }
  });

  return data ?? null;
};

export const getReportsCount = async () => {
  const data = await call<{ count: number }>({
    method: 'GET',
    path: `api/report/count`
  });

  return data ?? null;
};

export const getReportById = async (id: string) => {
  const data = await call<{ report: Reports }>({
    method: 'GET',
    path: `api/report/getById`,
    query: {
      id
    }
  });

  return data ?? null;
};

export const updateUser = async (
  partnerCode: string,
  id: string,
  data: Partial<Reports>
) => {
  await call({
    method: 'POST',
    path: `/users/${id}`,
    data,
    partnerCode
  });
};

export const updateUserSelf = async (data: Partial<Reports>) => {
  await call({
    method: 'POST',
    path: '/users/self',
    data
  });
};

export const addReport = async (
  data: Partial<Reports>
): Promise<ReportGenerateResponse | null> => {
  return await call({
    method: 'POST',
    path: `api/report/create`,
    data
  });
};

export const deleteReport = async (id: string[]): Promise<Reports | null> => {
  return await call({
    method: 'DELETE',
    path: `api/report/delete`,
    data: { id }
  });
};

export const addNewReport = async (
  data: Partial<Reports>
): Promise<Reports | null> => {
  return await call({
    method: 'POST',
    path: `/users`,
    data
  });
};

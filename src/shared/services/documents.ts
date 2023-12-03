import { Document } from '@/shared/types/Document';
import { call, PaginatedParams, paginatedQueryParams } from '.';

export type DocumentsResponse = {
  documents: Document[];
  nextPageKey?: string;
};

export const getDocument = async (id: string) => {
  return await call<Document>({
    method: 'GET',
    path: `/documents/${id}`
  });
};

export const getDocuments = async (paginatedParams: PaginatedParams) => {
  const data = await call<DocumentsResponse>({
    method: 'GET',
    path: '/documents',
    query: {
      ...paginatedQueryParams(paginatedParams)
    }
  });

  return data ?? null;
};

export const createDocument = async (data: Partial<Document>) => {
  return await call<Document>({
    method: 'POST',
    path: `/documents`,
    data
  });
};

export const updateDocument = async (id: string, data: Partial<Document>) => {
  await call({
    method: 'POST',
    path: `/documents/${id}`,
    data
  });
};

export const deleteDocument = async (id: string) => {
  await call({
    method: 'DELETE',
    path: `/documents/${id}`
  });
};

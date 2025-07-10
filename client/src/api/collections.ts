import api from './axios';

export const getAllCollections = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  fields?: string[];
}) => {
  const response = await api.get('/collections', {
    params: {
      ...params,
      fields: params?.fields?.join(','),
    },
  });
  return response.data;
};

export const getCollectionDetails = async (collectionHandle: string) => {
  const response = await api.get(`/collections/${collectionHandle}`);
  return response.data;
};

export const getCollectionProducts = async (
  collectionHandle: string,
  params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    vendor?: string;
    productType?: string;
    tags?: string[];
  }
) => {
  const response = await api.get(`/collections/${collectionHandle}/products`, {
    params: {
      ...params,
      tags: params?.tags?.join(','),
    },
  });
  return response.data.products;
};

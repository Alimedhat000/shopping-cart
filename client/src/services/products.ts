import api from './axios';

export const getAllProducts = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  fields?: string[];
  excludeId?: bigint;
}) => {
  const response = await api.get('/products', {
    params: {
      ...params,
      tags: params?.tags?.join(','),
      fields: params?.fields?.join(','),
    },
  });
  console.log({ products: response.data.products });

  return { products: response.data.products, count: response.data.count }; // wrap in object
};

export const getProductDetails = async (productHandle: string) => {
  const response = await api.get(`/products/${productHandle}`);
  return response.data;
};

import api from '../lib/axios';

interface ProductData {
  title: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
}

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const createProduct = async (
  data: ProductData,
) => {
  const res = await api.post(
    '/products',
    data,
  );

  return res.data;
};

export const deleteProduct = async (
  id: string,
) => {
  const res = await api.delete(
    `/products/${id}`,
  );

  return res.data;
};

export const updateProduct = async (
  id: string,
  data: ProductData,
) => {
  const res = await api.patch(
    `/products/${id}`,
    data,
  );

  return res.data;
};
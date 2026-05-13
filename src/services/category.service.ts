import api from '../lib/axios';

export type Category = {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

// GET
export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get('/categories');
  return res.data;
};

// CREATE
export const createCategory = async (
  data: Category
): Promise<Category> => {
  const res = await api.post('/categories', data);
  return res.data;
};

// UPDATE
export const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const res = await api.patch(
    `/categories/${id}`,
    data
  );
  return res.data;
};

// DELETE
export const deleteCategory = async (
  id: string
): Promise<{ success: boolean }> => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
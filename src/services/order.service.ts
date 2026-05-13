import api from '../lib/axios';

export const getAllOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};

export const getUserOrders = async (userId: string) => {
  const res = await api.get(
    `/orders/${userId}`,
  );
  return res.data;
};

export const updateOrderStatus = async (
  id: string,
  status: string,
) => {
  const res = await api.patch(
    `/orders/${id}`,
    { status },
  );
  return res.data;
};
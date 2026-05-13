'use client';

import { useEffect, useState } from 'react';

import {
  getAllOrders,
  updateOrderStatus,
} from '@/src/services/order.service';

type Order = {
  _id: string;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchData = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchData();
    };

    loadOrders();
  }, []);

  const handleStatus = async (
    id: string,
    status: string
  ) => {
    await updateOrderStatus(id, status);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Orders</h1>

      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.userId}</td>
              <td>{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{o.paymentStatus}</td>

              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    handleStatus(o._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

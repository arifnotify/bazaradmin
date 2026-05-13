'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/src/lib/axios';

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  items: OrderItem[];
};

export default function OrderDetails() {
  const params = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = async (id: string) => {
    const res = await api.get('/orders');

    const found = res.data.find(
      (o: Order) => o._id === id
    );

    setOrder(found || null);
  };

  useEffect(() => {
    if (!params?.id) return;

    const load = async () => {
      await fetchOrder(params.id);
    };

    load();
  }, [params?.id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1>Order Details</h1>

      <p>User: {order.userId}</p>
      <p>Total: {order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Payment: {order.paymentStatus}</p>

      <h2 className="mt-4">Items</h2>

      {order.items.map((item, i) => (
        <div key={i} className="border p-2">
          <p>{item.name}</p>
          <p>
            {item.quantity} x {item.price}
          </p>
        </div>
      ))}
    </div>
  );
}

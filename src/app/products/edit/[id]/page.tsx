'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import api from '@/src/lib/axios';
import { updateProduct } from '@/src/services/product.service';

type ProductForm = {
  title: string;
  price: number;
};

export default function EditProduct() {
  const params = useParams<{ id: string }>();

  const [form, setForm] = useState<ProductForm>({
    title: '',
    price: 0,
  });

  const fetchProduct = async (id: string) => {
    const res = await api.get(`/products/${id}`);

    const data = res.data;

    setForm({
      title: data.title ?? '',
      price: data.price ?? 0,
    });
  };

  useEffect(() => {
    if (!params?.id) return;

    const load = async () => {
      await fetchProduct(params.id);
    };

    load();
  }, [params?.id]);

  const handleUpdate = async () => {
    if (!params?.id) return;

    await updateProduct(params.id, {
      title: form.title,
      price: Number(form.price), // ✅ IMPORTANT FIX
    });

    alert('Product Updated');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Product</h1>

      {/* Title */}
      <input
        className="border p-2 w-full"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder="Product Title"
      />

      {/* Price */}
      <input
        className="border p-2 w-full"
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            price: Number(e.target.value), // ✅ convert to number
          }))
        }
        placeholder="Price"
      />

      <button
        onClick={handleUpdate}
        className="bg-black text-white px-4 py-2"
      >
        Update Product
      </button>
    </div>
  );
}
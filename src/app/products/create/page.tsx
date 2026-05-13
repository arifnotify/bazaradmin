'use client';

import { useState } from 'react';
import { createProduct } from '@/src/services/product.service';

type ProductForm = {
  name: string;
  price: string;
  category: string;
  image: string;
};

export default function CreateProduct() {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    category: '',
    image: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await createProduct({
        ...form,
        price: Number(form.price),
        title: ''
    });

    alert('Product Created');
  };

  return (
    <div className="p-6">
      <h1>Create Product</h1>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="border p-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white p-2"
      >
        Save
      </button>
    </div>
  );
}
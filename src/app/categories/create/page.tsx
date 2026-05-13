'use client';

import { useState } from 'react';
import { createCategory } from '@/src/services/category.service';

type CategoryForm = {
  name: string;
  image: string;
};

export default function CreateCategory() {
  const [form, setForm] = useState<CategoryForm>({
    name: '',
    image: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await createCategory(form);
    alert('Category Created');
  };

  return (
    <div className="p-6">
      <h1>Create Category</h1>

      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
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
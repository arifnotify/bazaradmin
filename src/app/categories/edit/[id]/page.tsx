'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/axios';
import { updateCategory } from '@/src/services/category.service';
import { useParams } from 'next/navigation';

type CategoryForm = {
  name: string;
  image: string;
};

export default function EditCategory() {
  const params = useParams<{ id: string }>();

  const [form, setForm] = useState<CategoryForm>({
    name: '',
    image: '',
  });

  // ✅ fetch category
  const fetchCategory = async (id: string) => {
    const res = await api.get(`/categories/${id}`);

    setForm({
      name: res.data.name ?? '',
      image: res.data.image ?? '',
    });
  };

  // ✅ safe useEffect pattern
  useEffect(() => {
    if (!params?.id) return;

    const load = async () => {
      await fetchCategory(params.id);
    };

    load();
  }, [params?.id]);

  // ✅ update
  const handleUpdate = async () => {
    if (!params?.id) return;

    await updateCategory(params.id, form);

    alert('Updated');
  };

  return (
    <div className="p-6">
      <h1>Edit Category</h1>

      <input
        value={form.name}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        placeholder="Name"
      />

      <input
        value={form.image}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            image: e.target.value,
          }))
        }
        placeholder="Image"
      />

      <button
        onClick={handleUpdate}
        className="bg-black text-white p-2"
      >
        Update
      </button>
    </div>
  );
}

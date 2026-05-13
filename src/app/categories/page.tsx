'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/axios';

/* ✅ Single page type (NO separate file needed) */
type Category = {
  _id?: string;
  name: string;
  image?: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  /* ✅ GET categories */
  const getCategories = async (): Promise<Category[]> => {
    const res = await api.get('/categories');
    return res.data;
  };

  /* ✅ DELETE category */
  const deleteCategory = async (id: string) => {
    await api.delete(`/categories/${id}`);
  };

  /* ✅ Load data */
  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    load();
  }, []);

  /* ✅ Handle delete */
  const handleDelete = async (id: string) => {
    await deleteCategory(id);

    // refresh
    const data = await getCategories();
    setCategories(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Categories
      </h1>

      <a
        href="/categories/create"
        className="bg-black text-white px-3 py-2 inline-block mb-4"
      >
        Add Category
      </a>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Image</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className="border-t">
              {/* Name */}
              <td className="p-2">{c.name}</td>

              {/* Image */}
              <td className="p-2">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    width={50}
                  />
                ) : (
                  <span className="text-gray-400">
                    No image
                  </span>
                )}
              </td>

              {/* Action */}
              <td className="p-2 space-x-2">
                <a
                  href={`/categories/edit/${c._id}`}
                  className="text-blue-600"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(c._id!)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

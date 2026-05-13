'use client';

import { useEffect, useState } from 'react';
import {
  getProducts,
  deleteProduct,
} from '@/src/services/product.service';

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    const loadProducts = async () => {
      await fetchData();
    };

    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Products</h1>

      <a
        href="/products/create"
        className="bg-black text-white p-2 inline-block my-4"
      >
        Add Product
      </a>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>

              <td>
                <a href={`/products/edit/${p._id}`}>Edit</a>

                <button onClick={() => handleDelete(p._id)}>
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
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/src/services/auth.service';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const handleLogin = async () => {
    try {
      const res = await adminLogin(
        email,
        password,
      );

      // Save token
      localStorage.setItem(
        'admin_token',
        res.token,
      );

      // Save token in cookie
      document.cookie = `admin_token=${res.token}; path=/`;

      // Redirect
      router.push('/dashboard');
    } catch (error) {
      alert('Login Failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 border rounded-xl w-80 bg-white shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h1>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white w-full p-2 rounded hover:opacity-90"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

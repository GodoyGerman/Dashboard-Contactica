import React from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../components/UserForm';

export default function NewUser() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const handleCreate = async (data) => {
    const res = await fetch(`${API}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.status === 201) {
      router.push('/');
    } else {
      const body = await res.json();
      throw new Error(body.error || 'Error creando usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crear usuario</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa los datos del nuevo usuario
          </p>
        </div>
        <UserForm onSubmit={handleCreate} submitLabel="Crear usuario" />
      </div>
    </div>
  );
}

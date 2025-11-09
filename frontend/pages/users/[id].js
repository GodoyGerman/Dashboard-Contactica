import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../components/UserForm';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/users/${id}`);
        if (!res.ok) throw new Error('Usuario no encontrado');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (data) => {
    const res = await fetch(`${API}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      router.push('/');
    } else {
      const body = await res.json();
      throw new Error(body.error || 'Error actualizando usuario');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Eliminar usuario?')) return;
    const res = await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
    if (res.status === 204) router.push('/');
    else {
      const body = await res.json();
      alert(body.error || 'Error eliminando');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-600">Cargando...</div>
    </div>
  );
  
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Usuario no encontrado</h2>
        <button
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editar usuario</h1>
          <p className="mt-2 text-sm text-gray-600">
            Modifica los datos del usuario
          </p>
        </div>
        
        <UserForm initial={user} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
        
        <div className="mt-8 text-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

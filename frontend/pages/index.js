import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null); // ID del usuario siendo eliminado

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/users`);
      if (!res.ok) throw new Error('Error cargando usuarios');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    
    setDeleting(id);
    try {
      const res = await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
      if (res.status === 204) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        const body = await res.json();
        throw new Error(body.error || 'Error al eliminar el usuario');
      }
    } catch (err) {
      console.error('Error deleting:', err);
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold m-0">Dashboard Usuarios</h1>
        <Link 
          href="/users/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Crear usuario
        </Link>
      </div>

      {loading && (
        <div className="text-center p-5">
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded mb-5">
          <p className="text-red-700 m-0">{error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No hay usuarios registrados.</p>
          <p>
            <Link 
              href="/users/new"
              className="text-blue-600 underline hover:text-blue-800"
            >
              ¡Crea el primer usuario!
            </Link>
          </p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-200 p-3 text-left">#</th>
                <th className="border-b-2 border-gray-200 p-3 text-left">Nombre</th>
                <th className="border-b-2 border-gray-200 p-3 text-left">Email</th>
                <th className="border-b-2 border-gray-200 p-3 text-left">Ciudad</th>
                <th className="border-b-2 border-gray-200 p-3 text-left">Empresa</th>
                <th className="border-b-2 border-gray-200 p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={`${
                  deleting === u.id ? 'bg-red-50 opacity-60' : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="p-3 border-b border-gray-100">{u.id}</td>
                  <td className="p-3 border-b border-gray-100">{u.nombre}</td>
                  <td className="p-3 border-b border-gray-100">{u.email}</td>
                  <td className="p-3 border-b border-gray-100">{u.ciudad || '-'}</td>
                  <td className="p-3 border-b border-gray-100">{u.empresa || '-'}</td>
                  <td className="p-3 border-b border-gray-100">
                    <Link 
                      href={`/users/${u.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={(e) => handleDelete(u.id)}
                      disabled={deleting === u.id}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-inherit underline bg-transparent border-0 p-0 cursor-pointer"
                    >
                      {deleting === u.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
     
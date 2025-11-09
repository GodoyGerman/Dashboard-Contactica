# Frontend - dashboard-usuarios

Interfaz Next.js para consumir la API del backend (CRUD de usuarios).

Variables de entorno (archivo `.env.local` en la carpeta `frontend`):

NEXT_PUBLIC_API_URL=http://localhost:3001

Instalación y ejecución:

1. Abrir la carpeta frontend:

   cd e:\dashboard-usuarios\frontend

2. Instalar dependencias:

   npm install

3. Agregar `.env.local` con la URL de la API (si usas la configuración por defecto no es necesario):

   NEXT_PUBLIC_API_URL=http://localhost:3001

4. Ejecutar en desarrollo:

   npm run dev

Páginas implementadas:
- `/` — Lista de usuarios (editar / eliminar)
- `/users/new` — Crear usuario
- `/users/:id` — Editar usuario

Notas:
- El frontend usa `fetch` para comunicarse con la API. Asegúrate de que el backend esté corriendo en la URL indicada.
- Para producción, construye con `npm run build` y luego `npm start`.

# Backend - dashboard-usuarios

API REST construida con Node.js, Express y Prisma conectada a MySQL.

Requisitos:
- Node.js >= 16
- MySQL

Instalación y puesta en marcha:

1. Copia `.env.example` a `.env` y ajusta `DATABASE_URL` con tus credenciales MySQL.

2. Instala dependencias:

   npm install

3. Genera cliente Prisma y crea la migración (opcional si ya tienes la DB):

   npx prisma generate
   npx prisma migrate dev --name init

4. Inicia la API:

   npm run start

Endpoints disponibles:

- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

El modelo Prisma `User` contiene: id, nombre, email, telefono, ciudad, empresa, creado_at, actualizado_at.

Notas:
- `DATABASE_URL` debe tener el formato: mysql://user:password@host:3306/dbname
- Para desarrollo recomiendo usar `nodemon` con `npm run dev`.

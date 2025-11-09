const express = require('express');
const cors = require('cors');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// List users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
});

// Get user by id
app.get('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  const { nombre, email, telefono, ciudad, empresa } = req.body;
  if (!nombre || !email) return res.status(400).json({ error: 'nombre y email son requeridos' });

  try {
    const newUser = await prisma.user.create({
      data: { nombre, email, telefono, ciudad, empresa }
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    // Manejo de errores de Prisma (mejor detectar el tipo conocido)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'Email ya registrado' });
      }
    }
    res.status(500).json({ error: 'Error creando usuario' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const { nombre, email, telefono, ciudad, empresa } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { nombre, email, telefono, ciudad, empresa }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      if (err.code === 'P2002') {
        return res.status(409).json({ error: 'Email ya registrado' });
      }
    }
    res.status(500).json({ error: 'Error actualizando usuario' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down...');
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error('Error during prisma disconnect', e);
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

# 🚀 Dashboard de Usuarios

> Sistema de gestión de usuarios con integración WordPress, desarrollado con Next.js y Express

[![Node.js Version][node-version]][node-url]
[![Next.js Version][next-version]][next-url]
[![License][license-image]][license-url]

## 📋 Descripción

Dashboard de Usuarios es una aplicación web full-stack que proporciona una interfaz moderna y eficiente para la gestión de usuarios, con integración directa a WordPress mediante un plugin personalizado. El sistema permite realizar operaciones CRUD completas sobre usuarios con una experiencia de usuario fluida y responsiva.

## ✨ Características Principales

- 🔐 Gestión completa de usuarios (CRUD)
- 🎨 Interfaz moderna con Tailwind CSS
- 🔌 Integración con WordPress
- 📱 Diseño totalmente responsivo
- ⚡ Renderizado del lado del servidor
- 🛡️ Validación de datos
- 🌐 API RESTful

## 🛠️ Tecnologías

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL

### Frontend
- Next.js 14.2.0
- React 18.2.0
- Tailwind CSS 3.3.0
- PostCSS 8.4.31

### WordPress Plugin
- PHP
- WordPress REST API

## 📦 Estructura del Proyecto

\`\`\`
dashboard-usuarios/
├── backend/               # Servidor Express
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── server.js
│   ├── prisma/
│   └── package.json
├── frontend/             # Aplicación Next.js
│   ├── components/
│   ├── pages/
│   │   └── users/
│   ├── styles/
│   └── package.json
└── wordpress-plugin/     # Plugin de WordPress
    └── dashboard-usuarios.php
\`\`\`

## ⚙️ Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- WordPress (para la funcionalidad completa)

### Variables de Entorno

#### Backend (.env)
\`\`\`env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"
PORT=3001
\`\`\`

#### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone [AGREGAR URL]
cd dashboard-usuarios
\`\`\`

2. **Configurar el Backend**
\`\`\`bash
cd backend
npm install
npx prisma migrate dev
npm run dev
\`\`\`

3. **Configurar el Frontend**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

4. **Instalar el Plugin de WordPress**
- Copiar la carpeta \`wordpress-plugin\` a \`wp-content/plugins/\` de tu instalación WordPress
- Activar el plugin desde el panel de administración de WordPress

## 🚀 Uso

1. Accede a la aplicación en \`http://localhost:3000\`
2. Utiliza la interfaz para:
   - Ver listado de usuarios
   - Crear nuevos usuarios
   - Editar usuarios existentes
   - Eliminar usuarios

## 📸 Capturas de Pantalla

[AGREGAR IMÁGENES]

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de características (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add: nueva característica'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👤 Autor

**Ing. Germán Hemelber Godoy Barragan**

* Website: [[Portafolio](https://portafoliogermangodoy.netlify.app/)]
* GitHub: [@germanhemelb](https://github.com/GodoyGerman)
* LinkedIn: [Germán Hemelber Godoy Barragan](https://www.linkedin.com/in/german-h-godoy-barragan-1a909b196/)

## 🗺️ Roadmap

- [ ] Implementación de autenticación OAuth
- [ ] Panel de administración extendido
- [ ] Integración con más CMS además de WordPress
- [ ] Soporte para múltiples idiomas
- [ ] Sistema de roles y permisos

## ❓ FAQ

**P: ¿Puedo usar el plugin sin el dashboard?**
R: Sí, el plugin de WordPress funciona de manera independiente.

**P: ¿Qué versión mínima de WordPress se requiere?**
R: Se recomienda WordPress 5.8 o superior.

**P: ¿Cómo actualizo la base de datos?**
R: Utiliza los comandos de Prisma (\`npx prisma migrate dev\`) para actualizar el esquema.

---

[node-version]: https://img.shields.io/badge/node-v14+-green.svg
[node-url]: https://nodejs.org
[next-version]: https://img.shields.io/badge/next.js-14.2.0-black.svg
[next-url]: https://nextjs.org
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE.md

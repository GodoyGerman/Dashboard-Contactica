# WordPress Plugin - dashboard-usuarios

Plugin simple que registra un endpoint REST (`/wp-json/dashboard-usuarios/v1/users`) que por defecto hace proxy hacia la API del backend en `http://localhost:3001/api/users`.

Instalación:

1. Copia la carpeta `wordpress-plugin` dentro de `wp-content/plugins/` en tu instalación de WordPress.
2. Activa el plugin desde el panel de administración.

Configuración:
- Si tu backend está en otra URL, puedes definir la constante `DU_BACKEND_URL` en `wp-config.php`:

  define('DU_BACKEND_URL', 'https://mi-backend.example.com/api/users');

Endpoint:
- GET /wp-json/dashboard-usuarios/v1/users  — devuelve la lista de usuarios obtenida del backend

Nota: Este plugin es un proxy simple. Para extenderlo (POST/PUT/DELETE y autenticación) es necesario agregar control de permisos y sanitización.

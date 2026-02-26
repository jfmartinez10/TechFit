# TechFit API
API REST para la gestión de reservas de clases en una cadena de gimnasios inteligentes.  
Desarrollada con **Node.js**, **Express** y **PostgreSQL (Supabase)**.

---

## 🗂️ Estructura del proyecto
```
techfit-api/
├── database/           → Schema SQL de la base de datos
├── docs/
│   └── images/         → Capturas de verificación con Insomnia
├── src/
│   ├── index.js        → Punto de entrada del servidor
│   ├── db.js           → Conexión al pool de PostgreSQL
│   ├── cron/           → Tareas programadas automáticas
│   ├── routes/         → Definición de endpoints
│   ├── controllers/    → Validación de peticiones y respuestas
│   └── services/       → Lógica de negocio y consultas SQL
├── .env.example        → Variables de entorno necesarias
└── package.json        → Dependencias y scripts
```

---

## ⚙️ Instalación y arranque

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/techfit-api.git
cd TechFit
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```
Edita el `.env` con tus credenciales de Supabase:
```
PORT=3000
NODE_ENV=development

DB_URL=postgresql://postgres.tkwiseqfoseoknjvdtwv:[YOUR-PASSWORD]@aws-1-eu-west-2.pooler.supabase.com:5432/postgres
```

### 4. Crear las tablas en Supabase
Ve a **Supabase → SQL Editor → New Query**, pega el contenido de `database/schema.sql` y ejecútalo.

### 5. Arrancar el servidor
```bash
npm start
```
El servidor arranca en `http://localhost:3000` con recarga automática gracias a `--watch`.

---

## 🗄️ Base de datos

| Tabla | Campos principales |
|---|---|
| `usuarios` | id, nombre, email, fecha_fin_suscripcion, created_at |
| `clases` | id, nombre, aforo_maximo, fecha_hora, estado, created_at |
| `reservas` | id, id_usuario, id_clase, estado_reserva, created_at |

### Relaciones
- Un **usuario** puede tener muchas **reservas**
- Una **clase** puede tener muchas **reservas**
- Una **reserva** pertenece a un usuario y a una clase

---

## 🔌 Endpoints

### 👤 Usuarios — `/api/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Lista todos los usuarios |
| GET | `/api/usuarios/:id` | Obtiene un usuario por ID |
| POST | `/api/usuarios` | Crea un nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualiza todos los campos |
| PATCH | `/api/usuarios/:id` | Actualiza solo los campos enviados |
| DELETE | `/api/usuarios/:id` | Elimina un usuario y sus reservas |

### 🏃 Clases — `/api/clases`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/clases` | Lista todas las clases con aforo restante |
| GET | `/api/clases/:id` | Obtiene una clase por ID |
| POST | `/api/clases` | Crea una nueva clase |
| PUT | `/api/clases/:id` | Actualiza todos los campos |
| PATCH | `/api/clases/:id` | Actualiza solo los campos enviados |
| DELETE | `/api/clases/:id` | Elimina una clase |

### 📋 Reservas — `/api/reservas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reservas` | Lista todas las reservas |
| GET | `/api/reservas/:id` | Obtiene una reserva por ID |
| POST | `/api/reservas` | Crea una reserva (valida aforo y suscripción) |
| PATCH | `/api/reservas/:id/cancelar` | Cancela una reserva |
| DELETE | `/api/reservas/:id` | Elimina una reserva |

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework HTTP |
| PostgreSQL | Base de datos relacional |
| Supabase | Hosting de la base de datos |
| pg (node-postgres) | Cliente PostgreSQL para Node |
| node-cron | Tareas programadas |

---

## 👤 Autor

**José Fernando Martínez** — Grado Superior DAW · CESUR · 2025/2026
```
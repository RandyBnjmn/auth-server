# Auth-server

Este repositorio contiene un Servidor de Autenticación desarrollado con NestJS, como parte de una demostración práctica requerida en un entorno estudiantil universitario. El sistema fue diseñado para simular la gestión segura de usuarios, utilizando JWT para autenticación sin estado, bcrypt para el cifrado de contraseñas, y conexión a una base de datos PostgreSQL mediante Prisma ORM.**.

---

## 📚 Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Casos de Uso](#casos-de-uso)
- [Referencia de API](#referencia-de-api)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Licencia](#licencia)

---

## ✅ Características

- **Registro e inicio de sesión de usuarios**
- **Autenticación con JWT**
- **Cifrado seguro de contraseñas con bcrypt**
- **Manejo de sesiones con refresh tokens**
- **Validación de datos mediante DTOs**
- **Integración con PostgreSQL usando Prisma**
- **Código modular y escalable basado en NestJS**

---

## 🧱 Arquitectura

- **NestJS** como framework principal.
- **PostgreSQL** como base de datos relacional.
- **Prisma** para la gestión de datos (ORM).
- **JWT** para autenticación.
- **bcrypt** para proteger contraseñas.
- **Docker Compose** opcional para base de datos en local.

---

## 🧩 Casos de Uso

### 1. Registro de Usuario
- **Ruta:** `POST /auth/register`
- **Descripción:** Registra un nuevo usuario. Cifra la contraseña y guarda el usuario en la base de datos.

### 2. Login de Usuario
- **Ruta:** `POST /auth/login`
- **Descripción:** Autentica las credenciales del usuario y genera JWT y refresh token.

### 3. Renovación de Token
- **Ruta:** `POST /auth/refresh`
- **Descripción:** Permite obtener un nuevo token JWT usando el refresh token.

### 4. Logout
- **Ruta:** `POST /auth/logout`
- **Descripción:** Invalida el refresh token del usuario.

---

## 🔗 Referencia de API

| Endpoint           | Método | Descripción                   | Requiere Auth |
|--------------------|--------|-------------------------------|---------------|
| `/auth/register`   | POST   | Registrar nuevo usuario       | No            |
| `/auth/login`      | POST   | Autenticación de usuario      | No            |
| `/auth/refresh`    | POST   | Renovar token de acceso       | Sí            |
| `/auth/logout`     | POST   | Cerrar sesión del usuario     | Sí            |

---

## ⚙️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd auth-server
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:password@localhost:5432/tu_basededatos
   JWT_SECRET=secretojwt
   JWT_EXPIRES_IN=1h
   REFRESH_TOKEN_SECRET=secretorefresh
   REFRESH_TOKEN_EXPIRES_IN=7d
   ```

4. **Ejecutar las migraciones de Prisma:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Iniciar el servidor:**
   ```bash
   npm run start:dev
   ```

---

## 🔐 Variables de Entorno

| Variable                   | Descripción                             |
|----------------------------|-----------------------------------------|
| `PORT`                     | Puerto en el que correrá la aplicación  |
| `DATABASE_URL`             | URL de conexión a PostgreSQL            |
| `JWT_SECRET`               | Clave para firmar los tokens JWT        |
| `JWT_EXPIRES_IN`           | Tiempo de expiración del JWT            |
| `REFRESH_TOKEN_SECRET`     | Clave para firmar el refresh token      |
| `REFRESH_TOKEN_EXPIRES_IN` | Tiempo de expiración del refresh token  |

---

## 📁 Estructura del Proyecto

```
auth-server/
├── prisma/                    # Esquema y migraciones Prisma
│   └── schema.prisma
├── src/
│   ├── auth/                  # Módulo de autenticación
│   │   ├── dtos/              # Data Transfer Objects (validación)
│   │   ├── strategies/        # Estrategias de Passport
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── common/                # Decoradores, guards, interfaces
│   ├── config/                # Configuración del entorno
│   ├── prisma/                # Módulo Prisma (servicio y módulo)
│   ├── app.module.ts
│   └── main.ts
├── test/                      # Pruebas
├── .env
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

- **NestJS** – Framework para aplicaciones escalables en Node.js
- **PostgreSQL** – Base de datos relacional
- **Prisma ORM** – ORM moderno para PostgreSQL
- **JWT** – Autenticación basada en tokens
- **bcrypt** – Cifrado de contraseñas
- **dotenv** – Gestión de variables de entorno

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
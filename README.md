# 🔐 Secrets App

App full-stack para guardar secretos de forma segura, con autenticación, CRUD completo, filtros y paginación.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🔐 Autenticación con email/contraseña y Google OAuth
- 📝 CRUD completo de secretos
- 🏷️ Tipos de secreto: Normal, Medio, Hard 🔥
- ⭐ Marcar secretos como favoritos
- 🔍 Búsqueda en tiempo real
- 🎛️ Filtros por tipo y favoritos
- 📅 Ordenar por fecha
- 📄 Paginación
- 📱 Mobile first
- 🍞 Notificaciones con Toastify

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| [Next.js 15](https://nextjs.org) | Framework full-stack |
| [Better Auth](https://better-auth.com) | Autenticación |
| [Prisma 6](https://prisma.io) | ORM |
| [Neon](https://neon.tech) | PostgreSQL serverless |
| [Zustand](https://zustand-demo.pmnd.rs) | Estado global |
| [Zod](https://zod.dev) | Validaciones |
| [React Hook Form](https://react-hook-form.com) | Formularios |
| [Tailwind CSS](https://tailwindcss.com) | Estilos |
| [React Toastify](https://fkhadra.github.io/react-toastify) | Notificaciones |

## 🚀 Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/secrets-app.git
cd secrets-app
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="tu-secret-aqui"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="tu-client-id"
GOOGLE_CLIENT_SECRET="tu-client-secret"
```

### 4. Genera el cliente de Prisma y crea las tablas

```bash
npx prisma generate
npx prisma db push
```

### 5. Corre el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   └── secrets/
│   └── api/
│       ├── auth/
│       └── secrets/
├── components/
│   └── secrets/
│       ├── SecretCard.tsx
│       ├── SecretFilters.tsx
│       └── SecretForm.tsx
├── hooks/
│   └── useSecrets.ts
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   ├── prisma.ts
│   └── validations/
│       ├── auth.ts
│       └── secret.ts
├── store/
│   ├── useAuthStore.ts
│   └── useSecretsStore.ts
└── types/
    └── index.ts
```

## 🌐 Deploy en Vercel

1. Importa el repositorio en [Vercel](https://vercel.com)
2. Agrega las variables de entorno con tu URL de producción
3. Agrega la URL de producción en Google Cloud Console como redirect URI autorizado:
```
https://tu-app.vercel.app/api/auth/callback/google
```

## 📝 Variables de entorno en producción

```env
DATABASE_URL=tu-neon-url
BETTER_AUTH_SECRET=tu-secret
BETTER_AUTH_URL=https://tu-app.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://tu-app.vercel.app
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_CLIENT_SECRET=tu-client-secret
```

## 📸 Screenshots

> Próximamente...

## 📄 Licencia

MIT

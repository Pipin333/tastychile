# Selva Alta Roasters - TastyChile ☕🏔️

Plataforma moderna para la adquisición de café de especialidad de la Amazonía Peruana. Cuenta con gestión del catálogo de cafés, sistema de lista de espera corporativa (B2B) y membresías para consumidores (Club).

## 🚀 Características Principales

- **Landing Page Optimizada**: Interfaz orientada a la conversión y presentación de cafés premium.
- **Portal B2B**: Formulario dedicado para contacto con empresas, cafeterías, HORECA y retail de forma fluida.
- **Club Memberships (B2C)**: Programa de subscripción y venta directa para amantes del café de especialidad (Waitlist).
- **Backend Moderno y Responsivo**: Uso de **React Server Actions** para peticiones fluidas del cliente al servidor sin endpoints intermedios.
- **Integración con Base de Datos**: Vercel Postgres + Neon DB para una gestión de datos rápida y *serverless*.
- **Diseño Ultra-rápido**: Utilizando Tailwind CSS v4 para un diseño minimalista, moderno y adaptado a dispositivos móviles.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Vercel Postgres + Neon Database (`@neondatabase/serverless`)
- **Linting**: ESLint + Prettier

## 📋 Requisitos Previos

- Node.js 18+ o superior.
- npm, yarn o pnpm.
- Una base de datos en [Neon](https://neon.tech/) o [Vercel Postgres](https://vercel.com/postgres).

## ⚙️ Configuración del Entorno (Variables de Entorno)

Crea un archivo `.env.local` en la raíz del proyecto y agrega tus credenciales de la base de datos:

```env
# Variables para conexión a Neon o Vercel Postgres
DATABASE_URL="postgresql://usuario:contraseña@servidor.neon.tech/neondb?sslmode=require"
# En caso de desplegar con prefijo en Vercel:
TASTY_DATABASE_URL="postgresql://... "
TASTY_POSTGRES_URL="postgresql://... "
```

> **Nota:** El archivo `actions.ts` detectará automáticamente estas variables. Asegúrate de ejecutar también las migraciones/tablas (e.g. tablas `waitlist` y `b2b_contacts`).

## 🏁 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la interfaz.

## 📁 Estructura Principal del Proyecto

```text
src/
├── app/
│   ├── actions.ts          # Server Actions para manejo de Formularios y DB
│   ├── layout.tsx          # Layout principal global (Root Layout)
│   ├── page.tsx            # Landing Page (Inicio)
│   ├── b2b/               
│   │   └── page.tsx        # Sección catálogo "Nuestras Variedades" y B2B
│   └── club/               
│       └── page.tsx        # Sección "El Club" y B2C
└── components/
    └── Navbar.tsx          # Navegación principal reusable
```

## 🌿 Flujo de Trabajo (Git)

- **`main`**: Rama de producción (código estable, directamente ligada a Vercel/Producción).
- **`dev`**: Rama de desarrollo (todas las nuevas funcionalidades se inician y testean aquí).

Para comenzar a agregar algo nuevo:
```bash
git checkout dev
git checkout -b feature/nueva-funcionalidad
```

## 🚀 Despliegue

Este proyecto está optimizado para desplegar fácilmente en [Vercel](https://vercel.com).
La plataforma de Vercel detectará automáticamente que es un proyecto de Next.js y aplicará las configuraciones de construcción por defecto (`next build`). 

## 📄 Licencia

Proyecto privado - TastyChile (Selva Alta Roasters)

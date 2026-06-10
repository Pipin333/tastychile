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

Crea un archivo `.env.local` en la raíz del proyecto (y configura las variables en Vercel para producción):

```env
# 1. Base de Datos (Neon / Vercel Postgres)
DATABASE_URL="postgresql://neondb_owner:npg_...sa-east-1.aws.neon.tech/neondb?sslmode=require"

# 2. Resend (Envío de Correos Corporativos)
RESEND_API_KEY="re_xxxxxxxxxxxx"
# Remitente verificado en Resend. Si no se especifica, usa 'Selva Alta <onboarding@resend.dev>' (sandbox de prueba).
RESEND_FROM_EMAIL="Selva Alta Roasters <no-reply@selvaalta.cl>"
# Email del negocio donde te llegarán las alertas de pedidos y B2B leads
CONTACT_EMAIL="comercial@selvaalta.cl"

# 3. Mercado Pago (Pasarela de Pagos)
# Token de acceso de producción o sandbox obtenido en mercadopago.cl -> Credenciales.
# Si no se define, el sistema funcionará automáticamente en modo "Wizard of Oz" (transferencia bancaria).
MP_ACCESS_TOKEN="APP_USR-xxxxxxxxxxxx-xxxxxxxxxxxx"

# 4. Envío Masivo / Campañas
# Token secreto para proteger el endpoint de envío de newsletters /api/newsletter/send
NEWSLETTER_API_SECRET="tu-clave-secreta-de-campanas"
```

## 🛠️ Pasos de Configuración para Producción

### 1. Inicialización de la Base de Datos
Una vez configurado `DATABASE_URL`, inicia el servidor localmente o despliega en Vercel, y visita el siguiente endpoint una sola vez para crear y actualizar las tablas (`orders`, `waitlist`, `b2b_contacts`):
```text
http://localhost:3000/api/setup-db
(o tu-dominio.vercel.app/api/setup-db en producción)
```

### 2. Configurar Resend con tu Dominio (Nic Chile)
Para enviar correos masivos a tus clientes desde `comercial@selvaalta.cl` (o `no-reply@selvaalta.cl`), debes verificar tu dominio en Resend:
1. Crea una cuenta en [resend.com](https://resend.com).
2. Ve a **Domains** > **Add Domain** e ingresa `selvaalta.cl`.
3. Resend te entregará 3 registros de tipo `TXT` y `MX` (DKIM/SPF).
4. Inicia sesión en tu panel de **Nic Chile** y agrega estos registros DNS en la administración del dominio `selvaalta.cl`.
5. Vuelve a Resend y haz clic en **Verify**. Una vez activo, actualiza la variable `RESEND_FROM_EMAIL` con tu dirección real de dominio.

### 3. Configurar Mercado Pago (Webhook de Confirmaciones)
Para recibir notificaciones automáticas cuando un cliente pague:
1. Inicia sesión en tu panel de desarrollador de [Mercado Pago](https://www.mercadopago.cl).
2. Obtén tu **Access Token** en la sección de credenciales y agrégalo a tu entorno.
3. Configura tu URL de Webhook para capturar las ventas aprobadas. Ve a **Notificaciones Webhook** e ingresa tu URL de producción apuntando a:
   `https://tu-dominio.cl/api/mercadopago/webhook`
4. Selecciona el evento **payment** (pagos) para suscribirte a las alertas de pago.

---

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

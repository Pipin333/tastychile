# Selva Alta Roasters - TastyChile ☕🏔️

Plataforma moderna para la adquisición de café de especialidad de la Amazonía Peruana (Huánuco y Tingo María a 1.820 msnm). Cuenta con catálogo de cafés con certificación SCA, suscripciones mensuales para hogares (**El Club**), portal comercial mayorista para cafeterías y empresas (**B2B**), y un **Backend Mago de Oz** para captura y gestión ágil de pedidos.

---

## 🚀 Características Principales

- **Landing Page Rediseñada**: Presentación de alta gama de la marca, notas de cata y origen directo de Huánuco.
- **El Club (B2C) con Selector de Molienda**: Compra de café en bolsas de 250g o suscripciones mensuales (Explorador, Aventurero, Maestro Barista) con selector de molienda (Grano Entero, Espresso, Filtro V60, Prensa Francesa).
- **Backend Mago de Oz**: Flujo de compra fluido donde el cliente recibe confirmación en pantalla ("*Un representante se contactará a la brevedad*") mientras el pedido se envía automáticamente al correo del equipo de Selva Alta y se almacena en base de datos.
- **Portal B2B**: Fichas técnicas sensoriales interactivas, solicitud de muestras comerciales sin costo y cotizaciones por volumen.
- **Notificaciones Transaccionales**: Envío de correos de confirmación tanto al comprador como al equipo comercial vía **Resend** (con simulación automática en consola si no hay credenciales configuradas).
- **Containerización 100% Portable**: Docker multi-stage listo para correr con `docker compose up --build`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.6 (App Router con Turbopack)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon Database / Vercel Postgres)
- **Email**: Resend API (`resend`)
- **Container**: Docker Multi-stage + Docker Compose

---

## ⚙️ Configuración del Entorno (`.env`)

Copia el archivo de ejemplo y agrega tus credenciales si deseas activar base de datos o envíos reales de email:

```bash
cp .env.example .env.local
```

### Variables disponibles:

```env
# Base de datos PostgreSQL (Neon / Vercel Postgres)
DATABASE_URL="postgresql://usuario:contraseña@servidor.neon.tech/neondb?sslmode=require"

# Correo al que llegan los pedidos y leads de Selva Alta
CONTACT_EMAIL="comercial@selvaalta.cl"
SALES_EMAIL="comercial@selvaalta.cl"

# Servicio de Correo Resend (Opcional - modo simulado por defecto)
RESEND_API_KEY=""
RESEND_FROM_EMAIL="Selva Alta <onboarding@resend.dev>"

# URL de la aplicación
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> **Nota:** Si `RESEND_API_KEY` o `DATABASE_URL` no están configuradas, el proyecto funciona normalmente en modo Mago de Oz local sin romperse.

---

## 🏁 Inicio Rápido Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🐳 Ejecución con Docker

Cualquier persona puede clonar y ejecutar el proyecto sin necesidad de instalar Node.js ni dependencias en su máquina anfitriona:

```bash
git clone https://github.com/usuario/tastychile.git
cd tastychile
cp .env.example .env
docker compose up --build
```

La aplicación estará disponible inmediatamente en [http://localhost:3000](http://localhost:3000).

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── actions.ts             # Server Actions (Mago de Oz, Pedidos, B2B y Waitlist)
│   ├── layout.tsx             # Root layout con metadata y fuentes
│   ├── page.tsx               # Landing principal rediseñada
│   ├── b2b/
│   │   ├── layout.tsx         # Layout sección B2B
│   │   └── page.tsx           # Catálogo técnico y formulario comercial
│   └── club/
│       ├── layout.tsx         # Layout sección Club
│       └── page.tsx           # Catálogo B2C, molienda, carrito y checkout Mago de Oz
├── components/
│   ├── Navbar.tsx             # Navegación responsive fija con backdrop blur
│   └── Footer.tsx             # Pie de página institucional y enlaces
└── lib/
    ├── db.ts                  # Cliente Neon SQL con fallback seguro
    ├── email.ts               # Envío de correos y alertas (Resend / Mago de Oz)
    └── email-templates.ts     # Plantillas HTML responsivas para pedidos y leads
```

---

## 📄 Licencia

Proyecto privado - TastyChile SpA (Selva Alta Roasters).

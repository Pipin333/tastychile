# BRIEF.md: Selva Alta Roasters

## PROJECT
- Site for: Selva Alta Roasters (TastyChile SpA).
- Audience: Encargados de barra de cafeterías de especialidad, operaciones de startups y administradores de oficina en Santiago de Chile.
- Register: Editorial-técnico.
- The one action a visitor should take: Escribir al correo pidiendo más detalles o solicitar muestra/pedido.

## STACK
- Next.js 16.2.6 (App Router con Turbopack), React 19, TypeScript, Tailwind CSS v4.
- Despliegue en Vercel con Dockerfile multi-stage.
- Backend Mago de Oz para captura de pedidos y leads comerciales con notificación directa por correo a Selva Alta (`comercial@selvaalta.cl`) y confirmación al cliente.

## CONTENT
- Opening: "Café de especialidad de 87 puntos SCA para barras y oficinas en Santiago, con molienda calibrada y entregas carbono neutrales."
- Support: "Granos cosechados en Huánuco a 1.820 msnm con trazabilidad directa, equidad de género en la cosecha y evaluación sensorial rigurosa."
- Action: "Escribir al correo comercial" / "Solicitar muestra sin costo".
- Below the fold:
  1. Ficha técnica de variedad insignia: Por ahora exclusivamente Marsellesa Orgánico (87 Puntos SCA, Huánuco, Perú, 1.820 msnm, proceso lavado).
  2. Soluciones para barras de cafeterías y oficinas: Formato estándar de 250g con escala de precio por volumen disponible para pedidos corporativos.
  3. Formulario Mago de Oz y contacto directo por correo y WhatsApp.
- Cut: Fotos de stock genéricas, pasarelas de pago complejas con tarjeta, pastillas de estado redundantes, emojis de adorno, texto inflado por IA (AI-slop), carruseles con autoscroll forzado.
- Sin em dashes ni en dashes en ningún texto visible.

## SHAPE
- Rutas separadas con diferencias sutiles de diseño:
  - `/`: Presentación institucional, origen y credenciales de calidad.
  - `/b2b`: Enfoque técnico y comercial para cafeterías y oficinas (ficha técnica, cata, solicitud de muestras).
  - `/club`: Selección de café en grano o molido por método con checkout Mago de Oz.
- Carried by: Estructura, tipografía limpia y fichas agronómicas precisas.
- Gutter: `16px` en móvil, `24px` en tablet, `32px` en escritorio.

## DESIGN TOKENS
- Definidos estrictamente en `BRAND.md`.
- Background: `#121110` (carbono / grano tostado oscuro)
- Surface: `#1a1816` (acero de canasta de espresso)
- Border: `#302c28` (1px maquinado técnico)
- Text: `#f5f4f2` (alta legibilidad)
- Muted: `#a8a29e` (lectura descansada)
- Accent: `#c25e1a` (ámbar tostado / cereza madura)
- Text on accent: `#ffffff`

## SIGNATURE ELEMENT
- Trama técnica sutil inspirada en los patrones circulares concéntricos y radiales de los puck press y levelers de espresso, grabada en el fondo superior.
- Malla de especificación técnica limpia con puntos SCA en fuente monospace.

## MOTION
- Transiciones limpias de 150ms en hover y focus.
- Sin scroll parallax, sin carruseles automáticos mareantes, respeto absoluto a `prefers-reduced-motion`.

## QUALITY FLOOR
- Responsive fluido hasta 375px. Foco de teclado visible (`:focus-visible:ring-2`). Contraste de texto WCAG 2.2 AA. Cero CLS.

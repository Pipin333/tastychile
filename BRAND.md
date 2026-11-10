# BRAND.md: Selva Alta Roasters

## 1. Direction and Origin
- **Carrier**: Estructura limpia, relieve topográfico de origen y tipografía editorial-técnica de alta legibilidad.
- **Physical origin**: Silueta de la cordillera La Bella Durmiente en Tingo María (Huánuco, Perú, 1.820 msnm), grano tostado oscuro y cereza madura de café.
- **Register**: Editorial-técnico. Sin fotos de stock, sin emojis, sin pastillas redundantes, sin texto AI-slop, sin guiones largos (em/en dashes).

## 2. Palette Tokens
- `--bg-ground`: `#110f0d` (Fondo base grano tostado profundo)
- `--bg-surface`: `#181512` (Superficie de tarjetas, usada con transparencia `rgba(24, 21, 18, 0.80)` y `backdrop-filter: blur(14px)`)
- `--bg-surface-raised`: `#241f1b` (Paneles internos de especificaciones y selectores)
- `--border-subtle`: `#332c25` (Línea divisoria técnica de 1px)
- `--text-primary`: `#f5f3f0` (Texto principal, contraste 13.8:1 sobre fondo)
- `--text-secondary`: `#b0a89e` (Lectura secundaria descansada, contraste 6.2:1)
- `--text-muted`: `#7d746b` (Etiquetas técnicas en mayúsculas)
- `--accent`: `#c25e1a` (Ámbar tostado y cereza madura)
- `--accent-hover`: `#a84e12` (Estado hover de botones principales)
- `--on-accent`: `#ffffff` (Texto sobre acento, contraste 4.6:1)

## 3. Typography
- **Primary Sans**: `Geist Sans`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.
- **Data / Tech Font**: `Geist Mono`, `ui-monospace`, monospace. Exclusiva para cotas (`1.820 msnm`), puntaje (`87.0 Puntos SCA`), pesos (`250g`, `1 kg`, `3 kg`), precios y códigos de pedido (`SAR-XXXXXX`).
- **Scale**:
  - Hero display: `clamp(2.25rem, 1.8rem + 2vw, 3.35rem)`, `line-height: 1.12`, `letter-spacing: -0.025em`
  - Section heading: `clamp(1.5rem, 1.3rem + 0.8vw, 2.1rem)`, `line-height: 1.2`
  - Body: `1rem` (16px), `line-height: 1.65`
  - Technical labels: `0.75rem` (12px) a `0.8125rem` (13px) en monoespaciado

## 4. Signature Element: La Bella Durmiente (Mosaico Geométrico + 4 Capas)
- Fondo fijo a pantalla completa con el perfil anatómico real de la cordillera La Bella Durmiente de Tingo María (frente, nariz al cielo, labios, mentón, cuello y cumbre de 1.820 msnm).
- La silueta se repite 4 veces hacia abajo. En cada iteración inferior disminuye la opacidad del mosaico (`0.95`, `0.58`, `0.30`, `0.12`) mientras el relleno base de cada capa se oscurece progresivamente hasta fundirse con `#110f0d`.
- Variación sutil por ruta:
  - `/`: Vista general con iluminación ámbar sobre la cumbre principal.
  - `/b2b`: Énfasis en las cotas topográficas y grilla técnica de abastecimiento.
  - `/club`: Tono cálido de acento sobre las laderas y enfoque en los métodos de extracción (Moka Italiana, Prensa Francesa, Espresso, Filtro V60) en íconos vectoriales de línea de 1.5px.

## 5. Composition and Gutter
- Gutter horizontal: `16px` bajo `640px`, `24px` en tablet, `32px` sobre `1024px`.
- Ancho máximo: `1040px` (`max-w-5xl`).
- Layer stack:
  - `z-0`: Lienzo SVG fijo de La Bella Durmiente.
  - `z-10`: Contenido estructural y tarjetas con cristal esmerilado (`backdrop-blur-md`).
  - `z-40`: Barra de navegación superior fija.
  - `z-50`: Modal de confirmación de pedido Mago de Oz.

## 6. Entrance Choreography and Interaction Inventory
- Entrada sobria en reposo; sin animaciones disparadas por scroll ni carruseles automáticos.
- Todos los controles interactivos (navegación, selector de volumen, selector de molienda, botones de envío) transicionan en `150ms cubic-bezier(0.16, 1, 0.3, 1)` sobre color de borde y fondo.
- Anillo de foco visible `:focus-visible:ring-2 :focus-visible:ring-[#c25e1a]`.

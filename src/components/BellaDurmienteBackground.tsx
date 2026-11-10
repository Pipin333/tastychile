import React from "react";

interface BellaDurmienteBackgroundProps {
  /**
   * Subtle route variation as specified in BRAND.md:
   * - 'home': Balanced dark layers with warm amber sunlit facets
   * - 'b2b': Technical survey grid ticks and high-contrast topographic ridge
   * - 'club': Warm accent gradient wash across the upper ridges
   */
  variant?: "home" | "b2b" | "club";
}

const BASE_PROFILE: ReadonlyArray<readonly [number, number]> = [
  [0, 390],
  [75, 365],
  [145, 330],
  [210, 285], // Coronilla
  [265, 242], // Frente alta
  [300, 254], // Entrecejo
  [340, 202], // Punta de la nariz
  [358, 228], // Base nariz
  [374, 218], // Labio superior
  [386, 227], // Comisura
  [398, 221], // Labio inferior
  [412, 232], // Surco mentolabial
  [438, 212], // Mentón prominente
  [475, 262], // Garganta
  [525, 292], // Base del cuello
  [585, 250], // Ascenso al pecho
  [650, 182], // Cumbre Busto / Pecho (1.820 msnm)
  [715, 215], // Descenso busto
  [785, 268], // Torso / Costillas
  [860, 292], // Cintura
  [945, 248], // Cadera
  [1035, 266], // Muslo
  [1125, 238], // Rodilla
  [1225, 288], // Pantorrilla
  [1330, 325], // Pie del cerro
  [1440, 355], // Borde derecho
];

const LAYER_OFFSETS = [
  { dy: 0, dx: 0, mosaicAlpha: 0.95, strokeWidth: 2.0 },
  { dy: 68, dx: -12, mosaicAlpha: 0.58, strokeWidth: 1.4 },
  { dy: 145, dx: 14, mosaicAlpha: 0.3, strokeWidth: 1.0 },
  { dy: 235, dx: -8, mosaicAlpha: 0.12, strokeWidth: 0.7 },
  { dy: 340, dx: 6, mosaicAlpha: 0.04, strokeWidth: 0.5 },
] as const;

function buildLayerPoints(layerIndex: number): Array<[number, number]> {
  const { dy, dx } = LAYER_OFFSETS[layerIndex];
  const dampen = 1 + layerIndex * 0.035;
  return BASE_PROFILE.map(([x, y], i) => {
    const clampedX =
      i === 0 ? 0 : i === BASE_PROFILE.length - 1 ? 1440 : x + dx;
    return [clampedX, Math.round(y * dampen + dy)];
  });
}

const LAYERS = LAYER_OFFSETS.map((_, idx) => buildLayerPoints(idx));

const DARK_FILLS = ["#261911", "#1d140f", "#15110e", "#110f0d"] as const;
const DARK_OPACITIES = [0.62, 0.78, 0.9, 0.98] as const;
const STROKE_OPACITIES = [0.9, 0.55, 0.3, 0.14] as const;

/**
 * Renders the fixed ambient background of La Bella Durmiente (Tingo María, Huánuco)
 * with 4 cascading silhouettes and a low-poly geometric mosaic that attenuates downward.
 */
export default function BellaDurmienteBackground({
  variant = "home",
}: BellaDurmienteBackgroundProps) {
  const nose = LAYERS[0][6];
  const peak = LAYERS[0][16];

  const glowPosition =
    variant === "club"
      ? "radial-gradient(circle at 46% 18%, rgba(194, 94, 26, 0.22) 0%, rgba(17, 15, 13, 0) 62%)"
      : variant === "b2b"
        ? "radial-gradient(circle at 35% 15%, rgba(194, 94, 26, 0.14) 0%, rgba(17, 15, 13, 0) 58%)"
        : "radial-gradient(circle at 42% 16%, rgba(194, 94, 26, 0.18) 0%, rgba(17, 15, 13, 0) 60%)";

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
      style={{
        background: `${glowPosition}, linear-gradient(180deg, #171310 0%, #110f0d 100%)`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full object-cover object-top"
      >
        <defs>
          <linearGradient id="accent-wash-0" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c25e1a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#110f0d" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="accent-wash-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9c4811" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#110f0d" stopOpacity="0.96" />
          </linearGradient>
        </defs>

        {/* Subtle survey coordinate grid lines for B2B route */}
        {variant === "b2b" && (
          <g stroke="#332c25" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4">
            <line x1="265" y1="0" x2="265" y2="520" />
            <line x1="650" y1="0" x2="650" y2="520" />
            <line x1="945" y1="0" x2="945" y2="520" />
            <line x1="1225" y1="0" x2="1225" y2="520" />
          </g>
        )}

        {/* 4 Iterative Silhouette Layers + Attenuating Geometric Mosaic */}
        {[0, 1, 2, 3].map((l) => {
          const topRow = LAYERS[l];
          const botRow = LAYERS[l + 1];
          const cfg = LAYER_OFFSETS[l];

          const pathData = topRow
            .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
            .join(" ");
          const closedPath = `${pathData} L 1440 900 L 0 900 Z`;

          const useAccentWash = variant === "club" && (l === 0 || l === 1);

          return (
            <g key={`bella-layer-${l}`}>
              <path
                d={closedPath}
                fill={
                  useAccentWash ? `url(#accent-wash-${l})` : DARK_FILLS[l]
                }
                fillOpacity={useAccentWash ? 1 : DARK_OPACITIES[l]}
              />

              {topRow.slice(0, -1).map((p1, i) => {
                const p2 = topRow[i + 1];
                const p3 = botRow[i];
                const p4 = botRow[i + 1];

                const slope = p2[1] - p1[1];
                const isSunlit = slope < 0;

                const colorTriA = isSunlit ? "#c25e1a" : "#2e2017";
                const colorTriB = isSunlit ? "#8a3e0e" : "#16120e";

                const opA = Number(
                  ((isSunlit ? 0.42 : 0.28) * cfg.mosaicAlpha).toFixed(3)
                );
                const opB = Number(
                  ((isSunlit ? 0.24 : 0.45) * cfg.mosaicAlpha).toFixed(3)
                );

                return (
                  <g key={`tri-${l}-${i}`}>
                    <polygon
                      points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
                      fill={colorTriA}
                      fillOpacity={opA}
                      stroke="#c25e1a"
                      strokeWidth="0.5"
                      strokeOpacity={Number(
                        (0.38 * cfg.mosaicAlpha).toFixed(3)
                      )}
                    />
                    <polygon
                      points={`${p2[0]},${p2[1]} ${p4[0]},${p4[1]} ${p3[0]},${p3[1]}`}
                      fill={colorTriB}
                      fillOpacity={opB}
                      stroke="#332c25"
                      strokeWidth="0.45"
                      strokeOpacity={Number(
                        (0.32 * cfg.mosaicAlpha).toFixed(3)
                      )}
                    />
                  </g>
                );
              })}

              <path
                d={pathData}
                fill="none"
                stroke="#c25e1a"
                strokeWidth={cfg.strokeWidth}
                strokeOpacity={STROKE_OPACITIES[l]}
              />
            </g>
          );
        })}

        {/* Discreet Topographic Elevation Callouts */}
        <g opacity="0.75">
          <circle
            cx={peak[0]}
            cy={peak[1]}
            r="3"
            fill="#110f0d"
            stroke="#c25e1a"
            strokeWidth="1.5"
          />
          <line
            x1={peak[0]}
            y1={peak[1] - 4}
            x2={peak[0]}
            y2={peak[1] - 28}
            stroke="#c25e1a"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <text
            x={peak[0] + 8}
            y={peak[1] - 18}
            fill="#c25e1a"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize="10"
            letterSpacing="0.08em"
          >
            LA BELLA DURMIENTE · 1.820 MSNM
          </text>

          <circle
            cx={nose[0]}
            cy={nose[1]}
            r="2.5"
            fill="#110f0d"
            stroke="#b0a89e"
            strokeWidth="1.2"
          />
          <line
            x1={nose[0]}
            y1={nose[1] - 4}
            x2={nose[0]}
            y2={nose[1] - 22}
            stroke="#b0a89e"
            strokeWidth="0.7"
            strokeDasharray="2 2"
          />
          <text
            x={nose[0] - 88}
            y={nose[1] - 12}
            fill="#b0a89e"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize="9"
            letterSpacing="0.06em"
          >
            PERFIL · TINGO MARÍA
          </text>
        </g>
      </svg>
    </div>
  );
}

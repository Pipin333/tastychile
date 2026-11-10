import React from "react";

interface BellaDurmienteBackgroundProps {
  variant?: "home" | "b2b" | "club";
}

/**
 * Full-screen fixed background depicting the silhouette of La Bella Durmiente
 * (Tingo María, Huánuco, Peru) in lush Amazonian cloud-forest greens,
 * morning mist bands, and botanical shade-grown coffee foliage over warm parchment.
 */
export default function BellaDurmienteBackground({
  variant = "home",
}: BellaDurmienteBackgroundProps) {
  const sunPosition =
    variant === "home"
      ? { cx: "66%", cy: "22%" }
      : variant === "b2b"
        ? { cx: "76%", cy: "24%" }
        : { cx: "32%", cy: "22%" };

  // Profile of La Bella Durmiente (head on the left, nose/lips/chin, neck, chest peak, sweeping ridge right)
  const ridgeTopPath =
    "M -40 400 L 55 372 L 128 326 L 166 296 L 194 307 L 236 254 L 266 278 L 288 267 L 310 280 L 340 264 L 368 292 L 420 330 L 495 312 L 580 232 L 664 186 L 748 214 L 842 278 L 938 252 L 1042 288 L 1145 322 L 1248 296 L 1352 332 L 1480 356";

  const ridgeFillPath = `${ridgeTopPath} L 1480 960 L -40 960 Z`;

  // 4 cascading cloud-forest layers: distant misty sage to deep Amazonian emerald
  const layers = [
    {
      index: 0,
      translateY: 0,
      scaleY: 1,
      baseFill: "url(#forestLayer0)",
      canopyOpacity: 0.55,
      mistOpacity: 0.65,
      ridgeStroke: "#2D6A4F",
      ridgeStrokeOpacity: 0.45,
      ridgeStrokeWidth: 1.6,
    },
    {
      index: 1,
      translateY: 86,
      scaleY: 0.98,
      baseFill: "url(#forestLayer1)",
      canopyOpacity: 0.42,
      mistOpacity: 0.55,
      ridgeStroke: "#1E4D38",
      ridgeStrokeOpacity: 0.38,
      ridgeStrokeWidth: 1.3,
    },
    {
      index: 2,
      translateY: 174,
      scaleY: 0.96,
      baseFill: "url(#forestLayer2)",
      canopyOpacity: 0.28,
      mistOpacity: 0.45,
      ridgeStroke: "#143326",
      ridgeStrokeOpacity: 0.3,
      ridgeStrokeWidth: 1.1,
    },
    {
      index: 3,
      translateY: 266,
      scaleY: 0.94,
      baseFill: "url(#forestLayer3)",
      canopyOpacity: 0.16,
      mistOpacity: 0.3,
      ridgeStroke: "#143326",
      ridgeStrokeOpacity: 0.22,
      ridgeStrokeWidth: 0.9,
    },
  ];

  // Soft botanical hillside facets (lush green foliage slopes, no copper wireframe)
  const botanicalSlopes = [
    {
      points: "128,326 166,296 194,307 152,368",
      fill: "#40916C",
      opacity: 0.22,
    },
    {
      points: "194,307 236,254 266,278 218,348",
      fill: "#52B788",
      opacity: 0.25,
    },
    {
      points: "236,254 218,348 152,368 194,307",
      fill: "#1E4D38",
      opacity: 0.18,
    },
    {
      points: "266,278 288,267 310,280 282,340",
      fill: "#40916C",
      opacity: 0.2,
    },
    {
      points: "310,280 340,264 368,292 332,356",
      fill: "#52B788",
      opacity: 0.22,
    },
    {
      points: "495,312 580,232 624,316 520,382",
      fill: "#52B788",
      opacity: 0.24,
    },
    {
      points: "580,232 664,186 624,316",
      fill: "#74C69D",
      opacity: 0.28,
    },
    {
      points: "664,186 748,214 706,308 624,316",
      fill: "#2D6A4F",
      opacity: 0.24,
    },
    {
      points: "748,214 842,278 784,358 706,308",
      fill: "#1E4D38",
      opacity: 0.2,
    },
    {
      points: "842,278 938,252 904,352 784,358",
      fill: "#40916C",
      opacity: 0.2,
    },
    {
      points: "938,252 1042,288 992,374 904,352",
      fill: "#1E4D38",
      opacity: 0.18,
    },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Warm parchment sky to soft cloud-forest mist */}
          <linearGradient id="parchmentSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF6F0" />
            <stop offset="45%" stopColor="#F4EFE6" />
            <stop offset="100%" stopColor="#E6EFEA" />
          </linearGradient>

          {/* Warm tropical morning sun glow */}
          <radialGradient
            id="morningSun"
            cx={sunPosition.cx}
            cy={sunPosition.cy}
            r="48%"
          >
            <stop offset="0%" stopColor="#F5DEB3" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#D8F3DC" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0" />
          </radialGradient>

          {/* 4 Cloud-forest silhouette fills in natural greens */}
          <linearGradient id="forestLayer0" x1="0" y1="186" x2="0" y2="620" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#52796F" stopOpacity="0.26" />
            <stop offset="65%" stopColor="#74A892" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="forestLayer1" x1="0" y1="186" x2="0" y2="660" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.24" />
            <stop offset="70%" stopColor="#52796F" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="forestLayer2" x1="0" y1="186" x2="0" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E4D38" stopOpacity="0.20" />
            <stop offset="75%" stopColor="#2D6A4F" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0.03" />
          </linearGradient>

          <linearGradient id="forestLayer3" x1="0" y1="186" x2="0" y2="760" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#143326" stopOpacity="0.16" />
            <stop offset="85%" stopColor="#1E4D38" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0.02" />
          </linearGradient>

          {/* Cloud forest mist ribbon */}
          <linearGradient id="cloudMist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0" />
            <stop offset="50%" stopColor="#FAF6F0" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity="0" />
          </linearGradient>

          <clipPath id="bellaDurmienteClip">
            <path d={ridgeFillPath} />
          </clipPath>
        </defs>

        {/* Base Warm Parchment Canvas */}
        <rect width="1440" height="900" fill="url(#parchmentSky)" />
        <rect width="1440" height="900" fill="url(#morningSun)" />

        {/* Cascading 4 Green Silhouettes of La Bella Durmiente + Cloud Mist */}
        {layers.map((layer) => (
          <g
            key={layer.index}
            transform={`translate(0, ${layer.translateY}) scale(1, ${layer.scaleY})`}
          >
            {/* Mountain forest silhouette */}
            <path d={ridgeFillPath} fill={layer.baseFill} />

            {/* Soft sunlit green slopes */}
            <g
              clipPath="url(#bellaDurmienteClip)"
              opacity={layer.canopyOpacity}
            >
              {botanicalSlopes.map((slope, idx) => (
                <polygon
                  key={idx}
                  points={slope.points}
                  fill={slope.fill}
                  fillOpacity={slope.opacity}
                />
              ))}

              {/* Soft organic cloud-forest tree-line contours */}
              <path
                d="M 40 390 Q 240 310 440 355 T 840 315 T 1240 350 L 1440 375"
                stroke="#2D6A4F"
                strokeWidth="1.2"
                strokeOpacity="0.25"
                fill="none"
              />
            </g>

            {/* Ridge silhouette crest */}
            <path
              d={ridgeTopPath}
              stroke={layer.ridgeStroke}
              strokeWidth={layer.ridgeStrokeWidth}
              strokeOpacity={layer.ridgeStrokeOpacity}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Drifting Amazonian cloud-forest mist ribbon */}
            <rect
              x="-40"
              y="335"
              width="1520"
              height="95"
              fill="url(#cloudMist)"
              opacity={layer.mistOpacity}
            />
          </g>
        ))}

        {/* Discrete botanical coffee branch & ripe cherry motif on the upper edges */}
        <g opacity="0.22" stroke="#1E4D38" strokeWidth="1.2" fill="none">
          {/* Left botanical coffee branch */}
          <path d="M -10 110 Q 65 125 135 95 Q 185 75 235 88" />
          <path
            d="M 55 115 Q 75 90 105 98 Q 80 122 55 115 Z"
            fill="#2D6A4F"
            fillOpacity="0.25"
          />
          <path
            d="M 115 102 Q 140 125 170 112 Q 145 92 115 102 Z"
            fill="#2D6A4F"
            fillOpacity="0.25"
          />
          <circle cx="95" cy="108" r="5" fill="#9E2A2B" fillOpacity="0.55" stroke="none" />
          <circle cx="105" cy="112" r="4.5" fill="#9E2A2B" fillOpacity="0.55" stroke="none" />
          <circle cx="158" cy="96" r="4.5" fill="#9E2A2B" fillOpacity="0.5" stroke="none" />
        </g>

        {/* Subtle landmark label on the mountain peak so any visitor immediately recognizes La Bella Durmiente */}
        <g opacity="0.55">
          <circle cx="664" cy="186" r="3.5" fill="#1E4D38" />
          <line
            x1="664"
            y1="186"
            x2="664"
            y2="148"
            stroke="#1E4D38"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <text
            x="672"
            y="156"
            fill="#143326"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="0.08em"
          >
            LA BELLA DURMIENTE · TINGO MARÍA (1.820 MSNM)
          </text>
        </g>
      </svg>
    </div>
  );
}

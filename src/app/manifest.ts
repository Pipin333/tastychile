import type { MetadataRoute } from "next";

/**
 * Generates /manifest.webmanifest for mobile installability and theme colors.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Selva Alta Roasters · Café de Especialidad",
    short_name: "Selva Alta",
    description:
      "Café de especialidad Marsellesa Orgánico (87.0 SCA) de Tingo María, Huánuco, Perú. En grano o molido para tu cafetera en Chile.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#143326",
    lang: "es-CL",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

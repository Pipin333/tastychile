import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comprar Café en Grano o Molido (250g, 1 kg y 3 kg)",
  description:
    "Encarga tu café de especialidad Marsellesa Orgánico (87.0 SCA) de Tingo María en bolsas de 250g o packs con descuento. En grano entero o recién molido para Italiana, Prensa Francesa, Filtro o Espresso.",
  alternates: {
    canonical: "/club",
  },
  openGraph: {
    title: "Comprar Café Marsellesa Orgánico 250g y Packs | Selva Alta Roasters",
    description:
      "Elige tu formato (250g, 1 kilo o 3 kilos) y tu molienda favorita. Tostado fresco y despacho carbono neutral en Santiago.",
    url: "/club",
  },
};

export default function ClubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

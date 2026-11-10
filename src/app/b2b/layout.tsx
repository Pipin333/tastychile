import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cafeterías, Restaurantes y Oficinas (B2B)",
  description:
    "Abastecimiento de café de especialidad Marsellesa Orgánico (87.0 puntos SCA) en bolsas de 250g para barras de espresso, restaurantes y oficinas en Santiago. Solicita muestras sin costo.",
  alternates: {
    canonical: "/b2b",
  },
  openGraph: {
    title: "Café de Especialidad para Cafeterías y Oficinas | Selva Alta Roasters",
    description:
      "Precios mayoristas por kilo en bolsas selladas de 250g con válvula desgasificadora, molienda a medida y despacho carbono neutral en Santiago.",
    url: "/b2b",
  },
};

export default function B2BLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

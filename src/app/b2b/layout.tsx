import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresas",
  description:
    "Soluciones de café de especialidad para cafeterías, HORECA, retail y empresas con Selva Alta Roasters.",
};

export default function B2BLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

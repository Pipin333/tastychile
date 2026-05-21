import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Club",
  description:
    "Únete a la lista de espera de Selva Alta Club y recibe café de especialidad de Huánuco en tu casa.",
};

export default function ClubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

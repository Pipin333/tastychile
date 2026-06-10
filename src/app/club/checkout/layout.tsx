import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizar Compra",
  description: "Completa los datos de despacho y realiza tu pago seguro en Selva Alta Roasters.",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

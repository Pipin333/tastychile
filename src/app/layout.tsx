import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Selva Alta Roasters | TastyChile",
    template: "%s | Selva Alta Roasters",
  },
  description:
    "Café de especialidad de la Alta Amazonía Peruana para hogares, cafeterías y empresas.",
  keywords: [
    "café de especialidad",
    "Selva Alta Roasters",
    "TastyChile",
    "café peruano",
    "Huánuco",
    "Tingo María",
    "club de café",
    "café para empresas",
    "B2B café",
  ],
  openGraph: {
    title: "Selva Alta Roasters | TastyChile",
    description:
      "Descubre café de especialidad de la Alta Amazonía Peruana para consumo personal y empresarial.",
    type: "website",
    locale: "es_CL",
    siteName: "Selva Alta Roasters",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selva Alta Roasters | TastyChile",
    description:
      "Café de especialidad de la Alta Amazonía Peruana para hogares y empresas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CartProvider from "@/components/CartProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

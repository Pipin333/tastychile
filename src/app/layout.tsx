import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://selvaalta.cl";

export const viewport: Viewport = {
  themeColor: "#143326",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Selva Alta Roasters | Café de Especialidad de Tingo María en Chile",
    template: "%s | Selva Alta Roasters",
  },
  description:
    "Café de especialidad Marsellesa de Altura (87.0 puntos SCA) cultivado a 1.820 msnm frente a La Bella Durmiente en Tingo María, Perú. Tostado fresco y molido a pedido para hogares, cafeterías y oficinas en Santiago.",
  applicationName: "Selva Alta Roasters",
  authors: [{ name: "Selva Alta Roasters SpA", url: siteUrl }],
  creator: "Selva Alta Roasters SpA",
  publisher: "Selva Alta Roasters SpA",
  category: "Food & Drink",
  keywords: [
    "café de especialidad Chile",
    "café de especialidad Santiago",
    "Selva Alta Roasters",
    "TastyChile",
    "café peruano en Chile",
    "Tingo María café",
    "Huánuco café de altura",
    "La Bella Durmiente Tingo María",
    "Marsellesa de Altura 87 SCA",
    "café en grano 250g",
    "café molido a pedido",
    "café para cafeterías Santiago",
    "café para oficinas Chile",
    "proveedor de café B2B Chile",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        {
          url: "/llms.txt",
          title: "Contexto para LLMs y Catálogo de Selva Alta Roasters",
        },
      ],
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    title: "Selva Alta Roasters | Café de Especialidad de Tingo María (87.0 SCA)",
    description:
      "Lote familiar Marsellesa de Altura cultivado a 1.820 msnm en la selva nubosa de Tingo María, Perú. Bolsas de 250g, packs por kilo y abastecimiento para cafeterías y oficinas.",
    url: siteUrl,
    type: "website",
    locale: "es_CL",
    siteName: "Selva Alta Roasters",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selva Alta Roasters | Café de Especialidad de Tingo María (87.0 SCA)",
    description:
      "Café de origen amazónico cultivado a 1.820 msnm, tostado fresco y molido para tu cafetera en Chile.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Selva Alta Roasters",
      legalName: "Selva Alta Roasters SpA",
      alternateName: "TastyChile",
      url: siteUrl,
      email: "comercial@selvaalta.cl",
      logo: `${siteUrl}/favicon.svg`,
      description:
        "Importadora y tostadora familiar de café de especialidad de la Alta Amazonía Peruana (Tingo María, Huánuco, 1.820 msnm) con distribución en Santiago de Chile.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Selva Alta Roasters",
      inLanguage: "es-CL",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/club#marsellesa-87-sca`,
      name: "Café de Especialidad Marsellesa de Altura (87.0 SCA) · Tingo María",
      brand: {
        "@type": "Brand",
        name: "Selva Alta Roasters",
      },
      description:
        "Café 100% Arábica variedad Marsellesa de Altura cultivado bajo sombra a 1.820 msnm frente a La Bella Durmiente en Tingo María, Huánuco, Perú. Notas a chocolate bitter, caramelo de caña y nuez tostada. Disponible en grano entero o molido a pedido en bolsas de 250g.",
      image: [
        `${siteUrl}/images/origen/bolsa-y-extraccion.png`,
        `${siteUrl}/images/origen/cerezas-marsellesa.png`,
        `${siteUrl}/images/origen/grano-verde-tostado.png`,
      ],
      countryOfOrigin: {
        "@type": "Country",
        name: "Perú",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CLP",
        lowPrice: "8749",
        highPrice: "11500",
        offerCount: "3",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/club`,
        seller: { "@id": `${siteUrl}/#organization` },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#2A1B12]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

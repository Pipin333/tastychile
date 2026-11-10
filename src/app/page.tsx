import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export default function Home() {
  const volumeTiers = [
    {
      label: "Formato 250g",
      price: "$12.900",
      detail: "1 bolsa con válvula desgasificadora",
      href: "/club?tier=marsellesa-250g",
    },
    {
      label: "Volumen 1 kg",
      price: "$44.900",
      detail: "4 × 250g · Ahorro 13% · Envío incluido",
      href: "/club?tier=marsellesa-1kg",
    },
    {
      label: "Volumen 3 kg",
      price: "$119.900",
      detail: "12 × 250g · Ahorro 22% · Barras y equipos",
      href: "/club?tier=marsellesa-3kg",
    },
  ];

  const specifications = [
    { label: "Variedad Activa", value: "Marsellesa Orgánico" },
    { label: "Puntaje SCA", value: "87.0 Puntos" },
    { label: "Origen", value: "Tingo María, Huánuco, Perú" },
    { label: "Altitud", value: "1.820 msnm" },
    { label: "Beneficio", value: "Lavado de fermentación controlada" },
    { label: "Perfil en Taza", value: "Chocolate amargo · Caramelo · Frutos dulces" },
    { label: "Cosecha", value: "Inclusiva de comercio directo" },
    { label: "Logística", value: "Entregas carbono neutrales en Santiago" },
  ];

  return (
    <div className="min-h-screen bg-[#110f0d] text-[#f5f3f0] flex flex-col font-sans selection:bg-[#c25e1a] selection:text-white">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section (Strictly 3 elements as locked in BRIEF.md) */}
          <section className="max-w-2xl pb-24 sm:pb-32">
            <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-4">
              Selva Alta Roasters · Tingo María, Huánuco · 1.820 msnm
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f3f0] leading-[1.12] mb-5">
              Café de especialidad de 87 puntos SCA para barras y oficinas en
              Santiago, con molienda calibrada y entregas carbono neutrales.
            </h1>
            <p className="text-base sm:text-lg text-[#b0a89e] leading-relaxed mb-8">
              Granos cosechados en Huánuco a 1.820 msnm frente al perfil de La
              Bella Durmiente, con trazabilidad directa, cosecha inclusiva y
              evaluación sensorial rigurosa.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/b2b#contacto"
                className="inline-flex items-center justify-center bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f3f0]"
              >
                Solicitar detalles y muestras por correo
              </Link>
              <Link
                href="/club"
                className="inline-flex items-center justify-center bg-[#181512]/90 hover:bg-[#241f1b] text-[#f5f3f0] border border-[#332c25] font-medium text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
              >
                Pedir en formato 250g o por volumen
              </Link>
            </div>
          </section>

          {/* Active Lot Technical Card: Marsellesa 87 SCA */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e] whitespace-nowrap">
                Lote Activo · Cosecha Actual
              </h2>
              <div className="h-px bg-[#332c25] flex-grow" />
            </div>

            <div className="bg-[#181512]/80 backdrop-blur-md border border-[#332c25] rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <p className="font-mono text-xs text-[#c25e1a] uppercase tracking-wider mb-1">
                    Variedad Exclusiva · 87.0 Puntos SCA
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f3f0]">
                    Marsellesa Orgánico
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#b0a89e] leading-relaxed">
                  Cultivado bajo sombra en las laderas de Tingo María. La
                  maduración lenta a 1.820 metros de altitud produce una taza
                  limpia, de cuerpo sedoso y acidez equilibrada, con notas
                  definidas a chocolate amargo, caramelo tostado y frutos
                  dulces.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {volumeTiers.map((tier) => (
                    <Link
                      key={tier.label}
                      href={tier.href}
                      className="block bg-[#241f1b]/90 hover:bg-[#241f1b] border border-[#332c25] hover:border-[#c25e1a] rounded-lg p-3.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                    >
                      <span className="block text-xs text-[#b0a89e] mb-1">
                        {tier.label}
                      </span>
                      <span className="block font-mono text-base font-bold text-[#f5f3f0]">
                        {tier.price}
                      </span>
                      <span className="block font-mono text-[11px] text-[#c25e1a] mt-1">
                        {tier.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#241f1b]/90 border border-[#332c25] rounded-lg p-5 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] pb-2 border-b border-[#332c25]">
                  Ficha Agronómica y Logística
                </h4>
                <dl className="divide-y divide-[#332c25]">
                  {specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="py-2.5 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                    >
                      <dt className="text-xs uppercase tracking-wider text-[#7d746b]">
                        {spec.label}
                      </dt>
                      <dd className="font-mono text-xs text-[#f5f3f0] sm:text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Route Paths: B2B vs Direct Orders */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e] whitespace-nowrap">
                Modalidades de Abastecimiento
              </h2>
              <div className="h-px bg-[#332c25] flex-grow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#181512]/80 backdrop-blur-md border border-[#332c25] hover:border-[#c25e1a] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-2">
                    Cafeterías · Startups · Oficinas
                  </p>
                  <h3 className="text-xl font-bold text-[#f5f3f0] mb-3">
                    Suministro B2B y Muestras para Barra
                  </h3>
                  <p className="text-sm text-[#b0a89e] leading-relaxed mb-6">
                    Abastecimiento programado en bolsas de 250g con precios
                    escalonados por kilo. Incluye calibración de molienda para
                    espresso o métodos filtrados y despacho carbono neutral.
                  </p>
                </div>
                <Link
                  href="/b2b"
                  className="inline-flex items-center justify-between w-full bg-[#241f1b] hover:bg-[#c25e1a] text-[#f5f3f0] hover:text-white font-semibold text-sm px-4 py-3 rounded-lg border border-[#332c25] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                >
                  <span>Revisar programa para barras y oficinas</span>
                  <span className="font-mono text-xs">B2B</span>
                </Link>
              </div>

              <div className="bg-[#181512]/80 backdrop-blur-md border border-[#332c25] hover:border-[#c25e1a] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-2">
                    Pedidos Directos · Molienda a Medida
                  </p>
                  <h3 className="text-xl font-bold text-[#f5f3f0] mb-3">
                    Catálogo por Formato y Método de Extracción
                  </h3>
                  <p className="text-sm text-[#b0a89e] leading-relaxed mb-6">
                    Elige tu volumen (250g, 1 kg o 3 kg) y selecciona el tipo de
                    molienda exacto para Moka Italiana, Prensa Francesa,
                    Espresso, Filtro V60 o Grano Entero.
                  </p>
                </div>
                <Link
                  href="/club"
                  className="inline-flex items-center justify-between w-full bg-[#241f1b] hover:bg-[#c25e1a] text-[#f5f3f0] hover:text-white font-semibold text-sm px-4 py-3 rounded-lg border border-[#332c25] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                >
                  <span>Configurar pedido y molienda</span>
                  <span className="font-mono text-xs">250G / VOLUMEN</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

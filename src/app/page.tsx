import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export default function Home() {
  const volumeTiers = [
    {
      label: "1 Bolsa (250g)",
      price: "$12.900",
      detail: "Para probar en casa · Molido a tu cafetera",
      href: "/club?tier=marsellesa-250g",
    },
    {
      label: "Pack 1 Kilo (4 × 250g)",
      price: "$44.900",
      detail: "Ahorras 13% · Envío gratis en Santiago",
      href: "/club?tier=marsellesa-1kg",
    },
    {
      label: "Caja 3 Kilos (12 × 250g)",
      price: "$119.900",
      detail: "Ahorras 22% · Ideal para oficinas y barras",
      href: "/club?tier=marsellesa-3kg",
    },
  ];

  const originGallery = [
    {
      src: "/images/origen/plantacion-selva-alta.png",
      alt: "Cafetales bajo sombra en la selva nubosa de Tingo María",
      stage: "01 · La Montaña y el Bosque",
      title: "Cultivo bajo sombra a 1.820 metros",
      description:
        "Nuestros cafetos crecen rodeados de neblina y árboles nativos frente a La Bella Durmiente en Tingo María, Huánuco.",
    },
    {
      src: "/images/origen/cerezas-marsellesa.png",
      alt: "Cerezas rojas maduras de café variedad Marsellesa en la rama",
      stage: "02 · Cosecha en Cereza Roja",
      title: "Recolección manual selectiva",
      description:
        "Solo cosechamos cerezas Marsellesa en su punto exacto de madurez, logrando un dulzor natural que alcanza 87 puntos SCA.",
    },
    {
      src: "/images/origen/grano-verde-tostado.png",
      alt: "Granos de café verde junto a granos recién tostados",
      stage: "03 · Del Grano Verde al Tueste",
      title: "Tueste fresco y molienda a pedido",
      description:
        "Cuidamos cada lote desde el pergamino y grano verde hasta el tueste medio, moliéndolo justo antes de enviarlo según tu cafetera.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1B12] flex flex-col font-sans selection:bg-[#9E2A2B] selection:text-white">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section: Warm Coffee Storytelling + Hero Image */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pb-20 sm:pb-24">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#EFE4D2] border border-[#D8C3A5] text-[#143326] px-3 py-1 rounded-full text-xs font-medium mb-5">
                <span className="w-2 h-2 rounded-full bg-[#9E2A2B]" />
                <span>Cosecha de Selva Alta · Tingo María, Perú (1.820 msnm)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#143326] leading-[1.12] mb-5">
                Café de origen amazónico, tostado fresco y molido para tu
                cafetera.
              </h1>

              <p className="text-base sm:text-lg text-[#4A3F35] leading-relaxed mb-8">
                Traemos a Chile nuestro lote familiar{" "}
                <strong className="text-[#2A1B12]">
                  Marsellesa Orgánico (87 puntos SCA)
                </strong>
                , cultivado en las laderas verdes de La Bella Durmiente. Dulce,
                achocolatado y sin amargor, para tu casa, tu oficina o tu
                cafetería.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/club"
                  className="inline-flex items-center justify-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                >
                  Comprar bolsas de 250g o packs
                </Link>
                <Link
                  href="/b2b"
                  className="inline-flex items-center justify-center bg-[#FFFDF9] hover:bg-[#F3ECE1] text-[#143326] border border-[#DFD3C3] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                >
                  Pedir muestras para cafetería u oficina
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#DFD3C3] bg-[#F3ECE1] shadow-md">
                <Image
                  src="/images/origen/bolsa-y-extraccion.png"
                  alt="Bolsa de 250g de café Selva Alta junto a preparación filtrada"
                  width={800}
                  height={600}
                  priority
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 bg-[#FFFDF9]/95 border-t border-[#DFD3C3] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#143326] block">
                      Lote Marsellesa Orgánico
                    </span>
                    <span className="text-[#6E5D4F]">
                      Notas a chocolate bitter, nuez tostada y caramelo
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#9E2A2B] bg-[#EFE4D2] px-2.5 py-1 rounded">
                    87.0 SCA
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Origin Journey: Plantación -> Cereza -> Grano Verde y Tostado */}
          <section className="mb-20">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38] mb-1">
                De la Selva Nubosa a tu Taza
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#143326]">
                Conoce el camino de nuestro café en Tingo María
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {originGallery.map((item) => (
                <article
                  key={item.title}
                  className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="bg-[#F3ECE1] border-b border-[#DFD3C3] overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={640}
                      height={420}
                      className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#9E2A2B] font-semibold block mb-1">
                        {item.stage}
                      </span>
                      <h3 className="text-lg font-bold text-[#143326] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#4A3F35] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Warm Product Showcase instead of cold consulting table */}
          <section className="mb-20">
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="max-w-2xl mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold block mb-1">
                  Cosecha Familiar Disponible Ahora
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#143326] mb-3">
                  Marsellesa Orgánico · Bolsas de 250g
                </h2>
                <p className="text-sm sm:text-base text-[#4A3F35] leading-relaxed">
                  Un café redondo, aromático y muy fácil de tomar todos los
                  días. Lo enviamos en grano entero o recién molido para Prensa
                  Francesa, Cafetera Italiana (Moka), Filtro o Espresso.
                </p>
              </div>

              {/* 4 Warm Highlights instead of a clinical 8-row datasheet */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-4">
                  <span className="block text-xs text-[#6E5D4F] mb-1">
                    Aroma y Sabor
                  </span>
                  <span className="text-sm font-bold text-[#2A1B12]">
                    Chocolate, caramelo y frutos dulces
                  </span>
                </div>
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-4">
                  <span className="block text-xs text-[#6E5D4F] mb-1">
                    Origen y Altura
                  </span>
                  <span className="text-sm font-bold text-[#143326]">
                    Tingo María · 1.820 msnm
                  </span>
                </div>
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-4">
                  <span className="block text-xs text-[#6E5D4F] mb-1">
                    Calidad en Taza
                  </span>
                  <span className="text-sm font-bold text-[#9E2A2B]">
                    87.0 Puntos SCA (Especialidad)
                  </span>
                </div>
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-4">
                  <span className="block text-xs text-[#6E5D4F] mb-1">
                    Tueste y Molienda
                  </span>
                  <span className="text-sm font-bold text-[#2A1B12]">
                    Tueste medio · Molido a medida
                  </span>
                </div>
              </div>

              {/* Price Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {volumeTiers.map((tier) => (
                  <Link
                    key={tier.label}
                    href={tier.href}
                    className="group block bg-[#FAF6F0] hover:bg-[#EFE4D2] border border-[#DFD3C3] hover:border-[#9E2A2B] rounded-xl p-5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                  >
                    <span className="block text-xs font-semibold text-[#1E4D38] mb-1">
                      {tier.label}
                    </span>
                    <span className="block font-mono text-2xl font-bold text-[#2A1B12] mb-1">
                      {tier.price}
                    </span>
                    <span className="block text-xs text-[#4A3F35] mb-3">
                      {tier.detail}
                    </span>
                    <span className="inline-block text-xs font-semibold text-[#9E2A2B] group-hover:underline">
                      Elegir este formato →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Two Warm Invitations: Casa vs. Cafeterías/Oficinas */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-2">
                  Para tu Casa o Regalo
                </p>
                <h3 className="text-xl font-bold text-[#143326] mb-3">
                  Elige tu cantidad y tu cafetera favorita
                </h3>
                <p className="text-sm text-[#4A3F35] leading-relaxed mb-6">
                  Pide desde una bolsa de 250g hasta packs de 1 o 3 kilos con
                  descuento. Nos indicas qué cafetera usas y te lo preparamos en
                  el punto exacto.
                </p>
              </div>
              <Link
                href="/club"
                className="inline-flex items-center justify-center w-full bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
              >
                Ir a comprar bolsas de 250g
              </Link>
            </div>

            <div className="bg-[#143326] text-[#FAF6F0] border border-[#1E4D38] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#A9BFA8] font-semibold mb-2">
                  Cafeterías · Restaurantes · Oficinas
                </p>
                <h3 className="text-xl font-bold text-[#FAF6F0] mb-3">
                  Café recién tostado para tu equipo o tus clientes
                </h3>
                <p className="text-sm text-[#D5CBB8] leading-relaxed mb-6">
                  Abastecemos barras de especialidad y oficinas en Santiago con
                  precios mayoristas, bolsas de 250g que conservan el aroma por
                  más tiempo y muestras sin costo.
                </p>
              </div>
              <Link
                href="/b2b"
                className="inline-flex items-center justify-center w-full bg-[#FAF6F0] hover:bg-[#EFE4D2] text-[#143326] font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Ver precios para cafeterías y empresas
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

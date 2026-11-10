"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";
import { addB2BContact } from "@/app/actions";

export default function B2BPage() {
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [selectedTier, setSelectedTier] = useState("Caja 3 kg (12 × 250g)");

  const volumeTable = [
    {
      tier: "Bolsa Individual (250g)",
      bags: "1 bolsa × 250g",
      oldPrice: "$13.990",
      price: "$11.500",
      badge: "18% DCTO",
      unitCost: "$11.500 por bolsa (Normal $13.990)",
      useCase: "Para probar el café en tu máquina o cafetera antes de pedir por volumen",
    },
    {
      tier: "Pack 1 kg (4 × 250g)",
      bags: "4 bolsas × 250g",
      oldPrice: "$55.960",
      price: "$39.990",
      badge: "28% DCTO",
      unitCost: "$9.998 por bolsa (Ahorras $15.970)",
      useCase: "Ideal para oficinas de 8 a 15 personas con envío gratis en Santiago",
    },
    {
      tier: "Caja 3 kg (12 × 250g)",
      bags: "12 bolsas × 250g",
      oldPrice: "$167.880",
      price: "$104.990",
      badge: "37% DCTO",
      unitCost: "$8.749 por bolsa (Ahorras $62.890)",
      useCase: "Pensado para cafeterías, restaurantes, estudios y oficinas medianas",
    },
  ];

  const handleB2BSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("loading");
    const formData = new FormData(e.currentTarget);
    const result = await addB2BContact(formData);

    if (result.success) {
      setContactStatus("success");
      setContactMessage(
        result.message ||
          "Solicitud enviada al correo de Selva Alta. Un representante se contactará en breve."
      );
    } else {
      setContactStatus("error");
      setContactMessage(
        result.error || "Ocurrió un error al enviar tu solicitud."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1B12] flex flex-col font-sans selection:bg-[#9E2A2B] selection:text-white">
      <BellaDurmienteBackground variant="b2b" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Origin Photos */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16">
            <div className="lg:col-span-7 bg-[#FAF6F0]/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#DFD3C3]/80 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38] font-semibold mb-3">
                Cafeterías · Restaurantes · Oficinas
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#143326] leading-[1.12] mb-5">
                Lleva el sabor de la selva alta peruana a tu barra o a tu
                equipo.
              </h1>
              <p className="text-base sm:text-lg text-[#4A3F35] leading-relaxed mb-8">
                Entregamos nuestro lote{" "}
                <strong className="text-[#2A1B12]">
                  Marsellesa Orgánico (87 puntos SCA)
                </strong>{" "}
                en bolsas de 250g con válvula para que cada apertura conserve su
                aroma intacto, sin que el grano se oxide en la tolva o en la
                cocina de la oficina.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                >
                  Solicitar muestra o cotización
                </a>
                <a
                  href="mailto:comercial@selvaalta.cl?subject=Consulta%20Comercial%20Selva%20Alta"
                  className="inline-flex items-center justify-center bg-[#FFFDF9] hover:bg-[#F3ECE1] text-[#143326] border border-[#DFD3C3] font-mono text-xs sm:text-sm px-5 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                >
                  comercial@selvaalta.cl
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-[#DFD3C3] bg-[#F3ECE1] shadow-sm">
                <Image
                  src="/images/origen/cerezas-marsellesa.png"
                  alt="Cerezas rojas de café Marsellesa en rama"
                  width={400}
                  height={320}
                  className="w-full aspect-[4/3] object-cover"
                />
                <p className="p-2.5 text-[11px] font-medium text-[#4A3F35] bg-[#FFFDF9]">
                  Cereza Marsellesa a 1.820 msnm
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-[#DFD3C3] bg-[#F3ECE1] shadow-sm">
                <Image
                  src="/images/origen/grano-verde-tostado.png"
                  alt="Grano verde y grano recién tostado de Selva Alta"
                  width={400}
                  height={320}
                  className="w-full aspect-[4/3] object-cover"
                />
                <p className="p-2.5 text-[11px] font-medium text-[#4A3F35] bg-[#FFFDF9]">
                  Grano seleccionado y tueste fresco
                </p>
              </div>
            </div>
          </section>

          {/* Simple, Warm Why Selva Alta for B2B */}
          <section className="mb-16">
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-[#143326] mb-6">
                ¿Por qué trabajar con Selva Alta en tu local u oficina?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#9E2A2B] block mb-1">
                    Frescura por Bolsa
                  </span>
                  <h3 className="text-base font-bold text-[#2A1B12] mb-2">
                    Formato fraccionado de 250g
                  </h3>
                  <p className="text-sm text-[#4A3F35] leading-relaxed">
                    Abres solo lo que vas a preparar en el día y el resto de tu
                    stock permanece sellado con válvula desgasificadora.
                  </p>
                </div>
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#1E4D38] block mb-1">
                    Listo para Preparar
                  </span>
                  <h3 className="text-base font-bold text-[#2A1B12] mb-2">
                    En grano o molido para tu equipo
                  </h3>
                  <p className="text-sm text-[#4A3F35] leading-relaxed">
                    Si tienes molino en barra lo entregamos en grano entero; si
                    es para oficina, lo enviamos molido para filtro, prensa o
                    moka.
                  </p>
                </div>
                <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-5">
                  <span className="font-mono text-xs font-bold text-[#9E2A2B] block mb-1">
                    Trato Directo
                  </span>
                  <h3 className="text-base font-bold text-[#2A1B12] mb-2">
                    De nuestra familia productora
                  </h3>
                  <p className="text-sm text-[#4A3F35] leading-relaxed">
                    Sin intermediarios: conocemos cada cosecha de Tingo María y
                    coordinamos tus entregas directamente en Santiago.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Volume Pricing Cards */}
          <section className="mb-16">
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38] font-semibold mb-1">
                Precios Transparentes (IVA Incluido)
              </p>
              <h2 className="text-2xl font-bold text-[#143326]">
                Escala por volumen en bolsas de 250g
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {volumeTable.map((row) => {
                const isSelected = selectedTier === row.tier;
                return (
                  <div
                    key={row.tier}
                    className={`bg-[#FFFDF9]/95 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-colors duration-150 ${
                      isSelected
                        ? "border-[#9E2A2B] ring-1 ring-[#9E2A2B]"
                        : "border-[#DFD3C3]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-mono text-xs text-[#9E2A2B] font-semibold uppercase tracking-wider">
                          {row.bags}
                        </p>
                        <span className="font-mono text-[10px] font-bold bg-[#9E2A2B] text-white px-2 py-0.5 rounded">
                          {row.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#143326] mb-2">
                        {row.tier}
                      </h3>
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <p className="font-mono text-3xl font-bold text-[#2A1B12]">
                          {row.price}
                        </p>
                        <span className="font-mono text-sm text-[#6E5D4F] line-through">
                          {row.oldPrice}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-[#1E4D38] font-medium mb-4">
                        {row.unitCost}
                      </p>
                      <p className="text-xs text-[#4A3F35] leading-relaxed mb-6">
                        {row.useCase}
                      </p>
                    </div>

                    <a
                      href="#contacto"
                      onClick={() => setSelectedTier(row.tier)}
                      className="w-full text-center bg-[#F3ECE1] hover:bg-[#9E2A2B] text-[#2A1B12] hover:text-white font-semibold text-xs py-3 px-4 rounded-lg border border-[#DFD3C3] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                    >
                      Consultar por este formato
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Direct Email & Wizard of Oz Form */}
          <section id="contacto">
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-6 sm:p-10 max-w-2xl shadow-sm">
              <div className="mb-6">
                <p className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-1">
                  Contacto Directo con los Socios
                </p>
                <h2 className="text-2xl font-bold text-[#143326]">
                  Escríbenos para coordinar muestras o pedidos
                </h2>
              </div>

              {contactStatus === "success" ? (
                <div className="py-6 space-y-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38] font-semibold">
                    Mensaje Recibido
                  </p>
                  <h3 className="text-2xl font-bold text-[#143326]">
                    Gracias por escribirnos
                  </h3>
                  <p className="text-sm text-[#4A3F35] leading-relaxed">
                    {contactMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactStatus("idle")}
                    className="bg-[#F3ECE1] hover:bg-[#EFE4D2] text-[#143326] border border-[#DFD3C3] font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleB2BSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-name"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        Tu Nombre *
                      </label>
                      <input
                        id="b2b-name"
                        name="name"
                        required
                        type="text"
                        placeholder="Nombre y apellido"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-company"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        Cafetería, Restaurante u Oficina *
                      </label>
                      <input
                        id="b2b-company"
                        name="company"
                        required
                        type="text"
                        placeholder="Nombre de tu local o empresa"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-email"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        Correo Electrónico *
                      </label>
                      <input
                        id="b2b-email"
                        name="email"
                        required
                        type="email"
                        placeholder="nombre@empresa.cl"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-phone"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="b2b-phone"
                        name="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-volume"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        Formato de Interés
                      </label>
                      <select
                        id="b2b-volume"
                        name="volume"
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value)}
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      >
                        {volumeTable.map((row) => (
                          <option key={row.tier} value={row.tier}>
                            {row.tier} ({row.price})
                          </option>
                        ))}
                        <option value="Más de 5 kg mensuales">
                          Más de 5 kg mensuales
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-grind"
                        className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                      >
                        ¿En grano o molido?
                      </label>
                      <select
                        id="b2b-grind"
                        name="grind"
                        defaultValue="Grano Entero"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] disabled:opacity-50"
                      >
                        <option value="Grano Entero">Grano Entero</option>
                        <option value="Molienda Espresso de Barra">
                          Molido para Máquina de Espresso
                        </option>
                        <option value="Molienda Filtro V60 / Goteo">
                          Molido para Cafetera de Filtro / Goteo
                        </option>
                        <option value="Molienda Prensa Francesa">
                          Molido para Prensa Francesa
                        </option>
                        <option value="Molienda Moka Italiana">
                          Molido para Cafetera Italiana (Moka)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="b2b-message"
                      className="block text-xs font-semibold text-[#2A1B12] mb-1.5"
                    >
                      Cuéntanos qué necesitas
                    </label>
                    <textarea
                      id="b2b-message"
                      name="message"
                      rows={3}
                      placeholder="Ej: Queremos probar una muestra en nuestra cafetería en Providencia o cotizar café mensual para la oficina..."
                      disabled={contactStatus === "loading"}
                      className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] resize-none disabled:opacity-50"
                    />
                  </div>

                  {contactStatus === "error" && (
                    <p className="text-[#9E2A2B] text-xs font-semibold">
                      {contactMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={contactStatus === "loading"}
                    className="w-full bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold py-3.5 px-6 rounded-lg text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                  >
                    {contactStatus === "loading"
                      ? "Enviando mensaje..."
                      : "Enviar solicitud a Selva Alta"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

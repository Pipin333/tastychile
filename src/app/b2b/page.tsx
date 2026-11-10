"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";
import { addB2BContact } from "@/app/actions";

export default function B2BPage() {
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [selectedTier, setSelectedTier] = useState("Volumen 3 kg (12 × 250g)");

  const volumeTable = [
    {
      tier: "Muestra / Unidad (250g)",
      bags: "1 bolsa × 250g",
      price: "$12.900",
      unitCost: "$12.900 / bolsa",
      useCase: "Catación inicial en barra o equipo pequeño",
    },
    {
      tier: "Volumen 1 kg (4 × 250g)",
      bags: "4 bolsas × 250g",
      price: "$44.900",
      unitCost: "$11.225 / bolsa (-13%)",
      useCase: "Oficinas de 8 a 15 personas o barra de filtrado",
    },
    {
      tier: "Volumen 3 kg (12 × 250g)",
      bags: "12 bolsas × 250g",
      price: "$119.900",
      unitCost: "$9.990 / bolsa (-22%)",
      useCase: "Cafeterías de especialidad, startups y coworks",
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
    <div className="min-h-screen bg-[#110f0d] text-[#f5f3f0] flex flex-col font-sans selection:bg-[#c25e1a] selection:text-white">
      <BellaDurmienteBackground variant="b2b" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="max-w-2xl pb-20">
            <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-3">
              Abastecimiento B2B · Barras, Startups y Oficinas
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f3f0] leading-[1.12] mb-5">
              Marsellesa Orgánico de 87 puntos SCA en formato de 250g con escala
              por volumen.
            </h1>
            <p className="text-base sm:text-lg text-[#b0a89e] leading-relaxed mb-8">
              Empaque fraccionado en bolsas de 250g con válvula desgasificadora
              para preservar la frescura de cada apertura en barra o cocina de
              oficina. Molienda ajustable y entregas carbono neutrales en
              Santiago.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f3f0]"
              >
                Escribir al correo pidiendo más detalles
              </a>
              <a
                href="mailto:comercial@selvaalta.cl?subject=Consulta%20Comercial%20Marsellesa%2087%20SCA"
                className="inline-flex items-center justify-center bg-[#181512]/90 hover:bg-[#241f1b] text-[#f5f3f0] border border-[#332c25] font-mono text-xs sm:text-sm px-5 py-3.5 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
              >
                comercial@selvaalta.cl
              </a>
            </div>
          </section>

          {/* Technical Datasheet: Marsellesa 87 SCA */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e] whitespace-nowrap">
                Ficha Técnica del Lote Activo
              </h2>
              <div className="h-px bg-[#332c25] flex-grow" />
            </div>

            <div className="bg-[#181512]/80 backdrop-blur-md border border-[#332c25] rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a]">
                  Cosecha Tingo María · Huánuco, Perú
                </p>
                <h3 className="text-2xl font-bold text-[#f5f3f0]">
                  Marsellesa Orgánico · 87.0 Puntos SCA
                </h3>
                <p className="text-sm text-[#b0a89e] leading-relaxed">
                  Cultivado de forma orgánica a 1.820 msnm en la cordillera de
                  La Bella Durmiente. Su proceso lavado entrega una extracción
                  estable en máquina de espresso y excelente claridad en
                  métodos de filtro y cafeteras de oficina.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="bg-[#241f1b] border border-[#332c25] rounded-lg p-3.5">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b]">
                      Notas en Taza
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#f5f3f0]">
                      Chocolate · Caramelo · Frutos dulces
                    </span>
                  </div>
                  <div className="bg-[#241f1b] border border-[#332c25] rounded-lg p-3.5">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b]">
                      Calibración de Molienda
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#f5f3f0]">
                      Grano, Espresso, Moka, Filtro o Prensa
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                <div className="bg-[#241f1b]/90 border border-[#332c25] rounded-lg p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b] mb-1">
                    Altitud de Cosecha
                  </span>
                  <span className="font-mono text-base font-bold text-[#f5f3f0]">
                    1.820 msnm
                  </span>
                </div>
                <div className="bg-[#241f1b]/90 border border-[#332c25] rounded-lg p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b] mb-1">
                    Evaluación Sensorial
                  </span>
                  <span className="font-mono text-base font-bold text-[#c25e1a]">
                    87.0 Puntos SCA
                  </span>
                </div>
                <div className="bg-[#241f1b]/90 border border-[#332c25] rounded-lg p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b] mb-1">
                    Impacto Social
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#f5f3f0]">
                    Cosecha Inclusiva
                  </span>
                </div>
                <div className="bg-[#241f1b]/90 border border-[#332c25] rounded-lg p-4">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7d746b] mb-1">
                    Distribución Local
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#f5f3f0]">
                    Carbono Neutral
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Volume Pricing Table */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e] whitespace-nowrap">
                Escala de Precios por Volumen (Formato 250g)
              </h2>
              <div className="h-px bg-[#332c25] flex-grow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {volumeTable.map((row) => {
                const isSelected = selectedTier === row.tier;
                return (
                  <div
                    key={row.tier}
                    className={`bg-[#181512]/85 backdrop-blur-md border rounded-xl p-6 flex flex-col justify-between transition-colors duration-150 ${
                      isSelected ? "border-[#c25e1a]" : "border-[#332c25]"
                    }`}
                  >
                    <div>
                      <p className="font-mono text-xs text-[#c25e1a] uppercase tracking-wider mb-1">
                        {row.bags}
                      </p>
                      <h3 className="text-lg font-bold text-[#f5f3f0] mb-2">
                        {row.tier}
                      </h3>
                      <p className="font-mono text-2xl font-bold text-[#f5f3f0] mb-1">
                        {row.price}
                      </p>
                      <p className="font-mono text-xs text-[#b0a89e] mb-4">
                        {row.unitCost}
                      </p>
                      <p className="text-xs text-[#b0a89e] leading-relaxed mb-6">
                        {row.useCase}
                      </p>
                    </div>

                    <a
                      href="#contacto"
                      onClick={() => setSelectedTier(row.tier)}
                      className="w-full text-center bg-[#241f1b] hover:bg-[#c25e1a] text-[#f5f3f0] hover:text-white font-semibold text-xs py-2.5 px-4 rounded-lg border border-[#332c25] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                    >
                      Solicitar este tramo por correo
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Direct Email & Wizard of Oz Form */}
          <section id="contacto">
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e] whitespace-nowrap">
                Solicitar Más Detalles al Correo de Selva Alta
              </h2>
              <div className="h-px bg-[#332c25] flex-grow" />
            </div>

            <div className="bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl p-6 sm:p-8 max-w-2xl">
              {contactStatus === "success" ? (
                <div className="py-6 space-y-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a]">
                    Confirmación de Solicitud
                  </p>
                  <h3 className="text-2xl font-bold text-[#f5f3f0]">
                    Solicitud enviada a Selva Alta
                  </h3>
                  <p className="text-sm text-[#b0a89e] leading-relaxed">
                    {contactMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactStatus("idle")}
                    className="bg-[#241f1b] hover:bg-[#332c25] text-[#f5f3f0] border border-[#332c25] font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
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
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                      >
                        Nombre y Apellido *
                      </label>
                      <input
                        id="b2b-name"
                        name="name"
                        required
                        type="text"
                        placeholder="Nombre de contacto"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-company"
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                      >
                        Cafetería, Startup u Oficina *
                      </label>
                      <input
                        id="b2b-company"
                        name="company"
                        required
                        type="text"
                        placeholder="Nombre del lugar o empresa"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-email"
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
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
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-phone"
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                      >
                        Teléfono de Contacto
                      </label>
                      <input
                        id="b2b-phone"
                        name="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-volume"
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                      >
                        Tramo de Volumen
                      </label>
                      <select
                        id="b2b-volume"
                        name="volume"
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value)}
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      >
                        {volumeTable.map((row) => (
                          <option key={row.tier} value={row.tier}>
                            {row.tier} ({row.price})
                          </option>
                        ))}
                        <option value="Volumen mayor a 5 kg mensuales">
                          Volumen mayor a 5 kg mensuales
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="b2b-grind"
                        className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                      >
                        Molienda Requerida
                      </label>
                      <select
                        id="b2b-grind"
                        name="grind"
                        defaultValue="Grano Entero"
                        disabled={contactStatus === "loading"}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] disabled:opacity-50"
                      >
                        <option value="Grano Entero">Grano Entero</option>
                        <option value="Molienda Espresso de Barra">
                          Molienda Espresso de Barra
                        </option>
                        <option value="Molienda Moka Italiana">
                          Molienda Moka Italiana
                        </option>
                        <option value="Molienda Filtro V60 / Goteo">
                          Molienda Filtro V60 / Goteo
                        </option>
                        <option value="Molienda Prensa Francesa">
                          Molienda Prensa Francesa
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="b2b-message"
                      className="block font-mono text-xs uppercase tracking-wider text-[#b0a89e] mb-1.5"
                    >
                      Consulta o Requerimiento
                    </label>
                    <textarea
                      id="b2b-message"
                      name="message"
                      rows={3}
                      placeholder="Indícanos tu máquina o método de extracción y dirección en Santiago para coordinar muestra o entrega."
                      disabled={contactStatus === "loading"}
                      className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] resize-none disabled:opacity-50"
                    />
                  </div>

                  {contactStatus === "error" && (
                    <p className="text-red-400 text-xs font-medium">
                      {contactMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={contactStatus === "loading"}
                    className="w-full bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold py-3.5 px-6 rounded-lg text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f3f0]"
                  >
                    {contactStatus === "loading"
                      ? "Enviando al correo de Selva Alta..."
                      : "Escribir al correo pidiendo más detalles"}
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

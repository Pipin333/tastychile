"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";
import { createWizardOfOzOrder } from "@/app/actions";

interface VolumeTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  unitPriceLabel: string;
  bagsCount: string;
}

const VOLUME_TIERS: VolumeTier[] = [
  {
    id: "marsellesa-250g",
    name: "Formato 250g",
    subtitle: "1 bolsa de 250g con válvula desgasificadora",
    price: 12900,
    unitPriceLabel: "$12.900 / bolsa",
    bagsCount: "1 × 250g",
  },
  {
    id: "marsellesa-1kg",
    name: "Volumen 1 kg",
    subtitle: "4 bolsas de 250g · Despacho carbono neutral incluido",
    price: 44900,
    unitPriceLabel: "$11.225 / bolsa (-13%)",
    bagsCount: "4 × 250g",
  },
  {
    id: "marsellesa-3kg",
    name: "Volumen 3 kg",
    subtitle: "12 bolsas de 250g · Ideal para barras, startups y oficinas",
    price: 119900,
    unitPriceLabel: "$9.990 / bolsa (-22%)",
    bagsCount: "12 × 250g",
  },
];

interface GrindMethod {
  id: string;
  label: string;
  calib: string;
  description: string;
}

const GRIND_METHODS: GrindMethod[] = [
  {
    id: "Grano Entero",
    label: "Grano Entero",
    calib: "Sin moler",
    description: "Para molinos de barra o molienda al instante antes de extraer.",
  },
  {
    id: "Moka Italiana (Fina)",
    label: "Moka Italiana",
    calib: "Molienda Fina",
    description: "Calibrada para cafetera italiana octogonal sin sobre-extracción.",
  },
  {
    id: "Prensa Francesa (Gruesa)",
    label: "Prensa Francesa",
    calib: "Molienda Gruesa",
    description: "Partícula uniforme para inmersión limpia y cuerpo sedoso.",
  },
  {
    id: "Espresso de Barra (Extra Fina)",
    label: "Espresso",
    calib: "Extra Fina",
    description: "Ajustada para portafiltros presurizados o máquinas de 9 bares.",
  },
  {
    id: "Filtro V60 / Goteo (Media)",
    label: "Filtro / V60",
    calib: "Molienda Media",
    description: "Para conos de goteo, Chemex y cafeteras eléctricas de oficina.",
  },
];

const REGIONES_CHILE = [
  "Región Metropolitana de Santiago",
  "Región de Valparaíso",
  "Región de O'Higgins",
  "Región del Maule",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Lagos",
  "Región de Coquimbo",
  "Región de Antofagasta",
  "Otra Región",
];

function MethodIcon({ methodId }: { methodId: string }) {
  if (methodId.startsWith("Moka")) {
    return (
      <svg
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-8 text-[#c25e1a]"
        aria-hidden="true"
      >
        <circle cx="20" cy="4" r="2" />
        <path d="M10 10 L20 6 L30 10 Z" />
        <path d="M10 10 L13 24 L27 24 L30 10 Z" />
        <rect x="12" y="24" width="16" height="3" rx="0.5" />
        <path d="M13 27 L10 44 L30 44 L27 27 Z" />
        <path d="M30 15 C36 16 36 24 32 30" />
        <path d="M10 12 L5 16 L11 20" />
      </svg>
    );
  }
  if (methodId.startsWith("Prensa")) {
    return (
      <svg
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-8 text-[#c25e1a]"
        aria-hidden="true"
      >
        <circle cx="20" cy="4" r="2.5" />
        <line x1="20" y1="6.5" x2="20" y2="30" />
        <path d="M10 11 L30 11 L28 14 L12 14 Z" />
        <rect x="11" y="14" width="18" height="30" rx="1.5" />
        <rect x="12" y="30" width="16" height="3" />
        <path d="M29 19 C35 20 35 36 29 38" />
      </svg>
    );
  }
  if (methodId.startsWith("Espresso")) {
    return (
      <svg
        viewBox="0 0 44 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-8 text-[#c25e1a]"
        aria-hidden="true"
      >
        <path d="M8 14 L28 14 L26 26 L10 26 Z" />
        <line x1="6" y1="14" x2="30" y2="14" strokeWidth="2" />
        <path d="M14 26 L12 32" />
        <path d="M22 26 L24 32" />
        <path d="M28 17 L42 21 L40 25 L27 20" />
      </svg>
    );
  }
  if (methodId.startsWith("Filtro")) {
    return (
      <svg
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-7 h-8 text-[#c25e1a]"
        aria-hidden="true"
      >
        <path d="M8 10 L32 10 L22 28 L18 28 Z" />
        <line x1="6" y1="10" x2="34" y2="10" strokeWidth="2" />
        <path d="M12 30 L28 30 L26 44 L14 44 Z" />
        <path d="M28 33 C33 34 33 41 27 42" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-7 h-8 text-[#c25e1a]"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="24" rx="10" ry="14" />
      <path d="M20 10 C17 18 23 30 20 38" />
    </svg>
  );
}

export default function ClubPage() {
  const [selectedTierId, setSelectedTierId] = useState<string>("marsellesa-1kg");
  const [selectedGrind, setSelectedGrind] = useState<string>(
    GRIND_METHODS[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);

  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<null | {
    orderNumber: string;
    customerName: string;
    total: number;
    phone: string;
    email: string;
  }>(null);

  const activeTier =
    VOLUME_TIERS.find((t) => t.id === selectedTierId) || VOLUME_TIERS[0];
  const subtotal = activeTier.price * quantity;
  const shipping = subtotal >= 30000 ? 0 : 3900;
  const total = subtotal + shipping;

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const address = formData.get("address")?.toString() || "";
    const city = formData.get("city")?.toString() || "";
    const region = formData.get("region")?.toString() || "";
    const notes = formData.get("notes")?.toString() || "";

    const result = await createWizardOfOzOrder({
      name,
      email,
      phone,
      address,
      city,
      region,
      notes,
      items: [
        {
          id: activeTier.id,
          quantity,
          grind: selectedGrind,
        },
      ],
    });

    if (result.success && result.orderNumber) {
      setOrderSuccess({
        orderNumber: result.orderNumber,
        customerName: name,
        total,
        phone,
        email,
      });
      setSubmitting(false);
    } else {
      setOrderError(
        result.error || "Ocurrió un error al registrar tu solicitud."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#110f0d] text-[#f5f3f0] flex flex-col font-sans selection:bg-[#c25e1a] selection:text-white">
      <BellaDurmienteBackground variant="club" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section className="max-w-2xl pb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-3">
              Lote Activo · Marsellesa Orgánico · 87.0 Puntos SCA
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f5f3f0] leading-[1.12] mb-5">
              Configura tu volumen en formato 250g y la molienda para tu método.
            </h1>
            <p className="text-base sm:text-lg text-[#b0a89e] leading-relaxed">
              Cada pedido se registra directamente con nuestro equipo en
              Santiago. Un representante de Selva Alta se contactará contigo a
              la brevedad para coordinar el despacho carbono neutral y el pago.
            </p>
          </section>

          {orderSuccess ? (
            <section className="bg-[#181512]/90 backdrop-blur-md border border-[#c25e1a] rounded-xl p-6 sm:p-10 max-w-2xl space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-2">
                  Orden Registrada · {orderSuccess.orderNumber}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f3f0]">
                  Gracias por tu pedido, {orderSuccess.customerName}
                </h2>
              </div>

              <div className="bg-[#241f1b] border border-[#332c25] rounded-lg p-5 space-y-2">
                <h3 className="font-semibold text-[#f5f3f0] text-base">
                  Un representante se contactará en breve
                </h3>
                <p className="text-sm text-[#b0a89e] leading-relaxed">
                  Tu solicitud ha llegado al correo de operaciones de Selva Alta
                  y enviamos una copia de respaldo a{" "}
                  <strong className="text-[#f5f3f0]">
                    {orderSuccess.email}
                  </strong>
                  . Te contactaremos al teléfono{" "}
                  <strong className="text-[#f5f3f0]">
                    {orderSuccess.phone}
                  </strong>{" "}
                  para coordinar la entrega y el método de pago por un total de{" "}
                  <span className="font-mono font-bold text-[#c25e1a]">
                    ${orderSuccess.total.toLocaleString("es-CL")}
                  </span>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:comercial@selvaalta.cl?subject=Pedido%20${encodeURIComponent(
                    orderSuccess.orderNumber
                  )}`}
                  className="inline-flex items-center justify-center bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Escribir directo al correo de Selva Alta
                </a>
                <button
                  type="button"
                  onClick={() => setOrderSuccess(null)}
                  className="inline-flex items-center justify-center bg-[#241f1b] hover:bg-[#332c25] text-[#f5f3f0] border border-[#332c25] font-medium text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Realizar otro pedido
                </button>
              </div>
            </section>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 1. Volume Selection & 2. Grind Method */}
              <div className="lg:col-span-7 space-y-10">
                {/* Step 1: Volume Tier */}
                <section>
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e]">
                      1. Selecciona Tramo de Volumen (Bolsas de 250g)
                    </h2>
                    <div className="h-px bg-[#332c25] flex-grow" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {VOLUME_TIERS.map((tier) => {
                      const isActive = selectedTierId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedTierId(tier.id)}
                          className={`text-left rounded-xl p-4 border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] ${
                            isActive
                              ? "bg-[#241f1b] border-[#c25e1a]"
                              : "bg-[#181512]/80 border-[#332c25] hover:border-[#7d746b]"
                          }`}
                        >
                          <span className="block font-mono text-[11px] uppercase text-[#c25e1a] mb-1">
                            {tier.bagsCount}
                          </span>
                          <span className="block text-base font-bold text-[#f5f3f0] mb-1">
                            {tier.name}
                          </span>
                          <span className="block font-mono text-lg font-bold text-[#f5f3f0]">
                            ${tier.price.toLocaleString("es-CL")}
                          </span>
                          <span className="block font-mono text-[11px] text-[#b0a89e] mt-1">
                            {tier.unitPriceLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Step 2: Calibrated Grind */}
                <section>
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b0a89e]">
                      2. Ajusta la Molienda Según tu Cafetera
                    </h2>
                    <div className="h-px bg-[#332c25] flex-grow" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GRIND_METHODS.map((method) => {
                      const isActive = selectedGrind === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedGrind(method.id)}
                          className={`text-left rounded-xl p-4 border flex items-start gap-3.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] ${
                            isActive
                              ? "bg-[#241f1b] border-[#c25e1a]"
                              : "bg-[#181512]/80 border-[#332c25] hover:border-[#7d746b]"
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-[#110f0d] border border-[#332c25] flex-shrink-0">
                            <MethodIcon methodId={method.id} />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-[#f5f3f0]">
                              {method.label}
                            </span>
                            <span className="block font-mono text-[11px] uppercase text-[#c25e1a] mb-1">
                              {method.calib}
                            </span>
                            <span className="block text-xs text-[#b0a89e] leading-snug">
                              {method.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Step 3: Quantity multiplier */}
                <section className="bg-[#181512]/80 backdrop-blur-md border border-[#332c25] rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-semibold text-[#f5f3f0]">
                      Cantidad de unidades del tramo ({activeTier.name})
                    </span>
                    <span className="block text-xs text-[#b0a89e]">
                      {activeTier.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg bg-[#241f1b] hover:bg-[#332c25] border border-[#332c25] font-mono text-base font-bold text-[#f5f3f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="font-mono text-base font-bold text-[#f5f3f0] w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-lg bg-[#241f1b] hover:bg-[#332c25] border border-[#332c25] font-mono text-base font-bold text-[#f5f3f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </section>
              </div>

              {/* Right Column: Wizard of Oz Order Form */}
              <div className="lg:col-span-5 bg-[#181512]/90 backdrop-blur-md border border-[#332c25] rounded-xl p-6 sm:p-7">
                <p className="font-mono text-xs uppercase tracking-widest text-[#c25e1a] mb-1">
                  Confirmación Directa
                </p>
                <h2 className="text-xl font-bold text-[#f5f3f0] mb-4">
                  Datos de Entrega
                </h2>

                {/* Summary Box */}
                <div className="bg-[#241f1b] border border-[#332c25] rounded-lg p-4 mb-5 space-y-2 text-xs">
                  <div className="flex justify-between text-[#f5f3f0] font-semibold">
                    <span>
                      {quantity} × Marsellesa ({activeTier.name})
                    </span>
                    <span className="font-mono">
                      ${subtotal.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#b0a89e]">
                    <span>Molienda</span>
                    <span className="font-mono text-[#c25e1a]">
                      {selectedGrind}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#b0a89e]">
                    <span>Despacho carbono neutral</span>
                    <span className="font-mono text-[#f5f3f0]">
                      {shipping === 0
                        ? "Incluido ($0)"
                        : `$${shipping.toLocaleString("es-CL")}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#332c25] flex justify-between text-sm font-bold text-[#f5f3f0]">
                    <span>Total a coordinar</span>
                    <span className="font-mono text-[#c25e1a]">
                      ${total.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                  <div>
                    <label
                      htmlFor="order-name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                    >
                      Nombre y Apellido *
                    </label>
                    <input
                      id="order-name"
                      name="name"
                      required
                      type="text"
                      placeholder="Nombre completo"
                      disabled={submitting}
                      className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="order-email"
                        className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                      >
                        Correo *
                      </label>
                      <input
                        id="order-email"
                        name="email"
                        required
                        type="email"
                        placeholder="nombre@correo.cl"
                        disabled={submitting}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="order-phone"
                        className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                      >
                        Teléfono *
                      </label>
                      <input
                        id="order-phone"
                        name="phone"
                        required
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        disabled={submitting}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="order-address"
                        className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                      >
                        Dirección y N° *
                      </label>
                      <input
                        id="order-address"
                        name="address"
                        required
                        type="text"
                        placeholder="Calle, número, depto u oficina"
                        disabled={submitting}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="order-city"
                        className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                      >
                        Comuna *
                      </label>
                      <input
                        id="order-city"
                        name="city"
                        required
                        type="text"
                        placeholder="Providencia, Santiago..."
                        disabled={submitting}
                        className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="order-region"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                    >
                      Región *
                    </label>
                    <select
                      id="order-region"
                      name="region"
                      required
                      defaultValue={REGIONES_CHILE[0]}
                      disabled={submitting}
                      className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f3f0] focus:outline-none focus:ring-2 focus:ring-[#c25e1a]"
                    >
                      {REGIONES_CHILE.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="order-notes"
                      className="block font-mono text-[11px] uppercase tracking-wider text-[#b0a89e] mb-1"
                    >
                      Indicaciones de entrega o facturación
                    </label>
                    <textarea
                      id="order-notes"
                      name="notes"
                      rows={2}
                      placeholder="RUT empresa si requieres factura, horario de recepción, conserjería..."
                      disabled={submitting}
                      className="w-full bg-[#241f1b] border border-[#332c25] rounded-lg px-3.5 py-2 text-sm text-[#f5f3f0] placeholder-[#7d746b] focus:outline-none focus:ring-2 focus:ring-[#c25e1a] resize-none"
                    />
                  </div>

                  {orderError && (
                    <p className="text-red-400 text-xs font-medium">
                      {orderError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold py-3.5 px-6 rounded-lg text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f3f0]"
                  >
                    {submitting
                      ? "Enviando pedido al correo de Selva Alta..."
                      : "Confirmar Pedido"}
                  </button>

                  <p className="text-[11px] text-[#7d746b] leading-relaxed">
                    Al confirmar, el pedido llega de inmediato al correo de
                    Selva Alta y un representante te contactará para coordinar
                    la entrega y el pago.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

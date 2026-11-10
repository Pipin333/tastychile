"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";
import ComunaCombobox from "@/components/ComunaCombobox";
import { createWizardOfOzOrder } from "@/app/actions";

interface VolumeTier {
  id: string;
  name: string;
  subtitle: string;
  oldPrice: number;
  price: number;
  discountBadge: string;
  unitPriceLabel: string;
  bagsCount: string;
}

const VOLUME_TIERS: VolumeTier[] = [
  {
    id: "marsellesa-250g",
    name: "1 Bolsa (250g)",
    subtitle: "1 bolsa de 250g recién tostada",
    oldPrice: 13990,
    price: 11500,
    discountBadge: "-18%",
    unitPriceLabel: "$11.500 por bolsa (Normal $13.990)",
    bagsCount: "250 gramos",
  },
  {
    id: "marsellesa-1kg",
    name: "Pack 1 Kilo",
    subtitle: "4 bolsas de 250g · Envío gratis en Santiago",
    oldPrice: 55960,
    price: 39990,
    discountBadge: "-28%",
    unitPriceLabel: "$9.998 por bolsa (Ahorras $15.970)",
    bagsCount: "4 × 250g (1 kg)",
  },
  {
    id: "marsellesa-3kg",
    name: "Caja 3 Kilos",
    subtitle: "12 bolsas de 250g · Ideal para grupos, barras y oficinas",
    oldPrice: 167880,
    price: 104990,
    discountBadge: "-37%",
    unitPriceLabel: "$8.749 por bolsa (Ahorras $62.890)",
    bagsCount: "12 × 250g (3 kg)",
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
    description: "Si tienes molinillo en casa o en tu cafetería.",
  },
  {
    id: "Moka Italiana (Fina)",
    label: "Cafetera Italiana (Moka)",
    calib: "Molienda Fina",
    description: "Para la clásica cafetera italiana de cocina.",
  },
  {
    id: "Prensa Francesa (Gruesa)",
    label: "Prensa Francesa",
    calib: "Molienda Gruesa",
    description: "Para émbolo o infusión directa con cuerpo suave.",
  },
  {
    id: "Espresso de Barra (Extra Fina)",
    label: "Máquina de Espresso",
    calib: "Molienda Extra Fina",
    description: "Para máquinas de brazo o portafiltro de casa y barra.",
  },
  {
    id: "Filtro V60 / Goteo (Media)",
    label: "Filtro / Cafetera Eléctrica",
    calib: "Molienda Media",
    description: "Para V60, Chemex o cafetera eléctrica de goteo.",
  },
];

const REGIONES_CHILE = ["Región Metropolitana de Santiago"];

interface CartItem {
  id: string;
  tierId: string;
  name: string;
  bagsCount: string;
  unitPrice: number;
  oldUnitPrice: number;
  grind: string;
  quantity: number;
}

function MethodIcon({ methodId }: { methodId: string }) {
  if (methodId.startsWith("Moka")) {
    return (
      <svg
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="w-7 h-8 text-[#9E2A2B]"
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
        strokeWidth="1.6"
        className="w-7 h-8 text-[#9E2A2B]"
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
        strokeWidth="1.6"
        className="w-7 h-8 text-[#9E2A2B]"
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
        strokeWidth="1.6"
        className="w-7 h-8 text-[#9E2A2B]"
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
      strokeWidth="1.6"
      className="w-7 h-8 text-[#9E2A2B]"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="24" rx="10" ry="14" />
      <path d="M20 10 C17 18 23 30 20 38" />
    </svg>
  );
}

export default function ClubPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  // Active configurator state
  const [selectedTierId, setSelectedTierId] = useState<string>("marsellesa-1kg");
  const [selectedGrind, setSelectedGrind] = useState<string>(GRIND_METHODS[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  // Cart state: allows multiple items with different grinds and sizes
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastAddedFeedback, setLastAddedFeedback] = useState<string | null>(null);

  // Delivery form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Providencia",
    region: REGIONES_CHILE[0],
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<null | {
    orderNumber: string;
    customerName: string;
    total: number;
    phone: string;
    email: string;
    emailDiagnostic?: string | null;
  }>(null);

  const activeTier =
    VOLUME_TIERS.find((t) => t.id === selectedTierId) || VOLUME_TIERS[0];

  // Cart financial calculations
  const normalSubtotal = cart.reduce(
    (sum, item) => sum + item.oldUnitPrice * item.quantity,
    0
  );
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const totalSavings = normalSubtotal - subtotal;
  const shipping = subtotal >= 39990 || subtotal === 0 ? 0 : 3900;
  const total = subtotal + shipping;
  const totalCartUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  const goToStep = (step: 1 | 2) => {
    setCurrentStep(step);
    if (stepContainerRef.current) {
      const yOffset = -90;
      const y =
        stepContainerRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  const addToCart = (tierId: string, grind: string, qty: number) => {
    const tier = VOLUME_TIERS.find((t) => t.id === tierId) || VOLUME_TIERS[0];
    const key = `${tierId}__${grind}`;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === key);
      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qty,
        };
        return next;
      }
      return [
        ...prevCart,
        {
          id: key,
          tierId: tier.id,
          name: tier.name,
          bagsCount: tier.bagsCount,
          unitPrice: tier.price,
          oldUnitPrice: tier.oldPrice,
          grind,
          quantity: qty,
        },
      ];
    });

    setLastAddedFeedback(
      `✓ Agregado: ${qty} × ${tier.name} · ${grind.split("(")[0].trim()}`
    );
    setTimeout(() => {
      setLastAddedFeedback(null);
    }, 4500);
  };

  const updateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleQuickBuy = () => {
    // If cart is empty, add the currently configured coffee and advance
    if (cart.length === 0) {
      addToCart(selectedTierId, selectedGrind, quantity);
    }
    goToStep(2);
  };

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderError(null);

    if (cart.length === 0) {
      setOrderError(
        "Tu carrito está vacío. Por favor agrega al menos un café a tu pedido."
      );
      setSubmitting(false);
      return;
    }

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString() || formData.name;
    const email = fd.get("email")?.toString() || formData.email;
    const phone = fd.get("phone")?.toString() || formData.phone;
    const address = fd.get("address")?.toString() || formData.address;
    const city = fd.get("city")?.toString() || formData.city;
    const region = fd.get("region")?.toString() || formData.region;
    const notes = fd.get("notes")?.toString() || formData.notes;

    const result = await createWizardOfOzOrder({
      name,
      email,
      phone,
      address,
      city,
      region,
      notes,
      items: cart.map((item) => ({
        id: item.tierId,
        quantity: item.quantity,
        grind: item.grind,
      })),
    });

    if (result.success && result.orderNumber) {
      setOrderSuccess({
        orderNumber: result.orderNumber,
        customerName: name,
        total,
        phone,
        email,
        emailDiagnostic: result.emailStatus?.diagnostic || null,
      });
      setCart([]);
      setSubmitting(false);
    } else {
      setOrderError(
        result.error || "Ocurrió un error al registrar tu solicitud."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1B12] flex flex-col font-sans selection:bg-[#9E2A2B] selection:text-white">
      <BellaDurmienteBackground variant="club" />
      <Navbar />

      <main className="relative z-10 flex-grow pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Product Photo */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8">
            <div className="lg:col-span-7 bg-[#FAF6F0]/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#DFD3C3]/80 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-2">
                Marsellesa de Altura · Tingo María (87.0 SCA)
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#143326] leading-[1.12] mb-4">
                Pide tu café en grano o con molienda a medida.
              </h1>
              <p className="text-base sm:text-lg text-[#4A3F35] leading-relaxed">
                Arma tu pedido combinando diferentes formatos y tipos de molienda
                en un solo carrito. Despachamos en bicimensajería a todo el Gran
                Santiago.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#DFD3C3] bg-[#FFFDF9] shadow-sm flex items-center gap-4 p-3.5">
                <Image
                  src="/images/origen/bolsa-y-extraccion.png"
                  alt="Bolsa de 250g de café Marsellesa de Altura"
                  width={180}
                  height={140}
                  className="w-28 sm:w-32 aspect-[4/3] object-cover rounded-xl flex-shrink-0"
                />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-sm text-[#143326] block">
                    Cosecha Familiar Tingo María
                  </span>
                  <span className="block text-[#4A3F35]">
                    Notas a chocolate bitter, caramelo y nuez tostada.
                  </span>
                  <span className="inline-block font-mono text-[11px] font-semibold text-[#9E2A2B]">
                    Bolsas de 250g con válvula
                  </span>
                </div>
              </div>
            </div>
          </section>

          {orderSuccess ? (
            <section className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#9E2A2B] rounded-2xl p-6 sm:p-10 max-w-2xl space-y-6 shadow-md">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-2">
                  Pedido Recibido · {orderSuccess.orderNumber}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#143326]">
                  ¡Muchas gracias por tu pedido, {orderSuccess.customerName}!
                </h2>
              </div>

              <div className="bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-5 space-y-2">
                <h3 className="font-bold text-[#2A1B12] text-base">
                  Un representante se contactará en breve
                </h3>
                <p className="text-sm text-[#4A3F35] leading-relaxed">
                  Ya recibimos tu solicitud en Selva Alta y te enviamos un
                  comprobante a{" "}
                  <strong className="text-[#2A1B12]">
                    {orderSuccess.email}
                  </strong>
                  . Te escribiremos al{" "}
                  <strong className="text-[#2A1B12]">
                    {orderSuccess.phone}
                  </strong>{" "}
                  para coordinar el despacho y el pago por{" "}
                  <span className="font-mono font-bold text-[#9E2A2B]">
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
                  className="inline-flex items-center justify-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Escribirnos por correo
                </a>
                <button
                  type="button"
                  onClick={() => setOrderSuccess(null)}
                  className="inline-flex items-center justify-center bg-[#F3ECE1] hover:bg-[#EFE4D2] text-[#143326] border border-[#DFD3C3] font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Hacer otro pedido
                </button>
              </div>
            </section>
          ) : (
            <div ref={stepContainerRef} className="scroll-mt-28">
              {/* Stepper Navigation */}
              <nav aria-label="Progreso de compra" className="mb-8">
                <ol className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                  {/* Step 1: Configurar & Carrito */}
                  <li>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className={`w-full text-left p-3 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] ${
                        currentStep === 1
                          ? "bg-[#143326] text-[#FAF6F0] border-[#143326] shadow-sm"
                          : "bg-[#FFFDF9] hover:bg-[#F3ECE1] text-[#143326] border-[#DFD3C3]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                            currentStep === 1
                              ? "bg-white/20 text-white"
                              : "bg-[#143326] text-white"
                          }`}
                        >
                          1
                        </span>
                        <span className="font-bold text-xs sm:text-sm truncate">
                          1. Arma tu Pedido
                        </span>
                      </div>
                      <span
                        className={`block text-[11px] truncate mt-1 ${
                          currentStep === 1
                            ? "text-[#FAF6F0]/80 font-medium"
                            : "text-[#6E5D4F]"
                        }`}
                      >
                        {cart.length === 0
                          ? "Elige formato y molienda"
                          : `${totalCartUnits} ${
                              totalCartUnits === 1 ? "variedad" : "variedades"
                            } en carrito`}
                      </span>
                    </button>
                  </li>

                  {/* Step 2: Despacho y Pago */}
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        if (cart.length === 0) {
                          handleQuickBuy();
                        } else {
                          goToStep(2);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] ${
                        currentStep === 2
                          ? "bg-[#143326] text-[#FAF6F0] border-[#143326] shadow-sm"
                          : "bg-[#FFFDF9]/60 text-[#6E5D4F] border-[#DFD3C3]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                            currentStep === 2
                              ? "bg-white/20 text-white"
                              : "bg-[#DFD3C3] text-[#4A3F35]"
                          }`}
                        >
                          2
                        </span>
                        <span className="font-bold text-xs sm:text-sm truncate">
                          2. Despacho y Pago
                        </span>
                      </div>
                      <span
                        className={`block text-[11px] truncate mt-1 ${
                          currentStep === 2
                            ? "text-[#FAF6F0]/80 font-medium"
                            : "text-[#6E5D4F]"
                        }`}
                      >
                        {cart.length === 0
                          ? "Dirección en Santiago"
                          : `Total: $${total.toLocaleString("es-CL")}`}
                      </span>
                    </button>
                  </li>
                </ol>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Configurator & Cart or Checkout */}
                <div className="lg:col-span-7 space-y-8">
                  {currentStep === 1 ? (
                    <>
                      {/* Section: Coffee Configurator */}
                      <section className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold block mb-1">
                            Paso 1 · Configura tu café
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#143326]">
                            Elige formato y molienda
                          </h2>
                          <p className="text-xs sm:text-sm text-[#4A3F35] mt-1">
                            Puedes agregar varios paquetes con diferentes tipos de
                            molienda antes de completar tu pedido.
                          </p>
                        </div>

                        {/* Format Selection */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#6E5D4F] mb-2.5">
                            1. Formato (Bolsas de 250g con válvula)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {VOLUME_TIERS.map((tier) => {
                              const isActive = selectedTierId === tier.id;
                              return (
                                <button
                                  key={tier.id}
                                  type="button"
                                  onClick={() => setSelectedTierId(tier.id)}
                                  className={`relative text-left rounded-xl p-3.5 border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] ${
                                    isActive
                                      ? "bg-[#EFE4D2] border-[#9E2A2B] ring-2 ring-[#9E2A2B] shadow-sm"
                                      : "bg-[#FFFDF9] border-[#DFD3C3] hover:bg-[#F3ECE1]"
                                  }`}
                                >
                                  {isActive && (
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#9E2A2B]" />
                                  )}
                                  <div className="flex items-center justify-between mb-1 pr-2">
                                    <span className="font-mono text-[10px] uppercase text-[#9E2A2B] font-semibold">
                                      {tier.bagsCount}
                                    </span>
                                    <span className="font-mono text-[9px] font-bold bg-[#9E2A2B] text-white px-1.5 py-0.5 rounded">
                                      {tier.discountBadge}
                                    </span>
                                  </div>
                                  <span className="block text-sm font-bold text-[#143326] mb-0.5">
                                    {tier.name}
                                  </span>
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="font-mono text-base font-bold text-[#2A1B12]">
                                      ${tier.price.toLocaleString("es-CL")}
                                    </span>
                                    <span className="font-mono text-[11px] text-[#6E5D4F] line-through">
                                      ${tier.oldPrice.toLocaleString("es-CL")}
                                    </span>
                                  </div>
                                  <span className="block text-[10px] text-[#6E5D4F] mt-1">
                                    {tier.unitPriceLabel}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Grind Method Selection */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#6E5D4F] mb-2.5">
                            2. ¿Cómo preparas este café? (Molienda)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {GRIND_METHODS.map((method) => {
                              const isActive = selectedGrind === method.id;
                              return (
                                <button
                                  key={method.id}
                                  type="button"
                                  onClick={() => setSelectedGrind(method.id)}
                                  className={`text-left rounded-xl p-3 border flex items-start gap-3 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] ${
                                    isActive
                                      ? "bg-[#EFE4D2] border-[#9E2A2B] ring-2 ring-[#9E2A2B] shadow-sm"
                                      : "bg-[#FFFDF9] border-[#DFD3C3] hover:bg-[#F3ECE1]"
                                  }`}
                                >
                                  <div className="p-1.5 rounded-lg bg-[#FAF6F0] border border-[#DFD3C3] flex-shrink-0">
                                    <MethodIcon methodId={method.id} />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                      <span className="block text-xs font-bold text-[#143326]">
                                        {method.label}
                                      </span>
                                      {isActive && (
                                        <span className="font-mono text-[9px] font-bold bg-[#9E2A2B] text-white px-1 py-0.5 rounded">
                                          ✓ Elegida
                                        </span>
                                      )}
                                    </div>
                                    <span className="block font-mono text-[10px] text-[#9E2A2B] font-semibold mb-0.5">
                                      {method.calib}
                                    </span>
                                    <span className="block text-[11px] text-[#4A3F35] leading-snug">
                                      {method.description}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Quantity Counter for this item */}
                        <div className="bg-[#FAF6F0] border border-[#DFD3C3] rounded-xl p-3.5 flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-bold text-[#143326]">
                              Cantidad de este formato
                            </span>
                            <span className="block text-[11px] text-[#6E5D4F]">
                              {activeTier.name} · {selectedGrind.split("(")[0].trim()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                              }
                              className="w-8 h-8 rounded-lg bg-[#F3ECE1] hover:bg-[#EFE4D2] border border-[#DFD3C3] font-mono text-sm font-bold text-[#2A1B12] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E2A2B]"
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className="font-mono text-sm font-bold text-[#2A1B12] w-6 text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => q + 1)}
                              className="w-8 h-8 rounded-lg bg-[#F3ECE1] hover:bg-[#EFE4D2] border border-[#DFD3C3] font-mono text-sm font-bold text-[#2A1B12] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9E2A2B]"
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="space-y-2.5 pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                addToCart(selectedTierId, selectedGrind, quantity)
                              }
                              className="w-full bg-[#143326] hover:bg-[#1E4D38] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                            >
                              <span>+ Agregar al Carrito</span>
                              <span className="font-mono text-xs text-white/80">
                                (${(activeTier.price * quantity).toLocaleString(
                                  "es-CL"
                                )})
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                addToCart(selectedTierId, selectedGrind, quantity);
                                goToStep(2);
                              }}
                              className="w-full bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                            >
                              <span>Comprar directo</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          </div>

                          {lastAddedFeedback && (
                            <div className="bg-[#EFE4D2] border border-[#143326]/30 text-[#143326] rounded-lg p-2.5 text-xs font-semibold flex items-center justify-between animate-fadeIn">
                              <span>{lastAddedFeedback}</span>
                              <button
                                type="button"
                                onClick={() => goToStep(2)}
                                className="text-[#9E2A2B] hover:underline font-bold text-[11px]"
                              >
                                Ver carrito y pagar →
                              </button>
                            </div>
                          )}
                        </div>
                      </section>

                      {/* Section: Your Current Cart List (Visible in Step 1) */}
                      <section className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
                        <div className="flex items-center justify-between border-b border-[#DFD3C3] pb-3">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold block">
                              Tu Carrito de Café
                            </span>
                            <h3 className="text-lg font-bold text-[#143326]">
                              {cart.length === 0
                                ? "Carrito vacío"
                                : `${totalCartUnits} ${
                                    totalCartUnits === 1
                                      ? "variedad agregada"
                                      : "variedades agregadas"
                                  }`}
                            </h3>
                          </div>
                          {cart.length > 0 && (
                            <span className="font-mono font-bold text-sm text-[#9E2A2B]">
                              Subtotal: ${subtotal.toLocaleString("es-CL")}
                            </span>
                          )}
                        </div>

                        {cart.length === 0 ? (
                          <div className="text-center py-6 px-4 bg-[#FAF6F0] rounded-xl border border-dashed border-[#DFD3C3]">
                            <p className="text-sm font-semibold text-[#143326] mb-1">
                              Aún no has agregado cafés al carrito
                            </p>
                            <p className="text-xs text-[#6E5D4F]">
                              Selecciona un formato y molienda arriba y pulsa{" "}
                              <strong>&ldquo;+ Agregar al Carrito&rdquo;</strong>. Puedes
                              combinar múltiples tamaños y moliendas.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {cart.map((item) => (
                              <div
                                key={item.id}
                                className="bg-[#FAF6F0] border border-[#DFD3C3] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-[#143326]">
                                      {item.name}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#6E5D4F]">
                                      ({item.bagsCount})
                                    </span>
                                  </div>
                                  <span className="block text-xs font-semibold text-[#9E2A2B] mt-0.5">
                                    Molienda: {item.grind}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                  {/* Item quantity controls */}
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateCartQty(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="w-7 h-7 rounded bg-[#F3ECE1] hover:bg-[#EFE4D2] border border-[#DFD3C3] font-mono text-xs font-bold text-[#2A1B12]"
                                      aria-label="Disminuir unidad"
                                    >
                                      -
                                    </button>
                                    <span className="font-mono font-bold text-xs text-[#2A1B12] w-5 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateCartQty(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="w-7 h-7 rounded bg-[#F3ECE1] hover:bg-[#EFE4D2] border border-[#DFD3C3] font-mono text-xs font-bold text-[#2A1B12]"
                                      aria-label="Aumentar unidad"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Line price */}
                                  <div className="text-right font-mono min-w-[70px]">
                                    <span className="font-bold text-sm text-[#2A1B12] block">
                                      $
                                      {(
                                        item.unitPrice * item.quantity
                                      ).toLocaleString("es-CL")}
                                    </span>
                                  </div>

                                  {/* Remove button */}
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs text-[#9E2A2B] hover:text-[#7D2021] hover:underline p-1"
                                    title="Eliminar de carrito"
                                    aria-label={`Eliminar ${item.name}`}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* Free Shipping helper bar */}
                            <div className="p-3 bg-[#EFE4D2] border border-[#D8C3A5] rounded-xl text-xs flex items-center justify-between">
                              <span className="text-[#143326]">
                                {subtotal >= 39990 ? (
                                  <strong>
                                    ✓ ¡Despacho gratis en Santiago aplicado!
                                  </strong>
                                ) : (
                                  <>
                                    Te faltan{" "}
                                    <strong className="font-mono text-[#9E2A2B]">
                                      $
                                      {(39990 - subtotal).toLocaleString("es-CL")}
                                    </strong>{" "}
                                    para envío gratis en Santiago.
                                  </>
                                )}
                              </span>
                              <span className="font-mono font-semibold text-[#143326]">
                                {shipping === 0
                                  ? "Envío: $0"
                                  : "Envío: $3.900"}
                              </span>
                            </div>

                            {/* Proceed to checkout CTA */}
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={() => goToStep(2)}
                                className="w-full bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-bold py-4 px-6 rounded-xl text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                              >
                                <span>
                                  Continuar a Datos de Entrega ($
                                  {total.toLocaleString("es-CL")})
                                </span>
                                <span aria-hidden="true" className="text-lg">
                                  →
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </section>
                    </>
                  ) : (
                    /* Step 2: Checkout / Delivery Form */
                    <section className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-[#DFD3C3]">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold block mb-0.5">
                            Paso 2 · Datos de entrega
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#143326]">
                            ¿Dónde enviamos tu pedido?
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="text-xs font-semibold text-[#9E2A2B] hover:underline"
                        >
                          ← Modificar cafés ({totalCartUnits})
                        </button>
                      </div>

                      {/* Mobile Cart Summary (shown on mobile inside Step 2) */}
                      <div className="lg:hidden bg-[#F3ECE1] border border-[#DFD3C3] rounded-xl p-4 space-y-2.5 text-xs">
                        <span className="font-bold text-[#143326] text-sm block border-b border-[#DFD3C3] pb-1.5">
                          Resumen del pedido ({totalCartUnits} variedades)
                        </span>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-[#2A1B12]"
                          >
                            <div>
                              <span className="font-bold">
                                {item.quantity} × {item.name}
                              </span>
                              <span className="block text-[11px] text-[#6E5D4F]">
                                Molienda: {item.grind}
                              </span>
                            </div>
                            <span className="font-mono font-bold">
                              $
                              {(item.unitPrice * item.quantity).toLocaleString(
                                "es-CL"
                              )}
                            </span>
                          </div>
                        ))}

                        <div className="pt-2 border-t border-[#DFD3C3] space-y-1">
                          <div className="flex justify-between text-[#9E2A2B] font-semibold">
                            <span>Descuento aplicado</span>
                            <span className="font-mono">
                              -${totalSavings.toLocaleString("es-CL")}
                            </span>
                          </div>
                          <div className="flex justify-between text-[#4A3F35]">
                            <span>Despacho Pantera Courier</span>
                            <span className="font-mono font-semibold text-[#1E4D38]">
                              {shipping === 0
                                ? "Gratis en Santiago ($0)"
                                : `$${shipping.toLocaleString("es-CL")}`}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-[#DFD3C3] flex justify-between text-base font-bold text-[#2A1B12]">
                            <span>Total a pagar</span>
                            <span className="font-mono text-[#9E2A2B]">
                              ${total.toLocaleString("es-CL")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Form */}
                      <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <div className="bg-[#EFE4D2] border border-[#D8C3A5] rounded-lg px-3.5 py-2.5 text-xs text-[#143326]">
                          <strong>Despacho en bicimensajería:</strong> Tarifa
                          plana de $3.900 (gratis sobre $39.990) a las 35 comunas
                          del Gran Santiago urbano mediante Pantera Courier.
                        </div>

                        <div>
                          <label
                            htmlFor="order-name"
                            className="block text-xs font-semibold text-[#2A1B12] mb-1"
                          >
                            Nombre y Apellido *
                          </label>
                          <input
                            id="order-name"
                            name="name"
                            required
                            maxLength={100}
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Tu nombre completo"
                            disabled={submitting}
                            className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="order-email"
                              className="block text-xs font-semibold text-[#2A1B12] mb-1"
                            >
                              Correo *
                            </label>
                            <input
                              id="order-email"
                              name="email"
                              required
                              maxLength={120}
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              placeholder="nombre@correo.cl"
                              disabled={submitting}
                              className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="order-phone"
                              className="block text-xs font-semibold text-[#2A1B12] mb-1"
                            >
                              Teléfono / WhatsApp *
                            </label>
                            <input
                              id="order-phone"
                              name="phone"
                              required
                              maxLength={35}
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              placeholder="+56 9 1234 5678"
                              disabled={submitting}
                              className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="order-address"
                              className="block text-xs font-semibold text-[#2A1B12] mb-1"
                            >
                              Dirección y N° *
                            </label>
                            <input
                              id="order-address"
                              name="address"
                              required
                              maxLength={180}
                              type="text"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  address: e.target.value,
                                }))
                              }
                              placeholder="Calle, número, depto"
                              disabled={submitting}
                              className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="order-city"
                              className="block text-xs font-semibold text-[#2A1B12] mb-1"
                            >
                              Comuna (RM) *
                            </label>
                            <ComunaCombobox
                              id="order-city"
                              name="city"
                              defaultValue={formData.city}
                              disabled={submitting}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="order-region"
                            className="block text-xs font-semibold text-[#2A1B12] mb-1"
                          >
                            Región (Solo RM disponible) *
                          </label>
                          <select
                            id="order-region"
                            name="region"
                            required
                            defaultValue={REGIONES_CHILE[0]}
                            disabled={submitting}
                            className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2.5 text-sm text-[#2A1B12] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
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
                            className="block text-xs font-semibold text-[#2A1B12] mb-1"
                          >
                            Notas o datos de factura (opcional)
                          </label>
                          <textarea
                            id="order-notes"
                            name="notes"
                            rows={2}
                            maxLength={400}
                            value={formData.notes}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                notes: e.target.value,
                              }))
                            }
                            placeholder="Conserjería, horario o RUT si necesitas factura..."
                            disabled={submitting}
                            className="w-full bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg px-3.5 py-2 text-sm text-[#2A1B12] placeholder-[#6E5D4F] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] resize-none"
                          />
                        </div>

                        {orderError && (
                          <p className="text-[#9E2A2B] text-xs font-semibold">
                            {orderError}
                          </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => goToStep(1)}
                            disabled={submitting}
                            className="order-2 sm:order-1 sm:w-1/3 bg-[#F3ECE1] hover:bg-[#EFE4D2] text-[#143326] border border-[#DFD3C3] font-semibold py-3.5 px-4 rounded-xl text-sm transition-colors text-center disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
                          >
                            ← Volver al Carrito
                          </button>
                          <button
                            type="submit"
                            disabled={submitting || cart.length === 0}
                            className="order-1 sm:order-2 sm:w-2/3 bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-bold py-3.5 px-6 rounded-xl text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
                          >
                            {submitting
                              ? "Enviando pedido..."
                              : `Encargar mi pedido ($${total.toLocaleString(
                                  "es-CL"
                                )})`}
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6E5D4F] leading-relaxed text-center sm:text-left">
                          Te enviaremos un comprobante inmediato a tu correo y te
                          contactaremos para coordinar el pago y la entrega.
                        </p>
                      </form>
                    </section>
                  )}
                </div>

                {/* Right Column: Sticky Live Cart Summary (Desktop) */}
                <aside className="lg:col-span-5 hidden lg:block sticky top-28">
                  <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-6 shadow-sm space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DFD3C3]">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
                        Resumen del Carrito
                      </span>
                      <span className="text-xs text-[#6E5D4F]">
                        {totalCartUnits}{" "}
                        {totalCartUnits === 1 ? "variedad" : "variedades"}
                      </span>
                    </div>

                    {cart.length === 0 ? (
                      <div className="py-8 text-center space-y-2">
                        <span className="text-2xl block">☕</span>
                        <p className="text-xs font-semibold text-[#143326]">
                          Tu carrito está vacío
                        </p>
                        <p className="text-[11px] text-[#6E5D4F] leading-relaxed">
                          Selecciona un formato y una molienda para armar tu
                          primer café.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Items list */}
                        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="bg-[#FAF6F0] border border-[#DFD3C3] rounded-lg p-2.5 flex items-center justify-between text-xs"
                            >
                              <div className="pr-2">
                                <span className="font-bold text-[#143326] block">
                                  {item.quantity} × {item.name}
                                </span>
                                <span className="text-[10px] text-[#9E2A2B] font-medium block">
                                  {item.grind.split("(")[0].trim()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#2A1B12]">
                                  $
                                  {(
                                    item.unitPrice * item.quantity
                                  ).toLocaleString("es-CL")}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[#9E2A2B] hover:text-[#7D2021] text-[10px]"
                                  title="Eliminar"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-2 text-xs pt-2 border-t border-[#DFD3C3]">
                          <div className="flex justify-between text-[#4A3F35]">
                            <span>Subtotal</span>
                            <div className="font-mono text-right">
                              <span className="text-[#6E5D4F] line-through text-[11px] mr-1.5">
                                ${normalSubtotal.toLocaleString("es-CL")}
                              </span>
                              <span className="font-bold text-[#2A1B12]">
                                ${subtotal.toLocaleString("es-CL")}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between text-[#9E2A2B] font-semibold">
                            <span>Ahorro aplicado</span>
                            <span className="font-mono">
                              -${totalSavings.toLocaleString("es-CL")}
                            </span>
                          </div>

                          <div className="flex justify-between text-[#4A3F35]">
                            <span>Despacho Pantera Courier</span>
                            <span className="font-mono font-semibold text-[#1E4D38]">
                              {shipping === 0
                                ? "Gratis en Santiago ($0)"
                                : `$${shipping.toLocaleString("es-CL")}`}
                            </span>
                          </div>

                          <div className="pt-3 border-t border-[#DFD3C3] flex justify-between text-base font-bold text-[#2A1B12]">
                            <span>Total del pedido</span>
                            <span className="font-mono text-[#9E2A2B] text-lg">
                              ${total.toLocaleString("es-CL")}
                            </span>
                          </div>
                        </div>

                        <div className="bg-[#EFE4D2] border border-[#D8C3A5] rounded-lg p-3 text-xs text-[#143326] leading-relaxed">
                          <strong>Despacho local:</strong> Entrega en
                          bicimensajería a las 35 comunas del Gran Santiago.
                        </div>

                        {currentStep === 1 && (
                          <button
                            type="button"
                            onClick={() => goToStep(2)}
                            className="w-full bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                          >
                            <span>Ir a Despacho</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </aside>
              </div>

              {/* Floating Mobile Cart Bar (visible in Step 1 when items exist in cart) */}
              {cart.length > 0 && currentStep === 1 && (
                <aside
                  aria-label="Resumen rápido del carrito"
                  className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#DFD3C3] p-3 sm:hidden shadow-lg flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] text-[#6E5D4F] block">
                      {totalCartUnits}{" "}
                      {totalCartUnits === 1 ? "café en carrito" : "cafés en carrito"}
                    </span>
                    <span className="font-mono font-bold text-[#143326] text-base">
                      ${total.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="bg-[#9E2A2B] hover:bg-[#7D2021] text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Ir a Despacho</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </aside>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
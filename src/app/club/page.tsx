"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createWizardOfOzOrder, addContactToWaitlist } from '@/app/actions';

interface ProductItem {
  id: string;
  name: string;
  points: string;
  price: number;
  description: string;
  origin: string;
  altitude: string;
  process: string;
  notes: string[];
  emoji: string;
  category: 'coffee' | 'subscription';
  badge?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'marsellesa',
    name: 'Marsellesa Orgánico',
    points: '87 Puntos SCA',
    price: 12900,
    description: 'Cultivado de forma orgánica a 1.820 msnm. Maduración lenta que otorga una complejidad sensorial excepcional y taza limpia.',
    origin: 'Huánuco, Perú',
    altitude: '1.820 msnm',
    process: 'Lavado / Orgánico',
    notes: ['🍫 Chocolate Suave', '🍬 Caramelo', '🍒 Frutos Rojos'],
    emoji: '🍫',
    category: 'coffee',
    badge: 'Más Vendido'
  },
  {
    id: 'catimore',
    name: 'Catimore Suave',
    points: '84 Puntos SCA',
    price: 11900,
    description: 'Perfil dulce y balanceado con cuerpo cremoso. Resalta por sus notas a postres clásicos, ideal tanto para espresso como filtrados diarios.',
    origin: 'Huánuco, Perú',
    altitude: '1.600 msnm',
    process: 'Lavado',
    notes: ['🍯 Miel', '🌰 Avellanas', '🍫 Cacao Puro'],
    emoji: '🍯',
    category: 'coffee',
    badge: 'Ideal Espresso'
  },
  {
    id: 'caturra',
    name: 'Caturra Clásico',
    points: '85 Puntos SCA',
    price: 12500,
    description: 'Un clásico sudamericano conocido por su acidez cítrica brillante y cuerpo medio sedoso. Dulzor prolongado en boca.',
    origin: 'Alta Amazonía',
    altitude: '1.650 msnm',
    process: 'Lavado',
    notes: ['🍋 Cítrico', '🍯 Miel', '🍫 Cacao'],
    emoji: '🍋',
    category: 'coffee',
  },
  {
    id: 'pink-bourbon',
    name: 'Pink Bourbon (Reserva)',
    points: '88 Puntos SCA',
    price: 14900,
    description: 'Variedad exótica y codiciada en el café de especialidad. Notas complejas florales y frutales con una taza brillante y dulce.',
    origin: 'Alta Amazonía',
    altitude: '1.800 msnm',
    process: 'Lavado Fermentado',
    notes: ['🌸 Floral', '🍑 Frutos Rojos', '🍯 Miel Silvestre'],
    emoji: '🌸',
    category: 'coffee',
    badge: 'Microlote Limitado'
  },
  {
    id: 'geisha',
    name: 'Geisha de Altura',
    points: '89 Puntos SCA',
    price: 19900,
    description: 'La reina de las variedades de especialidad. Exquisita fragancia a jazmín, bergamota y té negro con acidez málica delicada.',
    origin: 'Huánuco, Perú',
    altitude: '1.850 msnm',
    process: 'Lavado Anaeróbico',
    notes: ['🌺 Jazmín', '🍋 Bergamota', '🍑 Durazno'],
    emoji: '🌺',
    category: 'coffee',
    badge: 'Joyas de Selva Alta'
  },
  {
    id: 'sub-explorador',
    name: 'Suscripción Explorador (1 bolsa/mes)',
    points: '84-87 SCA',
    price: 14900,
    description: '1 bolsa de 250g al mes seleccionada por nuestro tostador. Recibe un origen o variedad distinta cada mes.',
    origin: 'Huánuco, Perú',
    altitude: '1.600 - 1.820 msnm',
    process: 'Lavado',
    notes: ['☕ Café rotativo', '📦 Entrega mensual', '🌱 Tueste fresco'],
    emoji: '🌱',
    category: 'subscription'
  },
  {
    id: 'sub-aventurero',
    name: 'Suscripción Aventurero (2 bolsas/mes)',
    points: '84-88 SCA',
    price: 18900,
    description: '2 bolsas de 250g mensuales con despacho incluido a tu hogar. Perfecto para parejas o consumo diario constante.',
    origin: 'Huánuco, Perú',
    altitude: '1.600 - 1.820 msnm',
    process: 'Lavado / Microlotes',
    notes: ['🚚 Despacho Gratis', '🎁 Acceso a microlotes', '☕ 500g totales'],
    emoji: '🤠',
    category: 'subscription',
    badge: 'Recomendada'
  },
  {
    id: 'sub-maestro',
    name: 'Suscripción Maestro Barista (3 bolsas/mes)',
    points: '85-89 SCA',
    price: 28900,
    description: '3 bolsas de 250g al mes incluyendo siempre un microlote exclusivo (Pink Bourbon o Geisha) con despacho gratis.',
    origin: 'Alta Amazonía',
    altitude: '1.800+ msnm',
    process: 'Selección Especial',
    notes: ['👑 Incluye microlotes top', '🚚 Despacho Gratis', '☕ 750g totales'],
    emoji: '👑',
    category: 'subscription'
  }
];

const GRIND_OPTIONS = [
  'Grano Entero (Recomendado)',
  'Molido para Espresso / Moka Italiana',
  'Molido para Filtro / V60 / Cafetera Eléctrica',
  'Molido para Prensa Francesa / Cold Brew'
];

const REGIONES_CHILE = [
  'Región Metropolitana de Santiago',
  'Región de Valparaíso',
  'Región de O’Higgins',
  'Región del Maule',
  'Región del Biobío',
  'Región de La Araucanía',
  'Región de Los Lagos',
  'Región de Coquimbo',
  'Región de Antofagasta',
  'Otra Región'
];

interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  grind: string;
  emoji: string;
}

export default function ClubPage() {
  // Order selection state
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'coffee' | 'subscription'>('all');

  // Per-card grind selection
  const [cardGrinds, setCardGrinds] = useState<Record<string, string>>({});

  // Checkout submission states
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<null | {
    orderNumber: string;
    customerName: string;
    total: number;
    phone: string;
  }>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Newsletter waitlist state
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Filtering
  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === activeTab);

  // Add item to order
  const handleQuickOrder = (product: ProductItem) => {
    const grind = cardGrinds[product.id] || GRIND_OPTIONS[0];
    
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.grind === grind);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.grind === grind
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          grind: product.category === 'coffee' ? grind : 'Grano Entero (o según selección)',
          emoji: product.emoji
        }
      ];
    });

    setIsModalOpen(true);
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setSelectedItems((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // Price calculations
  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const hasSubscription = selectedItems.some((item) => item.id.startsWith('sub-'));
  const shipping = (hasSubscription || subtotal >= 30000 || subtotal === 0) ? 0 : 3900;
  const total = subtotal + shipping;

  // Checkout form submit
  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setOrderError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const address = formData.get('address')?.toString() || '';
    const city = formData.get('city')?.toString() || '';
    const region = formData.get('region')?.toString() || '';
    const notes = formData.get('notes')?.toString() || '';

    const payload = {
      name,
      email,
      phone,
      address,
      city,
      region,
      notes,
      items: selectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        grind: item.grind
      }))
    };

    const result = await createWizardOfOzOrder(payload);

    if (result.success && result.orderNumber) {
      setOrderSuccess({
        orderNumber: result.orderNumber,
        customerName: name,
        total,
        phone
      });
      setSelectedItems([]);
      setSubmitting(false);
    } else {
      setOrderError(result.error || 'Ocurrió un error al registrar el pedido.');
      setSubmitting(false);
    }
  };

  // Newsletter submit
  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    const formData = new FormData(e.currentTarget);
    const res = await addContactToWaitlist(formData);
    if (res.success) {
      setNewsletterStatus('success');
      setNewsletterMsg(res.message || '¡Gracias por suscribirte!');
    } else {
      setNewsletterStatus('error');
      setNewsletterMsg(res.error || 'Error al suscribirse');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/40 px-3.5 py-1.5 rounded-full mb-6">
            ☕ El Club Selva Alta · Café de Especialidad
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Tu Café Favorito, Tostado a Pedido
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Selecciona tu variedad o suscríbete mensualmente. Tostamos en pequeños lotes y molemos a la medida de tu cafetera favorita.
          </p>

          <div className="inline-flex items-center gap-3 bg-stone-900/80 border border-stone-800 px-5 py-2.5 rounded-2xl text-xs sm:text-sm text-stone-300">
            <span>✨ <strong>Backend Mago de Oz:</strong> Haz tu pedido en línea y un representante se contactará a la brevedad para coordinar la entrega y el pago.</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section id="catalogo" className="py-8 bg-stone-900/60 border-b border-stone-800 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-stone-950 border border-stone-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Todo el Catálogo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coffee')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'coffee'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Bolsas de 250g
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('subscription')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTab === 'subscription'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Suscripciones Mensuales
            </button>
          </div>

          {/* Cart status badge button */}
          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg animate-pulse"
            >
              <span>🛒 {selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)} café(s) en pedido (${total.toLocaleString('es-CL')})</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16 bg-stone-950 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const currentGrind = cardGrinds[p.id] || GRIND_OPTIONS[0];

              return (
                <div
                  key={p.id}
                  className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-600/40 transition-all duration-300 hover:bg-stone-900 group shadow-lg"
                >
                  <div>
                    {/* Top Tag & Price */}
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <span className="text-xs font-bold uppercase text-amber-300 bg-amber-950/70 border border-amber-800/40 px-3 py-1 rounded-full">
                        {p.badge || (p.category === 'subscription' ? 'Suscripción' : 'Bolsa 250g')}
                      </span>
                      <span className="text-lg font-black text-amber-400">
                        ${p.price.toLocaleString('es-CL')}
                        {p.category === 'subscription' ? <span className="text-xs text-stone-400 font-normal">/mes</span> : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" role="img" aria-hidden="true">{p.emoji}</span>
                      <div>
                        <h2 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                          {p.name}
                        </h2>
                        <span className="text-xs font-semibold text-amber-500">
                          {p.points} · {p.altitude}
                        </span>
                      </div>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {p.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-1.5">
                        {p.notes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Grind Selector for Coffee */}
                    {p.category === 'coffee' && (
                      <div className="mb-6">
                        <label htmlFor={`grind-${p.id}`} className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                          Tipo de Molienda:
                        </label>
                        <select
                          id={`grind-${p.id}`}
                          value={currentGrind}
                          onChange={(e) =>
                            setCardGrinds({ ...cardGrinds, [p.id]: e.target.value })
                          }
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          {GRIND_OPTIONS.map((g, i) => (
                            <option key={i} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Add to Order Button */}
                  <button
                    type="button"
                    onClick={() => handleQuickOrder(p)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <span>Pedir este Café</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist / Newsletter Section */}
      <section className="py-16 bg-stone-900 border-t border-stone-800">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="text-3xl mb-3 block">📬</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            ¿Prefieres recibir avisos de nuevos microlotes?
          </h2>
          <p className="text-stone-400 text-sm mb-6">
            Déjanos tu correo y sé el primero en enterarte cuando tostemos variedades exclusivas como Geisha y Pink Bourbon.
          </p>

          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
              className="flex-grow bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition disabled:opacity-50"
            >
              {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirme'}
            </button>
          </form>

          {newsletterStatus === 'success' && (
            <p className="text-green-400 text-sm mt-3 font-semibold">{newsletterMsg}</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-red-400 text-sm mt-3 font-semibold">{newsletterMsg}</p>
          )}
        </div>
      </section>

      {/* Wizard of Oz Order Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setOrderSuccess(null);
                setOrderError(null);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-lg hover:bg-stone-800 transition"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            {/* If Order Success */}
            {orderSuccess ? (
              <div className="text-center py-6">
                <span className="text-6xl mb-4 block" role="img" aria-label="Celebración">🎉</span>
                <span className="inline-block bg-green-950/80 border border-green-600/40 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Pedido #{orderSuccess.orderNumber} Registrado
                </span>
                <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  ¡Gracias por tu pedido, {orderSuccess.customerName}!
                </h3>

                {/* The core Wizard of Oz message */}
                <div className="bg-amber-950/70 border border-amber-600/50 rounded-2xl p-5 mb-6 text-left">
                  <div className="flex gap-3">
                    <span className="text-2xl" role="img" aria-hidden="true">⏳</span>
                    <div>
                      <h4 className="font-bold text-amber-200 text-base mb-1">
                        Un representante se contactará en breve
                      </h4>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        Hemos enviado el detalle de tu solicitud al correo del equipo de Selva Alta. En breve te contactaremos por WhatsApp o correo a tu teléfono (<strong>{orderSuccess.phone}</strong>) para confirmar la fecha de entrega y coordinar el pago.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/56900000000?text=${encodeURIComponent(
                      `Hola Selva Alta, acabo de realizar el pedido ${orderSuccess.orderNumber} a nombre de ${orderSuccess.customerName}. Me gustaría coordinar la entrega.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition shadow-lg"
                  >
                    <span>💬 Abrir WhatsApp con Selva Alta</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold py-3.5 px-6 rounded-xl text-sm transition"
                  >
                    Volver a la tienda
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 id="modal-title" className="text-2xl font-extrabold text-white mb-2">
                  Finalizar tu Pedido
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mb-6">
                  Revisa tus cafés seleccionados y déjanos tus datos de entrega. No se requiere tarjeta de crédito ahora; un asesor coordinará tu entrega y pago directamente.
                </p>

                {/* Items in cart */}
                {selectedItems.length === 0 ? (
                  <div className="text-center py-8 bg-stone-950/60 rounded-2xl border border-stone-800/80 mb-6">
                    <p className="text-stone-400 text-sm">Tu pedido está vacío.</p>
                  </div>
                ) : (
                  <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 mb-6 max-h-56 overflow-y-auto divide-y divide-stone-800">
                    {selectedItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{item.name}</p>
                          <p className="text-xs text-amber-400">{item.grind}</p>
                          <p className="text-xs text-stone-400">${item.price.toLocaleString('es-CL')} c/u</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                            className="w-7 h-7 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md font-bold text-xs"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-white w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                            className="w-7 h-7 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md font-bold text-xs"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            +
                          </button>
                          <span className="text-sm font-extrabold text-amber-300 ml-2">
                            ${(item.price * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Totals */}
                <div className="bg-stone-950/40 rounded-xl p-3 border border-stone-800 mb-6 space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Despacho:</span>
                    <span className={shipping === 0 ? 'text-green-400 font-bold' : ''}>
                      {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CL')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-stone-800">
                    <span>Total Estimado:</span>
                    <span className="text-amber-400">${total.toLocaleString('es-CL')}</span>
                  </div>
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="order-name" className="block text-xs font-bold text-stone-300 mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        id="order-name"
                        name="name"
                        required
                        type="text"
                        placeholder="Ej: Carolina Morales"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={submitting || selectedItems.length === 0}
                      />
                    </div>
                    <div>
                      <label htmlFor="order-phone" className="block text-xs font-bold text-stone-300 mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="order-phone"
                        name="phone"
                        required
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={submitting || selectedItems.length === 0}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-email" className="block text-xs font-bold text-stone-300 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      id="order-email"
                      name="email"
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      disabled={submitting || selectedItems.length === 0}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="order-address" className="block text-xs font-bold text-stone-300 mb-1">
                        Dirección y Número *
                      </label>
                      <input
                        id="order-address"
                        name="address"
                        required
                        type="text"
                        placeholder="Av. Providencia 1234, Depto 402"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={submitting || selectedItems.length === 0}
                      />
                    </div>
                    <div>
                      <label htmlFor="order-city" className="block text-xs font-bold text-stone-300 mb-1">
                        Comuna / Ciudad *
                      </label>
                      <input
                        id="order-city"
                        name="city"
                        required
                        type="text"
                        placeholder="Ej: Providencia / Santiago"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        disabled={submitting || selectedItems.length === 0}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-region" className="block text-xs font-bold text-stone-300 mb-1">
                      Región *
                    </label>
                    <select
                      id="order-region"
                      name="region"
                      required
                      defaultValue={REGIONES_CHILE[0]}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      disabled={submitting || selectedItems.length === 0}
                    >
                      {REGIONES_CHILE.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="order-notes" className="block text-xs font-bold text-stone-300 mb-1">
                      Instrucciones de entrega o notas (opcional)
                    </label>
                    <textarea
                      id="order-notes"
                      name="notes"
                      rows={2}
                      placeholder="Dejar en conserjería, timbre malo, molienda especial..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      disabled={submitting || selectedItems.length === 0}
                    ></textarea>
                  </div>

                  {orderError && (
                    <p className="text-red-400 text-xs font-semibold">{orderError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || selectedItems.length === 0}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold py-4 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin text-lg">⏳</span>
                        <span>Enviando pedido a Selva Alta...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar Pedido (Mago de Oz)</span>
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-stone-500">
                    🔒 Recibirás confirmación instantánea por correo y te contactaremos por WhatsApp.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

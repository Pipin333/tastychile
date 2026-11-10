"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { addB2BContact } from '@/app/actions';

export default function B2BPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');

  const varieties = [
    {
      name: "Marsellesa Orgánico",
      points: "87 Puntos SCA",
      description: "Cultivado de forma orgánica a 1.820 msnm en Huánuco. Maduración lenta que otorga una complejidad sensorial excepcional y notable limpieza en taza.",
      origin: "Huánuco, Perú",
      altitude: "1.820 msnm",
      process: "Lavado / Orgánico",
      tastingNotes: ["🍫 Chocolate Suave", "🍬 Caramelo", "🍒 Frutas Dulces"],
      recommendation: "Excelente para espresso de origen y filtrados complejos."
    },
    {
      name: "Catimore Suave",
      points: "84 Puntos SCA",
      description: "Perfil dulce, achocolatado y balanceado con cuerpo cremoso. Un café muy versátil que corta perfectamente con leche y rinde en barra de alto flujo.",
      origin: "Huánuco, Perú",
      altitude: "1.600 msnm",
      process: "Lavado",
      tastingNotes: ["🍯 Miel", "🌰 Avellanas", "🍫 Cacao puro"],
      recommendation: "La opción más eficiente para bebidas con leche y espresso diario."
    },
    {
      name: "Caturra Clásico",
      points: "85 Puntos SCA",
      description: "Un clásico sudamericano conocido por su acidez cítrica brillante y cuerpo sedoso. Notas dulces vibrantes de larga persistencia.",
      origin: "Alta Amazonía",
      altitude: "1.650 msnm",
      process: "Lavado",
      tastingNotes: ["🍋 Cítrico", "🍯 Miel", "🍫 Cacao"],
      recommendation: "Ideal para filtrados manuales (V60, Chemex, Aeropress)."
    },
    {
      name: "Pink Bourbon (Reserva)",
      points: "88 Puntos SCA",
      description: "Microlote exclusivo de alta demanda. Perfil exótico con matices florales intensos y delicada dulzura a frutos de carozo.",
      origin: "Alta Amazonía",
      altitude: "1.800 msnm",
      process: "Lavado Anaeróbico",
      tastingNotes: ["🌸 Floral", "🍑 Frutos Rojos", "🍯 Miel Silvestre"],
      recommendation: "Para barras specialty que buscan sorprender a conocedores."
    },
    {
      name: "Tupi Estructurado",
      points: "84 Puntos SCA",
      description: "Variedad robusta que destaca por su estructura densa y notas especiadas cálidas, ideal para mezclas de la casa con carácter.",
      origin: "Alta Amazonía",
      altitude: "1.600 msnm",
      process: "Natural",
      tastingNotes: ["🌰 Nuez", "🍫 Cacao", "🪵 Especias"],
      recommendation: "Base sólida para espresso intenso o cold brew."
    },
    {
      name: "Geisha de Altura",
      points: "89 Puntos SCA",
      description: "Lote de concurso. Notas florales a jazmín, frutas blancas y acidez elegante y sedosa.",
      origin: "Huánuco, Perú",
      altitude: "1.850 msnm",
      process: "Lavado Especial",
      tastingNotes: ["🌺 Jazmín", "🍋 Bergamota", "🍑 Durazno"],
      recommendation: "Microlote de autor para catas y experiencias gourmet."
    }
  ];

  const handleB2BSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('loading');
    const formData = new FormData(e.currentTarget);
    const result = await addB2BContact(formData);

    if (result.success) {
      setContactStatus('success');
      setContactMessage(result.message || '¡Solicitud recibida! Un representante de Selva Alta se contactará a la brevedad.');
    } else {
      setContactStatus('error');
      setContactMessage(result.error || 'Ocurrió un error al enviar tu solicitud.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/40 px-3.5 py-1.5 rounded-full mb-6">
            🏢 Suministro Mayorista · Cafeterías, HORECA & Empresas
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Café de Especialidad Confiable para tu Barra o Negocio
          </h1>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Lotes con trazabilidad de origen en Huánuco (Perú), evaluados bajo protocolo SCA y tostados en Chile. Consistencia en cada extracción, precios por volumen y asesoría personalizada.
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <span>Solicitar Muestra sin Costo</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* Varieties Slider / Showcase */}
      <section className="py-20 bg-stone-900/70 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Fichas Técnicas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Nuestras Variedades de Altura
            </h2>
            <p className="text-stone-400 text-sm mt-3">
              Información agronómica y sensorial para baristas y encargados de compras.
            </p>
          </div>

          {/* Interactive Variety Display */}
          <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Column: Description & Notes */}
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase text-amber-300 bg-amber-950/80 border border-amber-800/40 px-3 py-1 rounded-full">
                    {varieties[currentSlide].points}
                  </span>
                  <span className="text-xs text-stone-400">
                    {varieties[currentSlide].process}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {varieties[currentSlide].name}
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {varieties[currentSlide].description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Perfil Sensorial en Taza:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {varieties[currentSlide].tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs sm:text-sm bg-stone-900 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-lg"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="bg-amber-950/30 border border-amber-800/30 rounded-xl p-3 text-xs text-amber-300">
                    <strong>Recomendación de Barra:</strong> {varieties[currentSlide].recommendation}
                  </div>
                </div>
              </div>

              {/* Right Column: Agronomic Data Grid */}
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800">
                  <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Origen</h5>
                  <p className="text-base font-bold text-white">{varieties[currentSlide].origin}</p>
                </div>
                <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800">
                  <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Altitud</h5>
                  <p className="text-base font-bold text-white">{varieties[currentSlide].altitude}</p>
                </div>
                <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800">
                  <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Beneficio</h5>
                  <p className="text-base font-bold text-white">{varieties[currentSlide].process}</p>
                </div>
                <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800">
                  <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Puntaje Catación</h5>
                  <p className="text-base font-bold text-amber-400">{varieties[currentSlide].points}</p>
                </div>
              </div>
            </div>

            {/* Variety Selector Buttons */}
            <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap gap-2 justify-center">
              {varieties.map((v, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    currentSlide === idx
                      ? 'bg-amber-600 text-white font-bold shadow'
                      : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services and Commercial Value */}
      <section className="py-20 bg-stone-950 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Soluciones a Medida
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ¿Por qué elegir Selva Alta para tu negocio?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 hover:border-amber-600/30 transition shadow-lg">
              <span className="text-3xl mb-4 block">☕</span>
              <h3 className="text-xl font-bold text-white mb-2">Cafeterías & Specialty</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Relaciones de largo plazo con entregas programadas semanales o quincenales. Tueste fresco que garantiza un ratio óptimo de extracción y consistencia en tus recetas.
              </p>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 hover:border-amber-600/30 transition shadow-lg">
              <span className="text-3xl mb-4 block">📦</span>
              <h3 className="text-xl font-bold text-white mb-2">Retail & Tiendas Gourmet</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Bolsas de 250g con empaque premium y válvula desgasificadora bajo la marca &quot;Tasty&quot; de Selva Alta. Excelente rotación en estantería y trazabilidad completa.
              </p>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 hover:border-amber-600/30 transition shadow-lg">
              <span className="text-3xl mb-4 block">🏢</span>
              <h3 className="text-xl font-bold text-white mb-2">Oficinas & Espacios Cowork</h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Mejora la experiencia diaria de tus colaboradores y clientes con café de especialidad superior al estándar comercial, en formato de grano entero o molido para tus cafeteras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section B2B (Backend Mago de Oz) */}
      <section id="contacto" className="py-20 bg-stone-900/90 border-b border-stone-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Contacto Comercial
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Solicita Muestras y Cotización B2B
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Envíanos los requerimientos de tu local u oficina. Te contactaremos a la brevedad con fichas técnicas y opciones de degustación.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {contactStatus === 'success' ? (
              <div className="text-center py-8">
                <span className="text-5xl mb-4 block" role="img" aria-label="Éxito">✅</span>
                <h3 className="text-2xl font-bold text-white mb-3">¡Solicitud B2B Enviada!</h3>
                <div className="bg-amber-950/70 border border-amber-600/50 rounded-2xl p-5 mb-6 text-left max-w-lg mx-auto">
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Hemos recibido tus antecedentes y notificado al equipo comercial de Selva Alta. <strong>Un representante se contactará a la brevedad</strong> vía correo o WhatsApp para coordinar el envío de tus muestras y lista de precios por volumen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactStatus('idle')}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold py-3 px-6 rounded-xl text-sm transition"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleB2BSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="b2b-name" className="block text-xs font-bold text-stone-300 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      id="b2b-name"
                      name="name"
                      required
                      type="text"
                      placeholder="Ej: Rodrigo Valenzuela"
                      disabled={contactStatus === 'loading'}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="b2b-company" className="block text-xs font-bold text-stone-300 mb-1">
                      Empresa o Cafetería *
                    </label>
                    <input
                      id="b2b-company"
                      name="company"
                      required
                      type="text"
                      placeholder="Ej: Café Huánuco Barrio Italia"
                      disabled={contactStatus === 'loading'}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="b2b-email" className="block text-xs font-bold text-stone-300 mb-1">
                      Correo Corporativo *
                    </label>
                    <input
                      id="b2b-email"
                      name="email"
                      required
                      type="email"
                      placeholder="contacto@tucafeteria.cl"
                      disabled={contactStatus === 'loading'}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="b2b-phone" className="block text-xs font-bold text-stone-300 mb-1">
                      Teléfono / WhatsApp de contacto
                    </label>
                    <input
                      id="b2b-phone"
                      name="phone"
                      type="tel"
                      placeholder="+56 9 8765 4321"
                      disabled={contactStatus === 'loading'}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="b2b-message" className="block text-xs font-bold text-stone-300 mb-1">
                    Volumen estimado o requerimiento
                  </label>
                  <textarea
                    id="b2b-message"
                    name="message"
                    rows={4}
                    placeholder="¿Cuántos kg/mes estiman consumir? ¿Qué métodos utilizan (Espresso, Filtro)? ¿Desean coordinar cata de muestras?"
                    disabled={contactStatus === 'loading'}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                {contactStatus === 'error' && (
                  <p className="text-red-400 text-xs font-semibold">{contactMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {contactStatus === 'loading' ? (
                    <>
                      <span className="animate-spin text-lg">⏳</span>
                      <span>Enviando requerimiento...</span>
                    </>
                  ) : (
                    <>
                      <span>Contactar a Selva Alta Roasters</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

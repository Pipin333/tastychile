import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const featuredVarieties = [
    {
      name: 'Marsellesa Orgánico',
      points: '87 Puntos SCA',
      notes: ['🍫 Chocolate Suave', '🍬 Caramelo', '🍒 Frutos Rojos'],
      origin: 'Huánuco, Perú · 1.820 msnm',
      process: 'Lavado / Orgánico',
      badge: 'Favorito',
      href: '/club#catalogo',
    },
    {
      name: 'Catimore Suave',
      points: '84 Puntos SCA',
      notes: ['🍯 Miel', '🌰 Avellanas', '🍫 Cacao Puro'],
      origin: 'Huánuco, Perú · 1.600 msnm',
      process: 'Lavado',
      badge: 'Versátil Espresso',
      href: '/club#catalogo',
    },
    {
      name: 'Caturra Clásico',
      points: '85 Puntos SCA',
      notes: ['🍋 Cítrico Brillante', '🍯 Miel', '🍫 Cacao'],
      origin: 'Alta Amazonía · 1.650 msnm',
      process: 'Lavado',
      badge: 'Equilibrado',
      href: '/club#catalogo',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <span>✨ Nueva Cosecha de Altura</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>1.820 msnm Huánuco, Perú</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-[1.15] mb-6">
            Café de Especialidad de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">Alta Amazonía</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Granos cosechados a mano en las montañas de Huánuco con perfiles de <strong>84 a 87+ Puntos SCA</strong>. Tostados a pedido en Chile para que disfrutes de su máxima pureza sensorial.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              href="/club"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              <span>El Club (Para Casa)</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/b2b"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold px-8 py-4 rounded-xl border border-stone-700 transition"
            >
              <span>Para Cafeterías & B2B</span>
            </Link>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-stone-800/80 text-left">
            <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <span className="text-2xl mb-2 block" role="img" aria-label="Tueste">🔥</span>
              <h2 className="text-sm font-bold text-white mb-1">Tostado a Pedido</h2>
              <p className="text-xs text-stone-400">Nunca granos añejos; máxima frescura y aromas vivos.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <span className="text-2xl mb-2 block" role="img" aria-label="Montaña">🏔️</span>
              <h2 className="text-sm font-bold text-white mb-1">1.820 msnm</h2>
              <p className="text-xs text-stone-400">Maduración lenta de altitud que aporta acidez balanceada.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <span className="text-2xl mb-2 block" role="img" aria-label="Estrella">⭐</span>
              <h2 className="text-sm font-bold text-white mb-1">84-87 Puntos SCA</h2>
              <p className="text-xs text-stone-400">Café de especialidad certificado sin defectos primarios.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
              <span className="text-2xl mb-2 block" role="img" aria-label="Despacho">🚚</span>
              <h2 className="text-sm font-bold text-white mb-1">Envíos a Todo Chile</h2>
              <p className="text-xs text-stone-400">Coordinación directa por WhatsApp y correo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual Choices Section */}
      <section className="py-20 bg-stone-900 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Elige tu experiencia
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              ¿Cómo quieres disfrutar Selva Alta?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Club Card */}
            <Link
              href="/club"
              className="group relative flex flex-col justify-between bg-stone-950 border border-stone-800 rounded-3xl p-8 sm:p-10 hover:border-amber-600/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-900/40 border border-amber-700/40 text-3xl group-hover:scale-110 transition-transform">
                    ☕
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/40">
                    Para Amantes del Café
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  El Club Selva Alta
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                  Bolsas de 250g y suscripciones mensuales con despacho a tu puerta. Selecciona tu variedad favorita, tu tipo de molienda y recibe café tostado recientemente.
                </p>

                <ul className="space-y-2.5 text-sm text-stone-400 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Molienda a medida (Grano, Espresso, Filtro, Moka, Prensa)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Sin compromisos de permanencia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Backend asistido: confirmación inmediata por WhatsApp
                  </li>
                </ul>
              </div>

              <div className="inline-flex items-center gap-2 text-amber-400 font-bold group-hover:text-amber-300 transition-colors">
                <span>Explorar Variedades & Pedir</span>
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </div>
            </Link>

            {/* B2B Card */}
            <Link
              href="/b2b"
              className="group relative flex flex-col justify-between bg-stone-950 border border-stone-800 rounded-3xl p-8 sm:p-10 hover:border-amber-600/50 transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 text-3xl group-hover:scale-110 transition-transform">
                    🏢
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300 bg-stone-900 px-3 py-1 rounded-full border border-stone-700">
                    HORECA & Cafeterías
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  Venta Mayorista & Empresas
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                  Lotes consistentes para cafeterías de especialidad, restaurantes y oficinas corporativas. Solicita muestras sin costo, fichas técnicas y acuerdos de suministro continuo.
                </p>

                <ul className="space-y-2.5 text-sm text-stone-400 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Fichas sensoriales de cata completas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Formatos de 1kg y 250g para retail y barra
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> Asistencia y calibración técnica en tus máquinas
                  </li>
                </ul>
              </div>

              <div className="inline-flex items-center gap-2 text-amber-400 font-bold group-hover:text-amber-300 transition-colors">
                <span>Solicitar Muestras & Contacto B2B</span>
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Varieties Showcase */}
      <section className="py-20 bg-stone-950 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Nuestra Colección
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Variedades de Altura Disponibles
            </h3>
            <p className="text-stone-400 mt-3 text-sm sm:text-base">
              Cultivadas bajo sombra en la selva alta peruana con procesos limpios y trazabilidad total.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredVarieties.map((v, i) => (
              <div
                key={i}
                className="bg-stone-900/60 border border-stone-800 hover:border-amber-600/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:bg-stone-900"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase text-amber-300 bg-amber-950/70 border border-amber-800/40 px-2.5 py-1 rounded-full">
                      {v.badge}
                    </span>
                    <span className="text-xs font-extrabold text-amber-400">
                      {v.points}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1">{v.name}</h4>
                  <p className="text-xs text-stone-400 mb-4">{v.origin} · {v.process}</p>

                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      Notas de Cata:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {v.notes.map((note, idx) => (
                        <span key={idx} className="text-xs bg-stone-800/80 text-stone-300 px-2.5 py-1 rounded-md">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={v.href}
                  className="w-full text-center bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-200 font-bold py-2.5 px-4 rounded-xl text-sm transition"
                >
                  Pedir en El Club
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/club#catalogo"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Ver todas las variedades y suscripciones mensuales</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 bg-stone-900 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Trazabilidad Directa
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                De las montañas de Huánuco a tu taza
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Tingo María y las cumbres de Huánuco ofrecen uno de los ecosistemas más puros para el café de especialidad. La combinación de niebla de altura, suelos volcánicos y sombra natural ralentiza la maduración de las cerezas.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                El resultado es una mayor concentración de azúcares naturales y un perfil en taza limpio, con notas a cacao fino, miel y frutas silvestres. Importamos directamente el grano verde y lo tostamos en pequeños lotes en Chile para que recibas un café fresco y lleno de vida.
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <h4 className="text-xl font-bold text-white border-b border-stone-800 pb-4">
                El Compromiso Selva Alta
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h5 className="font-bold text-stone-200 text-sm">Comercio Directo y Justo</h5>
                    <p className="text-xs text-stone-400">Trabajamos estrechamente con cooperativas familiares en Huánuco asegurando un precio premium por calidad superior.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">🧪</span>
                  <div>
                    <h5 className="font-bold text-stone-200 text-sm">Control Sensorial Riguroso</h5>
                    <p className="text-xs text-stone-400">Cada lote es catado y calibrado según el protocolo oficial SCA (Specialty Coffee Association).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h5 className="font-bold text-stone-200 text-sm">Empaque con Válvula</h5>
                    <p className="text-xs text-stone-400">Bolsas trilaminadas herméticas con válvula desgasificadora que conservan los aromas del tueste.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            ¿Listo para saborear la diferencia?
          </h3>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
            Haz tu pedido en menos de dos minutos. Nuestro equipo coordinará tu entrega y el pago directamente contigo por WhatsApp.
          </p>
          <div className="pt-2">
            <Link
              href="/club#catalogo"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>Pedir Mi Café Ahora</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

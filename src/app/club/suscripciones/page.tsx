"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { addContactToWaitlist } from '@/app/actions';

export default function SuscripcionesPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('loading');
    const result = await addContactToWaitlist(formData);
    
    if (result.success) {
      setStatus('success');
      setMessage(result.message || 'Suscripción exitosa');
    } else {
      setStatus('error');
      setMessage(result.error || 'Ocurrió un error');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans'>
      {/* Navbar simplificado */}
      <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/club" className="text-sm md:text-base font-bold text-amber-900 hover:text-amber-700 transition">
              ← Volver al Club
            </Link>
            <div className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight">
              Selva Alta Club
            </div>
            <div className="w-16"></div> {/* Espaciador */}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className='bg-amber-900 py-16 text-center px-4 text-white'>
        <h1 className='text-4xl md:text-5xl font-extrabold mb-6'>Planes de Suscripción</h1>
        <p className='text-xl text-amber-100 max-w-2xl mx-auto'>
          Elige el plan que mejor se adapte a tu consumo y comienza a descubrir los secretos de la Amazonía en cada taza.
        </p>
      </section>

      {/* Tiers / Planes */}
      <section className='py-20 px-4 max-w-7xl mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Plan Explorador */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-amber-900 mb-2">Explorador</h3>
            <p className="text-gray-500 mb-6">Para quienes toman una taza al día y quieren iniciarse en el café de especialidad.</p>
            <div className="text-4xl font-extrabold mb-6">$14.900<span className="text-lg font-medium text-gray-400">/mes</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-gray-700">1 Bolsa de 250g a elección</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-gray-700">1 Muestra sorpresa de 60g</span>
              </li>
            </ul>
            <a href="#unirme" className="block text-center w-full bg-amber-100 text-amber-900 font-bold py-3 rounded-xl hover:bg-amber-200 transition">
              Elegir Plan
            </a>
          </div>

          {/* Plan Aventurero (Destacado) */}
          <div className="bg-amber-900 rounded-3xl p-8 border-2 border-amber-500 shadow-xl transform md:-translate-y-4 relative text-white">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white font-bold py-1 px-4 rounded-full text-sm uppercase tracking-wide">
              MÁS POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Aventurero</h3>
            <p className="text-amber-100 mb-6">La experiencia completa para descubrir nuevos perfiles de tueste cada mes.</p>
            <div className="text-5xl font-extrabold mb-2">$18.900<span className="text-xl font-medium text-amber-200">/mes</span></div>
            <p className="text-xs text-amber-300 mb-6 uppercase tracking-wider font-bold">Envío RM Incluido</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">✓</span>
                <span>1 Bolsa de 250g a elección</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">✓</span>
                <span>2 Muestras exclusivas (60g c/u)</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">✓</span>
                <span>Carta del productor con tips</span>
              </li>
            </ul>
            <a href="#unirme" className="block text-center w-full bg-white text-amber-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition">
              Elegir Plan
            </a>
          </div>

          {/* Plan Experto */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-amber-900 mb-2">Experto</h3>
            <p className="text-gray-500 mb-6">Nunca te quedes sin reserva. Ideal para parejas o alto consumo en casa.</p>
            <div className="text-4xl font-extrabold mb-2">$28.900<span className="text-lg font-medium text-gray-400">/mes</span></div>
            <p className="text-xs text-green-600 mb-6 uppercase tracking-wider font-bold">Envío RM Incluido</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-gray-700">2 Bolsas de 250g a elección</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span className="text-gray-700">Acceso anticipado a microlotes</span>
              </li>
            </ul>
            <a href="#unirme" className="block text-center w-full bg-amber-100 text-amber-900 font-bold py-3 rounded-xl hover:bg-amber-200 transition">
              Elegir Plan
            </a>
          </div>

        </div>
      </section>

      {/* Preguntas Frecuentes (FAQ) */}
      <section className='py-16 bg-white px-4'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-extrabold text-amber-900 mb-10 text-center'>Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-2">¿Puedo cambiar mi variedad mes a mes?</h4>
              <p className="text-gray-600">¡Por supuesto! Desde tu panel podrás cambiar la bolsa principal de 250g antes del día 5 de cada mes para probar toda nuestra rotación (Marsellesa, Catimore, Pink Bourbon, etc).</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-2">¿Cómo funcionan los envíos?</h4>
              <p className="text-gray-600">Tostamos a pedido la primera semana de cada mes. Los envíos se despachan entre el día 10 y 12 para asegurar que tu café llegue en el punto óptimo de reposo y frescura.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-2">¿Hay cláusula de amarre?</h4>
              <p className="text-gray-600">Cero. Sabemos que te enamorarás del café amazonense, pero si decides pausar o cancelar tu suscripción, podrás hacerlo en cualquier momento sin recargos ocultos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist (Bottom) */}
      <section id="unirme" className='bg-amber-50 py-16 border-t border-amber-100 px-4'>
        <div className='max-w-md mx-auto text-center'>
          <h3 className='text-2xl font-bold text-amber-900 mb-2'>Inscríbete a la Lista de Acceso</h3>
          <p className='text-gray-600 mb-6'>Pronto abriremos los cupos oficiales. Los primeros en la lista asegurarán su primera cajita con un regalo especial.</p>
          <form action={handleSubmit} className='flex flex-col gap-4'>
            <input 
              name="email"
              type="email" 
              placeholder="tu@correo.cl" 
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
              required 
              disabled={status === 'loading' || status === 'success'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className='w-full bg-amber-900 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-amber-800 transition transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed'>
              {status === 'loading' ? 'Guardando...' : 'Reservar mi cupo'}
            </button>
            {status === 'success' && <p className="text-green-600 font-medium text-sm mt-2">{message}</p>}
            {status === 'error' && <p className="text-red-500 font-medium text-sm mt-2">{message}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
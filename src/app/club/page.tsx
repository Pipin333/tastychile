"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { addContactToWaitlist } from '@/app/actions';

const coffees = [
  { id: 'marsellesa', name: 'Marsellesa', notes: 'Chocolate, Caramelo, Frutas Dulces', process: 'Lavado / Orgánico', points: '87 Puntos SCA', price: 12900, emoji: '🍫', alt: '1.820 msnm' },
  { id: 'catimore', name: 'Catimore', notes: 'Avellanas, Miel, Cacao puro', process: 'Lavado', points: '84 Puntos SCA', price: 11900, emoji: '🍯', alt: '1.600 msnm' },
  { id: 'pink-bourbon', name: 'Pink Bourbon (Pronto)', notes: 'Floral, Frutos Rojos, Miel', process: 'Lavado', points: 'SCA por evaluar', price: 14900, emoji: '🌸', alt: '1.700 - 1.900 msnm' },
  { id: 'tupi', name: 'Tupi (Pronto)', notes: 'Nuez, Cacao, Especias', process: 'Natural', points: 'SCA por evaluar', price: 13500, emoji: '🌰', alt: '1.500 - 1.700 msnm' },
  { id: 'geisha', name: 'Geisha (Pronto)', notes: 'Jazmín, Bergamota, Fruta Tropical', process: 'Lavado', points: 'SCA por evaluar', price: 19900, emoji: '🌺', alt: '1.850+ msnm' },
];

export default function Club() {
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
      {/* Navbar simplificado para el club */}
      <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-sm md:text-base font-bold text-amber-900 hover:text-amber-700 transition">
              ← Volver al Inicio
            </Link>
            <div className="text-xl md:text-2xl font-extrabold text-amber-900 tracking-tight">
              Selva Alta Club
            </div>
            <div className="hidden md:flex gap-4 text-sm font-medium text-amber-900">
              <a href="#suscripcion" className="hover:text-amber-700 transition">Suscripción</a>
              <a href="#tienda" className="hover:text-amber-700 transition">Tienda</a>
              <a href="#nosotros" className="hover:text-amber-700 transition">Nosotros</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='bg-amber-900 py-20 text-center px-4 text-white'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-6'>Tu Café, de la Finca a tu Taza</h1>
        <p className='text-xl text-amber-100 max-w-2xl mx-auto mb-10'>
          Disfruta de nuestros granos de especialidad de la Amazonía Peruana en formato de tienda libre o a través de nuestra suscripción mensual.
        </p>
      </section>

      {/* 1. Modelo de Suscripción */}
      <section id="suscripcion" className='py-20 bg-amber-50 px-4'>
        <div className='max-w-5xl mx-auto'>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100 flex flex-col md:flex-row">
            <div className="bg-amber-900 p-10 md:w-2/5 flex flex-col justify-center text-white">
              <h2 className="text-3xl font-extrabold mb-4">La Experiencia Selva Alta</h2>
              <p className="text-amber-100 mb-6">El modelo de suscripción perfecto para los aventureros del café.</p>
              <div className="text-5xl font-black mb-2">$18.900<span className="text-xl font-medium text-amber-200">/mes</span></div>
              <p className="text-sm text-amber-200 uppercase tracking-widest font-bold mt-4">Envío Incluido en RM</p>
            </div>
            <div className="p-10 md:w-3/5 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">¿Qué incluye tu cajita mensual?</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <p className="text-gray-700 font-medium"><strong>1 Bolsa Full (250g)</strong> de tu variedad preferida (Marsellesa, Catimore, Pink Bourbon o Tupi).</p>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <p className="text-gray-700 font-medium"><strong>2 Muestras de Degustación (60g c/u)</strong> de variedades sorpresa o microlotes exclusivos del mes.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <p className="text-gray-700 font-medium"><strong>1 Carta del Productor</strong> con tips de extracción e historia detrás de los granos.</p>
                </li>
              </ul>
              <Link href="/club/suscripciones" className="bg-amber-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-amber-800 transition transform hover:scale-105 shadow-md w-full md:w-auto self-start text-center inline-block">
                Ver todos los planes de suscripción
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tienda de Variedades */}
      <section id="tienda" className='py-20 px-4 max-w-7xl mx-auto'>
        <div className="text-center mb-12">
          <h2 className='text-3xl md:text-4xl font-extrabold text-amber-900 mb-4'>Nuestra Selección (250g)</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>Elige tu variedad favorita en formato estándar de 250 gramos, tostado fresco para ti.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {coffees.map((coffee) => (
            <div key={coffee.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 flex items-center justify-center bg-amber-50 rounded-xl p-6 md:w-1/3">
                 <div className="text-7xl">{coffee.emoji}</div>
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-amber-900">{coffee.name}</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">{coffee.points}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-3">{coffee.process} • {coffee.alt}</p>
                  <p className="text-gray-700 text-sm italic mb-4">Notas en taza: {coffee.notes}</p>
                </div>
                <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 gap-4">
                  <span className="text-2xl font-extrabold text-amber-900">${coffee.price.toLocaleString('es-CL')}</span>
                  <button className="w-full sm:w-auto bg-amber-100 text-amber-900 font-bold py-2 px-6 rounded-xl hover:bg-amber-200 transition">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sobre Nosotros */}
      <section id="nosotros" className='py-20 px-4 max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl font-extrabold text-amber-900 mb-8'>El Origen: Tingo María, Huánuco</h2>
        <div className="flex justify-center mb-8 text-7xl">🌱</div>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Selva Alta Roasters</strong> nace del profundo respeto por la Amazonía Peruana. Trabajamos directamente con la finca en los suelos privilegiados de Tingo María, Huánuco, cultivando a altitudes que permiten una maduración lenta y compleja.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          No somos solo intermediarios; somos tostadores apasionados que buscan en cada tueste relatar la historia de su tierra. Nuestras variedades (desde la dulzura del Pink Bourbon hasta el cuerpo del Tupi) reflejan la riqueza de la selva alta, gestionada de forma comunitaria, orgánica y sustentable.
        </p>
      </section>

      {/* Newsletter CTA / Waitlist */}
      <section className='bg-white py-16 border-t border-gray-100 px-4'>
        <div className='max-w-md mx-auto text-center'>
          <h3 className='text-2xl font-bold text-amber-900 mb-2'>¡Estamos encendiendo los tostadores!</h3>
          <p className='text-gray-600 mb-6'>Déjanos tu correo para avisarte apenas habilitemos el carrito de compras. ¡Las primeras suscripciones llevarán un regalo exclusivo!</p>
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
              {status === 'loading' ? 'Guardando...' : 'Avisarme de la apertura'}
            </button>
            {status === 'success' && <p className="text-green-600 font-medium text-sm mt-2">{message}</p>}
            {status === 'error' && <p className="text-red-500 font-medium text-sm mt-2">{message}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

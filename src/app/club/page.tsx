"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { addContactToWaitlist } from '@/app/actions';

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
    <div className='min-h-screen bg-white text-gray-900 font-sans'>
      {/* Navbar simplificado para el club */}
      <nav className="bg-white shadow-sm w-full top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-amber-900">
              ← Volver
            </Link>
            <div className="text-2xl font-extrabold text-amber-900 tracking-tight">
              Selva Alta Club
            </div>
            <div className="w-16"></div> {/* espaciador para centrar el titulo */}
          </div>
        </div>
      </nav>

      {/* Innovación y Club */}
      <section className='bg-amber-50 py-20 text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-amber-900 mb-6'>Tu Café, A Tu Manera</h1>
        <p className='text-xl text-amber-800 max-w-2xl mx-auto mb-10'>
          Descubre el plan perfecto para ti. Suscríbete y recibe café de especialidad de Huánuco directo a tu puerta cada mes.
        </p>

        {/* Newsletter CTA */}
        <div className='max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-amber-100'>
          <h3 className='text-2xl font-bold text-amber-900 mb-2'>Únete a la Lista de Espera</h3>
          <p className='text-gray-600 mb-6'>Déjanos tu correo y sé el primero en enterarte cuando abramos las suscripciones al El Club™. ¡Habrá sorpresas para los primeros!</p>
          <form action={handleSubmit} className='flex flex-col gap-4'>
            <input 
              name="email"
              type="email" 
              placeholder="tu@email.com" 
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
              required 
              disabled={status === 'loading' || status === 'success'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className='w-full bg-amber-900 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-amber-800 transition transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed'>
              {status === 'loading' ? 'Enviando...' : 'Suscribirme al Newsletter'}
            </button>
            {status === 'success' && <p className="text-green-600 font-medium text-sm mt-2">{message}</p>}
            {status === 'error' && <p className="text-red-500 font-medium text-sm mt-2">{message}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

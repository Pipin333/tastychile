import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center font-sans px-4'>
      <div className='absolute top-8 left-8 text-2xl font-extrabold text-amber-900'>Selva Alta Roasters</div>
      <h1 className='text-4xl md:text-5xl font-extrabold text-amber-900 mb-4'>Bienvenido a Selva Alta</h1>
      <p className='text-xl text-gray-600 mb-12 max-w-lg'>Elige tu experiencia con nuestro café de especialidad de la Amazonía Peruana.</p>
      
      <div className='grid md:grid-cols-2 gap-8 w-full max-w-4xl'>
        {/* B2C Card */}
        <Link href="/club" className='group block bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition p-10 cursor-pointer text-center duration-300 transform hover:-translate-y-2'>
          <div className='text-6xl mb-6 group-hover:scale-110 transition-transform'>☕</div>
          <h2 className='text-2xl font-bold text-amber-900 mb-3'>Para ti: El Club™</h2>
          <p className='text-gray-600'>Disfruta del mejor café de especialidad en tu casa. Suscripciones mensuales, tienda online y tips de baristas.</p>
        </Link>
        
        {/* B2B Card */}
        <Link href="/b2b" className='group block bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition p-10 cursor-pointer text-center duration-300 transform hover:-translate-y-2'>
          <div className='text-6xl mb-6 group-hover:scale-110 transition-transform'>🏢</div>
          <h2 className='text-2xl font-bold text-amber-900 mb-3'>Para Empresas</h2>
          <p className='text-gray-600'>Soluciones corporativas, venta al por mayor para de cafeterías, corporativo (HORECA) y retail.</p>
        </Link>
      </div>
    </div>
  );
}

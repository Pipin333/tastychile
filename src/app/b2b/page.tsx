"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { addB2BContact } from '@/app/actions';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');

  const varieties = [
    {
      name: "Marsellesa",
      points: "87 Puntos SCA",
      description: "Cultivado de forma orgánica a 1.820 msnm. Esta condición privilegiada de altitud y clima favorece una maduración lenta y una mayor complejidad sensorial en taza. A través del proceso lavado, logramos una claridad sensorial excepcional que resalta las notas naturales y la limpieza en taza.",
      origin: "Huánuco, Perú",
      altitude: "1.820 msnm",
      process: "Lavado / Orgánico",
      tastingNotes: ["🍫 Chocolate", "🍬 Caramelo", "🍒 Frutas Dulces"]
    },
    {
      name: "Pronto: Catimore",
      points: "84 Puntos SCA",
      description: "Un perfil dulce y balanceado con un cuerpo cremoso. Este lote lavado a 1.600 msnm resalta por sus notas ricas que recuerdan a postres clásicos. Una opción sumamente versátil y perfecta tanto para espresso como para filtrados suaves diarios.",
      origin: "Huánuco, Perú",
      altitude: "1.600 msnm",
      process: "Lavado",
      tastingNotes: ["🍯 Miel", "🌰 Avellanas", "🍫 Cacao puro"]
    },
    {
      name: "Pronto: Pink Bourbon",
      points: "SCA por evaluar",
      description: "Próximamente incorporaremos esta exótica variedad a nuestro catálogo. Conocida por su perfil distintivo y su resistencia, Pink Bourbon es una rareza altamente codiciada en el mundo del specialty coffee.",
      origin: "Alta Amazonía",
      altitude: "1.700 - 1.900 msnm",
      process: "Lavado",
      tastingNotes: ["🌸 Floral", "🍑 Frutos Rojos", "🍯 Miel"]
    },
    {
      name: "Pronto: Caturra",
      points: "85 Puntos SCA",
      description: "Un clásico sudamericano conocido por su acidez brillante y cuerpo medio. Este perfil lavado ofrece notas vibrantes y un dulzor prolongado.",
      origin: "Alta Amazonía",
      altitude: "1.650 msnm",
      process: "Lavado",
      tastingNotes: ["🍋 Cítrico", "🍯 Miel", "🍫 Cacao"]
    },
    {
      name: "Pronto: Tupi",
      points: "SCA por evaluar",
      description: "Estamos trabajando para traer la variedad Tupi, que destaca por su robustez excepcional y un perfil de taza estructurado, ideal para bases de espresso con carácter.",
      origin: "Alta Amazonía",
      altitude: "1.500 - 1.700 msnm",
      process: "Natural",
      tastingNotes: ["🌰 Nuez", "🍫 Cacao", "🪵 Especias"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === varieties.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? varieties.length - 1 : prev - 1));
  };

  // Autoscroll del carrusel cada 35 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === varieties.length - 1 ? 0 : prev + 1));
    }, 35000);
    return () => clearInterval(timer);
  }, [varieties.length]);

  const handleB2BSubmit = async (formData: FormData) => {
    setContactStatus('loading');
    const result = await addB2BContact(formData);
    
    if (result.success) {
      setContactStatus('success');
      setContactMessage(result.message || 'Mensaje enviado exitosamente');
    } else {
      setContactStatus('error');
      setContactMessage(result.error || 'Ocurrió un error');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans break-words pt-16'>
      <Navbar />

      {/* Hero Section */}
      <section id='inicio' className='bg-amber-900 text-white py-24 text-center px-4'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6'>Café de Especialidad de la Alta Amazonía</h1>
        <p className='text-xl max-w-2xl mx-auto text-amber-100 mb-8'>
          Selva Alta Roasters presenta "Tasty": Café premium de origen Tingo María, Huánuco - Perú. Seleccionado especialmente para el mercado specialty y empresarial.
        </p>
        <a href="#contacto" className="inline-block bg-white text-amber-900 font-bold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-105 duration-200">
          Solicitar Muestra
        </a>
      </section>

      {/* Catálogo de Variedades (Carrusel) */}
      <section id='quienes-somos' className='py-16 bg-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-10 text-amber-900 text-center'>Nuestras Variedades</h2>
          
          <div className='relative bg-amber-50 rounded-2xl p-8 md:p-12 shadow-md border border-amber-100'>
            {/* Controles del Carrusel */}
            <button onClick={prevSlide} className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10'>
              <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button onClick={nextSlide} className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10'>
              <svg className="w-6 h-6 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            {/* Contenido del Slide Activo */}
            <div className='flex flex-col md:flex-row gap-12 items-center'>
              <div className='md:w-1/2'>
                <h3 className='text-3xl font-extrabold text-amber-900 mb-2'>{varieties[currentSlide].name}</h3>
                <span className='inline-block bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded-full text-sm mb-6'>
                  {varieties[currentSlide].points}
                </span>
                <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                  {varieties[currentSlide].description}
                </p>
                
                <h4 className='font-bold text-gray-900 mb-3'>Perfil Sensorial en Taza</h4>
                <div className='flex flex-wrap gap-2'>
                  {varieties[currentSlide].tastingNotes.map((note, index) => (
                    <span key={index} className='px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700'>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className='md:w-1/2 grid grid-cols-2 gap-4 w-full'>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h4 className='font-bold text-amber-900'>Origen</h4>
                  <p className='text-gray-700'>{varieties[currentSlide].origin}</p>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h4 className='font-bold text-amber-900'>Altitud</h4>
                  <p className='text-gray-700'>{varieties[currentSlide].altitude}</p>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h4 className='font-bold text-amber-900'>Proceso</h4>
                  <p className='text-gray-700'>{varieties[currentSlide].process}</p>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h4 className='font-bold text-amber-900'>Variedad</h4>
                  <p className='text-gray-700'>{varieties[currentSlide].name.replace("Pronto: ", "")}</p>
                </div>
              </div>
            </div>

            {/* Puntos indicadores del carrusel */}
            <div className='flex justify-center mt-8 gap-2'>
              {varieties.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${currentSlide === index ? 'bg-amber-900 w-8' : 'bg-amber-300 w-3'}`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formatos y Servicios */}
      <section id='servicios' className='py-20 bg-gray-50 border-t border-gray-200'>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-12 text-center text-amber-900'>Nuestra Oferta Comercial</h2>
          <div className='grid md:grid-cols-2 gap-8 text-left'>
            <div className='p-8 bg-white shadow-sm rounded-xl border border-gray-100'>
              <h2 className='text-2xl font-bold mb-3'>☕ Cafeterías y Specialty</h2>
              <p className='text-gray-600'>Buscamos relaciones de largo plazo. Entrega de perfiles consistentes, complejos e ideales tanto para espresso como para métodos filtrados.</p>
            </div>
            <div className='p-8 bg-white shadow-sm rounded-xl border border-gray-100'>
              <h2 className='text-2xl font-bold mb-3'>📦 Distribuidores y Tiendas</h2>
              <p className='text-gray-600'>Comercializamos nuestro café tostado bajo la marca "Tasty" en formato de 250 gramos, con completa trazabilidad y garantía de frescura.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id='contacto' className='py-20 bg-amber-900'>
        <div className='max-w-3xl mx-auto px-4'>
          <div className='text-center text-white mb-10'>
            <h3 className='text-3xl font-bold mb-4'>Construyamos una Alianza</h3>
            <p className='text-amber-100'>
              Quedamos disponibles para coordinar el envío de muestras, fichas técnicas y antecedentes comerciales.
            </p>
          </div>
          
          <form action={handleB2BSubmit} className='bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 text-gray-900'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-bold text-gray-700 mb-1'>Nombre Completo *</label>
                <input required type="text" name="name" className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none' disabled={contactStatus === 'loading' || contactStatus === 'success'} />
              </div>
              <div>
                <label className='block text-sm font-bold text-gray-700 mb-1'>Nombre de la Empresa *</label>
                <input required type="text" name="company" className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none' disabled={contactStatus === 'loading' || contactStatus === 'success'} />
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-bold text-gray-700 mb-1'>Correo Electrónico Corporativo *</label>
              <input required type="email" name="email" className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none' disabled={contactStatus === 'loading' || contactStatus === 'success'} />
            </div>

            <div>
              <label className='block text-sm font-bold text-gray-700 mb-1'>Mensaje</label>
              <textarea name="message" rows={4} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none' placeholder='¿Qué tipo de volumen buscan? ¿Desean agendar una cata?' disabled={contactStatus === 'loading' || contactStatus === 'success'}></textarea>
            </div>

            <button 
              type="submit" 
              disabled={contactStatus === 'loading' || contactStatus === 'success'}
              className='mt-4 w-full bg-amber-900 text-white font-bold py-4 px-8 rounded-xl shadow hover:bg-amber-800 transition transform hover:scale-105 duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed'>
              {contactStatus === 'loading' ? 'Enviando Datos...' : 'Contactar a Selva Alta Roasters'}
            </button>
            
            {contactStatus === 'success' && <p className="text-green-600 font-bold text-center mt-2">{contactMessage}</p>}
            {contactStatus === 'error' && <p className="text-red-500 font-bold text-center mt-2">{contactMessage}</p>}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-center py-8 text-gray-400 text-sm'>
        <p>© 2026 Selva Alta Roasters SpA. Producto "Tasty". Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

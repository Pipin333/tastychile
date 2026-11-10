import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-900/60 border border-amber-700/50 text-xl shadow-inner" aria-hidden="true">
                ☕
              </span>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Selva Alta Roasters
                </span>
                <span className="block text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  TastyChile SpA
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm max-w-md leading-relaxed">
              Café de especialidad cosechado en las laderas altas de la Amazonía Peruana (Huánuco y Tingo María a más de 1.800 msnm) y tostado a pedido en Chile para preservar sus notas complejas y máxima frescura en taza.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-stone-900 border border-stone-800 text-amber-300 px-3 py-1 rounded-full">
                🏔️ Altitud 1.820 msnm
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-stone-900 border border-stone-800 text-amber-300 px-3 py-1 rounded-full">
                ⭐ SCA 84 - 87 Puntos
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-stone-900 border border-stone-800 text-amber-300 px-3 py-1 rounded-full">
                🌱 Tueste a Pedido
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/club" className="hover:text-amber-400 transition-colors">
                  El Club (Para Casa)
                </Link>
              </li>
              <li>
                <Link href="/club#catalogo" className="hover:text-amber-400 transition-colors">
                  Variedades de Café
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="hover:text-amber-400 transition-colors">
                  Para Empresas y Cafeterías
                </Link>
              </li>
              <li>
                <Link href="/b2b#contacto" className="hover:text-amber-400 transition-colors">
                  Solicitar Muestra B2B
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Contacto Directo
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <span className="block text-xs text-stone-500">Ventas & Consultas:</span>
                <a href="mailto:comercial@selvaalta.cl" className="text-stone-300 hover:text-amber-400 transition-colors font-medium">
                  comercial@selvaalta.cl
                </a>
              </li>
              <li>
                <span className="block text-xs text-stone-500">Atención WhatsApp:</span>
                <a 
                  href="https://wa.me/56900000000?text=Hola%20Selva%20Alta,%20me%20gustar%C3%ADa%20hacer%20una%20consulta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-medium transition-colors"
                >
                  <span>💬 Hablar por WhatsApp</span>
                </a>
              </li>
              <li>
                <span className="block text-xs text-stone-500">Origen & Despacho:</span>
                <span className="text-stone-300">Tingo María (Perú) / Santiago (Chile)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Selva Alta Roasters SpA. Marca registrada &quot;Tasty&quot;. Todos los derechos reservados.</p>
          <p>Despachos a todo Chile continental.</p>
        </div>
      </div>
    </footer>
  );
}

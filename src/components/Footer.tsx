import React from "react";
import Link from "next/link";

/**
 * Site footer in deep Amazonian forest green with warm parchment typography.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#143326] border-t border-[#1E4D38] text-[#E6DEC8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <span className="text-base font-bold text-[#FAF6F0] tracking-tight block">
              Selva Alta Roasters
            </span>
            <p className="text-sm text-[#D5CBB8] leading-relaxed">
              Café de especialidad cultivado bajo sombra de bosque nuboso a
              1.820 msnm frente a La Bella Durmiente en Tingo María, Huánuco,
              Perú. Tostado y molido a pedido en Chile.
            </p>
            <p className="font-mono text-xs text-[#A9BFA8]">
              Cosecha familiar · Marsellesa de Altura (87.0 SCA)
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FAF6F0]">
              Explorar
            </h4>
            <ul className="space-y-2 text-sm text-[#D5CBB8]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#FAF6F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6F0] rounded"
                >
                  Nuestro Café y Origen
                </Link>
              </li>
              <li>
                <Link
                  href="/club"
                  className="hover:text-[#FAF6F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6F0] rounded"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b"
                  className="hover:text-[#FAF6F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6F0] rounded"
                >
                  Para Empresas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#FAF6F0]">
              Contacto Directo
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="block font-mono text-[11px] uppercase text-[#A9BFA8]">
                  Escríbenos
                </span>
                <a
                  href="mailto:comercial@selvaalta.cl?subject=Consulta%20Selva%20Alta%20Roasters"
                  className="text-[#FAF6F0] hover:text-[#F5DEB3] transition-colors font-mono text-xs sm:text-sm underline underline-offset-4"
                >
                  comercial@selvaalta.cl
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-[#A9BFA8]">
                  De la finca a tu taza
                </span>
                <span className="text-[#D5CBB8]">
                  Tingo María (Perú) · Santiago (Chile)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1E4D38] flex flex-col sm:flex-row items-center justify-between text-xs text-[#D5CBB8] gap-3 font-mono">
          <p>
            {`© ${new Date().getFullYear()} Selva Alta Roasters SpA · RUT 78.431.121-K · Santiago, Chile. Todos los derechos reservados.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/privacidad"
              className="hover:text-[#FAF6F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6F0] rounded"
            >
              Privacidad
            </Link>
            <span className="text-[#2D6A4F]" aria-hidden="true">
              /
            </span>
            <Link
              href="/terminos"
              className="hover:text-[#FAF6F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6F0] rounded"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

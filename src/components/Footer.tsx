import React from "react";
import Link from "next/link";

/**
 * Site footer with origin metadata and direct contact channels.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#110f0d]/95 border-t border-[#332c25] text-[#b0a89e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <span className="text-base font-bold text-[#f5f3f0] tracking-tight block">
              Selva Alta Roasters
            </span>
            <p className="text-sm text-[#b0a89e] leading-relaxed">
              Café de especialidad cosechado a 1.820 msnm frente al relieve de
              La Bella Durmiente en Tingo María, Huánuco, Perú. Distribución con
              molienda calibrada y entregas carbono neutrales en Santiago.
            </p>
            <p className="font-mono text-xs text-[#7d746b]">
              09°17′50″S 75°59′52″W · Lote Marsellesa 87.0 SCA
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#f5f3f0]">
              Rutas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#f5f3f0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] rounded"
                >
                  Inicio y Lote Activo
                </Link>
              </li>
              <li>
                <Link
                  href="/b2b"
                  className="hover:text-[#f5f3f0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] rounded"
                >
                  Abastecimiento para Barras y Oficinas
                </Link>
              </li>
              <li>
                <Link
                  href="/club"
                  className="hover:text-[#f5f3f0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] rounded"
                >
                  Pedidos en Formato 250g y Volumen
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#f5f3f0]">
              Contacto Directo
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="block font-mono text-[11px] uppercase text-[#7d746b]">
                  Correo Comercial
                </span>
                <a
                  href="mailto:comercial@selvaalta.cl?subject=Solicitud%20de%20detalles%20Marsellesa%2087%20SCA"
                  className="text-[#f5f3f0] hover:text-[#c25e1a] transition-colors font-mono text-xs sm:text-sm"
                >
                  comercial@selvaalta.cl
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-[#7d746b]">
                  Origen y Operación
                </span>
                <span className="text-[#b0a89e]">
                  Tingo María (Perú) / Santiago (Chile)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#332c25] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d746b] gap-3">
          <p>
            © {new Date().getFullYear()} Selva Alta Roasters SpA. Marca
            &quot;Tasty&quot;. Todos los derechos reservados.
          </p>
          <p className="font-mono">Cosecha inclusiva · Despacho carbono neutral</p>
        </div>
      </div>
    </footer>
  );
}

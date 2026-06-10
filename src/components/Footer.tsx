import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* ── Brand ──────────────────────────────────── */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold text-white hover:text-amber-400 transition"
            >
              Selva Alta Roasters
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Café de especialidad de la Amazonía Peruana
            </p>
            <p className="mt-1 text-2xl" aria-hidden="true">
              ☕🌿
            </p>
          </div>

          {/* ── Navigation ─────────────────────────────── */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Navegación
            </h3>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/club"
                    className="text-sm text-gray-400 hover:text-amber-400 transition"
                  >
                    El Club
                  </Link>
                </li>
                <li>
                  <Link
                    href="/b2b"
                    className="text-sm text-gray-400 hover:text-amber-400 transition"
                  >
                    B2B &amp; Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/club/suscripciones"
                    className="text-sm text-gray-400 hover:text-amber-400 transition"
                  >
                    Suscripciones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ── Contact ────────────────────────────────── */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:comercial@selvaalta.cl"
                  className="hover:text-amber-400 transition"
                >
                  comercial@selvaalta.cl
                </a>
              </li>
              <li>Tingo María, Huánuco — Perú</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Selva Alta Roasters SpA. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

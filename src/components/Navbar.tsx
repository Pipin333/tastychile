"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Primary navigation bar with top Región Metropolitana shipping banner.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuId = "main-mobile-menu";

  const navLinks = [
    { href: "/", label: "Nuestro Café" },
    { href: "/club", label: "Comprar 250g y Volumen" },
    { href: "/b2b", label: "Cafeterías y Oficinas" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#DFD3C3] text-[#143326]">
      {/* Top Banner: Despacho exclusivo en la Región Metropolitana */}
      <div className="bg-[#143326] text-[#FAF6F0] border-b border-[#1E4D38] px-4 py-1.5 text-center">
        <p className="font-mono text-[11px] sm:text-xs tracking-wide">
          Despachos disponibles exclusivamente en la{" "}
          <strong className="text-[#F5DEB3] font-semibold">
            Región Metropolitana de Santiago
          </strong>{" "}
          · Envío gratis desde Pack 1 kg ($39.990)
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              className="flex items-baseline gap-2.5 rounded px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
            >
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#143326] whitespace-nowrap">
                Selva Alta Roasters
              </span>
              <span className="hidden xl:inline-flex font-mono text-[11px] uppercase tracking-widest text-[#1E4D38] whitespace-nowrap">
                Tingo María · Perú
              </span>
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] ${
                    isActive
                      ? "text-[#143326] bg-[#EFE4D2] border border-[#D8C3A5] font-semibold"
                      : "text-[#4A3F35] hover:text-[#143326] hover:bg-[#F3ECE1]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="mailto:comercial@selvaalta.cl?subject=Consulta%20Selva%20Alta%20Roasters"
              className="hidden sm:inline-flex items-center justify-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-md transition-colors duration-150 whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143326]"
            >
              Hablemos
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#4A3F35] hover:text-[#143326] hover:bg-[#F3ECE1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B]"
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              aria-label={
                isOpen ? "Cerrar menú principal" : "Abrir menú principal"
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id={mobileMenuId}
          className="md:hidden bg-[#FAF6F0] border-b border-[#DFD3C3] px-4 pt-2 pb-5 space-y-1.5"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#143326] bg-[#EFE4D2] border border-[#D8C3A5] font-semibold"
                    : "text-[#4A3F35] hover:text-[#143326] hover:bg-[#F3ECE1]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="mailto:comercial@selvaalta.cl?subject=Consulta%20Selva%20Alta%20Roasters"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold py-2.5 px-4 rounded-md text-sm"
            >
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

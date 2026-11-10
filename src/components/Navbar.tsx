"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Primary navigation bar following BRAND.md tokens and anti-wrapping rules.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuId = "main-mobile-menu";

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/b2b", label: "Barras y Oficinas" },
    { href: "/club", label: "Pedidos y Molienda" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#110f0d]/85 backdrop-blur-md border-b border-[#332c25] text-[#f5f3f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              className="flex items-baseline gap-2.5 rounded px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
            >
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#f5f3f0] whitespace-nowrap">
                Selva Alta Roasters
              </span>
              <span className="hidden xl:inline-flex font-mono text-[11px] uppercase tracking-widest text-[#c25e1a] whitespace-nowrap">
                1.820 msnm · Huánuco
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
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] ${
                    isActive
                      ? "text-[#f5f3f0] bg-[#241f1b] border border-[#332c25]"
                      : "text-[#b0a89e] hover:text-[#f5f3f0] hover:bg-[#181512]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="mailto:comercial@selvaalta.cl?subject=Solicitud%20de%20detalles%20Marsellesa%2087%20SCA"
              className="hidden sm:inline-flex items-center justify-center bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-md transition-colors duration-150 whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f3f0]"
            >
              Escribir al correo
            </a>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#b0a89e] hover:text-[#f5f3f0] hover:bg-[#181512] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a]"
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
          className="md:hidden bg-[#110f0d] border-b border-[#332c25] px-4 pt-2 pb-5 space-y-1.5"
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
                    ? "text-[#f5f3f0] bg-[#241f1b] border border-[#332c25]"
                    : "text-[#b0a89e] hover:text-[#f5f3f0] hover:bg-[#181512]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="mailto:comercial@selvaalta.cl?subject=Solicitud%20de%20detalles%20Marsellesa%2087%20SCA"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-[#c25e1a] hover:bg-[#a84e12] text-white font-semibold py-2.5 px-4 rounded-md text-sm"
            >
              Escribir al correo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

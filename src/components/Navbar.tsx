"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuId = "main-mobile-menu";

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/club", label: "El Club (Para Casa)" },
    { href: "/b2b", label: "Para Empresas (B2B)" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-800/80 border border-amber-600/40 text-xl shadow-inner group-hover:scale-105 transition-transform" aria-hidden="true">
                ☕
              </span>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  Selva Alta Roasters
                </span>
                <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase">
                  Amazonía Peruana · SCA 84-87+
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isActive
                      ? "text-amber-300 bg-amber-950/60 border border-amber-800/40"
                      : "text-stone-300 hover:text-white hover:bg-stone-800/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/club#catalogo"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-amber-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Pedir Café</span>
              <span aria-hidden="true">→</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              aria-label={isOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id={mobileMenuId} className="md:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition ${
                  isActive
                    ? "text-amber-300 bg-amber-950/60 font-bold"
                    : "text-stone-300 hover:text-white hover:bg-stone-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/club#catalogo"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow"
            >
              Pedir Café Fresco
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

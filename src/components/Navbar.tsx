"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "main-mobile-menu";

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm font-bold text-amber-900 hover:text-amber-700 hover:bg-amber-50 transition"
              aria-label="Volver al inicio"
            >
              <span aria-hidden="true">←</span>
              <span className="sr-only sm:not-sr-only sm:ml-1">Volver</span>
            </Link>
            <Link
              href="/b2b"
              className="min-w-0 truncate text-base sm:text-lg md:text-2xl font-extrabold text-amber-900"
            >
              Selva Alta Roasters
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="text-gray-700 hover:text-amber-900 font-medium transition">Inicio</Link>
            <Link href="#quienes-somos" className="text-gray-700 hover:text-amber-900 font-medium transition">Quiénes Somos</Link>
            <Link href="#servicios" className="text-gray-700 hover:text-amber-900 font-medium transition">Servicios</Link>
            <Link href="#contacto" className="text-gray-700 hover:text-amber-900 font-medium transition">Contacto</Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="h-11 w-11 inline-flex items-center justify-center text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Menú móvil */}
      {isOpen && (
        <div id={mobileMenuId} className="md:hidden bg-white shadow-lg absolute w-full left-0 border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="#inicio" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Inicio</Link>
            <Link href="#quienes-somos" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Quiénes Somos</Link>
            <Link href="#servicios" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Servicios</Link>
            <Link href="#contacto" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

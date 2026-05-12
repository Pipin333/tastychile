"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-amber-900">
              Selva Alta Roasters
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="text-gray-700 hover:text-amber-900 font-medium transition">Inicio</Link>
            <Link href="#quienes-somos" className="text-gray-700 hover:text-amber-900 font-medium transition">QuiÃ©nes Somos</Link>
            <Link href="#servicios" className="text-gray-700 hover:text-amber-900 font-medium transition">Servicios</Link>
            <Link href="#contacto" className="text-gray-700 hover:text-amber-900 font-medium transition">Contacto</Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-900 focus:outline-none"
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

      {/* MenÃº mÃ³vil */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="#inicio" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Inicio</Link>
            <Link href="#quienes-somos" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">QuiÃ©nes Somos</Link>
            <Link href="#servicios" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Servicios</Link>
            <Link href="#contacto" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-md font-medium">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

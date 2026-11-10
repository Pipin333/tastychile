import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

/**
 * Custom 404 page in the Selva Nubosa & Pergamino visual system.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1B12] flex flex-col font-sans">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-lg w-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD3C3] rounded-2xl p-8 sm:p-10 text-center shadow-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-2">
            Error 404 · Ruta en la Neblina
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143326] mb-3">
            No encontramos esta página
          </h1>
          <p className="text-sm sm:text-base text-[#4A3F35] leading-relaxed mb-8">
            La dirección que buscas no existe o cambió de ubicación, pero
            nuestro lote Marsellesa Orgánico de Tingo María sigue recién
            tostado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#9E2A2B] hover:bg-[#7D2021] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/club"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F3ECE1] hover:bg-[#EFE4D2] text-[#143326] border border-[#DFD3C3] font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Ver bolsas de 250g
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export const metadata: Metadata = {
  title: "Política de Privacidad | Selva Alta Roasters",
  description:
    "Política de privacidad, protección de datos personales y transparencia en la gestión de pedidos de Selva Alta Roasters.",
};

/**
 * Privacy Policy page in the warm Selva Nubosa & Pergamino palette.
 */
export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2A1B12] relative">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main
        id="main-content"
        className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20"
      >
        <nav
          className="flex items-center gap-2 font-mono text-xs text-[#6E5D4F] mb-8"
          aria-label="Ruta de navegación"
        >
          <Link
            href="/"
            className="hover:text-[#143326] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] rounded"
          >
            Inicio
          </Link>
          <span aria-hidden="true" className="text-[#DFD3C3]">
            /
          </span>
          <span className="text-[#9E2A2B] font-medium" aria-current="page">
            Política de Privacidad
          </span>
        </nav>

        <header className="mb-12 border-b border-[#DFD3C3] pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#143326] tracking-tight mb-4">
            Política de Privacidad
          </h1>
          <p className="font-mono text-xs text-[#6E5D4F]">
            Última actualización: 10 de noviembre de 2026 // Versión 1.1
          </p>
        </header>

        <article className="space-y-8 text-[#4A3F35] text-sm sm:text-base leading-relaxed">
          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              1. Respeto por tus Datos y Cero Rastreo Publicitario
            </h2>
            <p className="mb-3">
              En{" "}
              <strong className="text-[#2A1B12]">
                Selva Alta Roasters SpA
              </strong>{" "}
              cuidamos la confianza de quienes toman nuestro café. Este sitio
              web no vende ni arrienda bases de datos, no instala rastreadores
              publicitarios entre sitios (ad-tracking) ni comparte tu navegación
              con corredores de datos.
            </p>
            <p>
              Puedes recorrer nuestra historia, conocer el origen de Tingo María
              y revisar nuestros formatos sin obligación de crear cuentas ni
              entregar datos bancarios en línea.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#9E2A2B] mb-3">
              2. Qué Información Solicitamos al Hacer un Pedido
            </h2>
            <p className="mb-3">
              Solo registramos los datos que tú nos entregas voluntariamente al
              encargar bolsas en{" "}
              <Link
                href="/club"
                className="text-[#9E2A2B] font-medium underline underline-offset-4 hover:text-[#143326]"
              >
                /club
              </Link>{" "}
              o al pedir muestras y precios mayoristas en{" "}
              <Link
                href="/b2b"
                className="text-[#9E2A2B] font-medium underline underline-offset-4 hover:text-[#143326]"
              >
                /b2b
              </Link>
              :
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-xs sm:text-sm text-[#4A3F35]">
              <li>
                <strong className="text-[#2A1B12]">
                  En pedidos de café (/club):
                </strong>{" "}
                Tu nombre, correo electrónico, teléfono de contacto para la
                entrega, dirección, comuna, cantidad de bolsas (250g, 1 kg o 3
                kg) y el tipo de molienda que necesitas para tu cafetera.
              </li>
              <li>
                <strong className="text-[#2A1B12]">
                  En consultas de cafeterías y oficinas (/b2b):
                </strong>{" "}
                Nombre de tu cafetería, restaurante o empresa, persona de
                contacto, correo electrónico, teléfono y consumo mensual
                aproximado.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              3. Para Qué Usamos tus Datos
            </h2>
            <p className="mb-3">
              Utilizamos tu información exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#4A3F35] mb-3">
              <li>
                Preparar y moler tu lote{" "}
                <strong className="text-[#2A1B12]">
                  Marsellesa Orgánico (87.0 SCA)
                </strong>{" "}
                en el punto exacto para tu método de preparación.
              </li>
              <li>
                Enviarte el comprobante inmediato de solicitud y contactarte
                para coordinar el pago y el despacho a domicilio o a tu local.
              </li>
            </ul>
            <p>
              Jamás enviamos spam ni compartimos tu teléfono o correo con
              empresas externas ajenas al reparto de tu pedido.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              4. Tus Derechos (Ley N° 19.628 y Ley N° 21.719)
            </h2>
            <p className="mb-3">
              De acuerdo con la legislación chilena sobre Protección de la Vida
              Privada, puedes solicitar en cualquier momento conocer, actualizar,
              rectificar o eliminar tus datos de contacto de nuestros registros.
            </p>
            <p>
              Para hacerlo, basta con escribirnos a{" "}
              <a
                href="mailto:comercial@selvaalta.cl?subject=Solicitud%20Privacidad%20de%20Datos"
                className="font-mono text-xs text-[#9E2A2B] font-semibold underline underline-offset-4 hover:text-[#143326]"
              >
                comercial@selvaalta.cl
              </a>{" "}
              y atenderemos tu solicitud de inmediato.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

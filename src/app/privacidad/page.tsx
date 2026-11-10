import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export const metadata: Metadata = {
  title: "Política de Privacidad | Selva Alta Roasters",
  description:
    "Política de privacidad, protección de datos comerciales y transparencia en el tratamiento de información de clientes y empresas en Selva Alta Roasters.",
};

/**
 * Privacy Policy page modeled after the editorial-technical structure of feliperiquel.me.
 */
export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#110f0d] text-[#f5f3f0] relative">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main
        id="main-content"
        className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 font-mono text-xs text-[#b0a89e] mb-8"
          aria-label="Ruta de navegación"
        >
          <Link
            href="/"
            className="hover:text-[#f5f3f0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c25e1a] rounded"
          >
            Inicio
          </Link>
          <span aria-hidden="true" className="text-[#7d746b]">
            /
          </span>
          <span className="text-[#c25e1a] font-medium" aria-current="page">
            Política de Privacidad
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-12 border-b border-[#332c25] pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#f5f3f0] tracking-tight mb-4">
            Política de Privacidad
          </h1>
          <p className="font-mono text-xs text-[#b0a89e]">
            Última actualización: 10 de noviembre de 2026 // Versión 1.0
          </p>
        </header>

        {/* Content Sections */}
        <article className="space-y-8 text-[#b0a89e] text-sm sm:text-base leading-relaxed">
          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              1. Declaración de Principios y Cero Rastreo Publicitario
            </h2>
            <p className="mb-3">
              En{" "}
              <strong className="text-[#f5f3f0]">
                Selva Alta Roasters SpA
              </strong>{" "}
              la privacidad y la reserva comercial constituyen un estándar de
              diseño técnico. Este sitio web no comercializa bases de datos, no
              instala píxeles de seguimiento publicitario entre sitios
              (ad-tracking), ni transfiere el comportamiento de navegación de
              sus visitantes a corredores de datos (data brokers).
            </p>
            <p>
              La exploración del catálogo y de nuestras fichas técnicas de
              origen no exige la creación de cuentas con contraseña ni el
              almacenamiento de tarjetas bancarias en nuestros servidores.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#f5f3f0] mb-3">
              2. Datos Recopilados en Pedidos y Solicitudes B2B
            </h2>
            <p className="mb-3">
              Recopilamos únicamente la información estrictamente necesaria que
              tú decides proporcionar al completar una solicitud de pedido en{" "}
              <Link
                href="/club"
                className="text-[#c25e1a] underline underline-offset-4 hover:text-[#f5f3f0]"
              >
                /club
              </Link>{" "}
              o un requerimiento de abastecimiento corporativo en{" "}
              <Link
                href="/b2b"
                className="text-[#c25e1a] underline underline-offset-4 hover:text-[#f5f3f0]"
              >
                /b2b
              </Link>
              :
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-xs sm:text-sm text-[#b0a89e] font-mono">
              <li>
                <strong className="text-[#f5f3f0]">
                  Pedidos en Formato 250g y Volumen (/club):
                </strong>{" "}
                Nombre completo, dirección de correo electrónico, teléfono de
                contacto para el courier, dirección de despacho, comuna, formato
                de volumen seleccionado (250g, 1 kg o 3 kg), tipo de molienda
                calibrada y frecuencia de reposición deseada.
              </li>
              <li>
                <strong className="text-[#f5f3f0]">
                  Consultas Mayoristas y Muestras (/b2b):
                </strong>{" "}
                Razón social o nombre comercial de la cafetería u oficina,
                nombre de la persona de contacto, correo corporativo, teléfono,
                consumo mensual estimado en kilos y notas operativas de
                equipamiento.
              </li>
              <li>
                <strong className="text-[#f5f3f0]">
                  Contacto Directo por Correo:
                </strong>{" "}
                Cuando nos escribes directamente a{" "}
                <code className="font-mono text-xs text-[#c25e1a]">
                  comercial@selvaalta.cl
                </code>
                , conservamos el hilo de correo exclusivamente para dar
                seguimiento comercial y técnico a tu requerimiento.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              3. Finalidad del Tratamiento y Flujo Operativo
            </h2>
            <p className="mb-3">
              Los datos suministrados en nuestros formularios se utilizan única
              y exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#b0a89e] font-mono mb-3">
              <li>
                Calibrar la molienda del lote{" "}
                <strong className="text-[#f5f3f0]">Marsellesa 87.0 SCA</strong>{" "}
                según la cafetera o máquina de espresso del cliente.
              </li>
              <li>
                Emitir el comprobante automático de recepción de solicitud y
                permitir que un representante comercial coordine el pago y la
                facturación tributaria correspondiente.
              </li>
              <li>
                Coordinar la ruta de entrega carbono neutral en Santiago o el
                despacho a regiones.
              </li>
            </ul>
            <p>
              Bajo ninguna circunstancia tu correo o teléfono será cedido a
              terceros ajenos a la operación logística de entrega ni incorporado
              a listas masivas de publicidad no solicitada.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#f5f3f0] mb-3">
              4. Infraestructura y Seguridad de Almacenamiento
            </h2>
            <p className="mb-3">
              Los registros de pedidos y prospectos B2B se almacenan en bases de
              datos relacionales cifradas en tránsito mediante TLS (PostgreSQL
              serverless) y las notificaciones transaccionales se despachan a
              través de infraestructura de correo autenticada (SPF/DKIM).
            </p>
            <p>
              El acceso a las órdenes recibidas está restringido exclusivamente
              al equipo de operaciones y tueste de Selva Alta Roasters SpA.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              5. Derechos ARCO y Normativa Aplicable
            </h2>
            <p className="mb-3">
              De conformidad con la Ley N° 19.628 sobre Protección de la Vida
              Privada y las disposiciones actualizadas por la Ley N° 21.719 de
              la República de Chile, todo titular de datos tiene derecho a
              solicitar el acceso, rectificación, cancelación u oposición (ARCO)
              respecto de sus datos personales o comerciales registrados en
              nuestro sistema.
            </p>
            <p>
              Para ejercer cualquiera de estos derechos o solicitar la
              eliminación de tus registros de contacto, escribe directamente a{" "}
              <a
                href="mailto:comercial@selvaalta.cl?subject=Solicitud%20Privacidad%20de%20Datos"
                className="font-mono text-xs text-[#c25e1a] underline underline-offset-4 hover:text-[#f5f3f0]"
              >
                comercial@selvaalta.cl
              </a>{" "}
              indicando tu requerimiento en el asunto.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export const metadata: Metadata = {
  title: "Términos de Servicio | Selva Alta Roasters",
  description:
    "Condiciones comerciales, despacho de café de especialidad, solicitudes B2B y marco de responsabilidad de Selva Alta Roasters SpA.",
};

/**
 * Terms of Service page modeled after the editorial-technical structure of feliperiquel.me.
 */
export default function TerminosPage() {
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
            Términos de Servicio
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-12 border-b border-[#332c25] pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#f5f3f0] tracking-tight mb-4">
            Términos de Servicio
          </h1>
          <p className="font-mono text-xs text-[#b0a89e]">
            Última actualización: 10 de noviembre de 2026 // Versión 1.0
          </p>
        </header>

        {/* Content Sections */}
        <article className="space-y-8 text-[#b0a89e] text-sm sm:text-base leading-relaxed">
          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              1. Aceptación y Naturaleza del Servicio
            </h2>
            <p className="mb-3">
              El acceso, navegación y solicitud de pedidos o muestras en el
              portal oficial de{" "}
              <strong className="text-[#f5f3f0]">
                Selva Alta Roasters SpA
              </strong>{" "}
              (marca comercial registrada{" "}
              <strong className="text-[#f5f3f0]">&quot;Tasty&quot;</strong>) se
              rigen por los presentes Términos de Servicio. Al enviar una
              solicitud de compra o cotización mayorista, manifiestas tu
              conformidad con estas cláusulas.
            </p>
            <p>
              Este sitio opera como vitrina técnica de trazabilidad de origen y
              canal directo de coordinación comercial para la distribución de
              café de especialidad tostado y molido a pedido en Chile.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#f5f3f0] mb-3">
              2. Trazabilidad del Lote y Especificaciones Técnicas
            </h2>
            <p className="mb-3">
              Nuestro catálogo se concentra en lotes verificados de origen único
              provenientes de Tingo María, Huánuco, Perú (actualmente lote{" "}
              <strong className="text-[#f5f3f0]">
                Marsellesa Orgánico, 87.0 puntos SCA, 1.820 msnm
              </strong>
              ). Al tratarse de un producto agrícola natural tostado en lotes
              controlados, las notas sensoriales (chocolate amargo, nuez
              tostada, caramelo y cítrico suave) describen el perfil de catación
              oficial bajo protocolo SCA y pueden presentar matices propios de
              la cosecha y del agua utilizada en la preparación.
            </p>
            <p>
              Cada bolsa se entrega en formato de{" "}
              <code className="font-mono text-xs text-[#c25e1a]">250g</code> con
              válvula desgasificadora unidireccional y molienda calibrada según
              el método de extracción indicado por el cliente al momento de la
              solicitud.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              3. Modalidad de Pedidos, Precios y Coordinación Directa
            </h2>
            <p className="mb-3">
              Los pedidos realizados en{" "}
              <Link
                href="/club"
                className="text-[#c25e1a] underline underline-offset-4 hover:text-[#f5f3f0]"
              >
                /club
              </Link>{" "}
              y las solicitudes corporativas en{" "}
              <Link
                href="/b2b"
                className="text-[#c25e1a] underline underline-offset-4 hover:text-[#f5f3f0]"
              >
                /b2b
              </Link>{" "}
              operan mediante validación directa con nuestro equipo comercial,
              sin pasarelas de cobro automático desatendidas:
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-xs sm:text-sm text-[#b0a89e] font-mono">
              <li>
                <strong className="text-[#f5f3f0]">
                  Escala de Precios 250g y Volumen:
                </strong>{" "}
                Los valores publicados en pesos chilenos (1 bolsa de 250g por
                $12.900, pack de 4 bolsas / 1 kg por $44.900 y pack de 12 bolsas
                / 3 kg por $119.900) incluyen IVA. Los tramos de 1 kg y 3 kg
                incorporan despacho sin costo adicional en comunas urbanas de
                Santiago.
              </li>
              <li>
                <strong className="text-[#f5f3f0]">
                  Confirmación y Pago:
                </strong>{" "}
                Al registrar un pedido o solicitud, el sistema emite un
                comprobante de recepción inmediata por correo electrónico. Un
                representante de Selva Alta se contactará en breve para
                confirmar fecha de tueste, datos de transferencia bancaria o
                facturación electrónica (B2B) y ventana de entrega.
              </li>
              <li>
                <strong className="text-[#f5f3f0]">
                  Muestras y Convenios B2B:
                </strong>{" "}
                Las muestras de calibración y propuestas mayoristas para
                cafeterías, restaurantes y oficinas están sujetas a evaluación
                de volumen mensual proyectado y disponibilidad de stock de café
                verde en bodega.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#f5f3f0] mb-3">
              4. Despacho, Recepción y Garantía de Calidad
            </h2>
            <p className="mb-3">
              Los despachos en el radio urbano de Santiago se realizan mediante
              logística carbono neutral. Para envíos a otras regiones de Chile,
              la tarifa y el operador logístico se acuerdan previamente con el
              comprador antes de confirmar el pago.
            </p>
            <p>
              De conformidad con la Ley N° 19.496 sobre Protección de los
              Derechos de los Consumidores, al tratarse de un alimento tostado y
              molido a medida según la granulometría solicitada por el cliente,
              no aplica derecho a retracto unilateral una vez abierto el envase,
              salvo que el producto presente defectos de sellado de origen,
              deterioro en el transporte o discrepancia respecto de la molienda
              solicitada, en cuyo caso Selva Alta repondrá el lote sin costo.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#c25e1a] mb-3">
              5. Propiedad Intelectual y Uso Aceptable del Sitio
            </h2>
            <p className="mb-3">
              Las denominaciones comerciales{" "}
              <strong className="text-[#f5f3f0]">Selva Alta Roasters</strong> y{" "}
              <strong className="text-[#f5f3f0]">Tasty</strong>, las fichas
              técnicas de origen, el diseño gráfico topográfico y el código del
              portal son titularidad de Selva Alta Roasters SpA.
            </p>
            <p>
              Queda prohibido el envío automatizado de formularios fraudulentos
              (spam), la alteración de los endpoints de solicitud de pedidos o
              cualquier intento de interrumpir la disponibilidad del servicio.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#181512]/85 backdrop-blur-md border border-[#332c25] rounded-xl">
            <h2 className="text-xl font-bold text-[#f5f3f0] mb-3">
              6. Ley Aplicable y Jurisdicción
            </h2>
            <p className="mb-3">
              Cualquier controversia o reclamo derivado de la adquisición de
              productos, convenios de abastecimiento B2B o interpretación de
              estos términos se regirá por la legislación vigente de la
              República de Chile.
            </p>
            <p>
              Para todos los efectos legales, las partes fijan su domicilio en
              la ciudad de Santiago de Chile y se someten a la competencia de
              sus tribunales ordinarios de justicia.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

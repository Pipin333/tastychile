import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BellaDurmienteBackground from "@/components/BellaDurmienteBackground";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Condiciones comerciales, despacho de café de especialidad, solicitudes para cafeterías y marco de responsabilidad de Selva Alta Roasters SpA.",
  alternates: {
    canonical: "/terminos",
  },
};

/**
 * Terms of Service page in the warm Selva Nubosa & Pergamino palette.
 */
export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2A1B12] relative">
      <BellaDurmienteBackground variant="home" />
      <Navbar />

      <main
        id="main-content"
        className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 sm:pb-20"
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
            Términos de Servicio
          </span>
        </nav>

        <header className="mb-12 border-b border-[#DFD3C3] pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#143326] tracking-tight mb-4">
            Términos de Servicio
          </h1>
          <p className="font-mono text-xs text-[#6E5D4F]">
            Última actualización: 10 de noviembre de 2026 // Versión 1.1
          </p>
        </header>

        <article className="space-y-8 text-[#4A3F35] text-sm sm:text-base leading-relaxed">
          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              1. Aceptación y Naturaleza del Servicio
            </h2>
            <p className="mb-3">
              El acceso, navegación y solicitud de pedidos o muestras en el
              sitio oficial de{" "}
              <strong className="text-[#2A1B12]">
                Selva Alta Roasters SpA
              </strong>{" "}
              (RUT 78.431.121-K, marca comercial{" "}
              <strong className="text-[#2A1B12]">&quot;Tasty&quot;</strong>) se
              rigen por los presentes Términos de Servicio. Al enviar una
              solicitud de compra o cotización para cafeterías y oficinas,
              manifiestas tu conformidad con estas cláusulas.
            </p>
            <p>
              Este sitio opera como tienda directa y canal de coordinación
              comercial para la distribución de nuestro café de especialidad de
              Tingo María (Huánuco, Perú), tostado y molido a pedido en Chile.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              2. Origen del Café y Presentación en Grano o Molido
            </h2>
            <p className="mb-3">
              Trabajamos con cosechas seleccionadas de Tingo María, Huánuco,
              Perú (lote activo{" "}
              <strong className="text-[#2A1B12]">
                Marsellesa de Altura, 87.0 puntos SCA, cultivado a 1.820 msnm
              </strong>
              ). Al tratarse de un fruto agrícola natural tostado de forma
              artesanal, las notas de cata (chocolate bitter, nuez tostada,
              caramelo de caña y cítrico suave) reflejan el perfil sensorial del
              lote y pueden presentar matices según la receta y el agua
              empleada.
            </p>
            <p>
              Cada bolsa se entrega en formato de{" "}
              <code className="font-mono text-xs text-[#9E2A2B] font-semibold">
                250g
              </code>{" "}
              con válvula desgasificadora para conservar su frescura, ya sea en
              grano entero o molido según la cafetera que utilices.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#9E2A2B] mb-3">
              3. Pedidos, Precios y Atención Personalizada
            </h2>
            <p className="mb-3">
              Los pedidos realizados en{" "}
              <Link
                href="/club"
                className="text-[#9E2A2B] font-medium underline underline-offset-4 hover:text-[#143326]"
              >
                /club
              </Link>{" "}
              y las consultas para empresas en{" "}
              <Link
                href="/b2b"
                className="text-[#9E2A2B] font-medium underline underline-offset-4 hover:text-[#143326]"
              >
                /b2b
              </Link>{" "}
              son atendidos directamente por nuestro equipo familiar y
              comercial:
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-xs sm:text-sm text-[#4A3F35]">
              <li>
                <strong className="text-[#2A1B12]">
                  Precios de Bolsas de 250g y Packs:
                </strong>{" "}
                Los valores promocionales publicados en pesos chilenos (1 bolsa
                de 250g por $11.500, pack de 4 bolsas / 1 kg por $39.990 y caja
                de 12 bolsas / 3 kg por $104.990) incluyen IVA. Los packs de 1
                kg y 3 kg incluyen envío gratis en comunas urbanas de Santiago.
              </li>
              <li>
                <strong className="text-[#2A1B12]">
                  Confirmación y Pago Seguro:
                </strong>{" "}
                Al enviar tu pedido recibes un comprobante automático en tu
                correo. Un representante de Selva Alta se contactará contigo en
                breve para confirmar tu molienda, coordinar el pago por
                transferencia o factura electrónica y agendar la entrega.
              </li>
              <li>
                <strong className="text-[#2A1B12]">
                  Muestras y Convenios para Cafeterías:
                </strong>{" "}
                El envío de muestras para barras de espresso y oficinas se
                coordina directamente según el volumen mensual estimado.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              4. Despacho y Garantía de Frescura
            </h2>
            <p className="mb-3">
              Por el momento realizamos despachos exclusivamente dentro de la{" "}
              <strong className="text-[#2A1B12]">
                Región Metropolitana de Santiago
              </strong>
              , mediante reparto carbono neutral.
            </p>
            <p>
              Conforme a la Ley N° 19.496 sobre Protección de los Derechos de
              los Consumidores, al tratarse de café natural tostado y molido a
              pedido según tu cafetera, no aplica retracto una vez abierto el
              envase, salvo que la bolsa presente cualquier daño de transporte,
              defecto de sellado o error en el tipo de molienda solicitada, en
              cuyo caso reponemos tu café sin costo.
            </p>
          </section>

          <section className="p-6 sm:p-8 bg-[#FFFDF9]/90 backdrop-blur-md border border-[#DFD3C3] rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#143326] mb-3">
              5. Propiedad Intelectual y Ley Aplicable
            </h2>
            <p className="mb-3">
              Las marcas{" "}
              <strong className="text-[#2A1B12]">Selva Alta Roasters</strong> y{" "}
              <strong className="text-[#2A1B12]">Tasty</strong>, así como las
              fotografías, ilustraciones de origen y textos de este sitio son
              propiedad de Selva Alta Roasters SpA.
            </p>
            <p>
              Cualquier controversia derivada del uso de este portal o de la
              compra de productos se rige por las leyes de la República de
              Chile, ante los tribunales ordinarios de Santiago.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

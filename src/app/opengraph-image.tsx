import { ImageResponse } from "next/og";

export const alt =
  "Selva Alta Roasters · Café de Especialidad de Tingo María, Perú (87.0 SCA)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic OpenGraph preview card (1200x630) in the Selva Nubosa & Pergamino palette.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF6F0",
          backgroundImage:
            "linear-gradient(180deg, #FAF6F0 0%, #F3ECE1 62%, #DCE8E0 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          color: "#143326",
          position: "relative",
        }}
      >
        {/* Top Origin Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#EFE4D2",
              border: "2px solid #D8C3A5",
              borderRadius: "999px",
              padding: "10px 22px",
              fontSize: "20px",
              fontWeight: 700,
              color: "#143326",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                backgroundColor: "#9E2A2B",
              }}
            />
            <span>SELVA ALTA ROASTERS · TINGO MARÍA, PERÚ (1.820 MSNM)</span>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#9E2A2B",
              color: "#FFFFFF",
              borderRadius: "12px",
              padding: "10px 20px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            87.0 PUNTOS SCA
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "960px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#143326",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Café de origen amazónico, tostado fresco y molido para tu cafetera.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#4A3F35",
              fontWeight: 500,
            }}
          >
            Lote familiar Marsellesa de Altura cultivado frente a La Bella
            Durmiente. Bolsas de 250g, packs por kilo y muestras para
            cafeterías y oficinas en Santiago.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid #DFD3C3",
            paddingTop: "26px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#2A1B12",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>Chocolate bitter · Caramelo · Nuez tostada</span>
            <span style={{ color: "#9E2A2B" }}>·</span>
            <span style={{ color: "#1E4D38" }}>
              En grano o molido a pedido
            </span>
          </div>
          <div style={{ color: "#9E2A2B", fontWeight: 800 }}>
            comercial@selvaalta.cl
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

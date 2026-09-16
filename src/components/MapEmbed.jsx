import { TOKENS } from "../theme";

const MAPS_SRC = "https://www.google.com/maps?q=Campamento+Tortuguero+El+Habillal,+Lazaro+Cardenas,+Michoacan&output=embed";

/* ---------- Mapa embebido de Google Maps con la ubicación del campamento ---------- */
export function MapEmbed({ height = 340, style }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${TOKENS.arenaOscura}`,
        boxShadow: "0 14px 32px -22px rgba(16,38,43,0.35)",
        ...style,
      }}
    >
      <iframe
        title="Ubicación — Campamento Tortuguero El Habillal"
        src={MAPS_SRC}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

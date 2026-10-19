import { TOKENS, LOGO_URL } from "../theme";
import { WaveDivider } from "./WaveDivider";

export function Footer({ go, fromColor = TOKENS.arena }) {
  const links = [
    { label: "Inicio", route: "home" },
    { label: "Nosotros", route: "about" },
    { label: "Eventos y Memoria", route: "eventos" },
    { label: "Visítanos", route: "visita" },
    { label: "Adopta un nido", route: "adopta" },
    { label: "Dona al programa", route: "dona" },
    { label: "Convocatorias", route: "convocatorias" },
    { label: "Contacto", route: "contacto" },
    { label: "Aviso de privacidad", route: "privacidad" },
  ];

  return (
    // La ola es transparente arriba y se monta sobre el final de la página:
    // así se ve el color real de la página y no queda ninguna línea de corte
    <footer style={{ background: `linear-gradient(transparent 47px, ${TOKENS.noche} 47px)`, color: TOKENS.espuma, position: "relative" }}>
      <WaveDivider
        fromColor="transparent"
        toColor={TOKENS.noche}
        style={{
          marginTop: "-47px",
          position: "relative",
          zIndex: 5,
          marginBottom: "-1px",
        }}
      />
      <div
        className="tt-footer-grid"
        style={{
          padding: "48px 32px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <img src={LOGO_URL} alt="" loading="lazy" style={{ height: "42px", width: "42px", objectFit: "contain" }} />
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: "16.5px", fontWeight: 600, color: "#fff" }}>
              Campamento Tortuguero El Habillal Asociación Civil
            </span>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: TOKENS.cielo, marginBottom: "12px" }}>Navegación</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            {links.map((l) => (
              <button
                key={l.route}
                onClick={() => go && go(l.route)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#B9CBC7",
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "13.5px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#B9CBC7")}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: TOKENS.cielo, marginBottom: "12px" }}>Ubicación</p>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: "#B9CBC7", lineHeight: 1.6, margin: 0 }}>
            La caroa, Tenencia, 60981 El Habillal, Mich.
          </p>
        </div>
      </div>
    </footer>
  );
}

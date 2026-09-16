import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { Eyebrow, H2 } from "../components/Typography";

const ITEMS = [
  { t: "Servicio social", d: "Turnos de registro y traslado de nidos durante la temporada.", estado: "Abierta" },
  { t: "Voluntariado de temporada", d: "Apoyo en liberaciones, recorridos de patrullaje en playa y atención a visitantes.", estado: "Abierta" },
  { t: "Prácticas profesionales", d: "Para carreras de biología, veterinaria y afines.", estado: "Abierta" },
];

export function PageConvocatorias() {
  return (
    <section
      className="tt-convocatorias-section"
      style={{
        position: "relative",
        padding: "48px 24px 64px",
        minHeight: "calc(100vh - 75px)",
        boxSizing: "border-box",
        background: `linear-gradient(rgba(234,245,248,0.93), rgba(234,245,248,0.96)), url("${IMAGES.hutchinsonLine}") center/cover fixed`,
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Header de Intro */}
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 36px" }}>
            <Eyebrow color={TOKENS.azulOlaOscuro}>Súmate</Eyebrow>
            <H2 color={TOKENS.noche} style={{ margin: "4px auto 12px" }}>Convocatorias abiertas</H2>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15px", color: TOKENS.conchaSuave, margin: 0, lineHeight: 1.6 }}>
              Forma parte activa de las actividades de conservación de la tortuga marina en la costa de Michoacán.
            </p>
          </div>
        </Reveal>

        {/* 1. Cartel de Convocatorias */}
        <Reveal delay={80}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <img
              src={IMAGES.practicasFlyer}
              alt="Cartel de Convocatorias y Prácticas Profesionales"
              style={{
                width: "100%",
                maxWidth: "680px",
                height: "auto",
                borderRadius: "16px",
                boxShadow: "0 20px 48px -18px rgba(16,38,43,0.3)",
                display: "block",
              }}
            />
          </div>
        </Reveal>

        {/* 2. Textos de Convocatorias Individuales */}
        <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: `1px solid ${TOKENS.arenaOscura}` }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "22px",
              color: TOKENS.noche,
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Oportunidades de participación
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {ITEMS.map((it, i) => (
              <Reveal key={it.t} delay={120 + i * 80}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "24px",
                    border: `1px solid ${TOKENS.arenaOscura}`,
                    boxShadow: "0 10px 24px -16px rgba(16,38,43,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.concha, margin: 0 }}>
                        {it.t}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          padding: "4px 11px",
                          borderRadius: "999px",
                          background: it.estado === "Abierta" ? TOKENS.verde : TOKENS.azulOla,
                          color: "#fff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {it.estado}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0, lineHeight: 1.55 }}>
                      {it.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

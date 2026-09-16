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
      style={{
        position: "relative",
        padding: "32px 32px",
        minHeight: "calc(100vh - 75px)",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        background: `linear-gradient(rgba(234,245,248,0.93), rgba(234,245,248,0.96)), url("${IMAGES.hutchinsonLine}") center/cover fixed`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
        <div className="tt-cols-2 tt-cols-2-top" style={{ gap: "40px", alignItems: "center" }}>
          {/* Columna Izquierda: Título y Lista de Convocatorias juntos */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal>
              <Eyebrow color={TOKENS.azulOlaOscuro}>Súmate</Eyebrow>
              <H2 color={TOKENS.noche} maxWidth="20ch">Convocatorias abiertas</H2>
              <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, margin: "10px 0 20px", lineHeight: 1.55 }}>
                Forma parte activa de las actividades de conservación de la tortuga marina en la costa de Michoacán.
              </p>
            </Reveal>

            <div>
              {ITEMS.map((it, i) => (
                <Reveal key={it.t} delay={i * 80}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "20px",
                      padding: "16px 0",
                      borderTop: i === 0 ? `1px solid ${TOKENS.arenaOscura}` : "none",
                      borderBottom: `1px solid ${TOKENS.arenaOscura}`,
                    }}
                  >
                    <div>
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.concha, margin: "0 0 4px 0" }}>{it.t}</h3>
                      <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: TOKENS.conchaSuave, maxWidth: "54ch", margin: 0, lineHeight: 1.5 }}>{it.d}</p>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "5px 13px",
                        borderRadius: "999px",
                        background: it.estado === "Abierta" ? TOKENS.verde : TOKENS.azulOla,
                        color: "#fff",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {it.estado}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Cartel ajustado al tamaño de la imagen sin espacios vacíos */}
          <Reveal delay={120} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <img
              src={IMAGES.practicasFlyer}
              alt="Cartel de Convocatorias y Prácticas Profesionales"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "calc(100vh - 140px)",
                display: "block",
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

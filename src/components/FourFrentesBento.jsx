import { TOKENS, SPACE, RADIUS, IMAGES } from "../theme";
import { Reveal } from "./Reveal";
import { SectionHead } from "./Typography";

const PILLARS = [
  { key: "patrullajes", t: "Patrullajes nocturnos", d: "Monitoreo constante de las playas para localizar cada nido antes que un depredador o el saqueo.", bg: TOKENS.azulOla, src: IMAGES.turtleInfrared },
  { key: "reubicacion", t: "Reubicación de huevos", d: "Traslado a corrales de incubación seguros, protegidos del clima y la actividad humana.", bg: TOKENS.coral, src: IMAGES.nestEggsHole },
  { key: "liberacion", t: "Liberación de crías", d: "Aclimatación breve antes de soltarlas al mar, asegurando su transición segura.", bg: TOKENS.verde, src: IMAGES.hatchlingsToWaves },
  { key: "educacion", t: "Educación ambiental", d: "Talleres y programas para que la comunidad se sume a la protección de las tortugas marinas.", bg: TOKENS.azulOlaOscuro, src: IMAGES.tortufest1edPlatica },
];

/* ---------- Cuatro Frentes — grid bento asimétrico compartido entre Home y Dona ---------- */
export function FourFrentesBento({ eyebrow = "Cómo trabajamos", title = "De la arena al mar: así actuamos", background, compact = false }) {
  return (
    <section className="tt-section-responsive" style={{ background, padding: `${SPACE.xxl}px ${SPACE.lg}px`, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: compact ? "1000px" : "1260px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow={eyebrow} eyebrowColor={TOKENS.verdeOscuro} title={title} titleMaxWidth="24ch" />
        <div className="tt-frentes-bento-grid" style={{ marginTop: compact ? SPACE.lg : SPACE.xl, gridTemplateRows: compact ? "150px 150px" : "200px 200px" }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.key} delay={i * 90} from="up" className={`tt-frente-bento-card tt-frente-${p.key}`}>
              <div
                style={{
                  position: "relative",
                  borderRadius: RADIUS.card + 2,
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 16px 32px -18px rgba(16,38,43,0.35)",
                }}
              >
                <img src={p.src} alt={p.t} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(16,38,43,0) 40%, rgba(16,38,43,0.6) 75%, rgba(16,38,43,0.92) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: compact ? "12px" : "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      background: p.bg,
                      color: "#fff",
                      fontSize: compact ? "9.5px" : "10.5px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: compact ? "3px 9px" : "4px 10px",
                      borderRadius: RADIUS.pill,
                      marginBottom: compact ? "6px" : "8px",
                    }}
                  >
                    {p.t}
                  </span>
                  {!compact && (
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, margin: 0 }}>{p.d}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

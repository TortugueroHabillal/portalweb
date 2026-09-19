import { TOKENS, IMAGES, SPACE, RADIUS } from "../theme";
import { Reveal } from "./Reveal";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHead } from "./Typography";

const PILLARS = [
  { t: "Patrullajes nocturnos", d: "Monitoreo constante de las playas durante la noche para identificar y proteger nidos de tortuga: localización, identificación de la especie y registro de datos para la investigación.", tone: "azul", src: IMAGES.turtleInfrared },
  { t: "Reubicación de huevos", d: "Traslado de nidos a corrales de incubación seguros dentro del campamento, protegiéndolos de depredadores, el clima y la actividad humana, y aumentando las tasas de eclosión.", tone: "verde", src: IMAGES.nestEggsHole },
  { t: "Liberación de crías", d: "Al emerger de los huevos, las crías se aclimatan brevemente antes de ser liberadas al mar, en un proceso cuidadoso que asegura su transición segura al océano.", tone: "coral", src: IMAGES.hatchlingsToWaves },
  { t: "Educación ambiental", d: "Talleres y programas educativos para concientizar a la comunidad sobre la importancia de las tortugas marinas y promover la participación ciudadana en su protección.", tone: "atardecer", src: IMAGES.tortufest1edPlatica },
];

const TAG_MAP = {
  azul: { bg: TOKENS.azulOla, fg: "#fff", textColor: TOKENS.azulOlaOscuro },
  verde: { bg: TOKENS.verde, fg: "#fff", textColor: TOKENS.verdeOscuro },
  coral: { bg: TOKENS.coral, fg: "#fff", textColor: TOKENS.coralOscuro },
  atardecer: { bg: TOKENS.atardecer, fg: "#fff", textColor: TOKENS.atardecerOscuro },
};

/* ---------- Cuatro Frentes de Conservación — reutilizado en Home (completo) y Dona (compacto) ---------- */
export function FourPillars({ compact = false, eyebrow = "Qué hacemos", title = "Cuatro frentes, un mismo objetivo", background = TOKENS.arena }) {
  return (
    <section className="tt-section-responsive" style={{ padding: compact ? `${SPACE.xl}px ${SPACE.md}px` : `${SPACE.xl + 8}px ${SPACE.lg}px`, background }}>
      <div style={{ maxWidth: compact ? "900px" : "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow={eyebrow} title={title} titleMaxWidth="20ch" />
        <div style={{ marginTop: compact ? SPACE.sm : SPACE.md }}>
          {PILLARS.map((c, i) => {
            const isEven = i % 2 === 0;
            const styleInfo = TAG_MAP[c.tone];
            return (
              <Reveal key={c.t} delay={i * 90} from={isEven ? "left" : "right"}>
                <div className={`tt-pillar-row ${!isEven ? "tt-pillar-align-right" : ""} ${compact ? "tt-pillar-compact" : ""}`}>
                  <div className="tt-pillar-photo">
                    <PhotoFrame shape="wide" tone={c.tone} src={c.src} style={{ aspectRatio: compact ? "4/3" : "16/10" }} />
                  </div>
                  <div className="tt-pillar-body">
                    <span
                      className="tag"
                      style={{
                        background: styleInfo.bg,
                        color: styleInfo.fg,
                        fontSize: compact ? "11px" : "12px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: compact ? "5px 12px" : "6px 14px",
                        borderRadius: compact ? RADIUS.pill : RADIUS.none,
                        display: "inline-block",
                      }}
                    >
                      {c.t}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: compact ? "13.5px" : "15px",
                        color: styleInfo.textColor,
                        fontWeight: 700,
                        lineHeight: 1.6,
                        margin: compact ? "8px 0 0" : "12px 0 0",
                        maxWidth: "62ch",
                      }}
                    >
                      {c.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

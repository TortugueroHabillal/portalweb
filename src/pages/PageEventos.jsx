import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { MosaicGrid } from "../components/MosaicGrid";
import { SectionHead } from "../components/Typography";

const TORTUFEST_1ED = [
  { tone: "azul", src: IMAGES.tortufest2edAdminspeech, caption: "", big: true },
  { tone: "coral", src: IMAGES.tortufest1edSpeech, caption: "" },
  { tone: "azul", src: IMAGES.tortufest1edEscolta, caption: "" },
  { tone: "verde", src: IMAGES.tortufest1edExpo, caption: "" },
  { tone: "coral", src: IMAGES.tortufest1edPlatica, caption: "" },
  { tone: "azul", src: IMAGES.tortufest1edArtexpo, caption: "" },
];

const TORTUFEST_2ED = [
  { tone: "azul", src: IMAGES.tortufest2edCartel, caption: "", big: true },
  { tone: "coral", src: IMAGES.tortufest2ed1, caption: "" },
  { tone: "verde", src: IMAGES.tortufest2edGroup, caption: "" },
  { tone: "verde", src: IMAGES.tortufest2edBaile1, caption: "", halfWidth: true },
  { tone: "coral", src: IMAGES.tortufest2edBaile2, caption: "", halfWidth: true },
];

const RODADA = [
  { tone: "coral", src: IMAGES.rodadaBicis, caption: "", halfWidth: true },
  { tone: "verde", src: IMAGES.rodadaGroup, caption: "", halfWidth: true },
];

const ENCUENTRO = [
  { tone: "azul", src: IMAGES.hutchinsonHatchling, caption: "", big: true },
  { tone: "verde", src: IMAGES.hutchinsonLine, caption: "" },
  { tone: "coral", src: IMAGES.hutchinsonBikes, caption: "" },
];

export function PageEventos() {
  return (
    <section
      style={{
        position: "relative",
        padding: "60px 32px",
        minHeight: "70vh",
        background: `linear-gradient(rgba(234,245,248,0.94), rgba(234,245,248,0.97)), url("${IMAGES.corralNidosAmplio}") center/cover fixed`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <SectionHead eyebrow="Memoria" title="Lo que hemos hecho juntos" />

        <Reveal delay={80} style={{ marginTop: "36px" }}>
          <div
            className="tt-cols-2 tt-cols-2-top"
            style={{
              background: "#fff",
              borderRadius: 0,
              padding: "24px",
              boxShadow: "0 14px 32px -20px rgba(16,38,43,0.3)",
              gap: "24px",
            }}
          >
            <PhotoFrame shape="wide" tone="azul" src={IMAGES.certificadoSemarnat} vignette={false} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 8px" }}>
                Reconocimiento oficial
              </p>
              <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15px", color: TOKENS.conchaSuave, lineHeight: 1.7, margin: 0 }}>
                La <strong>Secretaría de Medio Ambiente y Recursos Naturales</strong> reconoció al Campamento Tortuguero El Habillal por su compromiso y participación en la Estrategia Nacional de Limpieza y Conservación de Playas y Costas de México.
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ marginTop: "56px" }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 4px" }}>Dic 2024</p>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: TOKENS.concha, margin: "0 0 20px" }}>TortuFest El Habillal — 2da edición</h3>
          <MosaicGrid items={TORTUFEST_2ED} />
        </div>

        <div style={{ marginTop: "48px", paddingTop: "48px", borderTop: `1px solid ${TOKENS.arenaOscura}` }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 4px" }}>2023</p>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.concha, margin: "0 0 20px" }}>Encuentro por la Conservación de las Tortugas — Hutchison Ports LCT</h3>
          <MosaicGrid items={ENCUENTRO} />
        </div>

        <div style={{ marginTop: "48px", paddingTop: "48px", borderTop: `1px solid ${TOKENS.arenaOscura}` }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 4px" }}>Dic 2022</p>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: TOKENS.concha, margin: "0 0 20px" }}>TortuFest El Habillal — 1ra edición</h3>
          <MosaicGrid items={TORTUFEST_1ED} />
        </div>

        <div style={{ marginTop: "48px", paddingTop: "48px", borderTop: `1px solid ${TOKENS.arenaOscura}` }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 4px" }}>2022</p>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.concha, margin: "0 0 20px" }}>Rodada El Habillal</h3>
          <MosaicGrid items={RODADA} />
        </div>
      </div>
    </section>
  );
}

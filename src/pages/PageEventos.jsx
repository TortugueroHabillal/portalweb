import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { PhotoFrame } from "../components/PhotoFrame";
import { MosaicGrid } from "../components/MosaicGrid";

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
    <div style={{ background: TOKENS.arena, minHeight: "100vh", position: "relative" }}>
      {/* 1. Header con Estilo Elegante Claro (Espuma) */}
      <section
        style={{
          position: "relative",
          background: TOKENS.espuma,
          padding: "clamp(56px, 8vh, 80px) 24px clamp(64px, 9vh, 96px)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", lineHeight: 0, zIndex: 1 }}>
          <WaveDivider fromColor={TOKENS.espuma} toColor={TOKENS.arena} />
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h3
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: TOKENS.coral,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Nuestra Memoria Colectiva
            </h3>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(32px, 4.6vw, 52px)",
                fontWeight: 700,
                color: TOKENS.noche,
                margin: "0 0 20px",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Eventos Destacados
            </h1>

            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "17px",
                color: TOKENS.conchaSuave,
                lineHeight: 1.65,
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              Una mirada a los encuentros, reconocimientos y festivales comunitarios que han fortalecido nuestro compromiso con la conservación de las especies en El Habillal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Sección Reconocimiento SEMARNAT con Vector Orgánico en Esquina (Restaurada 2da versión) */}
      <section
        style={{
          position: "relative",
          padding: "54px 24px 72px",
          background: TOKENS.arena,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.85,
          }}
        >
          <svg viewBox="0 0 1440 450" width="100%" height="100%" preserveAspectRatio="none">
            <path
              d="M1440,0 L700,0 C880,150 1100,280 1440,420 Z"
              fill={TOKENS.arenaOscura}
              opacity="0.35"
            />
            <path
              d="M1440,0 C1050,120 850,260 550,450 L1440,450 Z"
              fill="rgba(226, 83, 31, 0.08)"
            />
            <path
              d="M1440,30 C1080,140 880,280 580,450"
              fill="none"
              stroke={TOKENS.coral}
              strokeWidth="4"
              opacity="0.5"
            />
            <path
              d="M1440,10 C1060,120 860,260 560,450"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.8"
            />
          </svg>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div
              className="tt-cols-2 tt-cols-2-top"
              style={{
                alignItems: "center",
                gap: "40px",
              }}
            >
              <PhotoFrame shape="wide" tone="azul" src={IMAGES.certificadoSemarnat} vignette={false} />
              <div style={{ textAlign: "left" }}>
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: TOKENS.azulOlaOscuro,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "inline-block",
                    margin: "0 0 8px",
                  }}
                >
                  Reconocimiento Oficial
                </span>
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    color: TOKENS.noche,
                    margin: "0 0 14px",
                    fontWeight: 700,
                  }}
                >
                  Distinción SEMARNAT
                </h3>
                <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "16px", color: TOKENS.conchaSuave, lineHeight: 1.7, margin: 0 }}>
                  La <strong>Secretaría de Medio Ambiente y Recursos Naturales</strong> reconoció al Campamento Tortuguero El Habillal por su compromiso ininterrumpido en la Estrategia Nacional de Limpieza y Conservación de Playas y Costas de México.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- SECCIÓN 1: TortuFest 2da Edición (Fondo Verde Menta Pálido) --- */}
      <div style={{ lineHeight: 0, margin: 0, padding: 0 }}>
        <WaveDivider fromColor={TOKENS.arena} toColor="rgba(196, 219, 199, 0.55)" />
      </div>
      <section style={{ background: "rgba(196, 219, 199, 0.55)", padding: "52px 24px 68px", margin: 0 }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: TOKENS.verdeOscuro,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Diciembre 2024
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.2vw, 34px)", color: TOKENS.noche, margin: "6px 0 0", fontWeight: 700 }}>
                TortuFest El Habillal — 2da Edición
              </h2>
            </div>
            <MosaicGrid items={TORTUFEST_2ED} />
          </Reveal>
        </div>
      </section>

      {/* --- SECCIÓN 2: Encuentro Hutchison Ports (Fondo Verde Botánica Orgánico) --- */}
      <div style={{ lineHeight: 0, margin: 0, padding: 0 }}>
        <WaveDivider fromColor="rgba(196, 219, 199, 0.55)" toColor={TOKENS.verde} />
      </div>
      <section style={{ background: TOKENS.verde, padding: "52px 24px 68px", margin: 0 }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Año 2023
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3vw, 32px)", color: "#ffffff", margin: "6px 0 0", fontWeight: 700 }}>
                Encuentro por la Conservación de las Tortugas — Hutchison Ports LCT
              </h2>
            </div>
            <MosaicGrid items={ENCUENTRO} />
          </Reveal>
        </div>
      </section>

      {/* --- SECCIÓN 3: TortuFest 1ra Edición (Fondo Verde Menta Pálido) --- */}
      <div style={{ lineHeight: 0, margin: 0, padding: 0 }}>
        <WaveDivider fromColor={TOKENS.verde} toColor="rgba(196, 219, 199, 0.55)" />
      </div>
      <section style={{ background: "rgba(196, 219, 199, 0.55)", padding: "52px 24px 68px", margin: 0 }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: TOKENS.verdeOscuro,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Diciembre 2022
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.2vw, 34px)", color: TOKENS.noche, margin: "6px 0 0", fontWeight: 700 }}>
                TortuFest El Habillal — 1ra Edición
              </h2>
            </div>
            <MosaicGrid items={TORTUFEST_1ED} />
          </Reveal>
        </div>
      </section>

      {/* --- SECCIÓN 4: Rodada El Habillal (Fondo Arena Cierre) --- */}
      <div style={{ lineHeight: 0, margin: 0, padding: 0 }}>
        <WaveDivider fromColor="rgba(196, 219, 199, 0.55)" toColor={TOKENS.arena} />
      </div>
      <section style={{ background: TOKENS.arena, padding: "52px 24px 68px", margin: 0 }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: TOKENS.azulOlaOscuro,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Año 2022
              </span>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3vw, 32px)", color: TOKENS.noche, margin: "6px 0 0", fontWeight: 700 }}>
                Rodada El Habillal
              </h2>
            </div>
            <MosaicGrid items={RODADA} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

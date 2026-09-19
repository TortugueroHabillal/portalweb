import { TOKENS, SECTION_BG, SPACE, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { PhotoFrame } from "../components/PhotoFrame";
import { MosaicGrid } from "../components/MosaicGrid";
import { HeroShock } from "../components/HeroShock";
import { CircleVectors } from "../components/CircleVectors";

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

function EventHeader({ eyebrow, eyebrowColor, title }) {
  return (
    <div style={{ marginBottom: SPACE.md + 4 }}>
      <span
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: "13.5px",
          fontWeight: 700,
          color: eyebrowColor,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.2vw, 32px)", color: TOKENS.noche, margin: "6px 0 0", fontWeight: 700 }}>
        {title}
      </h2>
    </div>
  );
}

export function PageEventos() {
  return (
    <div style={{ position: "relative" }}>
      {/* 1. Hero — mismo patrón oscuro dividido que el resto del sitio */}
      <HeroShock image={IMAGES.tortufest2edGroup} imageAlt="Comunidad reunida en TortuFest El Habillal" align="center">
        <span
          style={{
            display: "inline-block",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: TOKENS.cielo,
            marginBottom: SPACE.sm,
          }}
        >
          Nuestra memoria colectiva
        </span>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "clamp(26px, 3.4vw, 44px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            margin: "0 0 18px",
          }}
        >
          Eventos que nos han
          <br />
          unido a la <span style={{ color: TOKENS.cieloOscuro }}>comunidad</span>.
        </h1>
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15.5px", color: "#E7F0EC", lineHeight: 1.6, maxWidth: "48ch", margin: 0 }}>
          Encuentros, reconocimientos y festivales que han fortalecido nuestro compromiso con la conservación de las especies en El Habillal.
        </p>
      </HeroShock>

      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />

      {/* 2. Reconocimiento SEMARNAT */}
      <section style={{ position: "relative", padding: `${SPACE.xxl}px ${SPACE.lg}px`, background: SECTION_BG.claro, overflow: "hidden" }}>
        <CircleVectors variant="light" />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="tt-cols-2 tt-cols-2-top" style={{ alignItems: "center", gap: SPACE.xl }}>
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
                  Reconocimiento oficial
                </span>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3vw, 32px)", color: TOKENS.noche, margin: "0 0 14px", fontWeight: 700 }}>
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

      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />

      {/* 3. TortuFest 2da edición */}
      <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <EventHeader eyebrow="Diciembre 2024" eyebrowColor={TOKENS.verdeOscuro} title="TortuFest El Habillal — 2da edición" />
            <MosaicGrid items={TORTUFEST_2ED} />
          </Reveal>
        </div>
      </section>

      {/* 4. Encuentro Hutchison Ports */}
      <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <EventHeader eyebrow="Año 2023" eyebrowColor={TOKENS.azulOlaOscuro} title="Encuentro por la Conservación de las Tortugas — Hutchison Ports LCT" />
            <MosaicGrid items={ENCUENTRO} />
          </Reveal>
        </div>
      </section>

      <WaveDivider fromColor={TOKENS.espuma} toColor={SECTION_BG.claro} />

      {/* 5. TortuFest 1ra edición */}
      <section style={{ background: SECTION_BG.claro, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <EventHeader eyebrow="Diciembre 2022" eyebrowColor={TOKENS.verdeOscuro} title="TortuFest El Habillal — 1ra edición" />
            <MosaicGrid items={TORTUFEST_1ED} />
          </Reveal>
        </div>
      </section>

      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />

      {/* 6. Rodada El Habillal — cierre */}
      <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px ${SPACE.xxl}px` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <Reveal>
            <EventHeader eyebrow="Año 2022" eyebrowColor={TOKENS.azulOlaOscuro} title="Rodada El Habillal" />
            <MosaicGrid items={RODADA} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

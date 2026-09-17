import { TOKENS, IMAGES, LOGO_URL } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Eyebrow, H2 } from "../components/Typography";

const ACCIONES = [
  {
    accion: "Protegemos",
    desc: "Mediante patrullajes nocturnos en playa, colecta segura de nidos y resguardo activo en el corral de incubación.",
    cardBg: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(190, 106, 74, 0.28)",
    badgeBg: TOKENS.coral,
    src: IMAGES.teamNesting,
  },
  {
    accion: "Divulgamos",
    desc: "Educación ambiental sobre el respeto e importancia de nuestras especies a escuelas, visitantes y comunidad local.",
    cardBg: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(76, 107, 79, 0.28)",
    badgeBg: TOKENS.verde,
    src: IMAGES.teamEntrance,
  },
  {
    accion: "Unimos",
    desc: "Alianzas comunitarias con pescadores, familias de El Habillal, voluntarios de Lázaro Cárdenas y comunidad externa.",
    cardBg: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(190, 106, 74, 0.28)",
    badgeBg: TOKENS.coral,
    src: IMAGES.teamDigging,
  },
  {
    accion: "Respetamos",
    desc: "Las prácticas de conservación ética en cada interacción: desde el arribo de hembras hasta la liberación de cada cría.",
    cardBg: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(76, 107, 79, 0.28)",
    badgeBg: TOKENS.verde,
    src: IMAGES.hutchinsonFamily,
  },
];

/* 1. Hero Banner: Azul Oscuro con imagen de crías sutil de fondo y Logo en grande */
function HeroBanner() {
  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(135deg, rgba(16,38,43,0.94) 0%, rgba(32,120,150,0.88) 100%), url("${IMAGES.criasAtardecer}") center/cover fixed`,
        padding: "52px 24px 60px",
        minHeight: "100vh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Círculos de luz ambiental */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-40px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(32, 120, 150, 0.35)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal from="up" distance={25}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 4.4vw, 50px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 16px",
              lineHeight: 1.16,
              letterSpacing: "-0.01em",
            }}
          >
            Un equipo, una misma causa
          </h1>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(16.5px, 2.2vw, 21px)",
              fontWeight: 500,
              color: "#E2F4F7",
              lineHeight: 1.55,
              maxWidth: "68ch",
              margin: "0 auto 32px",
            }}
          >
            Bienvenidos a Campamento Tortuguero El Habillal, una asociación civil sin fines de lucro dedicada a la conservación y protección de las tortugas marinas en nuestras costas.
          </p>
        </Reveal>

        {/* Logo oficial del campamento en grande debajo del texto */}
        <Reveal delay={120} from="up" distance={20}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <img
              src={LOGO_URL}
              alt="Logo Campamento Tortuguero El Habillal"
              style={{
                width: "250px",
                height: "auto",
                maxHeight: "190px",
                objectFit: "contain",
                filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.45))",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 2. Sección Intro: 'Un campamento nacido de la comunidad' */
function Intro() {
  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${TOKENS.noche} 0%, ${TOKENS.azulOlaOscuro} 60%, ${TOKENS.verdeOscuro} 100%), url("${IMAGES.campAerial}") center/cover fixed`,
        minHeight: "540px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Separador Ondulado SVG para Escritorio con borde Naranja/Coral elegante */}
      <svg
        className="tt-about-desktop-wave"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L1180,0 C1340,180 880,360 940,600 L0,600 Z"
          fill={TOKENS.espuma}
        />
        <path
          d="M1195,-10 C1355,170 895,350 955,610"
          fill="none"
          stroke={TOKENS.coral}
          strokeWidth="6.5"
        />
        <path
          d="M1210,-20 C1370,160 910,340 970,620"
          fill="none"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="3.5"
        />
      </svg>

      {/* Separador Ondulado SVG para Móvil */}
      <svg
        className="tt-about-mobile-wave-sketch"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L400,0 L400,420 C290,490 120,450 0,475 Z"
          fill={TOKENS.espuma}
        />
        <path
          d="M400,420 C290,490 120,450 0,475"
          fill="none"
          stroke={TOKENS.coral}
          strokeWidth="5.5"
        />
        <path
          d="M400,412 C290,482 120,442 0,467"
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="3"
        />
      </svg>

      {/* Contenido en 2 Columnas sobre la Ola */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div className="tt-cols-2" style={{ gap: "32px", alignItems: "center" }}>
          {/* Lado Izquierdo (Texto): Resguardado dentro de la ola clara */}
          <div
            style={{
              padding: "60px 24px 60px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <Reveal>
                <Eyebrow color={TOKENS.coral}>Quiénes somos</Eyebrow>
                <H2 color={TOKENS.noche} style={{ margin: "18px 0 48px", lineHeight: 1.28 }}>
                  Un campamento nacido de la comunidad, por amor a nuestras especies.
                </H2>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    color: TOKENS.conchaSuave,
                    fontSize: "15.5px",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Desde El Habillal, en Lázaro Cárdenas, Michoacán, trabajamos junto a familias, pescadores locales, estudiantes y comunidad local para proteger cada temporada de anidación mediante protocolos ambientales certificados, eventos comunitarios y turismo responsable.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Lado Derecho (Foto): Situada abajo sobre el área azul del vector en móvil */}
          <div
            style={{
              padding: "60px 24px 60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <Reveal delay={120} from="right" style={{ width: "100%" }}>
              <div style={{ maxWidth: "460px", margin: "0 auto", width: "100%" }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "24px",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 28px 56px -12px rgba(10,25,30,0.45)",
                    border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      aspectRatio: "4/3",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                    }}
                  >
                    <img
                      src={IMAGES.teamFieldwork}
                      alt="Equipo de trabajo en campo"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. Misión y Visión: Banner limpio de acento (se corta el vector por detrás) */
function MisionVision() {
  return (
    <section
      style={{
        position: "relative",
        background: TOKENS.cieloClaro,
        padding: "54px 32px",
        zIndex: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="tt-cols-2"
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}
      >
        <Reveal from="left" distance={40}>
          <H2 color={TOKENS.azulOla} maxWidth="8ch">Misión</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.75, marginTop: "14px" }}>
            Somos una asociación civil sin fines de lucro comprometida con el cuidado del medio ambiente, con el objetivo principal de proteger y conservar la tortuga marina para preservar las especies que arriban a la costa de Michoacán.
          </p>
        </Reveal>
        <Reveal from="right" delay={120} distance={40}>
          <H2 color={TOKENS.verde} maxWidth="8ch">Visión</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.75, marginTop: "14px" }}>
            Convertirnos en uno de los principales centros de protección y conservación de la tortuga marina del país, contribuyendo con investigación y cifras positivas en reproducción de crías, siendo un atractivo turístico sostenible y sustentable, y creando conciencia ambiental en cada ser humano.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* 4. Composición Vectorial de Fotos con Tema Naranja Armónico */
function VectorCircleArtwork() {
  return (
    <div className="tt-vector-composition-wrap">
      {/* 1. Large Orange/Coral Gradient Vector Circle (Bottom Right) */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "10px",
          width: "175px",
          height: "175px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${TOKENS.atardecer} 0%, ${TOKENS.coral} 60%, #F39C12 100%)`,
          boxShadow: "0 14px 32px -8px rgba(226,83,31,0.42)",
          zIndex: 1,
        }}
      />

      {/* 2. Coral Vector Ring / Donut Element (Left Edge) */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          left: "0px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: `7px solid ${TOKENS.coral}`,
          boxSizing: "border-box",
          zIndex: 4,
          boxShadow: "0 6px 18px rgba(190,106,74,0.3)",
        }}
      />

      {/* 3. Sky Blue Accent Ring (Top Edge) */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "22px",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: "#EAF5F8",
          border: `3.5px solid ${TOKENS.azulOla}`,
          opacity: 0.95,
          zIndex: 1,
        }}
      />

      {/* 4. MAIN Large Circular Photo (Center-Right) */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          width: "290px",
          height: "290px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "6px solid #ffffff",
          boxShadow: "0 20px 42px -10px rgba(190,106,74,0.28)",
          zIndex: 2,
        }}
      >
        <img
          src={IMAGES.teamNesting}
          alt="Protección y equipo"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 5. Top-Left Secondary Circular Photo */}
      <div
        style={{
          position: "absolute",
          top: "28px",
          left: "32px",
          width: "145px",
          height: "145px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #ffffff",
          boxShadow: "0 16px 32px -10px rgba(16,38,43,0.22)",
          zIndex: 3,
        }}
      >
        <img
          src={IMAGES.teamEntrance}
          alt="Divulgación ambiental"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 6. Bottom-Left Tertiary Circular Photo */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "58px",
          width: "185px",
          height: "185px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "5px solid #ffffff",
          boxShadow: "0 18px 36px -10px rgba(16,38,43,0.24)",
          zIndex: 3,
        }}
      >
        <img
          src={IMAGES.teamDigging}
          alt="Unión y voluntariado"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

/* 5. Sección de Compromiso: Estado anterior del vector */
function Team() {
  return (
    <section
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${TOKENS.noche} 0%, ${TOKENS.azulOlaOscuro} 60%, ${TOKENS.verdeOscuro} 100%), url("${IMAGES.campAerial}") center/cover fixed`,
        paddingBottom: "60px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Separador Ondulado SVG para Escritorio */}
      <svg
        className="tt-about-desktop-wave"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L780,0 C600,150 960,350 680,600 L0,600 Z"
          fill="rgba(244, 235, 218, 0.96)"
        />
        <path
          d="M795,-10 C615,140 975,340 695,610"
          fill="none"
          stroke={TOKENS.coral}
          strokeWidth="6.5"
        />
        <path
          d="M810,-20 C630,130 990,330 710,620"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="3.5"
        />
      </svg>

      {/* Separador Ondulado SVG para Móvil */}
      <svg
        className="tt-about-mobile-wave-sketch"
        viewBox="0 0 400 850"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L400,0 L400,450 C290,530 120,490 0,515 Z"
          fill="rgba(244, 235, 218, 0.96)"
        />
        <path
          d="M400,450 C290,530 120,490 0,515"
          fill="none"
          stroke={TOKENS.coral}
          strokeWidth="5.5"
        />
        <path
          d="M400,442 C290,522 120,482 0,507"
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="3"
        />
      </svg>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="tt-cols-2" style={{ gap: "32px", alignItems: "center" }}>
          {/* Lado Izquierdo (Texto y Tarjetas): Resguardado dentro de la ola clara de arena */}
          <div
            style={{
              padding: "48px 20px 36px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <Reveal>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(24px, 3.4vw, 34px)",
                    fontWeight: 700,
                    color: TOKENS.noche,
                    margin: "0 0 14px",
                    lineHeight: 1.22,
                  }}
                >
                  Un compromiso vivo con nuestras especies
                </h2>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "14.5px",
                    color: TOKENS.conchaSuave,
                    lineHeight: 1.55,
                    margin: "0 0 24px",
                  }}
                >
                  Nuestro objetivo es promover la educación ambiental y el turismo responsable, canalizando nuestros esfuerzos a través de cuatro pilares fundamentales de conservación:
                </p>
              </Reveal>

              {/* 4 Cuadros de texto de acción 100% contenidos sobre la arena */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "9px" }}>
                {ACCIONES.map((item, i) => (
                  <Reveal key={item.accion} delay={50 + i * 50}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        padding: "9.5px 14px",
                        background: item.cardBg,
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        border: item.border,
                        boxShadow: "0 4px 14px rgba(16,38,43,0.06)",
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: item.badgeBg,
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        ✦
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontSize: "15.5px",
                            fontWeight: 700,
                            color: TOKENS.noche,
                            margin: "0 0 1px",
                          }}
                        >
                          {item.accion}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Public Sans', sans-serif",
                            fontSize: "13px",
                            color: TOKENS.conchaSuave,
                            lineHeight: 1.38,
                            margin: 0,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Derecho (Composición Vectorial): Situada abajo sobre el área azul del vector en móvil */}
          <div
            style={{
              padding: "24px 20px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <Reveal delay={100} from="right" style={{ width: "100%" }}>
              <div className="tt-vector-composition-outer">
                <VectorCircleArtwork />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageAbout() {
  return (
    <div>
      <HeroBanner />
      <Intro />
      <MisionVision />
      <Team />
    </div>
  );
}

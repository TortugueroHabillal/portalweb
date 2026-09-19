import { TOKENS, SECTION_BG, SPACE, RADIUS, IMAGES, LOGO_URL } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { HeroShock } from "../components/HeroShock";
import { Eyebrow, H2, SectionHead } from "../components/Typography";
import { StatCard } from "../components/StatCard";
import { WaveDivider } from "../components/WaveDivider";
import { MapEmbed } from "../components/MapEmbed";
import { ContactInfo } from "../components/ContactInfo";
import { SponsorsStrip } from "../components/SponsorsStrip";
import { TurtleSilhouette } from "../components/TurtleSilhouette";
import { CircleVectors } from "../components/CircleVectors";

/* 1. Hero — gancho emocional + identidad + doble CTA */
function Hero({ go }) {
  return (
    <HeroShock image={IMAGES.herohero} imageAlt="Campamento Tortuguero">
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
        SÚMATE
      </span>
      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: "clamp(26px,3.2vw,44px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#ffffff",
          margin: "0 0 22px",
        }}
      >
        Tú puedes ser la diferencia
        <br />
        para que una tortuga{" "}
        <span style={{ color: TOKENS.atardecer, fontWeight: 700 }}>llegue viva</span>{" "}
        al mar.
      </h1>
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: "15.5px",
          color: "#E7F0EC",
          lineHeight: 1.6,
          margin: `0 0 ${SPACE.md}px`,
          fontWeight: 500,
          maxWidth: "46ch",
        }}
      >
        Somos una asociación civil enfocada en proteger la anidación de tres especies de tortugas marinas en Lázaro Cárdenas, Michoacán.
      </p>

      <div className="tt-hero-buttons">
        <Button tone="shock" size="lg" onClick={() => go("dona")}>Dona ahora</Button>
        <Button tone="verde" size="lg" onClick={() => go("adopta")}>Adopta un nido</Button>
      </div>
    </HeroShock>
  );
}

/* 2. Confianza — cifras + logos de aliados juntos, justo después del hero */
function TrustBar() {
  return (
    <section style={{ background: SECTION_BG.claro, padding: `${SPACE.lg}px 0` }}>
      <Reveal>
        <div style={{ textAlign: "center", padding: `0 ${SPACE.md}px` }}>
          <img
            src={LOGO_URL}
            alt="Logo Campamento Tortuguero El Habillal A.C."
            style={{ width: "240px", maxWidth: "60%", height: "auto", display: "inline-block" }}
          />
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: TOKENS.azulOlaOscuro,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: SPACE.xs,
              marginBottom: 0,
            }}
          >
            Brindando resultados reales durante 13 años
          </p>
        </div>
      </Reveal>
      <div className="tt-cols-4" style={{ maxWidth: "1200px", margin: `${SPACE.md}px auto 0`, padding: `0 ${SPACE.lg}px` }}>
        <StatCard value={9000} suffix="+" label="Nidos protegidos" tone="azul" />
        <StatCard value={100000} suffix="+" label="Crías liberadas" tone="verde" />
        <StatCard value={3} label="Especies protegidas" tone="coral" />
        <StatCard value={13} label="Temporadas consecutivas" tone="azul" />
      </div>
      <div style={{ marginTop: SPACE.md }}>
        <SponsorsStrip />
      </div>
    </section>
  );
}

/* Vector de ola descendente — una sola curva suave con doble trazo, igual estilo que el separador de Nosotros; dos mitades que empalman en la costura */
function DescendingWaveVector({ part }) {
  const d = part === "top" ? "M85,0 C55,35 95,65 50,100" : "M50,0 C20,30 70,60 35,100";
  const d2 = part === "top" ? "M92,-2 C60,34 102,66 53,104" : "M53,-4 C23,28 76,58 38,104";
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke={TOKENS.azulOla} strokeOpacity="0.22" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <path d={d2} fill="none" stroke={TOKENS.verde} strokeOpacity="0.16" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* 3. Conexión emocional — especies que protege el campamento, en collage asimétrico */
function TurtleSpecies() {
  return (
    <section className="tt-section-responsive" style={{ background: SECTION_BG.claro, padding: `${SPACE.xxl}px ${SPACE.lg}px`, position: "relative", overflow: "hidden" }}>
      <CircleVectors variant="light" />
      <DescendingWaveVector part="top" />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHead
          title="Tres especies, una urgencia compartida"
          titleMaxWidth="20ch"
        >
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15px", color: TOKENS.conchaSuave, lineHeight: 1.6, margin: `${SPACE.xs}px auto 0`, maxWidth: "52ch" }}>
            Regresan cada año a la misma arena.
          </p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "17.5px", fontStyle: "italic", fontWeight: 600, color: TOKENS.azulOla, lineHeight: 1.5, margin: `${SPACE.xs}px auto 0`, maxWidth: "52ch" }}>
            Nosotros somos la razón por la que siguen regresando.
          </p>

        </SectionHead>
        <div className="tt-species-collage" style={{ marginTop: SPACE.xl }}>
          <Reveal from="left" delay={0} className="tt-species-tile-main">
            <div className="tt-species-tile" style={{ width: "100%", height: "100%" }}>
              <img src={IMAGES.turtleCloseup} alt="Tortuga golfina" />
              <div className="tt-species-tile-overlay">
                <p className="tt-species-tile-name" style={{ fontSize: "26px" }}>Tortuga golfina</p>
                <p className="tt-species-tile-sci" style={{ fontSize: "13px" }}>Lepidochelys olivacea</p>
                <p className="tt-species-tile-fact" style={{ fontSize: "14px" }}>
                  Es la especie más numerosa en El Habillal: sus arribazones masivos son también los más vulnerables al saqueo de nidos en toda la costa mexicana.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal from="up" delay={100} className="tt-species-tile-b">
            <div className="tt-species-tile" style={{ width: "100%", height: "100%" }}>
              <img src={IMAGES.turtleOnBeach} alt="Tortuga negra" />
              <div className="tt-species-tile-overlay">
                <p className="tt-species-tile-name" style={{ fontSize: "19px" }}>Tortuga negra</p>
                <p className="tt-species-tile-sci" style={{ fontSize: "11.5px" }}>Chelonia mydas agassizii</p>
                <p className="tt-species-tile-fact" style={{ fontSize: "12.5px" }}>
                  Enfrenta caza ilegal y pérdida de playas en todo México; su anidación aquí es de las más escasas del país.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal from="up" delay={180} className="tt-species-tile-c">
            <div className="tt-species-tile" style={{ width: "100%", height: "100%" }}>
              <img src={IMAGES.laud} alt="Tortuga laúd" />
              <div className="tt-species-tile-overlay">
                <p className="tt-species-tile-name" style={{ fontSize: "19px" }}>Tortuga laúd</p>
                <p className="tt-species-tile-sci" style={{ fontSize: "11.5px" }}>Dermochelys coriacea</p>
                <p className="tt-species-tile-fact" style={{ fontSize: "12.5px" }}>
                  La tortuga marina más vulnerable del mundo: se estiman menos de 2,300 hembras anidando en todo el Pacífico.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal from="right" delay={260} className="tt-species-tile-urgent">
            <div
              className="tt-onu-impact-card"
              style={{
                background: TOKENS.azulOla,
                borderRadius: RADIUS.card + 2,
                padding: `${SPACE.md}px ${SPACE.md + 4}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                boxShadow: "0 14px 30px -18px rgba(16,38,43,0.4)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#DCEEF3",
                  marginBottom: "6px",
                }}
              >
                Impacto · 2021
              </span>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "15.5px",
                  color: "#FBF8F2",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                En el Día Mundial de los Océanos de 2021, la{" "}
                <a
                  href="https://news.un.org/es/story/2021/06/1493152"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px" }}
                >
                  ONU
                </a>{" "}
                reconoció la labor de El Habillal en una entrevista a nuestro director.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 4. Cuatro frentes — layout asimétrico con tonos variados (azul, coral, verde, azul ola) */
const PILLARS = [
  { key: "patrullajes", t: "Patrullajes nocturnos", d: "Monitoreo constante de las playas para localizar cada nido antes que un depredador o el saqueo.", bg: TOKENS.azulOla, src: IMAGES.turtleInfrared },
  { key: "reubicacion", t: "Reubicación de huevos", d: "Traslado a corrales de incubación seguros, protegidos del clima y la actividad humana.", bg: TOKENS.coral, src: IMAGES.nestEggsHole },
  { key: "liberacion", t: "Liberación de crías", d: "Aclimatación breve antes de soltarlas al mar, asegurando su transición segura.", bg: TOKENS.verde, src: IMAGES.hatchlingsToWaves },
  { key: "educacion", t: "Educación ambiental", d: "Talleres y programas para que la comunidad se sume a la protección de las tortugas marinas.", bg: TOKENS.azulOlaOscuro, src: IMAGES.tortufest1edPlatica },
];

function FourFrentesBento() {
  return (
    <section className="tt-section-responsive" style={{ background: SECTION_BG.claro, padding: `${SPACE.xxl}px ${SPACE.lg}px`, position: "relative", overflow: "hidden" }}>
      <DescendingWaveVector part="bottom" />
      <div style={{ position: "absolute", top: "10%", right: "-30px", width: "70px", height: "70px", borderRadius: "50%", background: "rgba(62,124,147,0.1)", zIndex: 0 }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: "6%", left: "4%", width: "14px", height: "14px", borderRadius: "50%", background: "rgba(76,107,79,0.2)", zIndex: 0 }} aria-hidden="true" />
      <div style={{ maxWidth: "1260px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHead eyebrow="Cómo trabajamos" eyebrowColor={TOKENS.verdeOscuro} title="De la arena al mar: así actuamos" titleMaxWidth="24ch" />
        <div className="tt-frentes-bento-grid" style={{ marginTop: SPACE.xl }}>
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
                    padding: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      background: p.bg,
                      color: "#fff",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: RADIUS.pill,
                      marginBottom: "8px",
                    }}
                  >
                    {p.t}
                  </span>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, margin: 0 }}>{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Equivalencia de costo — cada tarjeta redirige a Dona y traduce el monto en impacto medible */
const COST_EQUIVALENCES = [
  { amount: "$100 MXN", impact: "Una noche de patrullaje: la diferencia entre que un nido sea detectado a tiempo o no.", tone: TOKENS.azulOlaOscuro },
  { amount: "$250 MXN", impact: "Un nido resguardado en el corral durante toda su incubación — hasta 90 crías con la oportunidad de llegar al mar.", tone: TOKENS.verdeOscuro, featured: true },
  { amount: "$1,000 MXN", impact: "Una semana completa de operación del campamento — decenas de nidos bajo vigilancia constante.", tone: TOKENS.coralOscuro },
];

function CostEquivalence({ go }) {
  return (
    <section style={{ background: SECTION_BG.claro, padding: `0 ${SPACE.lg}px ${SPACE.xxl}px` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead
          title="Esto es lo que tu apoyo puede lograr"
          titleMaxWidth="22ch"
        >
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.6, margin: `${SPACE.xs}px auto 0`, maxWidth: "48ch" }}>
            Elige un monto y compruébalo tú mismo.
          </p>
        </SectionHead>
        <div className="tt-cols-3" style={{ gap: SPACE.md, marginTop: SPACE.xl, alignItems: "end" }}>
          {COST_EQUIVALENCES.map((c) => (
            <button
              key={c.amount}
              onClick={() => go("dona")}
              style={{
                background: c.featured ? TOKENS.nocheClara : "#fff",
                borderRadius: c.featured ? RADIUS.card + 2 : RADIUS.card,
                borderTop: `3px solid ${c.featured ? TOKENS.cielo : c.tone}`,
                border: "none",
                borderTopWidth: "3px",
                borderTopStyle: "solid",
                borderTopColor: c.featured ? TOKENS.cielo : c.tone,
                padding: c.featured ? `${SPACE.lg}px ${SPACE.md - 4}px` : `${SPACE.md}px ${SPACE.md - 4}px`,
                textAlign: "center",
                boxShadow: c.featured ? "0 20px 44px -20px rgba(16,38,43,0.5)" : "0 10px 26px -18px rgba(16,38,43,0.18)",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                transition: "transform 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
                <TurtleSilhouette crawl size={22} color={c.featured ? "rgba(255,255,255,0.16)" : "rgba(16,38,43,0.14)"} style={{ top: "18%", animationDuration: "22s", animationDelay: "-2s" }} />
                <TurtleSilhouette crawl size={16} color={c.featured ? "rgba(255,255,255,0.12)" : "rgba(16,38,43,0.1)"} style={{ top: "58%", animationDuration: "30s", animationDelay: "-14s" }} />
                <TurtleSilhouette crawl size={18} color={c.featured ? "rgba(255,255,255,0.14)" : "rgba(16,38,43,0.12)"} style={{ top: "78%", animationDuration: "26s", animationDelay: "-8s" }} />
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                {c.featured && (
                  <span style={{ display: "inline-block", marginBottom: SPACE.xs, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: TOKENS.cielo }}>
                    Más elegido
                  </span>
                )}
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: c.featured ? "28px" : "22px", color: c.featured ? TOKENS.cielo : c.tone }}>{c.amount}</div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: c.featured ? "#E7F0EC" : TOKENS.conchaSuave, marginTop: "8px", lineHeight: 1.5 }}>{c.impact}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: SPACE.sm,
                    fontSize: "12.5px",
                    fontWeight: 700,
                    color: c.featured ? TOKENS.cielo : c.tone,
                  }}
                >
                  Donar este monto →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5. El Ask — urgencia de temporada + un único par de botones, la única otra vez que se piden ambos en la página */
function TheAsk({ go }) {
  return (
    <section className="tt-theask-section" style={{ background: TOKENS.noche, padding: `${SPACE.xxl}px ${SPACE.lg}px`, overflow: "hidden" }}>
      <div className="tt-proximo-grid" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal from="left">
          <div style={{ position: "relative", padding: "22px 0 0 22px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "72%", height: "58%", background: TOKENS.azulOla, zIndex: 0 }} aria-hidden="true" />
            <div style={{ position: "absolute", bottom: "-22px", right: "-18px", width: "58%", height: "48%", background: TOKENS.cielo, zIndex: 0 }} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <PhotoFrame shape="wide" tone="azul" src={IMAGES.turtleDusk} style={{ aspectRatio: "4/5" }} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: TOKENS.cielo,
              marginBottom: SPACE.xs,
            }}
          >
            Temporada de anidación 2026-2027
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(24px, 3.2vw, 32px)", color: "#FBF8F2", margin: "0 0 12px", lineHeight: 1.3 }}>
            Cada noche sin patrullaje es un nido que puede perderse.
          </h2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "15.5px", lineHeight: 1.6, margin: `0 0 ${SPACE.lg}px`, maxWidth: "48ch" }}>
            Ahora mismo hay nidos en playa esperando protección en Lázaro Cárdenas. Adopta uno y sigue su historia hasta el mar, o dona para sostener los patrullajes de esta temporada.
          </p>
          <div style={{ display: "flex", gap: SPACE.md - 4, flexWrap: "wrap" }} className="tt-theask-buttons">
            <Button tone="verde" size="lg" onClick={() => go("adopta")}>Adopta un nido</Button>
            <Button tone="shock" size="lg" onClick={() => go("dona")}>Dona ahora</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 7. Compromiso secundario — visitar sin pagar */
/* Camino de tortuguitas — dos arcos de fondo (arriba y abajo del contenido) que nunca cruzan el texto ni la foto */
const TURTLE_PATH = [
  // arco superior, dentro del margen antes de que empiece la cuadrícula de contenido
  { top: "1.5%", left: "4%", size: 16, rotate: -10 },
  { top: "3%", left: "18%", size: 24, rotate: 5 },
  { top: "5%", left: "33%", size: 19, rotate: -8 },
  { top: "5.5%", left: "50%", size: 28, rotate: 12 },
  { top: "4.5%", left: "67%", size: 18, rotate: -14 },
  { top: "2.5%", left: "83%", size: 25, rotate: 8 },
  { top: "1%", left: "95%", size: 15, rotate: -6 },
  // arco inferior, dentro del margen después de que termina la cuadrícula de contenido
  { top: "98.5%", left: "9%", size: 17, rotate: 14 },
  { top: "96.5%", left: "27%", size: 27, rotate: -9 },
  { top: "95%", left: "45%", size: 20, rotate: 10 },
  { top: "96%", left: "63%", size: 29, rotate: -12 },
  { top: "97.5%", left: "76%", size: 22, rotate: 5 },
  { top: "98.5%", left: "88%", size: 16, rotate: 7 },
];

function NextEvent({ go }) {
  return (
    <section className="tt-nextevent-section" style={{ background: SECTION_BG.claro, padding: `${SPACE.xl}px ${SPACE.lg}px`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
        {TURTLE_PATH.map((t, i) => (
          <TurtleSilhouette
            key={i}
            size={t.size}
            color="rgba(16,38,43,0.85)"
            style={{ top: t.top, left: t.left, transform: `translate(-50%, -50%) rotate(${t.rotate}deg)` }}
          />
        ))}
      </div>
      <div className="tt-proximo-grid" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <PhotoFrame shape="portrait" tone="arena" src={IMAGES.tortufest2edGroup} />
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>Te estamos esperando</Eyebrow>
          <H2>Sé parte de la próxima liberación de crías</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.6, maxWidth: "50ch", margin: "14px 0 20px" }}>
            Temporada 2026-2027: acompáñanos en la liberación abierta al público en El Habillal. Y si quieres involucrarte más de cerca, súmate a nuestro equipo de voluntarios.
          </p>
          <div style={{ display: "flex", gap: SPACE.sm - 4, flexWrap: "wrap" }} className="tt-nextevent-buttons">
            <Button tone="verde" onClick={() => go("visita")}>Agendar mi visita</Button>
            <Button tone="outline" onClick={() => go("convocatorias")}>
              <span style={{ color: TOKENS.concha }}>Súmate al equipo</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 8. Logística de cierre */
function LocationMap() {
  return (
    <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="Ven a conocernos" eyebrowColor={TOKENS.azulOlaOscuro} title="Visítanos en El Habillal" titleMaxWidth="24ch">
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.6, margin: `${SPACE.xs}px auto 0`, maxWidth: "48ch" }}>
            A pie de playa en Lázaro Cárdenas, Michoacán. Ven, conoce el trabajo de cerca y vive la conservación en primera persona.
          </p>
        </SectionHead>
        <div className="tt-cols-2 tt-cols-2-top" style={{ marginTop: "28px" }}>
          <Reveal delay={100}>
            <MapEmbed />
          </Reveal>
          <Reveal delay={160}>
            <ContactInfo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PageHome({ go }) {
  return (
    <div>
      <Hero go={go} />
      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />
      <TrustBar />
      <TurtleSpecies />
      <FourFrentesBento />
      <CostEquivalence go={go} />
      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.noche} />
      <TheAsk go={go} />
      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />
      <NextEvent go={go} />
      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />
      <LocationMap />
    </div>
  );
}

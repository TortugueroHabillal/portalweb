import { useState } from "react";
import { TOKENS, IMAGES, VIDEOS, LOGO_URL } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { Eyebrow, H2, SectionHead } from "../components/Typography";
import { StatCard } from "../components/StatCard";
import { WaveDivider } from "../components/WaveDivider";
import { MapEmbed } from "../components/MapEmbed";
import { ContactInfo } from "../components/ContactInfo";
import { SponsorsStrip } from "../components/SponsorsStrip";
import { FourPillars } from "../components/FourPillars";
import { WaveVectorBackground } from "../components/WaveVectorBackground";

function Hero({ go }) {
  return (
    <section className="tt-hero-shock">
      <div className="tt-hero-shock-msg">
        <Reveal from="left" distance={45}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: "clamp(26px,3.2vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#ffffffff",
              margin: "8px 0 24px",
            }}
          >
            Cada nido que protegemos es una playa que{" "}
            <span style={{ color: TOKENS.atardecer }}>sigue viva</span>.
          </h1>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "15px",
              color: "#E7F0EC",
              lineHeight: 1.55,
              margin: "0 0 12px",
              fontWeight: 500,
              maxWidth: "48ch",
            }}
          >
            Somos el Campamento Tortuguero "El Habillal" A.C., una asociación civil sin fines de lucro dedicada a la protección de la anidación de tortugas marinas en Lázaro Cárdenas, Michoacán.          </p>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "15px",
              color: "#9bd797ff",
              lineHeight: 1.55,
              margin: "0 0 20px",
              fontWeight: 500,
              maxWidth: "48ch",
            }}
          >Con tu apoyo podemos salvar a nuestras tortugas.</p>

          <div className="tt-hero-buttons">
            <Button tone="shock" size="lg" onClick={() => go("dona")}>Dona ahora</Button>
            <Button tone="verde" size="lg" onClick={() => go("adopta")}>Adopta un nido</Button>
          </div>
        </Reveal>
      </div>
      <div className="tt-hero-shock-media">
        <img src={IMAGES.herohero} alt="Campamento Tortuguero" />
      </div>
    </section>
  );
}

function ImpactBar() {
  return (
    <section style={{ background: TOKENS.cieloClaro, padding: "48px 0 56px" }}>
      <Reveal>
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <img
            src={LOGO_URL}
            alt="Logo Campamento Tortuguero El Habillal A.C."
            style={{ width: "180px", height: "auto", display: "inline-block" }}
          />
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 700,
              color: TOKENS.noche,
              letterSpacing: "0.08em",
              marginTop: "16px",
              marginBottom: 0,
              textTransform: "uppercase",
            }}
          >
            CAMPAMENTO TORTUGUERO "EL HABILLAL" A.C.
          </h3>
        </div>
      </Reveal>
      <div className="tt-cols-4" style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 32px" }}>
        <StatCard value={9000} suffix="+" label="Nidos protegidos" tone="azul" />
        <StatCard value={100000} suffix="+" label="Crías liberadas" tone="verde" />
        <StatCard value={3} label="Especies protegidas" tone="coral" />
        <StatCard value={13} label="Temporadas consecutivas" tone="azul" />
      </div>
    </section>
  );
}

function ThreePillars() {
  return <FourPillars compact />;
}

function TurtleSpecies() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const species = [
    {
      nombre: "Tortuga negra",
      cientifico: "Chelonia mydas agassizii",
      src: IMAGES.turtleOnBeach,
      d: "También llamada prieta; su presencia de anidación en las playas de Michoacán es limitada y de alta importancia para el campamento.",
      tone: "verde",
    },
    {
      nombre: "Tortuga golfina",
      cientifico: "Lepidochelys olivacea",
      src: IMAGES.turtleCloseup,
      d: "La más pequeña de las tortugas marinas del Pacífico. Sus nidos suelen ser numerosos y su temporada de arribo es una de las más activas.",
      tone: "coral",
    },
    {
      nombre: "Tortuga laúd",
      cientifico: "Dermochelys coriacea",
      src: IMAGES.laud,
      d: "La tortuga marina más grande del mundo. Sus nidos son de los más vulnerables y reciben un seguimiento especialmente cercano.",
      tone: "azul",
    },
  ];

  const toneColors = {
    verde: { text: TOKENS.verdeOscuro, bg: `${TOKENS.verde}15`, border: TOKENS.verde },
    coral: { text: TOKENS.coralOscuro, bg: `${TOKENS.coral}15`, border: TOKENS.coral },
    azul: { text: TOKENS.azulOlaOscuro, bg: `${TOKENS.azulOla}15`, border: TOKENS.azulOla },
  };

  return (
    <section className="tt-section-responsive" style={{ background: TOKENS.cieloClaro, padding: "64px 32px", position: "relative", overflow: "hidden" }}>
      <WaveVectorBackground style={{ transform: "translateY(60px)" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHead eyebrow="Especies del Habillal" eyebrowColor={TOKENS.azulOlaOscuro} title="Conoce a las tortugas del Habillal" titleMaxWidth="22ch" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "36px", marginTop: "40px" }}>
          {species.map((s, i) => {
            const isOpen = !!openItems[i];
            const toneInfo = toneColors[s.tone] || toneColors.azul;

            return (
              <Reveal key={s.nombre} delay={i * 100} from="up">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: "200px", maxWidth: "60%" }}>
                    <PhotoFrame shape="circle" tone={s.tone} src={s.src} video={s.video} />
                  </div>
                  <button
                    onClick={() => toggleItem(i)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Ocultar información de ${s.nombre}` : `Más información sobre ${s.nombre}`}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "4px 0",
                      margin: "16px 0 0",
                      fontFamily: "'Public Sans', sans-serif",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      outline: "none",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: TOKENS.noche,
                        margin: 0,
                      }}
                    >
                      {s.nombre}
                    </h3>
                    <span
                      style={{
                        display: "inline-block",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        fontSize: "12px",
                        color: toneInfo.text,
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "14px 16px",
                        background: toneInfo.bg,
                        borderLeft: `3px solid ${toneInfo.border}`,
                        width: "100%",
                        boxSizing: "border-box",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: "13px",
                          fontStyle: "italic",
                          fontWeight: 600,
                          color: toneInfo.text,
                          margin: "0 0 8px",
                        }}
                      >
                        {s.cientifico}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: "14px",
                          color: TOKENS.conchaSuave,
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {s.d}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HelpNow({ go }) {
  return (
    <section
      style={{
        padding: "64px 32px",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, rgba(16,38,43,0.93), rgba(16,38,43,0.96)), url("${IMAGES.turtleInfrared}") center/cover`,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <SectionHead
          titleColor="#FBF8F2"
          titleMaxWidth="22ch"
          title="Ya viste el trabajo. Ahora decide cómo ser parte de la próxima liberación."
        />
        <div className="tt-cols-2" style={{ marginTop: "32px", alignItems: "stretch" }}>
          <Reveal from="left" distance={44} delay={80} style={{ height: "100%" }}>
            <div style={{ background: "rgba(27,58,65,0.72)", backdropFilter: "blur(6px)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px", height: "100%", boxSizing: "border-box" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "22px", margin: 0 }}>Adopta un nido</h3>
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "14px", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                Sigue a un nido real desde su siembra en vivero hasta el momento en que sus crías tocan el mar. Forma parte de su historia completa.
              </p>
              <Button tone="verde" onClick={() => go("adopta")}>Ir a adoptar nido</Button>
            </div>
          </Reveal>
          <Reveal from="right" distance={44} delay={180} style={{ height: "100%" }}>
            <div style={{ background: "rgba(27,58,65,0.72)", backdropFilter: "blur(6px)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "14px", height: "100%", boxSizing: "border-box" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "22px", margin: 0 }}>Dona al programa</h3>
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "14px", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                Cada peso se destina a fortalecer la conservación: tu apoyo sostiene los materiales e insumos para patrullajes y operativos que protegen las tortugas marinas en las playas de Michoacán.
              </p>
              <Button tone="azul" onClick={() => go("dona")}>Ir a donaciones</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NextEvent({ go }) {
  return (
    <section style={{ background: TOKENS.arena, padding: "56px 32px" }}>
      <div className="tt-proximo-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <PhotoFrame shape="portrait" tone="arena" src={IMAGES.tortufest2edGroup} />
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>Próximos eventos</Eyebrow>
          <H2>Liberación de crías — temporada 2026-2027</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.6, maxWidth: "50ch", margin: "14px 0 20px" }}>
            Acompáñanos en la liberación abierta al público en El Habillal. Contáctanos para más información.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button tone="verde" onClick={() => go("visita")}>Agendar mi visita</Button>
            <Button tone="outline" onClick={() => go("contacto")}>
              <span style={{ color: TOKENS.concha }}>Contáctanos</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section style={{ background: TOKENS.cieloClaro, padding: "56px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead title="Visítanos" titleMaxWidth="20ch" />
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
      <ImpactBar />
      <WaveDivider fromColor={TOKENS.cieloClaro} toColor={TOKENS.arena} />
      <ThreePillars />
      <TurtleSpecies />
      <HelpNow go={go} />
      <NextEvent go={go} />
      <SponsorsStrip />
      <LocationMap />
    </div>
  );
}

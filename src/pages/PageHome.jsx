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
              margin: "8px 0 60px",
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
            El Campamento Tortuguero "El Habillal" A.C. protege nidos, libera crías y forma a la comunidad de Lázaro Cárdenas en torno a la conservación de tortugas marinas.
          </p>
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
          >Tu apoyo hoy decide si una tortuga llega viva al mar mañana.</p>

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
      <div className="tt-cols-4" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <StatCard value={9000} suffix="+" label="Nidos protegidos" tone="azul" />
        <StatCard value={100000} suffix="+" label="Crías liberadas" tone="verde" />
        <StatCard value={3} label="Especies protegidas" tone="coral" />
        <StatCard value={13} label="Temporadas consecutivas" tone="azul" />
      </div>
      <Reveal delay={150}>
        <div style={{ textAlign: "center", marginTop: "40px", padding: "0 20px" }}>
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
    </section>
  );
}

function ThreePillars() {
  const pillars = [
    { t: "Patrullajes nocturnos", d: "Monitoreo constante de las playas durante la noche para identificar y proteger nidos de tortuga: localización, identificación de la especie y registro de datos para la investigación.", tone: "azul", src: IMAGES.turtleInfrared },
    { t: "Reubicación de huevos", d: "Traslado de nidos a corrales de incubación seguros dentro del campamento, protegiéndolos de depredadores, el clima y la actividad humana, y aumentando las tasas de eclosión.", tone: "verde", src: IMAGES.nestEggsHole },
    { t: "Liberación de crías", d: "Al emerger de los huevos, las crías se aclimatan brevemente antes de ser liberadas al mar, en un proceso cuidadoso que asegura su transición segura al océano.", tone: "coral", src: IMAGES.hatchlingsToWaves },
    { t: "Educación ambiental", d: "Talleres y programas educativos para concientizar a la comunidad sobre la importancia de las tortugas marinas y promover la participación ciudadana en su protección.", tone: "atardecer", src: IMAGES.tortufest1edPlatica },
  ];

  const tagMap = {
    azul: { bg: TOKENS.azulOla, fg: "#fff", textColor: TOKENS.azulOlaOscuro },
    verde: { bg: TOKENS.verde, fg: "#fff", textColor: TOKENS.verdeOscuro },
    coral: { bg: TOKENS.coral, fg: "#fff", textColor: TOKENS.coralOscuro },
    atardecer: { bg: TOKENS.atardecer, fg: "#fff", textColor: TOKENS.atardecerOscuro },
  };

  return (
    <section className="tt-section-responsive" style={{ padding: "56px 32px", background: TOKENS.arena }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="Qué hacemos" title="Cuatro frentes, un mismo objetivo" titleMaxWidth="20ch" />
        <div style={{ marginTop: "24px" }}>
          {pillars.map((c, i) => {
            const isEven = i % 2 === 0;
            const styleInfo = tagMap[c.tone];
            return (
              <Reveal key={c.t} delay={i * 90} from={isEven ? "left" : "right"}>
                <div className={`tt-pillar-row ${!isEven ? "tt-pillar-reverse" : ""}`}>
                  <div className="tt-pillar-photo">
                    <PhotoFrame shape="wide" tone={c.tone} src={c.src} video={c.video} style={{ aspectRatio: "16/10", borderRadius: 0 }} />
                  </div>
                  <div className="tt-pillar-body">
                    <span
                      className="tag"
                      style={{
                        background: styleInfo.bg,
                        color: styleInfo.fg,
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "6px 14px",
                        borderRadius: 0,
                        display: "inline-block",
                      }}
                    >
                      {c.t}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: "15px",
                        color: styleInfo.textColor,
                        fontWeight: 700,
                        lineHeight: 1.6,
                        margin: "12px 0 0",
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
    <section className="tt-section-responsive" style={{ background: TOKENS.cieloClaro, padding: "64px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="Especies del Habillal" eyebrowColor={TOKENS.azulOlaOscuro} title="Conoce a las tortugas del Habillal" titleMaxWidth="22ch" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "36px", marginTop: "40px" }}>
          {species.map((s, i) => {
            const isOpen = !!openItems[i];
            const toneInfo = toneColors[s.tone] || toneColors.azul;

            return (
              <Reveal key={s.nombre} delay={i * 100} from="up">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <PhotoFrame shape="wide" tone={s.tone} src={s.src} video={s.video} style={{ aspectRatio: "16/10", width: "100%" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: TOKENS.noche,
                      margin: "16px 0 10px",
                    }}
                  >
                    {s.nombre}
                  </h3>
                  <button
                    onClick={() => toggleItem(i)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "4px 0",
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: toneInfo.text,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      outline: "none",
                    }}
                  >
                    <span>{isOpen ? "Menos información" : "Más información"}</span>
                    <span
                      style={{
                        display: "inline-block",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        fontSize: "12px",
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
            <div style={{ background: "rgba(27,58,65,0.72)", backdropFilter: "blur(6px)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", height: "100%", boxSizing: "border-box" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "22px", margin: 0 }}>Adopta un nido</h3>
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "14px", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                Sigue a un nido real desde su siembra en vivero hasta el momento en que sus crías tocan el mar. Forma parte de su historia completa.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}><Button tone="verde" onClick={() => go("adopta")}>Ir a adoptar nido</Button></div>
            </div>
          </Reveal>
          <Reveal from="right" distance={44} delay={180} style={{ height: "100%" }}>
            <div style={{ background: "rgba(27,58,65,0.72)", backdropFilter: "blur(6px)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", height: "100%", boxSizing: "border-box" }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "22px", margin: 0 }}>Dona al programa</h3>
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "14px", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                Cada peso se destina a fortalecer la conservación: tu apoyo sostiene los materiales e insumos para patrullajes y operativos que protegen las tortugas marinas en las playas de Michoacán.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}><Button tone="azul" onClick={() => go("dona")}>Ir a donaciones</Button></div>
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

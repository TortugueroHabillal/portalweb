import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Eyebrow, H2, SectionHead } from "../components/Typography";

const ACCIONES = [
  {
    accion: "Protegemos",
    desc: "Mediante patrullajes nocturnos en playa, colecta segura de nidos y resguardo activo en el corral de incubación.",
    tone: "azul",
    src: IMAGES.teamNesting,
  },
  {
    accion: "Divulgamos",
    desc: "Educación ambiental sobre el respeto e importancia de nuestras especies a escuelas, visitantes y comunidad local.",
    tone: "verde",
    src: IMAGES.teamEntrance,
  },
  {
    accion: "Unimos",
    desc: "Alianzas comunitarias con pescadores, familias de El Habillal, voluntarios de Lázaro Cárdenas y comunidad externa.",
    tone: "coral",
    src: IMAGES.teamDigging,
  },
  {
    accion: "Respetamos",
    desc: "Las prácticas de conservación ética en cada interacción: desde el arribo de hembras hasta la liberación de cada cría.",
    tone: "arena",
    src: IMAGES.hutchinsonFamily,
  },
];

function Intro() {
  return (
    <section style={{ background: TOKENS.espuma, padding: "36px 0", overflow: "hidden" }}>
      <div className="tt-about-intro-grid">
        <Reveal style={{ padding: "0 32px" }}>
          <Eyebrow>Quiénes somos</Eyebrow>
          <H2>Un campamento nacido de la comunidad, por amor a nuestras especies.</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.7, marginTop: "16px", maxWidth: "52ch" }}>
            Desde El Habillal, en Lázaro Cárdenas, Michoacán, trabajamos junto a familias, pescadores locales, estudiantes y comunidad local para proteger cada temporada de anidación mediante protocolos ambientales certificados, eventos comunitarios y turismo responsable.
          </p>
        </Reveal>
        <Reveal delay={120} className="tt-about-intro-photo">
          <PhotoFrame shape="wide" tone="azul" src={IMAGES.teamFieldwork} style={{ aspectRatio: "16/10" }} />
        </Reveal>
      </div>
    </section>
  );
}

function MisionVision() {
  return (
    <section style={{ background: TOKENS.cieloClaro, padding: "56px 32px" }}>
      <div className="tt-cols-2" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal from="left" distance={40}>
          <H2 maxWidth="8ch">Misión</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.75, marginTop: "14px" }}>
            Somos una asociación civil sin fines de lucro comprometida con el cuidado del medio ambiente, con el objetivo principal de proteger y conservar la tortuga marina para preservar las especies que arriban a la costa de Michoacán.
          </p>
        </Reveal>
        <Reveal from="right" delay={120} distance={40}>
          <H2 color={TOKENS.azulOlaOscuro} maxWidth="8ch">Visión</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", lineHeight: 1.75, marginTop: "14px" }}>
            Convertirnos en uno de los principales centros de protección y conservación de la tortuga marina del país, contribuyendo con investigación y cifras positivas en reproducción de crías, siendo un atractivo turístico sostenible y sustentable, y creando conciencia ambiental en cada ser humano.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section
      style={{
        position: "relative",
        padding: "64px 24px 72px",
        background: `linear-gradient(rgba(237,230,214,0.92), rgba(237,230,214,0.96)), url("${IMAGES.campAerial}") center/cover fixed`,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative" }}>
        <SectionHead eyebrow="Nuestro equipo" title="Un equipo, una misma causa" titleMaxWidth="20ch">
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "18.5px",
              fontWeight: 600,
              color: TOKENS.azulOla,
              margin: "16px auto 10px",
              maxWidth: "58ch",
              lineHeight: 1.45,
            }}
          >
            Bienvenidos a Campamento Tortuguero El Habillal, una asociación civil sin fines de lucro dedicada a la conservación y protección de las tortugas marinas en nuestras costas.
          </p>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "14.5px",
              color: TOKENS.conchaSuave,
              margin: "0 auto",
              maxWidth: "54ch",
              lineHeight: 1.6,
            }}
          >
            Nuestro objetivo es promover la educación ambiental y el turismo responsable brindando experiencias únicas en honor a la conservación.
          </p>
        </SectionHead>

        {/* Fila única de fotos verticales (Portrait aspect-ratio sin recortes) */}
        <div className="tt-cols-4" style={{ marginTop: "44px", gap: "22px", alignItems: "stretch" }}>
          {ACCIONES.map((item, i) => (
            <Reveal key={item.accion} delay={i * 80}>
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <PhotoFrame shape="portrait" tone={item.tone} src={item.src} style={{ aspectRatio: "3/4" }} />
                <div style={{ marginTop: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: TOKENS.noche,
                      margin: "0 0 6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: TOKENS.azulOla }}>✦</span>
                    {item.accion}
                  </h3>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: TOKENS.conchaSuave, lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageAbout() {
  return (
    <div>
      <Intro />
      <MisionVision />
      <Team />
    </div>
  );
}

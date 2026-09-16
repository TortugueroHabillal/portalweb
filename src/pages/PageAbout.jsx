import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { MosaicGrid } from "../components/MosaicGrid";
import { Eyebrow, H2, SectionHead } from "../components/Typography";

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
            Convertirnos en uno de los principales centros de protección y conservación de la tortuga marina del país, contribuyendo con investigación y cifras positively en reproducción de crías, siendo un atractivo turístico sostenible y sustentable, y creando conciencia ambiental en cada ser humano.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  const fotos = [
    { tone: "azul", src: IMAGES.teamNesting },
    { tone: "verde", src: IMAGES.teamEntrance },
    { tone: "coral", src: IMAGES.teamDigging },
    { tone: "arena", src: IMAGES.hutchinsonFamily },
  ];
  return (
    <section
      style={{
        position: "relative",
        padding: "56px 32px",
        background: `linear-gradient(rgba(237,230,214,0.92), rgba(237,230,214,0.96)), url("${IMAGES.campAerial}") center/cover fixed`,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <SectionHead eyebrow="Nuestro equipo" title="Un equipo, una misma causa" titleMaxWidth="20ch">
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "14.5px", margin: "12px auto 0", maxWidth: "56ch" }}>
            Bienvenidos a Campamento Tortuguero El Habillal, una asociación civil sin fines de lucro dedicada a la conservación y protección de las tortugas marinas en nuestras costas. Nuestro objetivo es promover la educación ambiental y el turismo responsable, brindando experiencias unicas en honor a la conservación.          </p>
        </SectionHead>
        <div className="tt-cols-4" style={{ marginTop: "32px" }}>
          {fotos.map((f, i) => (
            <Reveal key={f.src} delay={i * 90}>
              <PhotoFrame shape="portrait" tone={f.tone} src={f.src} />
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

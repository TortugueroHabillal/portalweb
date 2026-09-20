import { TOKENS, SECTION_BG, SPACE, RADIUS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { HeroShock } from "../components/HeroShock";
import { Button } from "../components/Button";
import { SectionHead } from "../components/Typography";
import { CircleVectors } from "../components/CircleVectors";

const ACTIVIDADES = [
  { t: "Patrullajes nocturnos en playa y registro de hembras anidadoras.", tone: TOKENS.azulOla },
  { t: "Traslado y colecta segura de nidos al corral de incubación.", tone: TOKENS.verde },
  { t: "Monitoreo de nidos, conteo de eclosión y liberación de crías.", tone: TOKENS.azulOla },
  { t: "Mantenimiento de instalaciones del campamento y atención a visitantes.", tone: TOKENS.verde },
  { t: "Participación en programas educativos y recepción de grupos escolares.", tone: TOKENS.azulOla },
];

const PASOS = [
  { n: "01", t: "Elige tu modalidad", d: "Revisa las opciones (Servicio Social, Voluntariado o Prácticas) según tu disponibilidad.", tone: TOKENS.azulOla },
  { n: "02", t: "Contáctanos", d: "Envíanos un mensaje manifestando tu interés y anexando tus datos básicos de contacto.", tone: TOKENS.verde },
  { n: "03", t: "Entrevista y registro", d: "Evaluaremos tu perfil y te referiremos a una entrevista virtual o presencial previo a tu aceptación al equipo.", tone: TOKENS.coralOscuro },
];

export function PageConvocatorias({ go }) {
  const handleGoContacto = () => {
    if (go) go("contacto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 1. Hero — mismo patrón oscuro dividido que el resto del sitio */}
      <HeroShock image={IMAGES.teamDigging} imageAlt="Equipo de voluntarios trabajando en El Habillal" align="center">
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
          Súmate al equipo
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
          Convocatorias y
          <br />
          <span style={{ color: TOKENS.cieloOscuro }}>participación</span> activa.
        </h1>
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15.5px", color: "#E7F0EC", lineHeight: 1.6, maxWidth: "48ch", margin: 0 }}>
          Integra tus conocimientos y vocación a las actividades del campamento. Elige una modalidad y contáctanos para iniciar tu proceso.
        </p>
      </HeroShock>

      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />

      {/* 2. Modalidades abiertas + cartel oficial */}
      <section style={{ position: "relative", padding: `${SPACE.xxl}px ${SPACE.lg}px`, background: SECTION_BG.claro, overflow: "hidden" }}>
        <CircleVectors variant="light" />
        <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "780px", margin: `0 auto ${SPACE.xxl}px` }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 30px)", color: TOKENS.noche, lineHeight: 1.35, margin: 0 }}>
                Contamos con convocatorias abiertas para{" "}
                <span style={{ color: TOKENS.verde }}>Servicio Social</span>,{" "}
                <span style={{ color: TOKENS.azulOlaOscuro }}>Prácticas Profesionales</span>{" "}
                y{" "}
                <span style={{ color: TOKENS.coralOscuro }}>Voluntariado de Temporada</span>.
              </h2>
            </div>
          </Reveal>

          <div className="tt-cols-2" style={{ gap: SPACE.xl, alignItems: "stretch" }}>
            <Reveal from="left" style={{ height: "100%" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: RADIUS.card + 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 44px -14px rgba(16,38,43,0.18)",
                  border: "1px solid rgba(16, 38, 43, 0.1)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={IMAGES.practicasFlyer}
                  alt="Cartel oficial de Prácticas y Voluntariado"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: SPACE.md, justifyContent: "space-between", height: "100%" }}>
              <Reveal delay={100} from="right" style={{ flex: 1 }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: RADIUS.card + 4,
                    padding: `${SPACE.md + 4}px ${SPACE.md + 2}px`,
                    border: "1px solid rgba(16, 38, 43, 0.08)",
                    boxShadow: "0 12px 30px -10px rgba(16,38,43,0.08)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, color: TOKENS.noche, margin: "0 0 16px" }}>
                    Actividades a realizar
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: SPACE.sm - 4 }}>
                    {ACTIVIDADES.map((act, idx) => (
                      <li key={idx} style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: act.tone, marginTop: "6px", flexShrink: 0 }} />
                        <span>{act.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={200} from="right">
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: RADIUS.card + 2,
                    padding: `${SPACE.md}px`,
                    border: "1px solid rgba(16, 38, 43, 0.08)",
                    boxShadow: "0 10px 24px -10px rgba(16,38,43,0.06)",
                  }}
                >
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "19px", fontWeight: 700, color: TOKENS.noche, margin: "0 0 10px" }}>
                    Perfiles que buscamos
                  </h4>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.65, margin: 0 }}>
                    Buscamos estudiantes de <strong style={{ color: TOKENS.noche }}>Biología, Medicina Veterinaria, Ingeniería Ambiental y carreras afines</strong>, así como a la <strong style={{ color: TOKENS.noche }}>comunidad en general</strong>, y entusiastas comprometidos con la conservación de las especies marinas.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />

      {/* 3. Pasos de postulación */}
      <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <SectionHead title="¿Cómo realizar tu registro?" titleMaxWidth="26ch" />
          <div className="tt-cols-3" style={{ gap: SPACE.md, marginTop: SPACE.xl }}>
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={80 + i * 70}>
                <div
                  style={{
                    background: "#ffffff",
                    padding: `${SPACE.md + 4}px ${SPACE.md}px`,
                    borderRadius: RADIUS.card,
                    borderTop: `3px solid ${p.tone}`,
                    boxShadow: "0 10px 24px -10px rgba(16,38,43,0.06)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "36px", fontWeight: 700, color: p.tone, display: "block", lineHeight: 1, marginBottom: SPACE.sm - 4 }}>
                    {p.n}
                  </span>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18.5px", color: TOKENS.noche, margin: "0 0 8px" }}>
                    {p.t}
                  </h3>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0, lineHeight: 1.55 }}>
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor={TOKENS.espuma} toColor={SECTION_BG.claro} />

      {/* 4. Llamado final a contacto */}
      <section style={{ padding: `${SPACE.xl}px ${SPACE.lg}px ${SPACE.xxl}px`, textAlign: "center", background: SECTION_BG.claro }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.2vw, 34px)", fontWeight: 700, color: TOKENS.noche, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
              ¿Listo para enviar tu solicitud?
            </h2>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "16px", color: TOKENS.conchaSuave, margin: "0 auto 28px", lineHeight: 1.6 }}>
              Haz clic abajo para ir al formulario directo de contacto, indicando la modalidad que te interesa.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button tone="shock" size="lg" onClick={handleGoContacto}>Contáctanos</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

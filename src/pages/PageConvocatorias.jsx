import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";

const ACTIVIDADES = [
  "Patrullajes nocturnos en playa y registro de hembras anidadoras.",
  "Traslado y colecta segura de nidos al corral de incubación.",
  "Monitoreo de nidos, conteo de eclosión y liberación de crías.",
  "Mantenimiento de instalaciones del campamento y atención a visitantes.",
  "Participación en programas educativos y recepción de grupos escolares.",
];

const PASOS = [
  { n: "01", t: "Elige tu modalidad", d: "Revisa las opciones (Servicio Social, Voluntariado o Prácticas) según tu disponibilidad." },
  { n: "02", t: "Contáctanos", d: "Envíanos un mensaje manifestando tu interés y anexando tus datos básicos de contacto." },
  { n: "03", t: "Entrevista y Registro", d: "Evaluaremos tu perfil y te referiremos a una entrevista virtual o presencial previo a tu aceptación al equipo." },
];

export function PageConvocatorias({ go }) {
  const handleGoContacto = () => {
    if (go) go("contacto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: TOKENS.arena, minHeight: "100vh", position: "relative" }}>
      {/* 1. Cabecera Estilizada Clara */}
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
              Súmate a la conservación
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
              Convocatorias & Participación
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
              Integra tus conocimientos y vocación a las actividades del Campamento El Habillal. Selecciona una modalidad y contáctanos para iniciar tu proceso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Sección Principal en Fondo Arena Limpio con Margen que Aleja el Cartel del Primer Pantallazo */}
      <section
        style={{
          position: "relative",
          padding: "44px 24px 72px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Contenedor Blanco Centrado ("Contamos con...") con amplio margen inferior (100px - 140px) para dejar la visualización inicial limpia en web y móvil */}
          <Reveal>
            <div
              style={{
                textAlign: "center",
                maxWidth: "900px",
                margin: "0 auto clamp(90px, 14vh, 140px)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "26px 38px",
                  border: `1px solid ${TOKENS.arenaOscura}`,
                  boxShadow: "0 12px 32px -8px rgba(16,38,43,0.12)",
                  display: "inline-block",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "17px",
                    color: TOKENS.concha,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Contamos con convocatorias abiertas para{" "}
                  <strong style={{ color: TOKENS.verde, fontWeight: 700 }}>Servicio Social</strong>,{" "}
                  <strong style={{ color: TOKENS.azulOlaOscuro, fontWeight: 700 }}>Prácticas Profesionales</strong>{" "}
                  y{" "}
                  <strong style={{ color: TOKENS.coral, fontWeight: 700 }}>Voluntariado de Temporada</strong>.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="tt-cols-2" style={{ gap: "48px", alignItems: "stretch" }}>
            {/* Columna Izquierda: Cartel Oficial */}
            <Reveal from="left" style={{ height: "100%" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
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
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>

            {/* Columna Derecha: Tarjetas de Actividades y Perfiles Ampliados */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "space-between", height: "100%" }}>

              {/* Actividades a Realizar */}
              <Reveal delay={100} from="right" style={{ flex: 1 }}>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "28px 26px",
                    border: "1px solid rgba(16, 38, 43, 0.08)",
                    boxShadow: "0 12px 30px -10px rgba(16,38,43,0.08)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: TOKENS.noche,
                      margin: "0 0 16px",
                    }}
                  >
                    Actividades a realizar
                  </h4>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {ACTIVIDADES.map((act, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: "14.5px",
                          color: TOKENS.conchaSuave,
                          lineHeight: 1.5,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: TOKENS.coral,
                            marginTop: "6px",
                            flexShrink: 0,
                          }}
                        />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Perfiles que Buscamos */}
              <Reveal delay={200} from="right">
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "26px 26px",
                    border: `1.5px dashed ${TOKENS.coral}`,
                    boxShadow: "0 10px 24px -10px rgba(16,38,43,0.06)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: TOKENS.noche,
                      margin: "0 0 10px",
                    }}
                  >
                    Perfiles que buscamos
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: "14.5px",
                      color: TOKENS.conchaSuave,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    Buscamos estudiantes de <strong style={{ color: TOKENS.noche }}>Biología, Medicina Veterinaria, Ingeniería Ambiental y carreras afines</strong>, así como a la <strong style={{ color: TOKENS.noche }}>comunidad en general</strong>, y entusiastas comprometidos con la conservación de las especies marinas.
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* Separador Wave Superior hacia Pasos en Arena */}
      <div style={{ lineHeight: 0, background: TOKENS.arena }}>
        <WaveDivider fromColor={TOKENS.arena} toColor={TOKENS.cieloClaro} />
      </div>

      {/* 3. Pasos de Postulación en Fondo Cielo Claro */}
      <section
        style={{
          background: TOKENS.cieloClaro,
          padding: "54px 24px 64px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 40px" }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3vw, 32px)", color: TOKENS.noche, margin: "4px 0" }}>
                ¿Cómo realizar tu registro?
              </h2>
            </div>
          </Reveal>

          <div className="tt-cols-3" style={{ gap: "24px" }}>
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={80 + i * 70}>
                <div
                  style={{
                    background: "#ffffff",
                    padding: "28px 24px",
                    borderRadius: "16px",
                    boxShadow: "0 10px 24px -10px rgba(16,38,43,0.06)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "36px",
                      fontWeight: 700,
                      color: TOKENS.coral,
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
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

      {/* Separador Wave Inferior desde Pasos hacia el Cierre de Arena */}
      <div style={{ lineHeight: 0, background: TOKENS.cieloClaro }}>
        <WaveDivider fromColor={TOKENS.cieloClaro} toColor={TOKENS.arena} />
      </div>

      {/* 4. Llamado Final a Contacto */}
      <section style={{ padding: "54px 24px 64px", textAlign: "center", background: TOKENS.arena }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 3.2vw, 34px)",
                fontWeight: 900,
                color: TOKENS.noche,
                margin: "0 0 14px",
                letterSpacing: "-0.01em",
              }}
            >
              ¿Listo para enviar tu solicitud?
            </h2>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "16px", color: TOKENS.conchaSuave, margin: "0 auto 28px", lineHeight: 1.6 }}>
              Haz clic abajo para ir al formulario directo de contacto, indicando la modalidad que te interesa.
            </p>
            <button
              onClick={handleGoContacto}
              style={{
                background: TOKENS.coral,
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "14px 38px",
                fontSize: "15.5px",
                fontWeight: 700,
                fontFamily: "'Public Sans', sans-serif",
                cursor: "pointer",
                boxShadow: "none",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = TOKENS.atardecer;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = TOKENS.coral;
              }}
            >
              Contáctanos →
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

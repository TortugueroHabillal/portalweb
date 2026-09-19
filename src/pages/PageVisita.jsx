import { useState } from "react";
import { TOKENS, SECTION_BG, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { HeroShock } from "../components/HeroShock";

function scrollToReserva() {
  document.getElementById("reserva-visita")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const TIPOS_GRUPO = ["Académico", "Empresarial", "Gubernamental", "Comunitario", "Turístico", "Otro"];

function FieldLabel({ children }) {
  return (
    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "6px" }}>
      {children}
    </label>
  );
}

export function PageVisita() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    origen: "",
    fecha: "",
    asistentes: "",
    tipo: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    height: "44px",
    border: `1px solid ${TOKENS.arenaOscura}`,
    borderRadius: "12px",
    background: "#fff",
    color: TOKENS.noche,
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "14px",
    padding: "0 14px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Hero — mismo patrón oscuro dividido que Home/Dona/Adopta (HeroShock) */}
      <HeroShock image={IMAGES.campAerial2} imageAlt="Vista aérea del Campamento Tortuguero El Habillal" align="center">
        <span
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "12.5px",
            fontWeight: 700,
            color: TOKENS.cieloClaro,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 10px",
            display: "block",
          }}
        >
          Vive la experiencia en El Habillal
        </span>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 3.8vw, 48px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 16px",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Visítanos y Vive la Conservación
        </h1>

        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "15px",
            color: "#E7F0EC",
            lineHeight: 1.6,
            maxWidth: "48ch",
            margin: "0 auto 12px",
          }}
        >
          Forma parte de nuestros recorridos guiados, pláticas ambientales y actividades de conservación de tortugas marinas junto a nuestro equipo especializado.
        </p>

        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "16px", color: TOKENS.atardecer, fontWeight: 700, margin: "0 0 20px" }}>
          Una experiencia envolvente única.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button tone="verde" size="lg" onClick={scrollToReserva}>Agendar mi visita</Button>
        </div>
      </HeroShock>

      {/* 2. Sección del Formulario de Reserva (Sin mención de 'hasta 12 personas') */}
      <section id="reserva-visita" style={{ padding: "48px 24px 72px", position: "relative", zIndex: 2, background: TOKENS.arena, scrollMarginTop: "88px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                background: "#ffffff",
                borderRadius: "28px",
                padding: "clamp(28px, 5vw, 48px)",
                boxShadow: "0 20px 48px -18px rgba(16,38,43,0.12)",
                border: `1px solid ${TOKENS.arenaOscura}`,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: TOKENS.azulOlaOscuro,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Reserva tu Lugar
                </span>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(24px, 3.2vw, 34px)",
                    fontWeight: 700,
                    color: TOKENS.noche,
                    margin: "0 0 10px",
                  }}
                >
                  Agenda tu recorrido guiado
                </h2>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    color: TOKENS.conchaSuave,
                    fontSize: "15.5px",
                    lineHeight: 1.6,
                    margin: "0 auto",
                    maxWidth: "580px",
                  }}
                >
                  Recorridos disponibles de martes a domingo. Atendemos grupos escolares, familiares y turísticos.
                </p>
              </div>

              {sent ? (
                <div style={{ padding: "32px 16px", textAlign: "center" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: TOKENS.espuma,
                      color: TOKENS.verdeOscuro,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "30px",
                      margin: "0 auto 20px",
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.verdeOscuro, fontSize: "24px", margin: "0 0 12px", fontWeight: 700 }}>
                    ¡Solicitud enviada con éxito!
                  </h3>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15px", color: TOKENS.conchaSuave, lineHeight: 1.6, margin: "0 0 24px" }}>
                    Gracias <strong>{form.nombre}</strong>. Nos pondremos en contacto contigo vía <strong>{form.correo}</strong> para confirmar la fecha de tu visita.
                  </p>
                  <Button tone="verde" style={{ borderRadius: "999px", padding: "12px 28px" }} onClick={() => setSent(false)}>
                    Agendar otra visita
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <div className="tt-field-full">
                      <FieldLabel>Nombre completo *</FieldLabel>
                      <input
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Tu nombre completo"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <FieldLabel>Correo electrónico *</FieldLabel>
                      <input
                        type="email"
                        required
                        value={form.correo}
                        onChange={(e) => setForm({ ...form, correo: e.target.value })}
                        placeholder="tu@correo.com"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <FieldLabel>Lugar de origen</FieldLabel>
                      <input
                        type="text"
                        value={form.origen}
                        onChange={(e) => setForm({ ...form, origen: e.target.value })}
                        placeholder="Ciudad / Estado"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <FieldLabel>Fecha deseada *</FieldLabel>
                      <input
                        type="date"
                        required
                        value={form.fecha}
                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <FieldLabel>Asistentes</FieldLabel>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={form.asistentes}
                        onChange={(e) => setForm({ ...form, asistentes: e.target.value })}
                        placeholder="Ej. 4"
                        style={inputStyle}
                      />
                    </div>

                    <div className="tt-field-full">
                      <FieldLabel>Tipo de grupo</FieldLabel>
                      <select
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        style={inputStyle}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        {TIPOS_GRUPO.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: "28px" }}>
                    <Button type="submit" tone="verde" style={{ borderRadius: "999px", width: "100%", justifyContent: "center", padding: "14px 20px" }}>
                      Enviar solicitud de reserva
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Sección de Galería de Fotos Elegante con PhotoFrames Integradas */}
      <div style={{ lineHeight: 0, margin: 0, padding: 0 }}>
        <WaveDivider fromColor={TOKENS.arena} toColor={SECTION_BG.claro} />
      </div>

      <section style={{ background: SECTION_BG.claro, padding: "64px 24px 88px", position: "relative" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 48px" }}>
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
                Galería de Visitas
              </span>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: TOKENS.noche,
                  margin: "8px 0 0",
                  fontWeight: 700,
                }}
              >
                Comunidad y Turistas en Acción
              </h2>
            </div>

            {/* Display Visual Elegante de 3 Fotos usando PhotoFrame en composición tipo Tríptico Armónico */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "32px",
                alignItems: "center",
              }}
            >
              <Reveal delay={100}>
                <div style={{ textAlign: "center" }}>
                  <PhotoFrame shape="square" tone="azul" src={IMAGES.touristsSunsetRelease} />
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.noche, margin: "14px 0 4px", fontWeight: 700 }}>
                    Liberaciones al Atardecer
                  </h4>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0 }}>
                    Momentos inolvidables acompañando a las crías hacia el mar.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div style={{ textAlign: "center" }}>
                  <PhotoFrame shape="square" tone="verde" src={IMAGES.tourists1} />
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.noche, margin: "14px 0 4px", fontWeight: 700 }}>
                    Educación Ambiental
                  </h4>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0 }}>
                    Charlas y demostraciones sobre los procedimientos de protección de especies.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div style={{ textAlign: "center" }}>
                  <PhotoFrame shape="square" tone="coral" src={IMAGES.nightPatrolTeam} />
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.noche, margin: "14px 0 4px", fontWeight: 700 }}>
                    Recorridos y Patrullajes
                  </h4>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0 }}>
                    Experiencia directa con nuestro equipo técnico de campo.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import { useRef, useState } from "react";
import { TOKENS, SECTION_BG, SPACE, RADIUS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { Button } from "../components/Button";
import { HeroShock } from "../components/HeroShock";
import { SectionHead } from "../components/Typography";
import { CircleVectors } from "../components/CircleVectors";
import { createVisitRequest } from "../lib/visits";

function scrollToReserva() {
  document.getElementById("reserva-visita")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const TIPOS_GRUPO = [
  ["ACADEMIC", "Académico"],
  ["BUSINESS", "Empresarial"],
  ["GOVERNMENT", "Gubernamental"],
  ["COMMUNITY", "Comunitario"],
  ["TOURISM", "Turístico"],
  ["OTHER", "Otro"],
];

function FieldLabel({ children }) {
  return (
    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "6px" }}>
      {children}
    </label>
  );
}

const GALLERY = [
  { src: IMAGES.touristsSunsetRelease, tone: TOKENS.azulOla, title: "Liberaciones al atardecer", d: "Momentos inolvidables acompañando a las crías hacia el mar.", size: "main" },
  { src: IMAGES.tourists1, tone: TOKENS.verde, title: "Educación ambiental", d: "Charlas y demostraciones sobre los procedimientos de protección de especies.", size: "b" },
  { src: IMAGES.nightPatrolTeam, tone: TOKENS.coralOscuro, title: "Recorridos y patrullajes", d: "Experiencia directa con nuestro equipo técnico de campo.", size: "c" },
];

const REGLAS_VISITA = [
  { t: "Sigue las indicaciones de tu guía", tone: TOKENS.azulOla },
  { t: "No dejes basura ni la entierres en la arena", tone: TOKENS.verde },
  { t: "Evita luces artificiales directas hacia tortugas y nidos", tone: TOKENS.coralOscuro },
  { t: "Mantén distancia prudente de nidos y crías", tone: TOKENS.azulOlaOscuro },
  { t: "No toques ni levantes a las tortugas sin autorización", tone: TOKENS.verdeOscuro },
  { t: "Evita ruidos fuertes durante los recorridos nocturnos", tone: TOKENS.azulOla },
];

export function PageVisita() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    origen: "",
    fecha: "",
    asistentes: "",
    tipo: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [requestNumber, setRequestNumber] = useState(null);
  const idempotencyKey = useRef(crypto.randomUUID());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSubmitError("");
    try {
      const result = await createVisitRequest({
        idempotencyKey: idempotencyKey.current,
        name: form.nombre.trim(),
        email: form.correo.trim().toLowerCase(),
        phone: form.telefono.trim(),
        origin: form.origen.trim(),
        preferredDate: form.fecha,
        attendees: form.asistentes ? Number(form.asistentes) : 1,
        groupType: form.tipo,
      });
      setRequestNumber(result.request_number);
      setSent(true);
    } catch (error) {
      setSubmitError(error.message || "No pudimos registrar tu solicitud.");
    } finally {
      setSending(false);
    }
  };

  const resetRequest = () => {
    setForm({ nombre: "", correo: "", telefono: "", origen: "", fecha: "", asistentes: "", tipo: "" });
    setSent(false);
    setSubmitError("");
    setRequestNumber(null);
    idempotencyKey.current = crypto.randomUUID();
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
            color: TOKENS.cielo,
            letterSpacing: "0.18em",
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
            fontSize: "clamp(26px, 3.4vw, 44px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 16px",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Visítanos y vive
          <br />
          la <span style={{ color: TOKENS.cieloOscuro }}>conservación</span> de cerca.
        </h1>

        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "15px",
            color: "#E7F0EC",
            lineHeight: 1.6,
            maxWidth: "48ch",
            margin: "0 auto 24px",
          }}
        >
          Recorridos guiados, pláticas ambientales y actividades de conservación de tortugas marinas junto a nuestro equipo especializado.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button tone="verde" size="lg" onClick={scrollToReserva}>Agendar mi visita</Button>
        </div>
      </HeroShock>

      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />

      {/* 2. Sección del Formulario de Reserva */}
      <section id="reserva-visita" style={{ padding: "48px 24px 72px", position: "relative", zIndex: 2, background: SECTION_BG.claro, scrollMarginTop: "88px", overflow: "hidden" }}>
        <CircleVectors variant="light" />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div
              style={{
                background: "#ffffff",
                borderRadius: RADIUS.card + 12,
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
                  Reserva tu lugar
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
                    Gracias <strong>{form.nombre}</strong>. Registramos tu solicitud. Nos pondremos en contacto contigo vía <strong>{form.correo}</strong> para confirmar la fecha de tu visita.
                  </p>
                  <Button tone="verde" style={{ borderRadius: "999px", padding: "12px 28px" }} onClick={resetRequest}>
                    Agendar otra visita
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="tt-form-grid" style={{ gap: "18px" }}>
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
                      <FieldLabel>Teléfono / WhatsApp *</FieldLabel>
                      <input
                        type="tel"
                        required
                        minLength="7"
                        maxLength="30"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="Ej. 753 123 4567"
                        autoComplete="tel"
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

                    <div>
                      <FieldLabel>Tipo de grupo</FieldLabel>
                      <select
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                        style={inputStyle}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        {TIPOS_GRUPO.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: "28px" }}>
                    {submitError && <p role="alert" style={{ margin: "0 0 14px", color: "#B42318", fontFamily: "'Public Sans', sans-serif", fontSize: "13px", lineHeight: 1.5 }}>{submitError}</p>}
                    <Button type="submit" tone="verde" disabled={sending} style={{ borderRadius: "999px", width: "100%", justifyContent: "center", padding: "14px 20px", opacity: sending ? 0.65 : 1 }}>
                      {sending ? "Enviando solicitud..." : "Enviar solicitud de reserva"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />

      {/* 3. Reglas de visita — fotos en display asimétrico + lineamientos, cierre de página en espuma */}
      <section style={{ background: TOKENS.espuma, padding: "64px 24px 88px", position: "relative", overflow: "hidden" }}>
        <CircleVectors variant="light" />
        <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHead eyebrow="Antes de tu visita" eyebrowColor={TOKENS.azulOlaOscuro} title="Reglas para cuidar el santuario" titleMaxWidth="26ch" />

          <div className="tt-visita-reglas-grid" style={{ marginTop: SPACE.xl }}>
            <div className="tt-visita-gallery">
              {GALLERY.map((g, i) => (
                <Reveal key={g.title} delay={100 + i * 100} className={`tt-visita-photo-${g.size}`} from={g.size === "main" ? "left" : "up"}>
                  <div className="tt-species-tile" style={{ width: "100%", height: "100%" }}>
                    <img src={g.src} alt={g.title} loading="lazy" />
                  </div>
                </Reveal>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: SPACE.sm - 4 }}>
              {REGLAS_VISITA.map((r, i) => (
                <Reveal key={r.t} delay={100 + i * 60}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: SPACE.sm,
                      background: "#fff",
                      borderRadius: RADIUS.card,
                      padding: `${SPACE.sm}px ${SPACE.md - 4}px`,
                      boxShadow: "0 10px 26px -18px rgba(16,38,43,0.16)",
                    }}
                  >
                    <span style={{ flexShrink: 0, width: "10px", height: "10px", borderRadius: "50%", background: r.tone }} aria-hidden="true" />
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: TOKENS.noche, margin: 0, lineHeight: 1.4 }}>
                      {r.t}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={300}>
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: "20px",
                color: TOKENS.azulOlaOscuro,
                lineHeight: 1.6,
                textAlign: "center",
                maxWidth: "62ch",
                margin: `${SPACE.xxl}px auto 0`,
              }}
            >
              En El Habillal creemos en el turismo responsable: cada visita sigue nuestros protocolos de seguridad y de protección de las especies, para que tu experiencia y la de las tortugas sean igual de seguras.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

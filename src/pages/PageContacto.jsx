import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { H2, SectionHead } from "../components/Typography";
import { MapEmbed } from "../components/MapEmbed";
import { SocialMosaic } from "../components/SocialMosaic";

function SiguenosDeCerca() {
  return (
    <section style={{ background: TOKENS.espuma, padding: "56px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="Un vistazo a la playa" eyebrowColor={TOKENS.azulOlaOscuro} title="Síguenos de cerca">
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "14.5px", margin: "12px auto 0", maxWidth: "50ch" }}>
            Contenido nuevo cada semana en nuestras redes. Sigue el trabajo de campo día a día.
          </p>
        </SectionHead>
        <div style={{ marginTop: "32px" }}>
          <SocialMosaic />
        </div>
      </div>
    </section>
  );
}

export function PageContacto() {
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.mensaje) return;
    setSending(true);

    try {
      // Envía la petición al endpoint de la API con Resend (/api/contacto)
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
      } else {
        throw new Error("Error en servidor");
      }
    } catch {
      // Fallback directo mailto si falla la red o el backend local
      window.location.href = `mailto:camp.tortuguero.elhabillal@gmail.com?subject=${encodeURIComponent(`Contacto EcoPortal de ${form.nombre}`)}&body=${encodeURIComponent(`Nombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono || "N/A"}\n\nMensaje:\n${form.mensaje}`)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    height: "36px",
    border: `1px solid ${TOKENS.arenaOscura}`,
    borderRadius: 0,
    background: "#fff",
    color: TOKENS.noche,
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px",
    padding: "0 10px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "32px 32px 44px",
          minHeight: "55vh",
          background: `linear-gradient(rgba(220,234,227,0.93), rgba(220,234,227,0.96)), url("${IMAGES.teamEntrance}") center 30%/cover fixed`,
        }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto", position: "relative" }}>
          <div className="tt-cols-2" style={{ gap: "36px", alignItems: "flex-start" }}>
            {/* Columna Izquierda: Información de Contacto */}
            <Reveal>
              <span
                style={{
                  color: TOKENS.azulOlaOscuro,
                  fontSize: "11.5px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Contacto y Ubicación
              </span>
              <H2>Estamos para atenderte</H2>
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "14px", lineHeight: 1.6, margin: "8px 0 16px", maxWidth: "44ch" }}>
                ¿Tienes dudas sobre los recorridos, donaciones o el programa de adopción de nidos? Contáctanos directamente por teléfono, correo o visítanos en la playa.
              </p>

              <div style={{ background: "#fff", borderRadius: 0, padding: "20px 22px", boxShadow: "0 10px 28px -18px rgba(16,38,43,0.25)", border: `1px solid ${TOKENS.arenaOscura}` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: TOKENS.azulOlaOscuro }}>Correo electrónico</span>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: TOKENS.noche, margin: "2px 0 0" }}>
                      <a href="mailto:camp.tortuguero.elhabillal@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>camp.tortuguero.elhabillal@gmail.com</a>
                    </p>
                  </div>

                  <div style={{ borderTop: `1px solid ${TOKENS.arenaOscura}`, paddingTop: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: TOKENS.azulOlaOscuro }}>Teléfono y WhatsApp</span>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: TOKENS.noche, margin: "2px 0 6px" }}>
                      +52 753 163 1707
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <a
                        href="https://wa.me/527531631707"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#25D366",
                          color: "#fff",
                          padding: "6px 16px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 600,
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        WhatsApp directo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Columna Derecha: Formulario Interactivo */}
            <Reveal delay={120}>
              <div style={{ background: "#fff", borderRadius: 0, padding: "20px 24px", boxShadow: "0 10px 28px -18px rgba(16,38,43,0.25)", border: `1px solid ${TOKENS.arenaOscura}` }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.noche, margin: "0 0 4px" }}>
                  Envíanos un mensaje
                </h3>
                <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", color: TOKENS.conchaSuave, margin: "0 0 14px" }}>
                  Te responderemos a la brevedad posible.
                </p>

                {sent ? (
                  <div style={{ background: `${TOKENS.verde}18`, border: `1px solid ${TOKENS.verde}`, borderRadius: 0, padding: "20px", textAlign: "center" }}>
                    <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.verdeOscuro, fontSize: "17px", margin: "0 0 6px" }}>¡Mensaje enviado con éxito!</h4>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: TOKENS.conchaSuave, margin: 0 }}>
                      Gracias por ponerte en contacto. Nuestro equipo revisará tu mensaje y se comunicará contigo pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "3px" }}>
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.nombre}
                          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                          placeholder="Tu nombre"
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "3px" }}>
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.correo}
                          onChange={(e) => setForm({ ...form, correo: e.target.value })}
                          placeholder="tu@correo.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "3px" }}>
                        Teléfono / WhatsApp (opcional)
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="753 123 4567"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "3px" }}>
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="Escribe aquí tus comentarios, dudas o solicitudes..."
                        style={{
                          ...inputStyle,
                          height: "56px",
                          padding: "6px 10px",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    <Button type="submit" tone="verde" disabled={sending} style={{ marginTop: "4px", borderRadius: "999px", width: "100%", textAlign: "center", justifyContent: "center" }}>
                      {sending ? "Enviando mensaje..." : "Enviar mensaje"}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sección Síguenos de cerca */}
      <SiguenosDeCerca />

      {/* Sección de Mapa Embebido */}
      <section style={{ background: TOKENS.cieloClaro, padding: "52px 32px 60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal delay={150} style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.noche, marginBottom: "4px" }}>
              Encuéntranos en la costa de Michoacán
            </h3>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: "0 0 18px" }}>
              La caroa, Tenencia, 60981 El Habillal, Lázaro Cárdenas, Michoacán.
            </p>
            <MapEmbed height={340} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

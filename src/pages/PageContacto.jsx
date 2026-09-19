import { useState } from "react";
import { TOKENS, SECTION_BG, SPACE, RADIUS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { WaveDivider } from "../components/WaveDivider";
import { PhotoFrame } from "../components/PhotoFrame";
import { HeroShock } from "../components/HeroShock";
import { Button } from "../components/Button";
import { SectionHead } from "../components/Typography";
import { CircleVectors } from "../components/CircleVectors";
import { MapEmbed } from "../components/MapEmbed";

const FACEBOOK_SVG_WHITE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
);
const INSTAGRAM_SVG_WHITE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#ffffff" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="#ffffff" strokeWidth="2" /><circle cx="17.2" cy="6.8" r="1.2" fill="#ffffff" /></svg>
);
const TIKTOK_SVG_WHITE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M14 3c.4 2.2 1.9 3.7 4.2 3.9v2.6c-1.5 0-2.9-.4-4.2-1.3v6.6c0 3.3-2.4 5.5-5.4 5.5-2.9 0-5.3-2.2-5.3-5.4 0-3.1 2.6-5.4 5.6-5.3v2.7c-1.5-.1-2.8.9-2.8 2.6 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.8-1.3 2.8-3V3h2.5Z" /></svg>
);

function SiguenosDeCerca() {
  const socialItems = [
    { network: "Facebook", handle: "Campamento Tortuguero El Habillal", icon: FACEBOOK_SVG_WHITE, btnBg: "#1877F2", href: "#" },
    { network: "Instagram", handle: "@habillalcampamento", icon: INSTAGRAM_SVG_WHITE, btnBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", href: "#" },
    { network: "TikTok", handle: "@tortuguero_habillal", icon: TIKTOK_SVG_WHITE, btnBg: "#111111", href: "#" },
  ];

  return (
    <section style={{ background: TOKENS.espuma, padding: `${SPACE.xl}px ${SPACE.lg}px` }}>
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        <SectionHead title="Síguenos de cerca" />

        <div style={{ marginTop: SPACE.xl }}>
          <div className="tt-cols-3" style={{ gap: SPACE.md, alignItems: "stretch" }}>
            <Reveal delay={0} style={{ height: "100%" }}>
              <PhotoFrame shape="portrait" tone="azul" src={IMAGES.hatchlingsMassSunset} style={{ height: "100%", minHeight: "320px", borderRadius: 0 }} />
            </Reveal>

            <Reveal delay={100} style={{ height: "100%" }}>
              <div
                style={{
                  position: "relative",
                  background: "#E8F4EE",
                  padding: "36px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.verdeOscuro, margin: "0 0 20px", textAlign: "center", fontWeight: 700 }}>
                  Nuestras redes
                </h4>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "16px", flex: 1 }}>
                  {socialItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        background: item.btnBg,
                        color: "#ffffff",
                        borderRadius: "999px",
                        padding: "14px 22px",
                        textDecoration: "none",
                        transition: "transform 0.2s ease",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", fontWeight: 700, color: "#ffffff" }}>{item.network}</div>
                        <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11.5px", color: "rgba(255,255,255,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} style={{ height: "100%" }}>
              <PhotoFrame shape="portrait" tone="coral" src={IMAGES.liberacionCrowd} style={{ height: "100%", minHeight: "320px", borderRadius: 0 }} />
            </Reveal>
          </div>
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
      window.location.href = `mailto:camp.tortuguero.elhabillal@gmail.com?subject=${encodeURIComponent(`Contacto EcoPortal de ${form.nombre}`)}&body=${encodeURIComponent(`Nombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono || "N/A"}\n\nMensaje:\n${form.mensaje}`)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    height: "44px",
    border: `1px solid ${TOKENS.arenaOscura}`,
    borderRadius: "12px",
    background: "#F8FAFC",
    color: TOKENS.noche,
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "14px",
    padding: "0 14px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 1. Hero — mismo patrón oscuro dividido que el resto del sitio */}
      <HeroShock image={IMAGES.campAerial} imageAlt="Costa del Campamento Tortuguero El Habillal" align="center">
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
          Contacto y ubicación
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
          Estamos para
          <br />
          <span style={{ color: TOKENS.cieloOscuro }}>atenderte</span>.
        </h1>
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15.5px", color: "#E7F0EC", lineHeight: 1.6, maxWidth: "48ch", margin: 0 }}>
          ¿Dudas sobre recorridos, donaciones o el programa de adopción de nidos? Escríbenos por teléfono, correo o visítanos en la playa.
        </p>
      </HeroShock>

      <WaveDivider fromColor={TOKENS.noche} toColor={TOKENS.azulOlaOscuro} />

      {/* 2. Formulario e información directa — fondo azul marino */}
      <section style={{ background: TOKENS.azulOlaOscuro, padding: `${SPACE.xxl}px ${SPACE.lg}px`, position: "relative", overflow: "hidden" }}>
        <img
          src={IMAGES.hatchlingsBucket}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
            mixBlendMode: "luminosity",
            pointerEvents: "none",
            zIndex: 0,
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          }}
        />
        <CircleVectors variant="dark" />

        <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: SPACE.md + 4, width: "100%" }}>
            <Reveal style={{ width: "100%" }}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: RADIUS.card + 4,
                  padding: `${SPACE.lg}px ${SPACE.md + 4}px`,
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: TOKENS.noche, margin: "0 0 24px", fontWeight: 700 }}>
                  Información directa
                </h3>

                <div className="tt-cols-2" style={{ gap: SPACE.md, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: TOKENS.azulOlaOscuro, display: "block", marginBottom: "4px" }}>
                      Correo electrónico
                    </span>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: TOKENS.noche, margin: 0, wordBreak: "break-all" }}>
                      <a href="mailto:camp.tortuguero.elhabillal@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                        camp.tortuguero.elhabillal@gmail.com
                      </a>
                    </p>
                  </div>

                  <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: TOKENS.azulOlaOscuro, display: "block", marginBottom: "4px" }}>
                      Teléfono y WhatsApp
                    </span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                      <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "15.5px", fontWeight: 700, color: TOKENS.noche, margin: 0 }}>
                        +52 753 163 1707
                      </p>
                      <a
                        href="https://wa.me/527531631707"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#25D366",
                          color: "#ffffff",
                          padding: "7px 18px",
                          borderRadius: "999px",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} style={{ width: "100%" }}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: RADIUS.card + 4,
                  padding: `${SPACE.lg}px ${SPACE.md + 4}px`,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "22px" }}>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: TOKENS.noche, margin: "0 0 6px", fontWeight: 700 }}>
                    Envíanos un mensaje
                  </h3>
                  <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0 }}>
                    Escríbenos directamente y te responderemos a la brevedad.
                  </p>
                </div>

                {sent ? (
                  <div style={{ background: `${TOKENS.verde}18`, border: `1.5px solid ${TOKENS.verde}`, borderRadius: RADIUS.card, padding: "28px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎉</div>
                    <h4 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.verdeOscuro, fontSize: "19px", margin: "0 0 8px", fontWeight: 700 }}>¡Mensaje enviado con éxito!</h4>
                    <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0, lineHeight: 1.6 }}>
                      Gracias por ponerte en contacto. Nuestro equipo revisará tu mensaje y se comunicará contigo pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "5px" }}>
                          Nombre completo *
                        </label>
                        <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" style={inputStyle} />
                      </div>

                      <div>
                        <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "5px" }}>
                          Correo electrónico *
                        </label>
                        <input type="email" required value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} placeholder="tu@correo.com" style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "5px" }}>
                        Teléfono / WhatsApp (opcional)
                      </label>
                      <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="753 123 4567" style={inputStyle} />
                    </div>

                    <div>
                      <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "5px" }}>
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        placeholder="Escribe aquí tus comentarios, dudas o solicitudes..."
                        style={{ ...inputStyle, height: "96px", padding: "12px 14px", resize: "vertical" }}
                      />
                    </div>

                    <Button tone="shock" size="lg" type="submit" style={{ marginTop: "8px", width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}>
                      {sending ? "Enviando mensaje..." : "Enviar mensaje"}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider fromColor={TOKENS.azulOlaOscuro} toColor={TOKENS.espuma} />

      <SiguenosDeCerca />

      <WaveDivider fromColor={TOKENS.espuma} toColor={SECTION_BG.claro} />

      {/* 3. Mapa — cierre de página */}
      <section style={{ background: SECTION_BG.claro, padding: `${SPACE.xl}px ${SPACE.lg}px ${SPACE.xxl}px` }}>
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

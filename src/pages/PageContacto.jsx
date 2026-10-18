import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { snapToSections } from "../lib/smoothScroll";

const EMAIL = "camp.tortuguero.elhabillal@gmail.com";
const PHONE = "+52 753 163 1707";
const WHATSAPP = "https://wa.me/527531631707";
const MAPS_SRC = "https://www.google.com/maps?q=Campamento+Tortuguero+El+Habillal,+Lazaro+Cardenas,+Michoacan&output=embed";

const SOCIAL = [
  { network: "Facebook", handle: "Campamento Tortuguero El Habillal", href: "#" },
  { network: "Instagram", handle: "@habillalcampamento", href: "#" },
  { network: "TikTok", handle: "@tortuguero_habillal", href: "#" },
];

const ease = [0.22, 1, 0.36, 1];

function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title ab-hero__title" {...enter(0.1)}>
          Escríbenos. Te respondemos desde la playa.
        </motion.h1>
        <motion.p className="lt-hero__line" {...enter(0.28)}>Visitas, donaciones, adopción de nidos o voluntariado.</motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <a className="lt-btn lt-btn--sea" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
          <button className="lt-btn lt-btn--line" onClick={() => document.getElementById("mensaje")?.scrollIntoView({ behavior: "smooth" })}>
            Enviar un mensaje
          </button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src="/contacto/campamento.webp" alt="Vista aérea de las instalaciones del campamento" fetchPriority="high" />
      </div>
    </section>
  );
}

function Mensaje() {
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [privacyOk, setPrivacyOk] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.mensaje || !privacyOk) return;
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
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Contacto EcoPortal de ${form.nombre}`)}&body=${encodeURIComponent(`Nombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono || "N/A"}\n\nMensaje:\n${form.mensaje}`)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="mensaje" className="pg-sec pg-sec--espuma" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Envíanos un mensaje.</Reveal>
      <div className="pg-contact">
        <Reveal className="pg-direct">
          <div>
            <h3>Correo</h3>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div>
            <h3>Teléfono y WhatsApp</h3>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">{PHONE}</a>
          </div>
          <div>
            <h3>Redes</h3>
            <ul>
              {SOCIAL.map((s) => (
                <li key={s.network}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"><strong>{s.network}</strong> {s.handle}</a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="pg-formbox">
          {sent ? (
            <div className="pg-done">
              <h3 className="lt-display">¡Mensaje enviado!</h3>
              <p>Gracias por escribirnos. Nuestro equipo revisará tu mensaje y te responderá pronto.</p>
            </div>
          ) : (
            <form className="pg-form" onSubmit={handleSubmit}>
              <label className="pg-field">
                <span>Nombre completo *</span>
                <input type="text" required value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" />
              </label>
              <label className="pg-field">
                <span>Correo electrónico *</span>
                <input type="email" required value={form.correo} onChange={set("correo")} placeholder="tu@correo.com" />
              </label>
              <label className="pg-field">
                <span>Teléfono / WhatsApp</span>
                <input type="tel" value={form.telefono} onChange={set("telefono")} placeholder="753 123 4567" />
              </label>
              <label className="pg-field pg-field--full">
                <span>Mensaje *</span>
                <textarea required rows={3} value={form.mensaje} onChange={set("mensaje")} placeholder="Tus dudas, comentarios o solicitudes" />
              </label>
              <div className="pg-field--full">
                <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-contacto" />
                <button className="lt-btn lt-btn--hot pg-submit" type="submit" disabled={sending}>
                  {sending ? "Enviando…" : "Enviar mensaje"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Mapa() {
  return (
    <section className="lt-action pg-end" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">Encuéntranos en El Habillal.</Reveal>
      <Reveal as="p" className="pg-end__sub" delay={0.1}>La Caroa, Tenencia, 60981 El Habillal, Lázaro Cárdenas, Michoacán.</Reveal>
      <Reveal className="pg-map" delay={0.2}>
        <iframe
          title="Ubicación del Campamento Tortuguero El Habillal"
          src={MAPS_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}

export function PageContacto() {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home pg-page">
      <Hero />
      <Mensaje />
      <Mapa />
    </main>
  );
}

import { useState } from "react";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Contacto — mismo estilo que el Home 2026: arena → mar profundo. */
const EMAIL = "camp.tortuguero.elhabillal@gmail.com";
const PHONE = "+52 753 163 1707";
const WHATSAPP = "https://wa.me/527531631707";
const MAPS_SRC = "https://www.google.com/maps?q=Campamento+Tortuguero+El+Habillal,+Lazaro+Cardenas,+Michoacan&output=embed";

const SOCIAL = [
  { network: "Facebook", handle: "campamentortuguerohabillal", href: "https://www.facebook.com/campamentortuguerohabillal/" },
  { network: "Instagram", handle: "@habillalcampamento", href: "https://www.instagram.com/habillalcampamento/" },
  { network: "TikTok", handle: "@tortuguerohabillal", href: "https://www.tiktok.com/@tortuguerohabillal" },
];

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
    <section id="mensaje" className="sec on-sand">
      <div className="wrap">
        <h2>Envíanos un mensaje.</h2>
        <div className="reserve">
          <div className="direct">
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
                    <a href={s.href} target="_blank" rel="noopener noreferrer"><strong>{s.network}</strong> · {s.handle}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="done">
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por escribirnos. Nuestro equipo revisará tu mensaje y te responderá pronto.</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <label className="field full">
                  <span>Nombre completo *</span>
                  <input type="text" required value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" />
                </label>
                <label className="field">
                  <span>Correo electrónico *</span>
                  <input type="email" required value={form.correo} onChange={set("correo")} placeholder="tu@correo.com" />
                </label>
                <label className="field">
                  <span>Teléfono / WhatsApp</span>
                  <input type="tel" value={form.telefono} onChange={set("telefono")} placeholder="753 123 4567" />
                </label>
                <label className="field full">
                  <span>Mensaje *</span>
                  <textarea required rows={4} value={form.mensaje} onChange={set("mensaje")} placeholder="Tus dudas, comentarios o solicitudes" />
                </label>
                <div className="foot">
                  <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-contacto" />
                  <button className="btn btn-t" type="submit" disabled={sending}>
                    {sending ? "Enviando…" : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageContacto() {
  return (
    <main className="p8">
      <PageHero
        title={<>Escríbenos. Te respondemos <em>desde la playa.</em></>}
        lede={<>Visitas, donativos, adopción de nidos o voluntariado.</>}
        img="/contacto/campamento.webp"
        alt="Vista aérea de las instalaciones del campamento"
      >
        <a className="btn btn-t" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
        <a className="tl" href="#mensaje">o envía un mensaje</a>
      </PageHero>

      <Mensaje />

      <section className="deep">
        <div className="wrap map">
          <div>
            <h2>Encuéntranos en El Habillal.</h2>
            <p className="addr">La Caroa, Tenencia, 60981 El Habillal, Lázaro Cárdenas, Michoacán.</p>
          </div>
          <iframe
            title="Ubicación del Campamento Tortuguero El Habillal"
            src={MAPS_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

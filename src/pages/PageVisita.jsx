import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createVisitRequest } from "../lib/visits";
import { snapToSections } from "../lib/smoothScroll";

/* Fotos propias de esta página (ninguna se repite con Home ni Nosotros) */
const v = (name) => `/visita/${name}.webp`;

const ease = [0.22, 1, 0.36, 1];

const TIPOS_GRUPO = [
  ["ACADEMIC", "Académico"],
  ["BUSINESS", "Empresarial"],
  ["GOVERNMENT", "Gubernamental"],
  ["COMMUNITY", "Comunitario"],
  ["TOURISM", "Turístico"],
  ["OTHER", "Otro"],
];

const EXPERIENCIAS = [
  { img: v("atardecer"), alt: "Crías avanzando hacia el mar al atardecer", title: "Liberaciones al atardecer", text: "Acompaña a las crías en su camino hacia el mar." },
  { img: v("corral"), alt: "Nidos marcados en el corral de incubación", title: "El corral de incubación", text: "Conoce dónde cuidamos cada nido hasta que nacen sus crías." },
  { img: v("noche"), alt: "Grupo de visitantes de noche con luz roja", title: "Recorridos nocturnos", text: "Conoce la playa de noche junto a nuestro equipo de campo." },
];

const REGLAS = [
  "Sigue las indicaciones de tu guía.",
  "No dejes basura ni la entierres en la arena.",
  "Evita luces directas hacia tortugas y nidos.",
  "Mantén distancia de nidos y crías.",
  "No toques ni levantes a las tortugas.",
  "Evita ruidos fuertes en los recorridos nocturnos.",
];

const scrollToReserva = () => document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });

function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title ab-hero__title" {...enter(0.1)}>
          Ven a ver la conservación de cerca.
        </motion.h1>
        <motion.p className="lt-hero__line" {...enter(0.28)}>Recorridos guiados de martes a domingo, para escuelas, familias y turistas.</motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <button className="lt-btn lt-btn--hot" onClick={scrollToReserva}>Agenda tu visita</button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={v("liberacion-visitantes")} alt="Visitantes en la orilla durante una liberación" fetchPriority="high" />
      </div>
    </section>
  );
}

function Experiencias() {
  return (
    <section className="pg-sec pg-sec--espuma" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Esto vivirás en el campamento.</Reveal>
      <div className="pg-cards">
        {EXPERIENCIAS.map((e, i) => (
          <Reveal key={e.title} as="article" className="pg-card pg-card--photo" delay={i * 0.12}>
            <div className="pg-card__img"><img src={e.img} alt={e.alt} loading="lazy" decoding="async" /></div>
            <h3 className="lt-display">{e.title}</h3>
            <p>{e.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reglas() {
  const reduce = useReducedMotion();
  const view = reduce ? {} : { initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.35 } };
  const item = {
    hidden: { opacity: 0, y: 20 },
    shown: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.1 + i * 0.08, ease } }),
  };
  return (
    <section className="pg-sec pg-sec--agua" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Así cuidamos la playa juntos.</Reveal>
      <motion.ol className="pg-rules" {...view}>
        {REGLAS.map((r, i) => (
          <motion.li key={r} custom={i} variants={item}>
            <span className="lt-display">{i + 1}</span>
            <p>{r}</p>
          </motion.li>
        ))}
      </motion.ol>
      <Reveal as="p" className="pg-sub" delay={0.3}>
        Cada visita sigue nuestros protocolos para que tu experiencia y la de las tortugas sean igual de seguras.
      </Reveal>
    </section>
  );
}

const EMPTY = { nombre: "", correo: "", telefono: "", origen: "", fecha: "", asistentes: "", tipo: "" };

function Reserva() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const idempotencyKey = useRef(crypto.randomUUID());
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!privacyOk) { setSubmitError("Para enviar la solicitud acepta el aviso de privacidad."); return; }
    setSending(true);
    setSubmitError("");
    try {
      await createVisitRequest({
        idempotencyKey: idempotencyKey.current,
        name: form.nombre.trim(),
        email: form.correo.trim().toLowerCase(),
        phone: form.telefono.trim(),
        origin: form.origen.trim(),
        preferredDate: form.fecha,
        attendees: form.asistentes ? Number(form.asistentes) : 1,
        groupType: form.tipo,
      });
      setSent(true);
    } catch (error) {
      setSubmitError(error.message || "No pudimos registrar tu solicitud.");
    } finally {
      setSending(false);
    }
  };

  const resetRequest = () => {
    setForm(EMPTY);
    setSent(false);
    setSubmitError("");
    idempotencyKey.current = crypto.randomUUID();
  };

  return (
    <section id="reserva" className="lt-action pg-end" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">Agenda tu recorrido.</Reveal>
      <Reveal className="pg-reserve" delay={0.12}>
        <div className="pg-reserve__photo"><img src={v("reserva")} alt="Crías de tortuga avanzando por la arena" loading="lazy" decoding="async" /></div>
        <div className="pg-formbox pg-formbox--dark">
        {sent ? (
          <div className="pg-done">
            <h3 className="lt-display">¡Solicitud enviada!</h3>
            <p>
              Gracias, <strong>{form.nombre}</strong>. Te escribiremos a <strong>{form.correo}</strong> para confirmar la fecha de tu visita.
            </p>
            <button className="lt-btn lt-btn--line" onClick={resetRequest}>Agendar otra visita</button>
          </div>
        ) : (
          <form className="pg-form pg-form--3" onSubmit={handleSubmit}>
            <label className="pg-field">
              <span>Nombre completo *</span>
              <input type="text" required value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" />
            </label>
            <label className="pg-field">
              <span>Correo electrónico *</span>
              <input type="email" required value={form.correo} onChange={set("correo")} placeholder="tu@correo.com" />
            </label>
            <label className="pg-field">
              <span>Teléfono / WhatsApp *</span>
              <input type="tel" required minLength="7" maxLength="30" autoComplete="tel" value={form.telefono} onChange={set("telefono")} placeholder="753 123 4567" />
            </label>
            <label className="pg-field">
              <span>Lugar de origen</span>
              <input type="text" value={form.origen} onChange={set("origen")} placeholder="Ciudad / Estado" />
            </label>
            <label className="pg-field">
              <span>Fecha deseada *</span>
              <input type="date" required value={form.fecha} onChange={set("fecha")} />
            </label>
            <label className="pg-field pg-field--half">
              <span>Asistentes</span>
              <input type="number" min="1" max="50" value={form.asistentes} onChange={set("asistentes")} placeholder="4" />
            </label>
            <label className="pg-field pg-field--half">
              <span>Tipo de grupo</span>
              <select value={form.tipo} onChange={set("tipo")}>
                <option value="" disabled>Selecciona</option>
                {TIPOS_GRUPO.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <div className="pg-field--full pg-form__foot">
              <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-visita" />
              {submitError && <p role="alert" className="pg-error">{submitError}</p>}
              <button className="lt-btn lt-btn--hot pg-submit" type="submit" disabled={sending}>
                {sending ? "Enviando…" : "Enviar solicitud"}
              </button>
            </div>
          </form>
        )}
        </div>
      </Reveal>
    </section>
  );
}

export function PageVisita() {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home pg-page">
      <Hero />
      <Experiencias />
      <Reglas />
      <Reserva />
    </main>
  );
}

import { uuid } from "../lib/uuid";
import { useRef, useState } from "react";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createVisitRequest } from "../lib/visits";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Visítanos — mismo estilo que el Home 2026: arena → mar profundo.
   Fotos propias de esta página: ninguna se repite con el Home ni con Nosotros. */
const v = (name) => `/visita/${name}.webp`;

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
  return (
    <PageHero
      title={<>Ven a ser parte <em>de la conservación.</em></>}
      lede={<>Recorridos guiados de martes a domingo, para escuelas, familias y turistas.</>}
      img="/home/fotos/visitantes.webp"
      alt="Visitantes conociendo el corral de incubación con nuestro equipo"
    >
      <button className="btn btn-t" onClick={scrollToReserva}>Agenda tu visita</button>
    </PageHero>
  );
}

function Experiencias() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <h2>Esto vivirás en el campamento.</h2>
          </div>
        </div>
        <div className="cards">
          {EXPERIENCIAS.map((e) => (
            <figure key={e.title}>
              <img src={e.img} alt={e.alt} loading="lazy" decoding="async" />
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reglas() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <h2>Así cuidamos la playa juntos.</h2>
            <p className="body intro">Cada visita sigue nuestros protocolos para que tu experiencia y la de las tortugas sean igual de seguras.</p>
          </div>
        </div>
        <ol className="rules">
          {REGLAS.map((r) => <li key={r}>{r}</li>)}
        </ol>
      </div>
    </section>
  );
}

const EMPTY = { nombre: "", correo: "", telefono: "", origen: "", fecha: "", asistentes: "", tipo: "" };

function Reserva() {
  const [form, setForm] = useState(EMPTY);
  const [requestNumber, setRequestNumber] = useState(null);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const idempotencyKey = useRef(uuid());
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (!privacyOk) { setSubmitError("Para enviar la solicitud acepta el aviso de privacidad."); return; }
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
    } catch (error) {
      setSubmitError(error.message || "No pudimos registrar tu solicitud.");
    } finally {
      setSending(false);
    }
  };

  const resetRequest = () => {
    setForm(EMPTY);
    setRequestNumber(null);
    setSubmitError("");
    idempotencyKey.current = uuid();
  };

  return (
    <section id="reserva" className="deep">
      <div className="wrap">
        <h2>Agenda tu recorrido.</h2>
        <div className="reserve">
          <figure className="ph"><img src={v("reserva")} alt="Crías de tortuga avanzando por la arena" loading="lazy" decoding="async" /></figure>
          <div>
            {requestNumber ? (
              <div className="done">
                <h3>¡Solicitud enviada!</h3>
                <p>
                  Gracias, <strong>{form.nombre}</strong>. Registramos tu solicitud con el folio <strong>#{requestNumber}</strong>. Te escribiremos a <strong>{form.correo}</strong> para confirmar la fecha de tu visita.
                </p>
                <button className="btn btn-o" onClick={resetRequest}>Agendar otra visita</button>
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
                  <span>Teléfono / WhatsApp *</span>
                  <input type="tel" required minLength="7" maxLength="30" autoComplete="tel" value={form.telefono} onChange={set("telefono")} placeholder="753 123 4567" />
                </label>
                <label className="field">
                  <span>Lugar de origen</span>
                  <input type="text" value={form.origen} onChange={set("origen")} placeholder="Ciudad / Estado" />
                </label>
                <label className="field">
                  <span>Fecha deseada *</span>
                  <input type="date" required value={form.fecha} onChange={set("fecha")} />
                </label>
                <label className="field">
                  <span>Asistentes</span>
                  <input type="number" min="1" max="50" value={form.asistentes} onChange={set("asistentes")} placeholder="4" />
                </label>
                <label className="field">
                  <span>Tipo de grupo</span>
                  <select className={form.tipo ? "" : "empty"} value={form.tipo} onChange={set("tipo")}>
                    <option value="" disabled>Selecciona</option>
                    {TIPOS_GRUPO.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <div className="foot">
                  <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-visita" />
                  {submitError && <p role="alert" className="err">{submitError}</p>}
                  <button className="btn btn-t" type="submit" disabled={sending}>
                    {sending ? "Enviando solicitud..." : "Enviar solicitud"}
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

export function PageVisita() {
  return (
    <main className="p8">
      <Hero />
      <Experiencias />
      <Reglas />
      <Reserva />
    </main>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { SplitTitle } from "../components/home/SplitTitle";
import { snapToSections } from "../lib/smoothScroll";
import { CertificateTemplate } from "../components/CertificateTemplate";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createAdoptionCheckout } from "../lib/payments";

/* Fotos propias de esta página (ninguna se repite en el sitio) */
const a = (name) => `/adopta/${name}.webp`;
const ease = [0.22, 1, 0.36, 1];
const WHATSAPP = "https://wa.me/527531631707?text=Hola,%20quiero%20apadrinar%20un%20nido%20de%20esta%20temporada.";

const INCLUYE = [
  "Un nido activo de esta temporada, asignado al confirmar tu pago.",
  "Certificado digital a tu nombre (o al de quien se lo regales).",
  "Invitación a la liberación de sus crías.",
  "Si no puedes asistir: video, fotos y transmisión en vivo.",
];

const PASOS = [
  { t: "Adoptas", d: "Haces tu aportación de $220 MXN, que ayuda al campamento a seguir cuidando a las tortugas." },
  { t: "Lo cuidamos", d: "Protegemos tu nido en el corral durante toda la incubación, hasta su nacimiento." },
  { t: "Lo liberas", d: "Te avisamos para que estés presente cuando sus crías lleguen al mar." },
  { t: "Si no puedes ir", d: "Tomamos videos y fotos, transmitimos en vivo en redes y te los enviamos por WhatsApp." },
];

const FAQS = [
  { q: "¿Puedo regalar la adopción de un nido?", a: "Sí. Escribe el nombre de tu familiar o amigo como adoptante y el certificado digital se expedirá a su nombre." },
  { q: "¿Pueden adoptar escuelas, empresas o grupos?", a: "Sí. Tenemos esquemas de apadrinamiento para grupos, escuelas y empresas. Escríbenos por WhatsApp y lo coordinamos." },
  { q: "¿En qué se utiliza mi aportación?", a: "En materiales de resguardo del corral, patrullajes nocturnos de vigilancia, insumos de protección y la logística del campamento." },
  { q: "¿Qué nido me toca?", a: "Al confirmar el pago, el sistema asigna de forma aleatoria un nido activo disponible y verás de inmediato su número." },
];

const goPago = () => document.getElementById("pago")?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ---------- 1 · Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero pay-hero" data-snap>
      <div className="lt-hero__text">
        <SplitTitle as="h1" className="lt-display lt-hero__title ab-hero__title" text="Adopta un nido y acompáñalo hasta el mar." delay={0.1} animateOnMount />
        <motion.p className="pay-hero__price" {...enter(0.25)}>
          <span className="lt-display">$220</span>
          <small>MXN</small>
        </motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.4)}>
          <button className="lt-btn lt-btn--hot pay-btn-lg" onClick={goPago}>Adoptar mi nido</button>
          <a className="lt-btn lt-btn--line" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Coordinar por WhatsApp</a>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={a("hero")} alt="Cientos de crías de tortuga avanzando hacia el mar" fetchPriority="high" />
      </div>
    </section>
  );
}

/* ---------- 2 · Pasarela desplegada ---------- */
function Pago() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [checkoutPayload, setCheckoutPayload] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);

  const start = (e) => {
    e.preventDefault();
    setPaymentError("");
    if (donorName.trim().length < 2) return setPaymentError("Escribe el nombre que aparecerá en el certificado.");
    if (!/^\S+@\S+\.\S+$/.test(donorEmail.trim())) return setPaymentError("Escribe un correo electrónico válido.");
    if (!privacyOk) return setPaymentError("Para continuar acepta el aviso de privacidad.");
    setCheckoutPayload({
      request_id: crypto.randomUUID(),
      sponsor_name: donorName.trim(),
      sponsor_email: donorEmail.trim().toLowerCase(),
    });
  };

  return (
    <section id="pago" className="pay-sec pay-checkout" data-snap>
      <SplitTitle className="lt-display ab-title" text="Adopta un nido de la temporada activa." />
      <div className="pay-grid">
        <Reveal className="pay-summary">
          <div className="pay-summary__photo"><img src={a("crias")} alt="Crías de tortuga recién nacidas en la arena" loading="lazy" decoding="async" /></div>
        </Reveal>

        <Reveal className="pay-card" delay={0.12}>
          {paymentError && <p role="alert" className="pay-error">{paymentError}</p>}
          {checkoutPayload ? (
            <StripeEmbeddedCheckout
              checkoutKey={checkoutPayload.request_id}
              createClientSecret={() => createAdoptionCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
              onCancel={() => setCheckoutPayload(null)}
            />
          ) : (
            <form className="pg-form pay-form" onSubmit={start} noValidate>
              <div className="pay-card__total pg-field--full">
                <span>Adopción de un nido</span>
                <strong className="lt-display">$220 <small>MXN</small></strong>
              </div>
              <ul className="pay-check pay-check--mini pg-field--full">
                {INCLUYE.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
              </ul>
              <label className="pg-field pg-field--full">
                <span>Nombre del adoptante</span>
                <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Como aparecerá en el certificado" autoComplete="name" />
              </label>
              <label className="pg-field pg-field--full">
                <span>Correo electrónico</span>
                <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="Para enviarte la ficha del nido" autoComplete="email" />
              </label>
              <div className="pg-field--full">
                <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-adopta" />
                <button className="lt-btn lt-btn--hot pg-submit pay-btn-lg" type="submit">Ir a pagar</button>
                <p className="pay-secure">Pago seguro con tarjeta, procesado por <strong>Stripe</strong>.</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 3 · Cómo funciona ---------- */
function ComoFunciona() {
  return (
    <section className="pay-sec" data-snap>
      <SplitTitle className="lt-display ab-title" text="Así acompañas a tu nido." />
      <div className="pay-steps">
        {PASOS.map((p, i) => (
          <Reveal key={p.t} as="article" className="pay-step" delay={i * 0.1}>
            <span className="lt-display">{i + 1}</span>
            <h3 className="lt-display">{p.t}</h3>
            <p>{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 4 · Certificado ---------- */
function Certificado() {
  return (
    <section className="pay-sec" data-snap>
      <div className="pay-split">
        <div>
          <SplitTitle className="lt-display pay-split__title" text="Recibes un certificado a tu nombre." />
          <Reveal as="p" className="pg-sub pay-split__text" delay={0.1}>
            Un documento digital personalizado con la ficha del nido y la temporada. Ideal también para regalar.
          </Reveal>
        </div>
        <Reveal className="pay-cert" delay={0.15}>
          <CertificateTemplate donorName="Tu nombre aquí" temporada="Temporada 2026 - 2027" fecha="14 de septiembre, 2026" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 5 · Preguntas ---------- */
function Preguntas() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section className="pay-sec" data-snap>
      <div className="pay-split pay-split--faq">
        <Reveal className="pay-faq__photo"><img src={a("mar")} alt="Crías de tortuga avanzando hacia el mar" loading="lazy" decoding="async" /></Reveal>
        <div>
          <SplitTitle className="lt-display pay-split__title" text="Preguntas frecuentes." />
          <div className="pay-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`pay-faq__item${open === i ? " is-open" : ""}`}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="pay-faq__sign">{open === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6 · Cierre ---------- */
function Cierre() {
  return (
    <section className="pay-sec pay-end" data-snap>
      <div className="pay-endgrid">
        <Reveal className="pay-endgrid__photo"><img src={a("atardecer")} alt="Tortuga en la orilla al atardecer" loading="lazy" decoding="async" /></Reveal>
        <div>
          <SplitTitle className="lt-display pay-split__title" text="Esta temporada, uno de esos nidos puede ser tuyo." />
          <Reveal as="p" className="pg-sub pay-split__text" delay={0.1}>Lo cuidamos noche tras noche y te avisamos cuando sus crías estén listas para llegar al mar.</Reveal>
          <Reveal className="pay-endgrid__ctas" delay={0.2}>
            <button className="lt-btn lt-btn--hot pay-btn-lg" onClick={goPago}>Adoptar mi nido</button>
            <a className="lt-btn lt-btn--line" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PageAdopta() {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home pay-page">
      <Hero />
      <Pago />
      <ComoFunciona />
      <Certificado />
      <Preguntas />
      <Cierre />
    </main>
  );
}

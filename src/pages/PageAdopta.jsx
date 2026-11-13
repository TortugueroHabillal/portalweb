import { useState } from "react";
import { uuid } from "../lib/uuid";
import { CertificateTemplate } from "../components/CertificateTemplate";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createAdoptionCheckout } from "../lib/payments";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Adopta — mismo estilo que el Home 2026: arena → mar profundo.
   Fotos propias de esta página (ninguna se repite en el sitio) */
const a = (name) => `/adopta/${name}.webp`;
const WHATSAPP = "https://wa.me/527531631707?text=Hola,%20quiero%20apadrinar%20un%20nido%20de%20esta%20temporada.";

const INCLUYE = [
  "Un nido activo de esta temporada, asignado al confirmar tu pago.",
  "Certificado digital a tu nombre (o al de quien se lo regales).",
  "Invitación a la liberación de sus crías.",
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
      request_id: uuid(),
      sponsor_name: donorName.trim(),
      sponsor_email: donorEmail.trim().toLowerCase(),
    });
  };

  return (
    <section id="pago" className="sec">
      <div className="wrap">
        <h2>Adopta un nido de la temporada activa.</h2>
        <div className="paygrid">
          <figure className="poster bleed">
            <img src={a("crias-orilla")} alt="Crías de tortuga avanzando hacia la orilla en El Habillal" loading="lazy" decoding="async" />
          </figure>
          <div className="paycard">
            {paymentError && <p role="alert" className="err">{paymentError}</p>}
            {checkoutPayload ? (
              <StripeEmbeddedCheckout
                checkoutKey={checkoutPayload.request_id}
                createClientSecret={() => createAdoptionCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
                onCancel={() => setCheckoutPayload(null)}
              />
            ) : (
              <form className="form" onSubmit={start} noValidate>
                <div className="total field full">
                  <span>Adopción de un nido</span>
                  <strong>$220 MXN</strong>
                </div>
                <ul className="incl">
                  {INCLUYE.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <label className="field full">
                  <span>Nombre del adoptante</span>
                  <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Como aparecerá en el certificado" autoComplete="name" />
                </label>
                <label className="field full">
                  <span>Correo electrónico</span>
                  <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="Para enviarte la ficha del nido" autoComplete="email" />
                </label>
                <div className="foot">
                  <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-adopta" />
                  <button className="btn btn-t" type="submit">Ir a pagar</button>
                  <p className="secure">Pago seguro con tarjeta, procesado por <strong>Stripe</strong>.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Preguntas() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec">
      <div className="wrap split2">
        <figure className="poster bleed"><img src={a("mar")} alt="Crías de tortuga avanzando hacia el mar" loading="lazy" decoding="async" /></figure>
        <div>
          <h2>Preguntas frecuentes.</h2>
          <ul className="faq">
            {FAQS.map((f, i) => (
              <li key={f.q}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                </button>
                {open === i && <p>{f.a}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PageAdopta() {
  return (
    <main className="p8">
      <PageHero
        title={<>Adopta un nido y <em>acompáñalo hasta el mar.</em></>}
        lede={<><b className="price">$220</b> MXN por nido. Recibes tu certificado y una invitación a su liberación.</>}
        img={a("hero-mar")}
        alt="Cría de tortuga llegando al agua en la orilla"
      >
        <a className="btn btn-t" href="#pago">Adoptar mi nido</a>
        <a className="tl" href={WHATSAPP} target="_blank" rel="noopener noreferrer">o coordina por WhatsApp</a>
      </PageHero>

      <Pago />

      <section className="sec">
        <div className="wrap">
          <h2>Así acompañas a tu nido.</h2>
          <ol className="trio four">
            {PASOS.map((p, i) => (
              <li key={p.t}>
                <b>{i + 1}</b>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap cert">
          <div>
            <h2>Recibes un certificado a tu nombre.</h2>
            <p className="body intro">
              Un documento digital personalizado con la ficha del nido y la temporada. Ideal también para regalar.
            </p>
          </div>
          <div className="certbox">
            <CertificateTemplate donorName="Tu nombre aquí" temporada="Temporada 2026 - 2027" fecha="14 de septiembre, 2026" />
          </div>
        </div>
      </section>

      <Preguntas />

      <section className="deep fin">
        <figure className="finpic"><img className="pos-top" src={a("nido")} alt="Integrante del campamento colocando huevos de tortuga en un nido del corral" loading="lazy" decoding="async" /></figure>
        <div className="wrap">
          <h2>Esta temporada, uno de esos nidos puede ser tuyo.</h2>
          <p className="body intro">
            Lo cuidamos noche tras noche y te avisamos cuando sus crías estén listas para llegar al mar.
          </p>
          <div className="ctas">
            <a className="btn btn-t" href="#pago">Adoptar mi nido</a>
            <a className="tl tl-light" href={WHATSAPP} target="_blank" rel="noopener noreferrer">o escríbenos por WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}

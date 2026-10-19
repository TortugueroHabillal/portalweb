import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { SplitTitle } from "../components/home/SplitTitle";
import { snapToSections } from "../lib/smoothScroll";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createDonationCheckout } from "../lib/payments";

/* Fotos propias de esta página (ninguna se repite en el sitio) */
const d = (name) => `/dona/${name}.webp`;
const ease = [0.22, 1, 0.36, 1];

const DONATION_TIERS = [
  { amount: 100, impact: "Contribuye a los insumos utilizados durante la protección y vigilancia de nidos." },
  { amount: 250, impact: "Apoya el resguardo y seguimiento de los nidos durante la temporada." },
  { amount: 500, impact: "Fortalece el equipamiento y los materiales para el cuidado de crías." },
  { amount: 1000, impact: "Apoya los recorridos de vigilancia y la operación del campamento." },
];

const CLABE = "012 180 0150 1234 5678";

const STRIPE_DOMESTIC_RATE_WITH_VAT = 0.036 * 1.16;
const STRIPE_FIXED_FEE_MINOR_WITH_VAT = Math.ceil(300 * 1.16);

function amountWithEstimatedProcessingCosts(baseAmountMinor) {
  return Math.ceil((baseAmountMinor + STRIPE_FIXED_FEE_MINOR_WITH_VAT) / (1 - STRIPE_DOMESTIC_RATE_WITH_VAT));
}

const money = (n) => `$${n.toLocaleString("es-MX")}`;
const money2 = (minor) => `$${(minor / 100).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const goPago = () => document.getElementById("pago")?.scrollIntoView({ behavior: "smooth", block: "start" });

/* ---------- 1 · Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero pay-hero" data-snap>
      <div className="lt-hero__text">
        <SplitTitle as="h1" className="lt-display lt-hero__title ab-hero__title" text="Tu donativo se convierte en noches de patrullaje." delay={0.1} animateOnMount />
        <motion.div className="lt-hero__ctas pay-hero__ctas" {...enter(0.3)}>
          <button className="lt-btn lt-btn--sea pay-btn-lg" onClick={goPago}>Donar ahora</button>
          <button className="lt-btn lt-btn--line" onClick={() => document.getElementById("transferencia")?.scrollIntoView({ behavior: "smooth" })}>
            Donar por transferencia
          </button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={d("hero")} alt="Tortuga golfina en la orilla al atardecer" fetchPriority="high" />
      </div>
    </section>
  );
}

/* ---------- 2 · Pasarela desplegada ---------- */
function Pago() {
  const reduce = useReducedMotion();
  const [selectedTier, setSelectedTier] = useState(DONATION_TIERS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [coverProcessingCosts, setCoverProcessingCosts] = useState(false);
  const [checkoutPayload, setCheckoutPayload] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);

  // Monto elegido desde el Home
  useEffect(() => {
    let prefill = null;
    try {
      prefill = sessionStorage.getItem("donaMontoPersonalizado");
      sessionStorage.removeItem("donaMontoPersonalizado");
    } catch {
      /* sin almacenamiento */
    }
    if (!prefill) return;
    const tier = DONATION_TIERS.find((t) => String(t.amount) === prefill);
    if (tier) setSelectedTier(tier);
    else setCustomAmount(prefill);
  }, []);

  const baseAmountMinor = Math.round(Number(customAmount || selectedTier.amount) * 100);
  const amountMinor = coverProcessingCosts ? amountWithEstimatedProcessingCosts(baseAmountMinor) : baseAmountMinor;
  const processingContributionMinor = Math.max(0, amountMinor - baseAmountMinor);
  const activeAmount = `${money2(amountMinor)} MXN`;
  const impact = customAmount ? null : selectedTier.impact;

  const start = (e) => {
    e.preventDefault();
    setPaymentError("");
    if (!/^\S+@\S+\.\S+$/.test(donorEmail.trim())) return setPaymentError("Escribe un correo electrónico válido para recibir tu comprobante.");
    if (!Number.isInteger(amountMinor) || amountMinor < 1000) return setPaymentError("El donativo mínimo en línea es de $10 MXN.");
    if (!privacyOk) return setPaymentError("Para continuar acepta el aviso de privacidad.");
    setCheckoutPayload({
      request_id: crypto.randomUUID(),
      donor_name: donorName.trim() || "ANONIMO",
      donor_email: donorEmail.trim().toLowerCase(),
      amount_minor: amountMinor,
    });
  };

  return (
    <section id="pago" className="pay-sec pay-checkout pay-checkout--dona" data-snap>
      <SplitTitle className="lt-display ab-title" text="Elige cuánto quieres donar." />
      <div className="pay-grid">
        <Reveal className="pay-amounts">
          <div className="pay-tiers" role="group" aria-label="Montos sugeridos">
            {DONATION_TIERS.map((t) => {
              const on = !customAmount && selectedTier.amount === t.amount;
              return (
                <button
                  key={t.amount}
                  type="button"
                  className={`pay-tier${on ? " is-on" : ""}`}
                  aria-pressed={on}
                  disabled={Boolean(checkoutPayload)}
                  onClick={() => { setSelectedTier(t); setCustomAmount(""); }}
                >
                  <span className="lt-display">{money(t.amount)}</span>
                  <small>MXN</small>
                </button>
              );
            })}
          </div>

          <label className={`pay-other${customAmount ? " is-on" : ""}`}>
            <span>Otro monto</span>
            <strong>$</strong>
            <input
              type="number"
              min="10"
              step="1"
              inputMode="decimal"
              placeholder="0"
              value={customAmount}
              disabled={Boolean(checkoutPayload)}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <em>MXN</em>
          </label>

          <div className="pay-impact" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={impact || "otro"}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                {impact || "Cada peso se destina a patrullajes, al corral de incubación y a la operación del campamento."}
              </motion.p>
            </AnimatePresence>
          </div>

          <label className="pay-fee">
            <input
              type="checkbox"
              checked={coverProcessingCosts}
              disabled={Boolean(checkoutPayload)}
              onChange={(e) => setCoverProcessingCosts(e.target.checked)}
            />
            <span>
              <strong>Cubrir la comisión del pago con tarjeta</strong>
              {coverProcessingCosts
                ? `Aportación adicional: ${money2(processingContributionMinor)} MXN · Total: ${activeAmount}`
                : "Estimado para tarjeta nacional: 3.6% + $3 MXN, más IVA."}
            </span>
          </label>
        </Reveal>

        <Reveal className="pay-card" delay={0.12}>
          {paymentError && <p role="alert" className="pay-error">{paymentError}</p>}
          {checkoutPayload ? (
            <StripeEmbeddedCheckout
              checkoutKey={checkoutPayload.request_id}
              createClientSecret={() => createDonationCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
              onCancel={() => setCheckoutPayload(null)}
            />
          ) : (
            <form className="pg-form pay-form" onSubmit={start} noValidate>
              <div className="pay-card__total pg-field--full">
                <span>Tu donativo</span>
                <strong className="lt-display">{activeAmount}</strong>
              </div>
              <label className="pg-field pg-field--full">
                <span>Nombre (opcional)</span>
                <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Tu nombre completo" autoComplete="name" />
              </label>
              <label className="pg-field pg-field--full">
                <span>Correo electrónico</span>
                <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="Para enviarte tu comprobante" autoComplete="email" />
              </label>
              <div className="pg-field--full">
                <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-dona" />
                <button className="lt-btn lt-btn--sea pg-submit pay-btn-lg" type="submit">Ir a pagar</button>
                <p className="pay-secure">Pago seguro con tarjeta, procesado por <strong>Stripe</strong>.</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 3 · En qué se usa ---------- */
function Uso() {
  return (
    <section className="pay-sec" data-snap>
      <div className="pay-split">
        <Reveal className="pay-faq__photo"><img src={d("crias")} alt="Crías de tortuga avanzando por la arena" loading="lazy" decoding="async" /></Reveal>
        <div>
          <SplitTitle className="lt-display pay-split__title" text="En qué se convierte tu donativo." />
          <ul className="pay-uses">
            {DONATION_TIERS.map((t, i) => (
              <Reveal as="li" key={t.amount} delay={i * 0.08}>
                <strong className="lt-display">{money(t.amount)}</strong>
                <span>{t.impact}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 · Transferencia (datos a la vista) ---------- */
function Transferencia() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(CLABE.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <section id="transferencia" className="pay-sec" data-snap>
      <SplitTitle className="lt-display ab-title" text="¿Prefieres transferir?" />
      <Reveal className="pay-bank" delay={0.1}>
        <dl>
          <div><dt>Beneficiario</dt><dd>Campamento Tortuguero El Habillal A.C.</dd></div>
          <div><dt>Banco</dt><dd>BBVA México</dd></div>
          <div><dt>CLABE</dt><dd className="pay-bank__clabe">{CLABE}</dd></div>
          <div><dt>Concepto</dt><dd>Donativo conservación</dd></div>
        </dl>
        <button className="lt-btn lt-btn--sea" onClick={copy}>{copied ? "CLABE copiada" : "Copiar CLABE"}</button>
      </Reveal>
    </section>
  );
}

/* ---------- 5 · Cierre ---------- */
function Cierre({ go }) {
  return (
    <section className="pay-sec pay-end" data-snap>
      <div className="pay-endgrid">
        <Reveal className="pay-endgrid__photo" from="left"><img src={d("final")} alt="Tortuga golfina anidando en la playa" loading="lazy" decoding="async" /></Reveal>
        <div>
          <SplitTitle className="lt-display pay-split__title" text="Cada noche en la playa empieza con alguien como tú." />
          <Reveal as="p" className="pg-sub pay-split__text" from="right" delay={0.1}>Tu donativo paga la gasolina del patrullaje, el corral de incubación y las manos que cuidan cada nido.</Reveal>
          <Reveal className="pay-endgrid__ctas" delay={0.2}>
            <button className="lt-btn lt-btn--sea pay-btn-lg" onClick={goPago}>Donar ahora</button>
            <button className="lt-btn lt-btn--line" onClick={() => go("adopta")}>O adopta un nido</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PageDona({ go }) {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home pay-page">
      <Hero />
      <Pago />
      <Uso />
      <Transferencia />
      <Cierre go={go} />
    </main>
  );
}

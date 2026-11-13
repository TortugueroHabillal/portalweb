import { useEffect, useState } from "react";
import { uuid } from "../lib/uuid";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { PrivacyConsent } from "../components/PrivacyConsent";
import { createDonationCheckout } from "../lib/payments";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Dona — mismo estilo que el Home 2026: arena → mar profundo.
   Fotos propias de esta página (ninguna se repite en el sitio) */
const d = (name) => `/dona/${name}.webp`;

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

function Pago() {
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
      request_id: uuid(),
      donor_name: donorName.trim() || "ANONIMO",
      donor_email: donorEmail.trim().toLowerCase(),
      amount_minor: amountMinor,
    });
  };

  return (
    <section id="pago" className="sec">
      <div className="wrap">
        <h2>Elige cuánto quieres donar.</h2>
        <div className="paygrid">
          <div>
            <div className="tiers" role="group" aria-label="Montos sugeridos">
              {DONATION_TIERS.map((t) => {
                const on = !customAmount && selectedTier.amount === t.amount;
                return (
                  <button
                    key={t.amount}
                    type="button"
                    className={on ? "on" : ""}
                    aria-pressed={on}
                    disabled={Boolean(checkoutPayload)}
                    onClick={() => { setSelectedTier(t); setCustomAmount(""); }}
                  >
                    {money(t.amount)}
                  </button>
                );
              })}
            </div>
            <label className={`other${customAmount ? " on" : ""}`}>
              <span>Otro monto</span>
              <b>$</b>
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
            <p className="impact" aria-live="polite">
              {impact || "Cada peso se destina a patrullajes, al corral de incubación y a la operación del campamento."}
            </p>
            <label className="fee">
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
          </div>

          <div className="paycard">
            {paymentError && <p role="alert" className="err">{paymentError}</p>}
            {checkoutPayload ? (
              <StripeEmbeddedCheckout
                checkoutKey={checkoutPayload.request_id}
                createClientSecret={() => createDonationCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
                onCancel={() => setCheckoutPayload(null)}
              />
            ) : (
              <form className="form" onSubmit={start} noValidate>
                <div className="total field full">
                  <span>Tu donativo</span>
                  <strong>{activeAmount}</strong>
                </div>
                <label className="field full">
                  <span>Nombre (opcional)</span>
                  <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Tu nombre completo" autoComplete="name" />
                </label>
                <label className="field full">
                  <span>Correo electrónico</span>
                  <input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} placeholder="Para enviarte tu comprobante" autoComplete="email" />
                </label>
                <div className="foot">
                  <PrivacyConsent checked={privacyOk} onChange={setPrivacyOk} id="privacy-dona" />
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

function Uso() {
  return (
    <section className="sec">
      <div className="wrap split2">
        <figure className="poster bleed"><img src={d("crias")} alt="Crías de tortuga avanzando por la arena" loading="lazy" decoding="async" /></figure>
        <div>
          <h2>En qué se convierte tu donativo.</h2>
          <ul className="uses">
            {DONATION_TIERS.map((t) => (
              <li key={t.amount}><b>{money(t.amount)}</b><span>{t.impact}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Transferencia() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(CLABE.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <section id="transferencia" className="sec">
      <div className="wrap">
        <h2>¿Prefieres transferir?</h2>
        <dl className="bank">
          <div><dt>Beneficiario</dt><dd>Campamento Tortuguero El Habillal A.C.</dd></div>
          <div><dt>Banco</dt><dd>BBVA México</dd></div>
          <div><dt>CLABE</dt><dd className="clabe">{CLABE}</dd></div>
          <div><dt>Concepto</dt><dd>Donativo conservación</dd></div>
        </dl>
        <button className="btn btn-c" onClick={copy}>{copied ? "CLABE copiada" : "Copiar CLABE"}</button>
      </div>
    </section>
  );
}

export function PageDona({ go }) {
  return (
    <main className="p8">
      <PageHero
        title={<>Tu donativo se convierte en <em>noches de patrullaje.</em></>}
        lede={<>Cada aportación sostiene los recorridos nocturnos, el corral de incubación y la liberación de crías.</>}
        img={d("hero")}
        alt="Tortuga golfina en la orilla al atardecer"
      >
        <a className="btn btn-t" href="#pago">Donar ahora</a>
        <a className="tl" href="#transferencia">o dona por transferencia</a>
      </PageHero>

      <Pago />
      <Uso />
      <Transferencia />

      <section className="deep fin">
        <figure className="finpic"><img src={d("final")} alt="Tortuga golfina anidando en la playa" loading="lazy" decoding="async" /></figure>
        <div className="wrap">
          <h2>Cada noche en la playa empieza con alguien como tú.</h2>
          <div className="ctas">
            <a className="btn btn-t" href="#pago">Donar ahora</a>
            <button className="tl tl-light" onClick={() => go("adopta")}>o adopta un nido</button>
          </div>
        </div>
      </section>
    </main>
  );
}

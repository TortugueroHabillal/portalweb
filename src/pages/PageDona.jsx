import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Button } from "../components/Button";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { StripeCheckoutHeader } from "../components/StripeCheckoutHeader";
import { createDonationCheckout } from "../lib/payments";

const DONATION_TIERS = [
  { amount: 100, title: "$100 MXN", impact: "Contribuye a los insumos utilizados durante la protección y vigilancia de nidos." },
  { amount: 250, title: "$250 MXN", impact: "Apoya el resguardo y seguimiento de los nidos durante la temporada." },
  { amount: 500, title: "$500 MXN", impact: "Fortalece el equipamiento y los materiales para el cuidado de crías." },
  { amount: 1000, title: "$1,000 MXN", impact: "Apoya los recorridos de vigilancia y la operación del campamento." },
];

const STRIPE_DOMESTIC_RATE_WITH_VAT = 0.036 * 1.16;
const STRIPE_FIXED_FEE_MINOR_WITH_VAT = Math.ceil(300 * 1.16);

function amountWithEstimatedProcessingCosts(baseAmountMinor) {
  return Math.ceil((baseAmountMinor + STRIPE_FIXED_FEE_MINOR_WITH_VAT) / (1 - STRIPE_DOMESTIC_RATE_WITH_VAT));
}

export function PageDona() {
  const [selectedTier, setSelectedTier] = useState(DONATION_TIERS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [coverProcessingCosts, setCoverProcessingCosts] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkoutPayload, setCheckoutPayload] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  const baseAmountMinor = Math.round(Number(customAmount || selectedTier.amount) * 100);
  const amountMinor = coverProcessingCosts ? amountWithEstimatedProcessingCosts(baseAmountMinor) : baseAmountMinor;
  const processingContributionMinor = Math.max(0, amountMinor - baseAmountMinor);
  const activeAmount = `$${(amountMinor / 100).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

  const handleCopyCLABE = () => {
    navigator.clipboard?.writeText("012 180 0150 1234 5678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const startDonationCheckout = () => {
    setPaymentError("");
    if (!donorEmail.trim() || !/^\S+@\S+\.\S+$/.test(donorEmail.trim())) {
      setPaymentError("Escribe un correo electrónico válido para recibir tu comprobante.");
      return;
    }
    if (!Number.isInteger(amountMinor) || amountMinor < 1000) {
      setPaymentError("El donativo mínimo en línea es de $10 MXN.");
      return;
    }
    setCheckoutPayload({
      request_id: crypto.randomUUID(),
      donor_name: donorName.trim() || "ANONIMO",
      donor_email: donorEmail.trim().toLowerCase(),
      amount_minor: amountMinor,
    });
  };

  const inputStyle = {
    width: "100%",
    height: "44px",
    border: `1px solid ${TOKENS.arenaOscura}`,
    borderRadius: "12px",
    background: "#fff",
    color: TOKENS.noche,
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "14px",
    padding: "0 14px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div style={{ background: TOKENS.arena, minHeight: "100vh", position: "relative" }}>
      {/* 1. Hero Shock impactante propio para la sección Donaciones / Captación */}
      <section className="tt-hero-shock">
        <div className="tt-hero-shock-msg">
          <Reveal from="left" distance={45}>
            <span
              style={{
                color: TOKENS.cielo,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "10px",
                display: "block",
              }}
            >
              APOYA NUESTRA CAUSA
            </span>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 3.8vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: TOKENS.atardecer,
                margin: "0 0 16px",
              }}
            >
              Tu Aporte se Convierte Directamente en Vida
            </h1>

            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "15.5px",
                color: "#CBD9D6",
                lineHeight: 1.6,
                margin: "0 0 24px",
                maxWidth: "48ch",
              }}
            >
              Ya conociste nuestra labor: nos respaldan 13 años de experiencia y una comunidad unida por la conservación.
            </p>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "15.5px",
                color: "#CBD9D6",
                lineHeight: 1.6,
                margin: "0 0 24px",
                maxWidth: "48ch",
              }}
            >Tu contribución nos permite fortalecer nuestras playas y lograr el nacimiento seguro de miles de crías de tortugas marinas en cada temporada de anidación en El Habillal.
            </p>

            {/* KPIs Clave */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                borderTop: "1px solid rgba(255,255,255,0.18)",
                paddingTop: "16px",
                maxWidth: "420px",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", color: TOKENS.cielo }}>
                  <AnimatedCounter value={9000} suffix="+" />
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11.5px", color: "#A8BCB8", marginTop: "2px" }}>
                  Nidos Resguardados
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", color: TOKENS.atardecer }}>
                  <AnimatedCounter value={100000} suffix="+" />
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11.5px", color: "#A8BCB8", marginTop: "2px" }}>
                  Crías Liberadas
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", color: TOKENS.cielo }}>
                  3
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11.5px", color: "#A8BCB8", marginTop: "2px" }}>
                  Especies Protegidas
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="tt-hero-shock-media">
          <img src={IMAGES.laudcria} alt="Campamento Tortuguero El Habillal - Cría Laúd" />
        </div>
      </section>

      {/* 2. Módulo de Donación (Con espacio para Pasarela Digital Stripe) */}
      <section style={{ padding: "56px 24px 72px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                background: "#ffffff",
                borderRadius: "28px",
                padding: "clamp(28px, 5vw, 48px)",
                boxShadow: "0 24px 54px -18px rgba(16,38,43,0.14)",
                border: `1px solid ${TOKENS.arenaOscura}`,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "28px" }}>

                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(24px, 3.2vw, 36px)",
                    fontWeight: 700,
                    color: TOKENS.noche,
                    margin: "0 0 10px",
                  }}
                >
                  Elige el monto de tu donativo
                </h2>
                <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", margin: 0 }}>
                  Apoya la conservación marina con un donativo único y seguro.
                </p>
              </div>

              {/* Botones de Montos Predefinidos */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "20px" }}>
                {DONATION_TIERS.map((tier) => {
                  const isSelected = !customAmount && selectedTier.amount === tier.amount;
                  return (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() => {
                        setSelectedTier(tier);
                        setCustomAmount("");
                      }}
                      style={{
                        background: isSelected ? TOKENS.verdeOscuro : "#f8f6f0",
                        color: isSelected ? "#ffffff" : TOKENS.noche,
                        border: isSelected ? `2px solid ${TOKENS.verde}` : `1px solid ${TOKENS.arenaOscura}`,
                        borderRadius: "8px",
                        padding: "14px 10px",
                        fontFamily: "'Fraunces', serif",
                        fontSize: "17px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "center",
                      }}
                    >
                      {tier.title}
                    </button>
                  );
                })}
              </div>

              {/* Monto Personalizado */}
              <label style={{ display: "block", marginBottom: "28px", padding: "15px 16px", border: `2px solid ${customAmount ? TOKENS.azulOlaOscuro : TOKENS.cieloOscuro}`, borderRadius: "8px", background: customAmount ? "#F1F9FC" : "#F8FBFC", boxShadow: customAmount ? "0 8px 20px -16px rgba(44,92,109,.65)" : "none" }}>
                <span style={{ display: "block", marginBottom: "7px", color: TOKENS.azulOlaOscuro, fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 800 }}>Monto personalizado</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ color: TOKENS.azulOlaOscuro, fontSize: "20px" }}>$</strong>
                  <input
                    type="number"
                    min="10"
                    inputMode="decimal"
                    placeholder="Escribe una cantidad"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={{ ...inputStyle, height: "48px", border: `1px solid ${TOKENS.cieloOscuro}`, borderRadius: "6px", background: "#fff", fontSize: "16px", fontWeight: 700 }}
                  />
                  <strong style={{ color: TOKENS.conchaSuave, fontSize: "12px" }}>MXN</strong>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", margin: "-8px 0 24px", padding: "12px 14px", border: `1px solid ${TOKENS.arenaOscura}`, borderRadius: "10px", background: "#fff", cursor: checkoutPayload ? "default" : "pointer" }}>
                <input type="checkbox" checked={coverProcessingCosts} disabled={Boolean(checkoutPayload)} onChange={(event) => setCoverProcessingCosts(event.target.checked)} style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: TOKENS.verdeOscuro }} />
                <span style={{ color: TOKENS.noche, fontSize: "12.5px", lineHeight: 1.45 }}>
                  <strong style={{ display: "block" }}>Cubrir comisión estimada de procesamiento digital</strong>
                  {coverProcessingCosts
                    ? `Aportación adicional: $${(processingContributionMinor / 100).toFixed(2)} MXN · Total: ${activeAmount}`
                    : "Cálculo estimado para tarjeta nacional: 3.6% + $3 MXN, más IVA."}
                </span>
              </label>

              {/* ÁREA CONTENEDORA PARA PASARELA DIGITAL (STRIPE ELEMENTS) */}
              <div
                style={{
                  border: "1px solid #D8DEE9",
                  borderRadius: "14px",
                  padding: "clamp(16px, 3vw, 24px)",
                  background: "#F8FAFC",
                  marginBottom: "24px",
                  position: "relative",
                  boxShadow: "0 16px 38px -30px rgba(15,23,42,.55)",
                }}
              >
                <StripeCheckoutHeader />

                <div className="stripe-customer-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "4px" }}>
                      Nombre del Donador
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "4px" }}>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {paymentError && <p role="alert" style={{ color: "#B42318", fontSize: "13px", fontWeight: 600, margin: "0 0 12px" }}>{paymentError}</p>}
                {checkoutPayload ? (
                  <StripeEmbeddedCheckout
                    checkoutKey={checkoutPayload.request_id}
                    createClientSecret={() => createDonationCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
                    onCancel={() => setCheckoutPayload(null)}
                  />
                ) : (
                  <Button
                    tone="verde"
                    style={{ borderRadius: "999px", width: "100%", justifyContent: "center", padding: "15px 20px", fontSize: "15px", boxShadow: "0 10px 24px -8px rgba(76,107,79,0.4)" }}
                    onClick={startDonationCheckout}
                  >
                    Continuar al pago seguro ({activeAmount})
                  </Button>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  tone="azul"
                  style={{ width: "100%", maxWidth: "380px", borderRadius: "8px", justifyContent: "center", padding: "12px 18px", boxShadow: "none" }}
                  onClick={() => setShowBankModal(true)}
                >
                  Donar mediante transferencia SPEI
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal / Sección de Datos Bancarios SPEI */}
      {showBankModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(16,38,43,0.78)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 24px 50px rgba(0,0,0,0.4)",
              position: "relative",
              border: `1px solid ${TOKENS.arenaOscura}`,
            }}
          >
            <button
              onClick={() => setShowBankModal(false)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: TOKENS.espuma,
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "16px",
                cursor: "pointer",
                color: TOKENS.noche,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.noche, margin: "0 0 8px", fontWeight: 700 }}>
              Datos Bancarios (SPEI / México)
            </h3>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: "0 0 20px" }}>
              Transfiere directamente a la cuenta de la asociación civil sin comisiones interactivas:
            </p>

            <div style={{ background: TOKENS.espuma, border: `1px solid ${TOKENS.arenaOscura}`, padding: "18px", borderRadius: "16px", marginBottom: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "10px", fontSize: "13.5px", fontFamily: "'Public Sans', sans-serif" }}>
                <strong style={{ color: TOKENS.noche }}>Beneficiario:</strong>
                <span>Campamento Tortuguero El Habillal A.C.</span>

                <strong style={{ color: TOKENS.noche }}>Banco:</strong>
                <span>BBVA México</span>

                <strong style={{ color: TOKENS.noche }}>CLABE:</strong>
                <span style={{ fontFamily: "monospace", fontSize: "15px", fontWeight: 700, color: TOKENS.verdeOscuro }}>012 180 0150 1234 5678</span>

                <strong style={{ color: TOKENS.noche }}>Concepto:</strong>
                <span>Donativo Conservacion</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Button tone="verde" style={{ borderRadius: "999px", flex: 1, justifyContent: "center" }} onClick={handleCopyCLABE}>
                {copied ? "¡CLABE Copiada!" : "Copiar CLABE (1-Clic)"}
              </Button>
              <Button tone="azul" style={{ borderRadius: "999px" }} onClick={() => setShowBankModal(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

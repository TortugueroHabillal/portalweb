import { useEffect, useState } from "react";
import { TOKENS, SECTION_BG, SPACE, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Button } from "../components/Button";
import { SectionHead } from "../components/Typography";
import { HeroShock } from "../components/HeroShock";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { StripeCheckoutHeader } from "../components/StripeCheckoutHeader";
import { createDonationCheckout } from "../lib/payments";
import { WaveDivider } from "../components/WaveDivider";
import { FourFrentesBento } from "../components/FourFrentesBento";

const DONA_KPIS = [
  { value: 9000, suffix: "+", label: "Nidos resguardados" },
  { value: 100000, suffix: "+", label: "Crías liberadas" },
];

/* Banner emocional entre la pasarela y el impacto del donativo — mismo lenguaje que el banner de Adopta */
function DonaEmotionalBanner() {
  return (
    <section style={{ position: "relative", background: TOKENS.noche, overflow: "hidden" }}>
      <div style={{ position: "relative", minHeight: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={IMAGES.hatchlingsToWaves}
          alt="Crías de tortuga marina llegando al mar"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 45%",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,38,43,0.68) 0%, rgba(16,38,43,0.52) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(180deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(0deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "80px 24px", textAlign: "center", zIndex: 2 }}>
          <Reveal>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: "#ffffff", fontSize: "clamp(24px, 3.4vw, 36px)", lineHeight: 1.25, margin: "0 0 32px", fontWeight: 700, textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
              Cada donativo se convierte en una tortuga más que llega viva al mar.
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "360px", margin: "0 auto" }}>
              {DONA_KPIS.map((k) => (
                <div key={k.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", color: "#FFFFFF" }}>
                    <AnimatedCounter value={k.value} suffix={k.suffix} />
                  </div>
                  <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11.5px", color: "#A8BCB8", marginTop: "2px" }}>
                    {k.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Sección de conclusión: refuerza el llamado a donar antes del footer */
function DonaConclusion({ scrollToPago }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "64px 24px 72px",
        overflow: "hidden",
        textAlign: "center",
        background: `linear-gradient(rgba(220,234,227,0.8), rgba(220,234,227,0.8)), url("${IMAGES.liberacionCrowd}") center/cover`,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22%", background: `linear-gradient(180deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%", background: `linear-gradient(0deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <SectionHead
            eyebrow="Gracias por tu apoyo"
            eyebrowColor={TOKENS.verdeOscuro}
            title="Juntos seguimos protegiendo cada nido"
            titleMaxWidth="20ch"
          >
            <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15.5px", lineHeight: 1.6, margin: "14px 0 28px" }}>
              Cada donativo, sin importar el monto, se convierte en patrullajes, corrales de incubación y crías que llegan vivas al mar.
              <br />
              Gracias por ser parte de esta labor.
            </p>
          </SectionHead>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button tone="shock" size="lg" onClick={scrollToPago}>Donar ahora</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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

  useEffect(() => {
    const prefill = sessionStorage.getItem("donaMontoPersonalizado");
    if (prefill) {
      setCustomAmount(prefill);
      sessionStorage.removeItem("donaMontoPersonalizado");
    }
  }, []);

  const baseAmountMinor = Math.round(Number(customAmount || selectedTier.amount) * 100);
  const amountMinor = coverProcessingCosts ? amountWithEstimatedProcessingCosts(baseAmountMinor) : baseAmountMinor;
  const processingContributionMinor = Math.max(0, amountMinor - baseAmountMinor);
  const activeAmount = `$${(amountMinor / 100).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

  const scrollToPago = () => {
    document.getElementById("modulo-dona-pago")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    <div style={{ position: "relative" }}>
      {/* 1. Hero — mismo patrón oscuro dividido que el resto del sitio */}
      <HeroShock image={IMAGES.laudcria} imageAlt="Campamento Tortuguero El Habillal - Cría Laúd" align="center">
        <span
          style={{
            color: TOKENS.cielo,
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: SPACE.sm,
            display: "block",
          }}
        >
          Apoya nuestra causa
        </span>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(26px, 3.4vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            margin: "0 0 18px",
          }}
        >
          Tu aporte se convierte en <span style={{ color: TOKENS.atardecer }}>vida</span>.
        </h1>

        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "15.5px",
            color: "#E7F0EC",
            lineHeight: 1.6,
            margin: "0 auto 34px",
            maxWidth: "48ch",
          }}
        >
          Tu contribución fortalece nuestras playas y hace posible el nacimiento seguro de miles de crías cada temporada en El Habillal.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button tone="shock" size="lg" onClick={scrollToPago}>Donar ahora</Button>
        </div>
      </HeroShock>

      <WaveDivider fromColor={TOKENS.noche} toColor={TOKENS.espuma} />

      {/* 2. Módulo de Donación (Con espacio para Pasarela Digital Stripe) */}
      <section
        id="modulo-dona-pago"
        style={{
          padding: "64px clamp(8px, 3vw, 24px) 64px",
          position: "relative",
          zIndex: 2,
          scrollMarginTop: "88px",
          background: `linear-gradient(rgba(220,234,227,0.82), rgba(220,234,227,0.82)), url("${IMAGES.tortus}") center/cover`,
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", background: `linear-gradient(180deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: `linear-gradient(0deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <SectionHead
              title="Elige el monto de tu donativo"
              titleMaxWidth="20ch"
            >
              <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", margin: "14px 0 0" }}>
                Apoya la conservación marina con un donativo único y seguro.
              </p>
            </SectionHead>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ marginTop: "32px" }}>
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

              {/* Monto Personalizado: campo de texto con fondo blanco e indicador */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "18px 0 22px" }}>
                <span style={{ color: TOKENS.noche, fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginRight: "4px" }}>Otro monto:</span>
                <strong style={{ color: TOKENS.noche, fontSize: "20px" }}>$</strong>
                <input
                  type="number"
                  min="10"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{ ...inputStyle, height: "46px", width: "160px", textAlign: "center", border: `2px solid ${customAmount ? TOKENS.verdeOscuro : TOKENS.arenaOscura}`, borderRadius: "8px", background: "#ffffff", boxShadow: "0 2px 8px rgba(16,38,43,0.06)", fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700 }}
                />
                <strong style={{ color: TOKENS.conchaSuave, fontSize: "12.5px" }}>MXN</strong>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", margin: "-8px 0 0", padding: "12px 14px", border: `1px solid ${TOKENS.arenaOscura}`, borderRadius: "10px", background: "#fff", cursor: checkoutPayload ? "default" : "pointer" }}>
                <input type="checkbox" checked={coverProcessingCosts} disabled={Boolean(checkoutPayload)} onChange={(event) => setCoverProcessingCosts(event.target.checked)} style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: TOKENS.verdeOscuro }} />
                <span style={{ color: TOKENS.noche, fontSize: "12.5px", lineHeight: 1.45 }}>
                  <strong style={{ display: "block" }}>Cubrir comisión estimada de procesamiento digital</strong>
                  {coverProcessingCosts
                    ? `Aportación adicional: $${(processingContributionMinor / 100).toFixed(2)} MXN · Total: ${activeAmount}`
                    : "Cálculo estimado para tarjeta nacional: 3.6% + $3 MXN, más IVA."}
                </span>
              </label>
            </div>
          </Reveal>
        </div>

        {/* PASARELA DIGITAL (STRIPE): fuera de la tarjeta blanca, a todo lo ancho disponible de la página */}
        <div style={{ maxWidth: "1100px", margin: "32px auto 0", padding: "0 clamp(0px, 1.5vw, 8px)", position: "relative", zIndex: 2 }}>
          <Reveal>
            {!checkoutPayload && (
              <>
                <StripeCheckoutHeader />

                <div className="stripe-customer-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px", maxWidth: "560px", margin: "0 auto 18px" }}>
                  <div>
                    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "4px", textAlign: "center" }}>
                      Nombre del Donador
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      style={{ ...inputStyle, textAlign: "center" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "4px", textAlign: "center" }}>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      style={{ ...inputStyle, textAlign: "center" }}
                    />
                  </div>
                </div>
              </>
            )}

            {paymentError && <p role="alert" style={{ color: "#B42318", fontSize: "13px", fontWeight: 600, margin: "0 0 12px", textAlign: "center" }}>{paymentError}</p>}
            {checkoutPayload ? (
              <StripeEmbeddedCheckout
                checkoutKey={checkoutPayload.request_id}
                createClientSecret={() => createDonationCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
                onCancel={() => setCheckoutPayload(null)}
              />
            ) : (
              <div style={{ maxWidth: "520px", margin: "0 auto" }}>
                <Button
                  tone="verde"
                  style={{ borderRadius: "999px", width: "100%", justifyContent: "center", padding: "15px 20px", fontSize: "15px" }}
                  onClick={startDonationCheckout}
                >
                  Continuar al pago ({activeAmount})
                </Button>
              </div>
            )}
          </Reveal>
        </div>

        <div style={{ maxWidth: "860px", margin: "24px auto 0", display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
          <Button
            tone="azul"
            style={{ width: "100%", maxWidth: "380px", borderRadius: "8px", justifyContent: "center", padding: "12px 18px", boxShadow: "none" }}
            onClick={() => setShowBankModal(true)}
          >
            Donar mediante transferencia SPEI
          </Button>
        </div>
      </section>

      <WaveDivider fromColor={TOKENS.espuma} toColor={TOKENS.noche} />
      <DonaEmotionalBanner />
      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />

      <FourFrentesBento compact eyebrow="En qué se usa tu donativo" title="Cuatro frentes que tu apoyo sostiene" background={SECTION_BG.claro} />

      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />
      <DonaConclusion scrollToPago={scrollToPago} />

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
                {copied ? "CLABE Copiada" : "Copiar CLABE"}
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

import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Button } from "../components/Button";

const DONATION_TIERS = [
  { amount: 150, title: "$150 MXN", impact: "Cubre 1 linterna de luz roja de patrullaje nocturno para proteger hembras anidadoras." },
  { amount: 350, title: "$350 MXN", impact: "Financia la protección completa de 1 nido (100+ huevos) en el corral de incubación." },
  { amount: 700, title: "$700 MXN", impact: "Provee insumos médicos, tanques de hidratación y cuidado de crías en rehabilitación." },
  { amount: 1500, title: "$1,500 MXN", impact: "Cubre combustible y mantenimiento de patrullaje de vigilancia en la playa." },
];

export function PageDona() {
  const [frequency, setFrequency] = useState("monthly"); // 'once' | 'monthly'
  const [selectedTier, setSelectedTier] = useState(DONATION_TIERS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAmount = customAmount ? `$${Number(customAmount).toLocaleString()} MXN` : selectedTier.title;

  const handleCopyCLABE = () => {
    navigator.clipboard?.writeText("012 180 0150 1234 5678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppDonate = () => {
    const text = encodeURIComponent(
      `Hola, quiero realizar un donativo (${frequency === "monthly" ? "Mensual" : "Único"}) de ${activeAmount} para apoyar la conservación del Campamento Tortuguero El Habillal.`
    );
    window.open(`https://wa.me/527531631707?text=${text}`, "_blank");
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
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: TOKENS.verdeOscuro,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Plataforma de Donación Segura
                </span>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(24px, 3.2vw, 36px)",
                    fontWeight: 700,
                    color: TOKENS.noche,
                    margin: "0 0 10px",
                  }}
                >
                  Elige la Frecuencia y el Monto
                </h2>
                <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "15px", margin: 0 }}>
                  Apoya la conservación marina con una aportación periódica o única.
                </p>
              </div>

              {/* Conmutador de Frecuencia: Mensual vs Única */}
              <div
                style={{
                  display: "flex",
                  background: TOKENS.espuma,
                  borderRadius: "999px",
                  padding: "4px",
                  maxWidth: "340px",
                  margin: "0 auto 28px",
                  border: `1px solid ${TOKENS.arenaOscura}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: "none",
                    background: frequency === "monthly" ? TOKENS.noche : "transparent",
                    color: frequency === "monthly" ? "#ffffff" : TOKENS.noche,
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  💚 Mensual (Recomendado)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("once")}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: "none",
                    background: frequency === "once" ? TOKENS.noche : "transparent",
                    color: frequency === "once" ? "#ffffff" : TOKENS.noche,
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  Donativo Único
                </button>
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
                        borderRadius: "14px",
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
              <div style={{ marginBottom: "28px" }}>
                <input
                  type="number"
                  placeholder="Otro monto ($ MXN)..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{ ...inputStyle, textAlign: "center", fontSize: "15px", fontWeight: 600 }}
                />
              </div>

              {/* ÁREA CONTENEDORA PARA PASARELA DIGITAL (STRIPE ELEMENTS) */}
              <div
                style={{
                  border: `2px dashed ${TOKENS.azulOla}`,
                  borderRadius: "20px",
                  padding: "24px",
                  background: "#FAFCFC",
                  marginBottom: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    borderBottom: `1px solid ${TOKENS.arenaOscura}`,
                    paddingBottom: "12px",
                  }}
                >
                  <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: TOKENS.azulOlaOscuro }}>
                    💳 Pago en línea con Tarjeta (Pasarela Digital Stripe)
                  </span>
                  <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11px", color: "#6B7280", background: "#E5E7EB", padding: "3px 8px", borderRadius: "6px" }}>
                    SSL 256-Bit Encrypted
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
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

                {/* Container Placeholder para Stripe Card Element */}
                <div
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${TOKENS.arenaOscura}`,
                    borderRadius: "12px",
                    padding: "14px 16px",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#9CA3AF",
                    fontSize: "13.5px",
                    fontFamily: "'Public Sans', sans-serif",
                  }}
                >
                  <span>Número de Tarjeta, MM/AA, CVC (Pasarela Stripe habilitada)</span>
                  <div style={{ display: "flex", gap: "6px", fontSize: "16px" }}>
                    <span>💳</span>
                    <span>🔒</span>
                  </div>
                </div>

                <Button
                  tone="verde"
                  style={{
                    borderRadius: "999px",
                    width: "100%",
                    justifyContent: "center",
                    padding: "15px 20px",
                    fontSize: "15px",
                    boxShadow: "0 10px 24px -8px rgba(76,107,79,0.4)",
                  }}
                  onClick={() => alert(`Procesando donativo ${frequency === "monthly" ? "mensual" : "único"} de ${activeAmount}. ¡Gracias por tu apoyo!`)}
                >
                  Completar Donativo en Línea ({activeAmount} {frequency === "monthly" ? "/ mes" : ""})
                </Button>
              </div>

              {/* Opciones Alternativas (SPEI & WhatsApp) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Button
                  tone="azul"
                  style={{ borderRadius: "999px", justifyContent: "center", padding: "12px" }}
                  onClick={() => setShowBankModal(true)}
                >
                  Transferencia SPEI (CLABE Directa)
                </Button>

                <button
                  type="button"
                  onClick={handleWhatsAppDonate}
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 18px",
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span>💬</span> Donar vía WhatsApp
                </button>
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

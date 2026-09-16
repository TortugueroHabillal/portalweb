import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { MosaicGrid } from "../components/MosaicGrid";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Button } from "../components/Button";
import { Eyebrow, H2, SectionHead } from "../components/Typography";

const DONATION_TIERS = [
  { amount: 150, title: "$150 MXN", impact: "Cubre 1 linterna de luz roja de patrullaje nocturno para proteger hembras anidadoras." },
  { amount: 350, title: "$350 MXN", impact: "Financia la protección completa de 1 nido (100+ huevos) en el corral de incubación." },
  { amount: 700, title: "$700 MXN", impact: "Provee insumos médicos, tanques de hidratación y cuidado de crías en rehabilitación." },
  { amount: 1500, title: "$1,500 MXN", impact: "Cubre combustible y mantenimiento para 1 semana de patrullaje en 14 km de playa." },
];

export function PageDona() {
  const [selectedTier, setSelectedTier] = useState(DONATION_TIERS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAmount = customAmount ? `$${Number(customAmount).toLocaleString()} MXN` : selectedTier.title;

  const handleCopyCLABE = () => {
    navigator.clipboard?.writeText("012 180 0150 1234 5678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppDonate = () => {
    const text = encodeURIComponent(`Hola, quiero realizar un donativo de ${activeAmount} para apoyar la conservación del Campamento Tortuguero El Habillal.`);
    window.open(`https://wa.me/527531631707?text=${text}`, "_blank");
  };

  return (
    <div>
      {/* Hero CTA Principal estilo Home */}
      <section className="tt-hero-shock">
        <div className="tt-hero-shock-msg">
          <Reveal from="left" distance={45}>
            <span
              style={{
                color: TOKENS.cielo,
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Donaciones y Apoyo
            </span>
            <H2 color="#fff" maxWidth="18ch">Tu aporte se convierte directamente en vida</H2>
            <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "14.5px", lineHeight: 1.6, margin: "10px 0 16px", maxWidth: "46ch" }}>
              El 100% de tu contribución se destina a la conservación en la playa: equipo de monitoreo nocturno, protección en corral e insumos para el nacimiento de crías.
            </p>

            {/* Tarjeta Interactiva de Donación integrada en el Hero */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "16px 18px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
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
                        background: isSelected ? TOKENS.verdeOscuro : "rgba(255,255,255,0.1)",
                        color: "#fff",
                        border: isSelected ? `2px solid ${TOKENS.verde}` : "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "999px",
                        padding: "8px 6px",
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {tier.title}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  tone="verde"
                  style={{ borderRadius: "999px", flex: 1, padding: "10px", fontSize: "13.5px", justifyContent: "center" }}
                  onClick={() => setShowBankModal(true)}
                >
                  Donar por Transferencia (SPEI)
                </Button>

                <button
                  type="button"
                  onClick={handleWhatsAppDonate}
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Indicadores KPI */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "12px" }}>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, color: TOKENS.cielo, lineHeight: 1 }}>
                  <AnimatedCounter value={9000} suffix="+" />
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11px", color: "#A8BCB8", marginTop: "2px" }}>
                  Nidos
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, color: TOKENS.verde, lineHeight: 1 }}>
                  <AnimatedCounter value={100000} suffix="+" />
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11px", color: "#A8BCB8", marginTop: "2px" }}>
                  Crías
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, color: TOKENS.coral, lineHeight: 1 }}>
                  +500
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11px", color: "#A8BCB8", marginTop: "2px" }}>
                  Donadores
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, color: TOKENS.cielo, lineHeight: 1 }}>
                  3
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "11px", color: "#A8BCB8", marginTop: "2px" }}>
                  Especies
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="tt-hero-shock-media">
          <img src={IMAGES.corralNidosAmplio} alt="Campamento Tortuguero El Habillal" />
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
            background: "rgba(16,38,43,0.75)",
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
              borderRadius: 0,
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              position: "relative",
              border: `1px solid ${TOKENS.arenaOscura}`,
            }}
          >
            <button
              onClick={() => setShowBankModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: TOKENS.concha,
              }}
            >
              ✕
            </button>

            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: TOKENS.noche, margin: "0 0 8px" }}>
              Datos para Donación Bancaria (SPEI)
            </h3>
            <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: TOKENS.conchaSuave, margin: "0 0 20px" }}>
              Realiza tu transferencia a la cuenta oficial de la asociación civil sin fines de lucro:
            </p>

            <div style={{ background: TOKENS.espuma, border: `1px solid ${TOKENS.arenaOscura}`, padding: "16px", borderRadius: 0, marginBottom: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "10px", fontSize: "13.5px", fontFamily: "'Public Sans', sans-serif" }}>
                <strong style={{ color: TOKENS.concha }}>Beneficiario:</strong>
                <span>Campamento Tortuguero El Habillal A.C.</span>

                <strong style={{ color: TOKENS.concha }}>Banco:</strong>
                <span>BBVA México</span>

                <strong style={{ color: TOKENS.concha }}>CLABE:</strong>
                <span style={{ fontFamily: "monospace", fontSize: "14px", fontWeight: 700, color: TOKENS.noche }}>012 180 0150 1234 5678</span>

                <strong style={{ color: TOKENS.concha }}>Concepto:</strong>
                <span>Donativo Temporada</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Button tone="verde" style={{ borderRadius: 0, flex: 1 }} onClick={handleCopyCLABE}>
                {copied ? "¡CLABE Copiada al Portapapeles!" : "Copiar CLABE (1-Clic)"}
              </Button>
              <Button tone="azul" style={{ borderRadius: 0 }} onClick={() => setShowBankModal(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Galería de Impacto Visual */}
      <section style={{ background: TOKENS.cieloClaro, padding: "56px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHead
            eyebrow="Tu impacto en la costa"
            eyebrowColor={TOKENS.azulOlaOscuro}
            title="Así se traduce cada peso donado en la playa"
            titleMaxWidth="26ch"
          />
          <div style={{ marginTop: "28px" }}>
            <MosaicGrid
              items={[
                { tone: "azul", src: IMAGES.hatchlingsBucket, caption: "", big: true },
                { tone: "verde", src: IMAGES.hatchlingLeatherbackProfile, caption: "" },
                { tone: "coral", src: IMAGES.criasAtardecer, caption: "" },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

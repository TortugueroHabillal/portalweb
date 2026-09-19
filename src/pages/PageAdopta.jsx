import { useState } from "react";
import { TOKENS, SECTION_BG, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { CertificateTemplate } from "../components/CertificateTemplate";
import { StripeEmbeddedCheckout } from "../components/StripeEmbeddedCheckout";
import { StripeCheckoutHeader } from "../components/StripeCheckoutHeader";
import { createAdoptionCheckout } from "../lib/payments";
import { WaveDivider } from "../components/WaveDivider";
import { SectionHead } from "../components/Typography";
import { HeroShock } from "../components/HeroShock";
import { CircleVectors } from "../components/CircleVectors";
import { ThinWaveVector } from "../components/ThinWaveVector";

const KPIS = [
  { value: 150, suffix: "+", label: "Nidos adoptados" },
  { value: 5000, suffix: "+", label: "Crías liberadas por adoptantes" },
];

const PASOS = [
  {
    t: "¿Cómo?",
    color: TOKENS.azulOlaOscuro,
    d: "Realiza una aportación o cuota de recuperación que ayuda a nuestro campamento a seguir con la labor del cuidado de las tortugas.",
  },
  {
    t: "¿Qué haremos?",
    color: TOKENS.verdeOscuro,
    d: "Nos encargaremos de cuidar tu nido durante el periodo de incubación hasta su nacimiento, y estaremos en contacto contigo para que puedas estar presente a la hora de liberar sus crías.",
  },
  {
    t: "¿Y si no puedo asistir?",
    color: TOKENS.coralOscuro,
    d: "Si no puedes asistir, nosotros nos encargaremos de tomar videos y realizar una transmisión en vivo a través de nuestras redes sociales; los videos serán enviados vía WhatsApp incluyendo fotografías.",
  },
];

const FAQS = [
  {
    q: "¿Puedo regalar la adopción de un nido a un amigo o familiar?",
    a: "Sí. Al realizar tu aportación puedes indicar el nombre del familiar o amigo a quien deseas regalar la adopción, y el certificado digital se expedirá a su nombre.",
  },
  {
    q: "¿Es posible apadrinar como escuela, empresa o grupo?",
    a: "Sí. Contamos con esquemas de apadrinamiento para grupos, escuelas y empresas que desean colaborar con la conservación de la tortuga marina.",
  },
  {
    q: "¿En qué se utiliza mi aportación?",
    a: "Tu aportación se destina a los materiales de resguardo en vivero, patrullajes nocturnos de vigilancia, insumos de protección y la logística del campamento.",
  },
];

function scrollToAdopcionPago() {
  document.getElementById("modulo-adopcion-pago")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* 1. Hero de Adopta — mismo patrón oscuro dividido que Home/Dona (HeroShock) */
function HeroAdopta() {
  return (
    <HeroShock image={IMAGES.liberacionSunsetPeople} imageAlt="Adopta un nido en El Habillal" align="center">
      <span
        style={{
          color: TOKENS.cielo,
          fontSize: "12.5px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "10px",
          display: "block",
        }}
      >
        Tú logras la conservación
      </span>

      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(26px, 3.4vw, 44px)",
          fontWeight: 700,
          lineHeight: 1.14,
          letterSpacing: "-0.01em",
          color: "#ffffff",
          margin: "0 0 12px",
        }}
      >
        Adopta un nido y cambia el <span style={{ color: TOKENS.atardecer }}>futuro del océano</span>.
      </h1>

      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: "15px",
          color: "#E7F0EC",
          lineHeight: 1.55,
          margin: "0 auto 34px",
          maxWidth: "48ch",
        }}
      >
        Dale una oportunidad a la naturaleza: Tu aporte de adopción de nido puede marcar la diferencia en la supervivencia de cientos de crías.
      </p>

      {/* Botón Verde Sólido Centrado: baja directo a la pasarela de pago */}
      <div style={{ marginBottom: "14px", display: "flex", justifyContent: "center" }}>
        <Button tone="verde" size="lg" onClick={scrollToAdopcionPago}>
          Adopta un Nido Ahora
        </Button>
      </div>

      <div>
        <a
          href="https://wa.me/527531631707?text=Hola,%20quiero%20apadrinar%20un%20nido%20de%20esta%20temporada."
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#CBD9D6", fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", textDecoration: "underline" }}
        >
          ¿Prefieres coordinarlo por WhatsApp? Escríbenos
        </a>
      </div>
    </HeroShock>
  );
}

/* 2. Banner de Crías — foto con overlay oscuro, decorado con círculos vectoriales (sin ola gruesa de recorte) */
function CriasBanner() {
  return (
    <section style={{ position: "relative", background: TOKENS.noche, overflow: "hidden" }}>
      <div style={{ position: "relative", minHeight: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={IMAGES.hatchlingCoconut}
          alt="Cría de tortuga marina en coco"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,38,43,0.68) 0%, rgba(16,38,43,0.52) 100%)", zIndex: 1 }} />
        {/* Difuminado hacia el tono noche en ambos bordes, para que la foto se funda con las olas delgadas vecinas */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(180deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(0deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "80px 24px", textAlign: "center", zIndex: 2 }}>
          <Reveal>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: "#ffffff", fontSize: "clamp(24px, 3.4vw, 36px)", lineHeight: 1.25, margin: "0 0 32px", fontWeight: 700, textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
              Cada nido salvaguardado es una nueva esperanza para nuestras playas.
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "360px", margin: "0 auto" }}>
              {KPIS.map((k) => (
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

function Proceso() {
  return (
    <section
      id="proceso-adopcion"
      style={{
        position: "relative",
        background: SECTION_BG.claro,
        padding: "64px 24px 72px",
        overflow: "hidden",
      }}
    >
      <ThinWaveVector />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px" }}>
          <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: TOKENS.azulOlaOscuro, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            El Proceso
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.4vw, 38px)", color: TOKENS.noche, margin: "6px 0 0", fontWeight: 700 }}>
            Apadrinar un nido, paso a paso
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {PASOS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "20px",
                  padding: "28px 24px",
                  height: "100%",
                  boxSizing: "border-box",
                  border: `1px solid ${TOKENS.cieloOscuro}`,
                  boxShadow: "0 10px 28px -16px rgba(16,38,43,0.12)",
                }}
              >
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: p.color, margin: "0 0 12px", fontWeight: 700 }}>{p.t}</h3>
                <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.7, margin: 0 }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3. Módulo de Pago / Pasarela Digital */
function ModuloAdoptaPago() {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [checkoutPayload, setCheckoutPayload] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  const startAdoptionCheckout = () => {
    setPaymentError("");
    if (donorName.trim().length < 2) return setPaymentError("Escribe el nombre que aparecerá en el certificado.");
    if (!/^\S+@\S+\.\S+$/.test(donorEmail.trim())) return setPaymentError("Escribe un correo electrónico válido.");
    setCheckoutPayload({
      request_id: crypto.randomUUID(),
      sponsor_name: donorName.trim(),
      sponsor_email: donorEmail.trim().toLowerCase(),
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
  };

  return (
    <section
      id="modulo-adopcion-pago"
      style={{
        padding: "64px clamp(8px, 3vw, 24px) 64px",
        position: "relative",
        scrollMarginTop: "88px",
        background: `linear-gradient(rgba(220,234,227,0.82), rgba(220,234,227,0.82)), url("${IMAGES.tortu1}") center/cover`,
      }}
    >
      {/* Difuminado hacia espuma sólido en ambos bordes — la foto de fondo no debe competir con las olas delgadas vecinas */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", background: `linear-gradient(180deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: `linear-gradient(0deg, ${TOKENS.espuma} 0%, rgba(220,234,227,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />

      <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <SectionHead
            title="Adopta un nido de la temporada activa"
            titleMaxWidth="22ch"
          >
            <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "17.5px", margin: "14px 0 0" }}>
              Cuota fija de aportación: <strong>$220 MXN</strong> por una adopción virtual.
            </p>
          </SectionHead>
        </Reveal>

        <Reveal delay={80}>
          <p style={{ margin: "28px 0 0", padding: "14px 16px", borderLeft: `3px solid ${TOKENS.verde}`, background: "#F5F9F6", color: TOKENS.conchaSuave, fontSize: "13px", lineHeight: 1.6 }}>Después de confirmar el pago, el sistema asignará de forma aleatoria un nido activo disponible. Al finalizar verás inmediatamente el número de nido que acompañarás.</p>
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
                    Nombre del Adoptante
                  </label>
                  <input type="text" placeholder="Para tu certificado digital" value={donorName} onChange={(e) => setDonorName(e.target.value)} style={{ ...inputStyle, textAlign: "center" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.noche, display: "block", marginBottom: "4px", textAlign: "center" }}>
                    Correo Electrónico
                  </label>
                  <input type="email" placeholder="Para enviarte la ficha del nido" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} style={{ ...inputStyle, textAlign: "center" }} />
                </div>
              </div>
            </>
          )}

          {paymentError && <p role="alert" style={{ color: "#B42318", fontSize: "13px", fontWeight: 600, margin: "0 0 12px", textAlign: "center" }}>{paymentError}</p>}
          {checkoutPayload ? (
            <StripeEmbeddedCheckout
              checkoutKey={checkoutPayload.request_id}
              createClientSecret={() => createAdoptionCheckout(checkoutPayload).catch((error) => { setPaymentError(error.message); throw error; })}
              onCancel={() => setCheckoutPayload(null)}
            />
          ) : (
            <div style={{ maxWidth: "520px", margin: "0 auto" }}>
              <Button tone="verde" style={{ borderRadius: "999px", width: "100%", justifyContent: "center", padding: "15px 20px", fontSize: "15px" }} onClick={startAdoptionCheckout}>
                Continuar al pago ($220 MXN)
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function CertificadoPreviewSection() {
  return (
    <section style={{ background: SECTION_BG.claro, padding: "48px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 28px" }}>
          <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, color: TOKENS.verdeOscuro, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Reconocimiento oficial
          </span>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(22px, 2.8vw, 30px)", color: TOKENS.noche, margin: "6px 0 8px", fontWeight: 700 }}>
            Tu apoyo es reconocido con un certificado digital
          </h2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, margin: 0 }}>
            Al apadrinar un nido recibes tu documento digital personalizado con la ficha de la postura y la temporada.
          </p>
        </div>

        <div style={{ marginTop: "20px", width: "100%", maxWidth: "560px", margin: "20px auto 0", overflowX: "auto" }}>
          <CertificateTemplate donorName="María Mercedes Pérez" temporada="Temporada 2026 - 2027" fecha="14 de Septiembre, 2026" />
        </div>
      </div>
    </section>
  );
}

/* Composición Vectorial de 3 Fotos Circulares en Tema Azulado */
function VectorCircleArtworkAdopta() {
  return (
    <div className="tt-vector-adopta-wrap">
      {/* 1. Círculo vectorial grande con gradiente azul mar (Bottom Right) */}
      <div
        className="tt-vector-adopta-bgcircle"
        style={{
          background: `linear-gradient(135deg, ${TOKENS.azulOla} 0%, ${TOKENS.azulOlaOscuro} 60%, ${TOKENS.nocheClara} 100%)`,
          boxShadow: "0 16px 36px -8px rgba(44,92,109,0.42)",
        }}
      />

      {/* 2. Anillo vectorial de acento azul (Left Edge) */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "0px",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          border: `6px solid ${TOKENS.azulOla}`,
          boxSizing: "border-box",
          zIndex: 4,
          boxShadow: "0 6px 18px rgba(62,124,147,0.3)",
        }}
      />

      {/* 3. Anillo de acento azul cielo (Top Edge) */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "22px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#EAF5F8",
          border: `3px solid ${TOKENS.cieloOscuro}`,
          opacity: 0.95,
          zIndex: 1,
        }}
      />

      {/* 4. Foto circular principal (Centro-Derecha) — Crías de tortuga */}
      <div className="tt-vector-adopta-main">
        <img
          src={IMAGES.hatchlingLeatherbackProfile}
          alt="Crías de tortuga marina rumbo al mar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 5. Foto circular secundaria (Arriba-Izquierda) — Cría closeup */}
      <div className="tt-vector-adopta-sec">
        <img
          src={IMAGES.hatchlingSilhouetteSingle}
          alt="Cría de tortuga marina"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 6. Foto circular terciaria (Abajo-Izquierda) — Tortuga al atardecer */}
      <div className="tt-vector-adopta-tert">
        <img
          src={IMAGES.turtleDusk}
          alt="Tortuga en patrullaje"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

/* 4. Preguntas Frecuentes: Composición vectorial a la izquierda y preguntas desplegables a la derecha */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ background: TOKENS.arena, padding: "64px 24px 88px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px", alignItems: "center" }}>
          <Reveal from="left">
            <VectorCircleArtworkAdopta />
          </Reveal>

          <Reveal from="right">
            <div>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: TOKENS.azulOlaOscuro, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>
                  Dudas Frecuentes
                </span>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.4vw, 38px)", color: TOKENS.noche, margin: 0, fontWeight: 700, lineHeight: 1.2 }}>
                  Preguntas sobre el apadrinamiento
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {FAQS.map((faq, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div
                      key={faq.q}
                      style={{
                        background: "#ffffff",
                        borderRadius: "18px",
                        border: `1px solid ${isOpen ? TOKENS.azulOla : TOKENS.arenaOscura}`,
                        padding: "20px 24px",
                        boxShadow: "0 8px 24px -16px rgba(16,38,43,0.08)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "'Fraunces', serif",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: isOpen ? TOKENS.azulOlaOscuro : TOKENS.noche,
                          padding: 0,
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ fontSize: "22px", marginLeft: "12px", color: TOKENS.verdeOscuro }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div style={{ paddingTop: "14px", fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.conchaSuave, lineHeight: 1.65 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 5. Último llamado — banner motivacional de cierre, mismo idioma visual que CriasBanner */
function FinalCTABanner() {
  return (
    <section style={{ position: "relative", background: TOKENS.noche, overflow: "hidden" }}>
      <div style={{ position: "relative", minHeight: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={IMAGES.criasAtardecer}
          alt="Crías de tortuga marina rumbo al mar al atardecer"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,38,43,0.72) 0%, rgba(16,38,43,0.58) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(180deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(0deg, ${TOKENS.noche} 0%, rgba(16,38,43,0) 100%)`, zIndex: 1, pointerEvents: "none" }} />
        <CircleVectors variant="dark" />

        <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", padding: "88px 24px", textAlign: "center", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: TOKENS.cielo, marginBottom: "10px", display: "block" }}>
              Aún estás a tiempo
            </span>
            <h2 style={{ fontFamily: "'Fraunces', serif", color: "#ffffff", fontSize: "clamp(26px, 3.4vw, 38px)", lineHeight: 1.25, margin: "0 0 14px", fontWeight: 700 }}>
              Súmate a salvar a nuestras tortugas
            </h2>
            <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#CBD9D6", fontSize: "15.5px", lineHeight: 1.6, margin: "0 0 26px" }}>
              Adopta un nido de esta temporada y sigue su historia hasta el mar. Tu apoyo directo es la diferencia entre un nido protegido y uno perdido.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button tone="verde" size="lg" onClick={scrollToAdopcionPago}>Adopta un Nido Ahora</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PageAdopta() {
  return (
    <div>
      <HeroAdopta />
      <WaveDivider fromColor={TOKENS.noche} toColor={SECTION_BG.claro} />
      <Proceso />
      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.noche} />
      <CriasBanner />
      <WaveDivider fromColor={TOKENS.noche} toColor={TOKENS.espuma} />

      <ModuloAdoptaPago />
      <div style={{ lineHeight: 0 }}><WaveDivider fromColor={TOKENS.espuma} toColor={SECTION_BG.claro} /></div>

      <CertificadoPreviewSection />
      <div style={{ lineHeight: 0 }}><WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.arena} /></div>

      <FAQSection />
      <WaveDivider fromColor={TOKENS.arena} toColor={TOKENS.noche} />
      <FinalCTABanner />
    </div>
  );
}

import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { Button } from "../components/Button";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Eyebrow, H2, SectionHead } from "../components/Typography";
import { CertificateTemplate } from "../components/CertificateTemplate";

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
    d: "Nos encargaremos de cuidar tu nido durante el periodo de incubación hasta su nacimiento, y estaremos en contacto contigo para que puedas estar presente a la hora de liberar sus crías. Además, recibes tu certificado digital de apadrinamiento.",
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
    img: IMAGES.touristsSunsetRelease,
  },
  {
    q: "¿Es posible apadrinar como escuela, empresa o grupo?",
    a: "Sí. Contamos con esquemas de apadrinamiento para grupos, escuelas y empresas que desean colaborar con la conservación de la tortuga marina.",
    img: IMAGES.adoptado1,
  },
  {
    q: "¿En qué se utiliza mi aportación?",
    a: "Tu aportación se destina a los materiales de resguardo en vivero, patrullajes nocturnos de vigilancia, insumos de protección y la logística del campamento.",
    img: IMAGES.corralNidos,
  },
];

function Hero() {
  return (
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
              marginBottom: "10px",
              display: "block",
            }}
          >
            TEMPORADA 2026 - 2027
          </span>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(26px,3.2vw,44px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#ffffffff",
              margin: "8px 0 14px",
            }}
          >
            Adopta un nido esta temporada
          </h1>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "14.5px",
              color: "#E7F0EC",
              lineHeight: 1.55,
              margin: "0 0 16px",
              fontWeight: 500,
              maxWidth: "48ch",
            }}
          >
            Tu adopción cubre el resguardo, monitoreo y liberación de un nido. Recibirás su ficha con fecha estimada de eclosión y tu certificado digital de apadrinamiento.
          </p>

          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              color: TOKENS.cielo,
              fontWeight: 700,
              fontSize: "12.5px",
              lineHeight: 1.45,
              margin: "0 0 20px",
              maxWidth: "46ch",
            }}
          >
            ✦ Lo que tu adopción hace posible: Miles de crías tocan el mar cada temporada gracias a nidos adoptados como el tuyo.
          </p>

          <div style={{ marginBottom: "20px" }} className="tt-hero-buttons">
            <a
              href="https://wa.me/527531631707?text=Hola,%20quiero%20apadrinar%20un%20nido%20de%20esta%20temporada."
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              <Button tone="shock" size="lg">
                Apadrinar un nido
              </Button>
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: "14px",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {KPIS.map((k) => (
              <div key={k.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(22px,2.8vw,32px)", color: "#FFFFFF" }}>
                  <AnimatedCounter value={k.value} suffix={k.suffix} />
                </div>
                <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", color: "#A8BCB8", marginTop: "2px" }}>
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="tt-hero-shock-media">
        <img src={IMAGES.liberacionSunsetPeople} alt="Adopta un nido" />
      </div>
    </section>
  );
}

function CriasBanner() {
  return (
    <section style={{ position: "relative", minHeight: "34vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img
        src={IMAGES.hatchlingCoconut}
        alt="Cría de tortuga marina"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(16,38,43,0.85) 0%, rgba(16,38,43,0.4) 100%)" }} />
      <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto", padding: "44px 32px", textAlign: "center" }}>
        <Reveal>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "clamp(20px,3vw,30px)", lineHeight: 1.3, margin: 0 }}>
            Cada nido salvaguardado es una nueva esperanza para nuestras playas.
          </h3>
        </Reveal>
      </div>
    </section>
  );
}

function Proceso() {
  return (
    <section id="proceso-adopcion" style={{ background: TOKENS.cieloClaro, padding: "52px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="El proceso" eyebrowColor={TOKENS.azulOlaOscuro} title="Apadrinar un nido, paso a paso" titleMaxWidth="22ch" />
        <div className="tt-cols-3" style={{ marginTop: "32px", gap: "24px" }}>
          {PASOS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 0,
                  padding: "26px",
                  height: "100%",
                  boxSizing: "border-box",
                  border: `1px solid ${TOKENS.arenaOscura}`,
                  boxShadow: "0 8px 24px -16px rgba(16,38,43,0.2)",
                }}
              >
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: p.color, margin: "0 0 12px" }}>{p.t}</h3>
                <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, lineHeight: 1.7, margin: 0 }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ background: TOKENS.espuma, padding: "64px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead eyebrow="Preguntas frecuentes" title="Dudas sobre el apadrinamiento" titleMaxWidth="22ch" />

        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const isEven = idx % 2 === 0;
            return (
              <Reveal key={faq.q} delay={idx * 80}>
                <div
                  style={{
                    background: "#fff",
                    border: `1px solid ${isOpen ? TOKENS.azulOla : TOKENS.arenaOscura}`,
                    borderRadius: 0,
                    padding: "20px",
                    boxShadow: "0 8px 24px -16px rgba(16,38,43,0.15)",
                  }}
                  className="tt-faq-item"
                >
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "'Fraunces', serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: isOpen ? TOKENS.azulOlaOscuro : TOKENS.noche,
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{ fontSize: "20px", marginLeft: "12px" }}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingTop: "10px", fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.conchaSuave, lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <PhotoFrame shape="wide" tone={isEven ? "verde" : "coral"} src={faq.img} style={{ aspectRatio: "16/10", borderRadius: 0 }} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CertificadoPreviewSection() {
  return (
    <section style={{ background: "#fff", padding: "52px 32px", borderTop: `1px solid ${TOKENS.arenaOscura}` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHead
          eyebrow="Tu Reconocimiento Oficial"
          eyebrowColor={TOKENS.verdeOscuro}
          title="Tu apoyo es reconocido con un Certificado Digital"
          titleMaxWidth="24ch"
        />

        <div style={{ marginTop: "28px", width: "100%", overflowX: "auto" }}>
          <CertificateTemplate donorName="María Mercedes Pérez" temporada="Temporada 2026" fecha="14 de Septiembre, 2026" />
        </div>
      </div>
    </section>
  );
}

export function PageAdopta() {
  return (
    <div>
      <Hero />
      <CriasBanner />
      <Proceso />
      <CertificadoPreviewSection />
      <FAQSection />
    </div>
  );
}

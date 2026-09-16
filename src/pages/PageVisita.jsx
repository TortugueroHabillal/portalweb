import { useState } from "react";
import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "../components/Reveal";
import { PhotoFrame } from "../components/PhotoFrame";
import { MosaicGrid } from "../components/MosaicGrid";
import { Button } from "../components/Button";
import { Eyebrow, H2, SectionHead } from "../components/Typography";

const TIPOS_GRUPO = ["Académico", "Empresarial", "Gubernamental", "Comunitario", "Turístico", "Otro"];

function FieldLabel({ children }) {
  return (
    <label style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: TOKENS.concha, display: "block", marginBottom: "4px" }}>
      {children}
    </label>
  );
}

export function PageVisita() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    origen: "",
    fecha: "",
    asistentes: "",
    tipo: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    height: "36px",
    border: `1px solid ${TOKENS.arenaOscura}`,
    borderRadius: 0,
    background: "#fff",
    color: TOKENS.noche,
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px",
    padding: "0 10px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <section style={{ background: TOKENS.cieloClaro, padding: "44px 32px 48px", minHeight: "65vh" }}>
      <div className="tt-cols-2" style={{ maxWidth: "1150px", margin: "0 auto", gap: "36px", alignItems: "center" }}>
        <Reveal>
          <H2>Agenda un recorrido por el campamento</H2>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: TOKENS.conchaSuave, fontSize: "14px", lineHeight: 1.6, margin: "10px 0 16px", maxWidth: "44ch" }}>
            Recorridos guiados de martes a domingo, sujetos a temporada de anidación. Grupos de hasta 12 personas.
          </p>
          <PhotoFrame shape="wide" tone="azul" src={IMAGES.liberacionCrowd} style={{ aspectRatio: "16/9", maxHeight: "250px", borderRadius: 0 }} />
        </Reveal>

        <Reveal delay={120} style={{ marginTop: "16px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 0,
              padding: "22px 24px",
              boxShadow: "0 10px 28px -18px rgba(16,38,43,0.25)",
              border: `1px solid ${TOKENS.arenaOscura}`,
            }}
          >
            {sent ? (
              <div style={{ padding: "20px 10px", textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", color: TOKENS.verdeOscuro, fontSize: "18px", margin: "0 0 8px" }}>
                  ¡Solicitud enviada con éxito!
                </h3>
                <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13.5px", color: TOKENS.conchaSuave, lineHeight: 1.5, margin: "0 0 16px" }}>
                  Gracias <strong>{form.nombre}</strong>. Nos pondremos en contacto contigo vía <strong>{form.correo}</strong> para confirmar la fecha de tu visita.
                </p>
                <Button tone="verde" style={{ borderRadius: "999px" }} onClick={() => setSent(false)}>
                  Agendar otra visita
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: TOKENS.noche, margin: "0 0 14px" }}>
                  Datos de la reserva
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <FieldLabel>Nombre completo *</FieldLabel>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Tu nombre completo"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <FieldLabel>Correo electrónico *</FieldLabel>
                    <input
                      type="email"
                      required
                      value={form.correo}
                      onChange={(e) => setForm({ ...form, correo: e.target.value })}
                      placeholder="tu@correo.com"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <FieldLabel>Lugar de origen</FieldLabel>
                    <input
                      type="text"
                      value={form.origen}
                      onChange={(e) => setForm({ ...form, origen: e.target.value })}
                      placeholder="Ciudad / Estado"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <FieldLabel>Fecha deseada *</FieldLabel>
                    <input
                      type="date"
                      required
                      value={form.fecha}
                      onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <FieldLabel>Cantidad de asistentes</FieldLabel>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={form.asistentes}
                      onChange={(e) => setForm({ ...form, asistentes: e.target.value })}
                      placeholder="Ej. 4"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <FieldLabel>Tipo de grupo</FieldLabel>
                    <select
                      value={form.tipo}
                      onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      {TIPOS_GRUPO.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "14px" }}>
                  <Button type="submit" tone="verde" style={{ borderRadius: "999px", width: "100%", justifyContent: "center" }}>
                    Enviar solicitud de reserva
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth: "1100px", margin: "40px auto 0" }}>
        <SectionHead
          eyebrow="Experiencia del visitante"
          eyebrowColor={TOKENS.azulOlaOscuro}
          title="Turistas y familias compartiendo la conservación"
          titleMaxWidth="24ch"
        />
        <div style={{ marginTop: "24px" }}>
          <MosaicGrid
            items={[
              { tone: "azul", src: IMAGES.touristsSunsetRelease, caption: "", big: true },
              { tone: "verde", src: IMAGES.tourists1, caption: "" },
              { tone: "coral", src: IMAGES.nightPatrolTeam, caption: "" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

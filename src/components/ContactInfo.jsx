import { TOKENS } from "../theme";

/* ---------- Ficha de datos de contacto — dirección, teléfono y horario ---------- */
export function ContactInfo() {
  const rows = [
    { label: "Dirección", value: "La caroa, Tenencia, 60981 El Habillal, Mich." },
    { label: "Teléfono", value: "753 163 1707" },
  ];
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "26px 28px",
        boxShadow: "0 14px 32px -22px rgba(16,38,43,0.35)",
        height: "fit-content",
        boxSizing: "border-box",
      }}
    >
      {rows.map((r) => (
        <div key={r.label} style={{ marginBottom: "14px" }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 4px" }}>
            {r.label}
          </p>
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "14.5px", color: TOKENS.concha, margin: 0, lineHeight: 1.5 }}>
            {r.value}
          </p>
        </div>
      ))}
      <div>
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: TOKENS.azulOlaOscuro, margin: "0 0 6px" }}>
          Horario
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.concha, margin: "2px 0" }}>
          <span>Domingo a viernes</span>
          <span style={{ fontWeight: 600 }}>7:30 a.m.–9 p.m.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "'Public Sans', sans-serif", fontSize: "14px", color: TOKENS.concha, margin: "2px 0" }}>
          <span>Sábado</span>
          <span style={{ fontWeight: 600 }}>7:30 a.m.–6 p.m.</span>
        </div>
      </div>
    </div>
  );
}

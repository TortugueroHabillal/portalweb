import { TOKENS } from "../theme";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

/* ---------- Estadística con contador ---------- */
export function StatCard({ value, suffix = "", label, tone = "azul" }) {
  const toneColor = tone === "azul" ? TOKENS.azulOlaOscuro : tone === "coral" ? TOKENS.coralOscuro : TOKENS.verdeOscuro;
  return (
    <Reveal>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "26px 22px",
          textAlign: "center",
          boxShadow: "0 10px 26px -18px rgba(16,38,43,0.35)",
        }}
      >
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", color: toneColor }}>
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "13px", color: TOKENS.conchaSuave, marginTop: "6px" }}>
          {label}
        </div>
      </div>
    </Reveal>
  );
}

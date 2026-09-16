import { TOKENS } from "../theme";

/* ---------- Botón CTA ---------- */
export function Button({ children, tone = "coral", onClick, size = "md", style }) {
  const bgMap = {
    coral: TOKENS.coral,
    verde: TOKENS.verde,
    azul: TOKENS.azulOla,
    shock: TOKENS.atardecer,
    outline: "transparent",
  };
  const border = tone === "outline" ? `1.5px solid ${TOKENS.arena}` : "none";
  const color = tone === "outline" ? TOKENS.arena : "#FBF8F2";
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Public Sans', sans-serif",
        fontWeight: 700,
        fontSize: size === "lg" ? "17px" : "14px",
        padding: size === "lg" ? "17px 32px" : "11px 20px",
        borderRadius: "999px",
        background: bgMap[tone],
        border,
        color,
        cursor: "pointer",
        boxShadow: tone === "coral" ? "0 8px 20px -8px rgba(190,106,74,0.55)" : tone === "shock" ? "0 10px 26px -8px rgba(226,83,31,0.65)" : "none",
        transition: "transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.015)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      {children}
    </button>
  );
}

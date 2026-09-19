import { TOKENS } from "../theme";

/* ---------- Botón CTA ---------- */
export function Button({ children, tone = "coral", onClick, size = "md", style, type = "button", disabled = false }) {
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
      type={type}
      disabled={disabled}
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
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "none",
        transition: "transform 0.18s ease, opacity 0.18s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
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

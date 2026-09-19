import { TOKENS } from "../theme";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, color = TOKENS.verde, center = false }) {
  if (!children) return null;
  return (
    <p
      style={{
        fontFamily: "'Public Sans', sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        color,
        margin: center ? "0 auto 10px auto" : "0 0 10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        gap: "8px",
      }}
    >
      <span style={{ width: "18px", height: "2px", background: color, display: "inline-block", borderRadius: "2px" }} />
      {children}
    </p>
  );
}

export function H2({ children, color = TOKENS.concha, center = false, maxWidth = "16ch", style }) {
  return (
    <h2
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 600,
        fontSize: "clamp(28px, 3.4vw, 42px)",
        lineHeight: 1.12,
        color,
        margin: center ? "0 auto" : 0,
        maxWidth,
        textAlign: center ? "center" : "left",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/* ---------- Encabezado de sección centrado (para secciones sin imagen adjunta) ---------- */
export function SectionHead({ eyebrow, eyebrowColor, title, titleColor, titleMaxWidth = "24ch", children }) {
  return (
    <Reveal style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
      {eyebrow && <Eyebrow color={eyebrowColor} center>{eyebrow}</Eyebrow>}
      <H2 color={titleColor} center maxWidth={titleMaxWidth}>{title}</H2>
      {children}
    </Reveal>
  );
}

/* ---------- Divisor tipo ola ---------- */
export function WaveDivider({ fromColor, toColor, flip = false, style = {} }) {
  return (
    <div style={{ background: fromColor || "transparent", lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", ...style }}>
      <svg viewBox="0 0 1200 60" width="100%" height="48" preserveAspectRatio="none" style={{ display: "block" }}>
        <path
          d="M0,20 C200,60 350,0 600,24 C850,48 1000,4 1200,28 L1200,60 L0,60 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

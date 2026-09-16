import { TOKENS } from "../theme";

/* ---------- Franja de olas animadas — decorativa, se desplaza en bucle ---------- */
export function AnimatedWave({ color = TOKENS.azulOla, opacity = 0.18, height = 40 }) {
  return (
    <div style={{ overflow: "hidden", lineHeight: 0, height }}>
      <svg
        className="tt-wave-scroll"
        viewBox="0 0 2400 60"
        width="2400"
        height={height}
        preserveAspectRatio="none"
        style={{ opacity, display: "block" }}
      >
        <path
          d="M0,30 C100,60 200,0 300,30 C400,60 500,0 600,30 C700,60 800,0 900,30 C1000,60 1100,0 1200,30 C1300,60 1400,0 1500,30 C1600,60 1700,0 1800,30 C1900,60 2000,0 2100,30 C2200,60 2300,0 2400,30 L2400,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

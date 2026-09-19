import { TOKENS } from "../theme";

/* ---------- Vector de olas decorativo de fondo (reutilizado en varias secciones) ---------- */
export function WaveVectorBackground({ style }) {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-50,80 C180,260 380,20 600,180 C800,320 1050,110 1050,110 C1050,110 820,380 600,250 C380,120 180,330 -50,150 Z"
        fill={TOKENS.cielo}
        opacity="0.28"
      />
      <path
        d="M-20,160 C200,330 420,70 650,230 C850,340 1020,190 1020,190"
        fill="none"
        stroke={TOKENS.azulOla}
        strokeWidth="3.5"
        opacity="0.28"
      />
      <path
        d="M-20,110 C240,280 440,30 700,190 C880,280 1020,160 1020,160"
        fill="none"
        stroke={TOKENS.coral}
        strokeWidth="2.5"
        opacity="0.38"
      />
    </svg>
  );
}

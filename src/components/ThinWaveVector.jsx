import { TOKENS } from "../theme";

/* ---------- Vector de ola descendente — una sola curva suave con doble trazo (azul + verde), como en Especies (Home) ----------
   `part` empalma dos mitades en la costura cuando se usa en dos secciones consecutivas ("top" arriba, "bottom" abajo);
   se omite para usarlo en una sola sección independiente.
*/
export function ThinWaveVector({ part }) {
  const d = part === "bottom" ? "M50,0 C20,30 70,60 35,100" : "M85,0 C55,35 95,65 50,100";
  const d2 = part === "bottom" ? "M53,-4 C23,28 76,58 38,104" : "M92,-2 C60,34 102,66 53,104";
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke={TOKENS.azulOla} strokeOpacity="0.22" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <path d={d2} fill="none" stroke={TOKENS.verde} strokeOpacity="0.16" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

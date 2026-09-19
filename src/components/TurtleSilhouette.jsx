import { useMemo } from "react";

/* ---------- Silueta decorativa de tortuga bebé, vista superior, orientación horizontal ----------
   Las aletas van en un <g> hijo sin transform propio para que la animación CSS de "brazada"
   (definida en theme.js) las rote alrededor de su punto de apoyo sin pisar el transform estático
   del <g> padre, que sólo posiciona cada aleta junto al caparazón.
*/
let turtleIdCounter = 0;
export function TurtleSilhouette({ size = 260, color = "rgba(62,124,147,0.14)", style, crawl = false }) {
  const flipperClass = (base) => (crawl ? `${base} tt-flipper` : base);
  const clipId = useMemo(() => `tt-shell-clip-${++turtleIdCounter}`, []);
  return (
    <svg
      viewBox="0 0 140 90"
      width={size}
      height={size * (90 / 140)}
      className={crawl ? "tt-turtle-crawl" : undefined}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      {/* aleta delantera superior — cerca de la cabeza, en el lado hacia donde avanza */}
      <g transform="translate(90,24)">
        <g className={flipperClass("tt-flipper-front")} style={crawl ? { animationDelay: "0s" } : undefined}>
          <ellipse cx="0" cy="0" rx="20" ry="8" fill={color} transform="rotate(-24)" />
        </g>
      </g>
      {/* aleta delantera inferior */}
      <g transform="translate(90,66)">
        <g className={flipperClass("tt-flipper-front")} style={crawl ? { animationDelay: "0.4s" } : undefined}>
          <ellipse cx="0" cy="0" rx="20" ry="8" fill={color} transform="rotate(24)" />
        </g>
      </g>
      {/* aleta trasera superior */}
      <g transform="translate(44,28)">
        <g className={flipperClass("tt-flipper-back")} style={crawl ? { animationDelay: "0.2s" } : undefined}>
          <ellipse cx="0" cy="0" rx="14" ry="6" fill={color} transform="rotate(-28)" />
        </g>
      </g>
      {/* aleta trasera inferior */}
      <g transform="translate(44,62)">
        <g className={flipperClass("tt-flipper-back")} style={crawl ? { animationDelay: "0.6s" } : undefined}>
          <ellipse cx="0" cy="0" rx="14" ry="6" fill={color} transform="rotate(28)" />
        </g>
      </g>
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="68" cy="45" rx="34" ry="24" />
        </clipPath>
      </defs>
      <ellipse cx="68" cy="45" rx="34" ry="24" fill={color} />
      {/* líneas del caparazón — placas del carapacho, recortadas al óvalo del caparazón */}
      <g clipPath={`url(#${clipId})`} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" fill="none">
        <path d="M40,30 C52,25 84,25 96,30" />
        <path d="M38,45 L98,45" />
        <path d="M40,60 C52,65 84,65 96,60" />
        <line x1="54" y1="23" x2="54" y2="67" />
        <line x1="82" y1="23" x2="82" y2="67" />
      </g>
      <ellipse cx="120" cy="45" rx="11" ry="9.5" fill={color} />
    </svg>
  );
}

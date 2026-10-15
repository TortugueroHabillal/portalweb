import { useEffect, useRef } from "react";

/* ---------- Background paths: curvas largas y fluidas que se trazan solas ----------
   Geometría del componente de referencia (kokonut «background paths»): curvas
   Bézier suaves y paralelas. Usamos una sola familia (sin el espejo) para que
   las líneas nunca se crucen. Pocas líneas a propósito: cada trazo
   animado cuesta un repintado por frame. Solo se anima stroke-dashoffset y la
   animación se pausa cuando las olas no están en pantalla.
*/

const rand = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function curve(i, position) {
  const a = 380 - i * 5 * position;
  const b = 312 - i * 5 * position;
  const c = 152 - i * 5 * position;
  const d = 616 - i * 5 * position;
  const e = 684 - i * 5 * position;
  return `M-${a} -${189 + i * 6}C-${a} -${189 + i * 6} -${b} ${216 - i * 6} ${c} ${343 - i * 6}C${d} ${470 - i * 6} ${e} ${875 - i * 6} ${e} ${875 - i * 6}`;
}

function FloatingPaths({ position, count }) {
  const step = 36 / count; // reparte las pocas líneas en todo el abanico
  return Array.from({ length: count }, (_, i) => (
    <path
      key={`${position}-${i}`}
      d={curve(i * step, position)}
      pathLength="1"
      strokeWidth={0.8 + i * 0.12}
      strokeOpacity={0.25 + (i / count) * 0.45}
      style={{
        "--mv-draw-dur": `${18 + rand(i + position * 50) * 10}s`,
        animationDelay: `${-rand(i * 3 + position) * 20}s`,
      }}
    />
  ));
}

export function BackgroundPaths({ count = 9, className = "mv-paths" }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const io = new IntersectionObserver(([entry]) => {
      svg.classList.toggle("mv-paths--paused", !entry.isIntersecting);
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} className={className} viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <FloatingPaths position={1} count={count} />
    </svg>
  );
}

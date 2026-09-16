import { useEffect, useState } from "react";
import { useOnScreenRepeat } from "../hooks/useOnScreen";

/* ---------- Contador animado — se reinicia y vuelve a contar cada vez que entra en pantalla ---------- */
export function AnimatedCounter({ value, duration = 1400, suffix = "" }) {
  const [ref, visible] = useOnScreenRepeat(0.5);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) {
      setDisplay(0);
      return;
    }
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

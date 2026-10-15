import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* ---------- Palabra que rota y se asienta en la última ----------
   Cambia rápido entre las palabras, se queda `holdMs` en la última
   y vuelve a empezar. Las palabras invisibles reservan el ancho
   para que la frase no salte.
*/
export function RotatingWord({ words, stepMs = 1100, holdMs = 3400 }) {
  const reduce = useReducedMotion();
  const last = words.length - 1;
  const [i, setI] = useState(reduce ? last : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n === last ? 0 : n + 1)), i === last ? holdMs : stepMs);
    return () => clearTimeout(t);
  }, [i, last, stepMs, holdMs, reduce]);

  return (
    <span className="mv-rotator">
      {words.map((w) => (
        <span key={w} className="mv-rotator__ghost" aria-hidden="true">{w}</span>
      ))}
      <span className="sr-only">{words[last]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="mv-rotator__word"
          aria-hidden="true"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

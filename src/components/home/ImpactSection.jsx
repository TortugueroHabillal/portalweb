import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { AnimatedCounter } from "../AnimatedCounter";
import { HOME_MEDIA } from "./media";

const STATS = [
  { value: 100000, suffix: "+", label: "crías liberadas" },
  { value: 9000, suffix: "+", label: "nidos protegidos" },
  { value: 13, suffix: "", label: "temporadas en la playa" },
];

const SPECIES = [
  { name: "Golfina", sci: "Lepidochelys olivacea", img: HOME_MEDIA.golfina },
  { name: "Laúd", sci: "Dermochelys coriacea", img: HOME_MEDIA.laud },
  { name: "Negra", sci: "Chelonia mydas agassizii", img: HOME_MEDIA.negra, flip: true },
];

/* ---------- 5 · Impacto: contadores + las 3 especies ----------
   El contador de especies sube 1 → 2 → 3 y con cada número aparece una
   especie (la golfina primero). Se repite cada vez que entra en pantalla.
*/
export function ImpactSection({ go }) {
  const reduce = useReducedMotion();
  const speciesRef = useRef(null);
  const inView = useInView(speciesRef, { amount: 0.5 });
  const [shown, setShown] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) return;
    if (!inView) {
      setShown(0);
      return;
    }
    if (shown >= 3) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : 650);
    return () => clearTimeout(t);
  }, [inView, shown, reduce]);

  return (
    <section className="mv-impacto" data-snap>
      <p className="mv-kicker mv-kicker--ola">Nuestro impacto</p>
      <h2 className="mv-display">Cada temporada, <em>más vidas al mar</em></h2>

      <div className="mv-impacto__stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="mv-stat__n"><AnimatedCounter value={s.value} suffix={s.suffix} /></div>
            <div className="mv-stat__l">{s.label}</div>
          </div>
        ))}
      </div>

      <div ref={speciesRef} className="mv-impacto__species">
        <div>
          <div className="mv-species__count" aria-label="3 especies">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={Math.max(shown, 1)}
                style={{ display: "inline-block" }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {Math.max(shown, 1)}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mv-stat__l">especies que llegan<br />a anidar a nuestra playa</div>
        </div>

        {SPECIES.map((sp, i) => (
          <motion.button
            key={sp.name}
            type="button"
            className="mv-species"
            onClick={() => go("about")}
            initial={false}
            animate={shown > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Tortuga ${sp.name}, ${sp.sci}. Conoce más`}
          >
            <img src={sp.img} alt="" loading="lazy" decoding="async" style={sp.flip ? { transform: "scaleX(-1)" } : undefined} />
            <b>{sp.name}</b>
            <i>{sp.sci}</i>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

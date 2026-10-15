import { motion, useReducedMotion } from "motion/react";
import { HOME_MEDIA } from "./media";

const ease = [0.22, 1, 0.36, 1];

/* ---------- 4 · Adopta: la mano con la golfina sale del borde derecho ----------
   Llega justo después del portal «ADOPTA UN NIDO», así que no repite la etiqueta. */
export function AdoptaFeature({ go }) {
  const reduce = useReducedMotion();
  const enter = (delay = 0, from = { y: 24 }) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, ...from },
          whileInView: { opacity: 1, x: 0, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section className="mv-adopta">
      <div className="mv-adopta__text">
        <motion.h2 className="mv-display" {...enter(0)}>
          Su primer viaje al mar empieza <em>contigo</em>
        </motion.h2>
        <motion.p {...enter(0.08)}>
          Tu adopción protege un nido desde que llega al corral hasta que cada cría toca el agua.
        </motion.p>
        <motion.div {...enter(0.14)}>
          <button className="mv-btn mv-btn--abismo" onClick={() => go("adopta")}>Adopta un nido →</button>
        </motion.div>
      </div>

      <motion.div className="mv-adopta__hand" {...enter(0.1, { x: 90 })}>
        <img src={HOME_MEDIA.manoGolfina} alt="Mano sosteniendo una cría de tortuga golfina" width="1800" height="517" loading="lazy" decoding="async" />
      </motion.div>

      <svg className="mv-adopta__foam" viewBox="0 0 1600 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C300 20 600 130 900 70 S1400 10 1600 60 V160 H0Z" fill="var(--mv-espuma)" />
      </svg>
    </section>
  );
}

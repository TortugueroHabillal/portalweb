import { motion, useReducedMotion } from "motion/react";
import { HOME_MEDIA } from "./media";

/* ---------- 8 · Visítanos (compacto, sin mapa: el mapa vive en la página Visita) ---------- */
export function VisitStrip({ go }) {
  const reduce = useReducedMotion();
  return (
    <section className="mv-visit" data-snap>
      <div className="mv-visit__text">
        <p className="mv-kicker mv-kicker--ola">Visítanos</p>
        <h2 className="mv-display">Vive una liberación <em>en persona</em></h2>
        <p>Recibimos grupos, escuelas y familias durante la temporada de anidación.</p>
        <button className="mv-btn mv-btn--abismo" onClick={() => go("visita")}>Agenda tu visita →</button>
      </div>
      <motion.div
        className="mv-visit__photo"
        initial={reduce ? false : { opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={HOME_MEDIA.visitantes} alt="Visitantes en el campamento" loading="lazy" decoding="async" />
      </motion.div>
    </section>
  );
}

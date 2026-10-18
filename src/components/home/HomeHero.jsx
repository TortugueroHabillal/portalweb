import { motion, useReducedMotion } from "motion/react";
import { HOME_MEDIA } from "./media";

const ease = [0.22, 1, 0.36, 1];

/* ---------- 1 · El nido ----------
   Arena clara, titular grande y, a la derecha, decenas de crías caminando
   hacia el mar: el visitante empieza el viaje que hará al bajar. */
export function HomeHero({ go }) {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  const toJourney = () => document.getElementById("viaje")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  return (
    <section className="lt-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title" {...enter(0.1)}>
          Antes de llegar al mar, tienen que sobrevivir a la arena.
        </motion.h1>
        <motion.p className="lt-hero__line" {...enter(0.28)}>En El Habillal nos aseguramos de que lo logren.</motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <button className="lt-btn lt-btn--hot" onClick={() => go("adopta")}>Adopta un nido</button>
          <button className="lt-btn lt-btn--line" onClick={toJourney}>Conoce el viaje</button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={HOME_MEDIA.criasOrilla} alt="Decenas de crías de tortuga caminando por la arena hacia el mar" fetchPriority="high" />
      </div>
    </section>
  );
}

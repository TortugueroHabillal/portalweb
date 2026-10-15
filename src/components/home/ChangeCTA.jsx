import { motion, useReducedMotion } from "motion/react";
import { BackgroundPaths } from "./BackgroundPaths";
import { HOME_MEDIA } from "./media";

const ease = [0.22, 1, 0.36, 1];

/* ---------- 7 · «Tú haces el cambio»: Dona como protagonista, después Adopta ---------- */
export function ChangeCTA({ go }) {
  const reduce = useReducedMotion();
  const inView = (delay, from = { y: 40 }) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, ...from },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="mv-change">
      <BackgroundPaths className="mv-paths mv-change__waves" count={4} />

      <div className="mv-change__head">
        <motion.p className="mv-kicker" {...inView(0, { y: 16 })}>Cómo puedes ayudar</motion.p>
        <h2 className="mv-display" aria-label="Tú haces el cambio">
          {["Tú", "haces"].map((w, i) => (
            <motion.span key={w} className="mv-change__word" aria-hidden="true" {...inView(0.06 + i * 0.08)}>{w}</motion.span>
          ))}
          <motion.em className="mv-change__word" aria-hidden="true" {...inView(0.22)}>el cambio</motion.em>
        </h2>
      </div>

      <div className="mv-change__grid">
        <motion.article className="mv-panel mv-panel--dona" {...inView(0.1, { y: 60 })}>
          <img src={HOME_MEDIA.donaCria} alt="Cría de tortuga entrando al agua" loading="lazy" decoding="async" />
          <div className="mv-panel__body">
            <p className="mv-kicker">Dona</p>
            <h3 className="mv-display">Que ningún nido <em>se quede sin guardián</em></h3>
            <p>Cada noche de temporada llegamos a la playa antes que los saqueadores. Tu donativo pone gasolina en las motos y manos en la arena.</p>
            <button className="mv-btn mv-btn--dona" onClick={() => go("dona")}>Dona ahora →</button>
          </div>
        </motion.article>

        <motion.article className="mv-panel mv-panel--adopta" {...inView(0.22, { y: 60 })}>
          <img src={HOME_MEDIA.adoptaNido} alt="Nido de tortuga con huevos" loading="lazy" decoding="async" />
          <div className="mv-panel__body">
            <p className="mv-kicker">Adopta un nido</p>
            <h3 className="mv-display">Un nido. Decenas de crías. <em>Tu nombre.</em></h3>
            <p>Lo cuidamos por ti y te contamos su historia, hasta el día en que sus crías tocan el mar.</p>
            <button className="mv-btn mv-btn--turquesa" onClick={() => go("adopta")}>Adopta un nido →</button>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

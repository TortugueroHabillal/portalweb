import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BackgroundPaths } from "./BackgroundPaths";
import { RotatingWord } from "./RotatingWord";
import { HOME_MEDIA } from "./media";
import { useScrollProgress } from "./useScrollProgress";

const ease = [0.22, 1, 0.36, 1];

/* ---------- 1 · Hero: logo + frase con palabra animada + golfina sobre olas ----------
   Todo cabe en una pantalla: texto a la izquierda, golfina a la derecha
   dentro de su columna (nunca se corta contra el borde). */
export function HomeHero({ go }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useScrollProgress(raw);
  const turtleY = useTransform(p, [0, 1], ["0%", reduce ? "0%" : "-18%"]);

  return (
    <section ref={ref} className="mv-hero" data-snap>
      <BackgroundPaths />

      <div className="mv-hero__inner">
        <div className="mv-hero__text">
          <motion.div
            className="mv-hero__brand"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <img src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" width="600" height="386" />
            <p>
              Campamento tortuguero
              <br />
              <span>El Habillal A.C.</span>
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <h1 className="mv-display mv-hero__title">
              El Habillal <RotatingWord words={["vigila", "cuida", "libera", "salva"]} />
              <br />a las tortugas marinas
            </h1>
            <p className="mv-hero__lead">
              Protegemos la anidación de tres especies de tortugas marinas en Lázaro Cárdenas, Michoacán, desde hace 13 temporadas.
            </p>
            <div className="mv-hero__ctas">
              <button className="mv-btn mv-btn--dona" onClick={() => go("dona")}>Dona ahora</button>
              <button className="mv-btn mv-btn--outline" onClick={() => go("visita")}>Agenda tu visita</button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mv-hero__turtle"
          style={{ y: turtleY }}
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        >
          <img src={HOME_MEDIA.golfina} alt="Tortuga golfina nadando" width="1400" height="1196" fetchPriority="high" />
        </motion.div>
      </div>
    </section>
  );
}

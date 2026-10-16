import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { HOME_MEDIA } from "./media";

/* ---------- 7 · Ellas ----------
   Lo que está en juego: las tres especies a escala. El ancho de cada recorte
   es aproximadamente proporcional a su tamaño real.
   Escritorio: sobre una regla de 0 a 2 m. Celular: una lista vertical (en la
   regla la golfina quedaría de unos pocos píxeles), con la misma proporción. */
const SPECIES = [
  { name: "Golfina", img: HOME_MEDIA.golfina, width: 11, left: 0, mobile: 24, text: "Deja entre 1,000 y 1,400 nidos por temporada en nuestra playa." },
  { name: "Negra", img: HOME_MEDIA.negra, width: 16, left: 18, mobile: 34, text: "Menos de diez nidos por temporada: cada uno cuenta." },
  { name: "Laúd", img: HOME_MEDIA.laud, width: 34, left: 50, mobile: 62, text: "La tortuga más grande del mundo. Aquí deja menos de diez nidos por temporada." },
];

const ease = [0.22, 1, 0.36, 1];

function MobileList({ go, reduce }) {
  return (
    <ul className="lt-species__list">
      {SPECIES.map((s, i) => (
        <motion.li
          key={s.name}
          initial={reduce ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease }}
        >
          <button type="button" onClick={() => go("about")} aria-label={`Tortuga ${s.name}. Conoce más`} style={{ width: `${s.mobile}%` }}>
            <img src={s.img} alt="" loading="lazy" decoding="async" />
          </button>
          <div>
            <h3 className="lt-display">{s.name}</h3>
            <p>{s.text}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

export function Species({ go }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className="lt-species" data-snap>
      <div className="lt-species__head">
        <h2 className="lt-display lt-species__title">Tres especies anidan en esta playa.</h2>
        <p className="lt-species__sub">Las tres están en peligro de extinción.</p>
      </div>

      {isMobile ? (
        <MobileList go={go} reduce={reduce} />
      ) : (
        <div className="lt-species__board">
          <div className="lt-species__scale">
            {SPECIES.map((s, i) => (
              <motion.button
                key={s.name}
                type="button"
                className="lt-species__turtle"
                style={{ left: `${s.left}%`, width: `${s.width}%` }}
                onClick={() => go("about")}
                aria-label={`Tortuga ${s.name}. Conoce más`}
                initial={reduce ? false : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.2, ease }}
              >
                <img src={s.img} alt="" loading="lazy" decoding="async" />
              </motion.button>
            ))}
            <motion.div
              className="lt-species__ruler"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease }}
            />
            <div className="lt-species__marks" aria-hidden="true">
              <span>0</span><span>0.5 m</span><span>1 m</span><span>1.5 m</span><span>2 m</span>
            </div>
          </div>

          <div className="lt-species__labels">
            {SPECIES.map((s) => (
              <div key={s.name} style={{ left: `${s.left}%`, width: `${Math.max(s.width, 16)}%` }}>
                <h3 className="lt-display">{s.name}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

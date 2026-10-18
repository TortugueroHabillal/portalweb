import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

const TASKS = [
  { verb: "Patrullamos", img: HOME_MEDIA.patrullamos, alt: "Cuatrimoto y moto del patrullaje nocturno", text: "Recorremos la playa de noche para encontrar cada nido antes que nadie." },
  { verb: "Reubicamos", img: HOME_MEDIA.reubicamos, alt: "Voluntario sembrando un nido en el corral de incubación", text: "Llevamos los huevos al corral, a salvo de saqueo, depredadores y marea." },
  { verb: "Liberamos", img: HOME_MEDIA.liberamos, alt: "Visitantes acompañan a una cría que llega al mar", text: "Cuando nacen, las acompañamos hasta el mar." },
  { verb: "Educamos", img: HOME_MEDIA.educamos, alt: "Plática de educación ambiental en el Tortufest", text: "Pláticas, talleres y el Tortufest: la comunidad también cuida la playa." },
];

const ease = [0.22, 1, 0.36, 1];

/* Coreografía de cada tarjeta: la foto se descubre de abajo hacia arriba
   (con un leve zoom de salida), luego entra el verbo y al final el texto.
   Las cuatro tarjetas van una tras otra, de izquierda a derecha. */
const card = { hidden: {}, shown: (i) => ({ transition: { delayChildren: 0.15 + i * 0.18, staggerChildren: 0.12 } }) };
const photo = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  shown: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.9, ease } },
};
const photoImg = {
  hidden: { scale: 1.18 },
  shown: { scale: 1, transition: { duration: 1.3, ease } },
};
const line = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ---------- 4 · Lo que hacemos ----------
   Cada tarea contesta una de las amenazas del problema. */
export function Work() {
  const reduce = useReducedMotion();
  const anim = (i) =>
    // once: false → se repite cada vez que la sección vuelve a la pantalla, bajando o subiendo
    reduce ? {} : { custom: i, initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.35 } };

  return (
    <section className="lt-work" data-snap>
      <Reveal as="h2" from="left" className="lt-display lt-work__title">Esto hacemos para protegerlas.</Reveal>
      <div className="lt-work__grid">
        {TASKS.map((t, i) => (
          <motion.article key={t.verb} className="lt-task" variants={card} {...anim(i)}>
            <motion.div className="lt-task__img" variants={photo}>
              <motion.img src={t.img} alt={t.alt} loading="lazy" decoding="async" variants={photoImg} />
            </motion.div>
            <motion.h3 className="lt-display" variants={line}>{t.verb}</motion.h3>
            <motion.p variants={line}>{t.text}</motion.p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

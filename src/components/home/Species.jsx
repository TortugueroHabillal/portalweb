import { motion, useReducedMotion } from "motion/react";
import { HOME_MEDIA } from "./media";
import { Reveal } from "./Reveal";

/* ---------- 7 · Ellas ----------
   Lo que está en juego: fotos reales de las tres especies que anidan aquí.
   En escritorio el ancho de cada foto crece con el tamaño de la especie
   (de la golfina a la laúd); en celular se apilan. */
const SPECIES = [
  { name: "Golfina", img: HOME_MEDIA.especies.golfina, grow: 11, alt: "Tortuga golfina en la playa", text: "Deja entre 1,000 y 1,400 nidos por temporada en nuestra playa." },
  { name: "Negra", img: HOME_MEDIA.especies.negra, grow: 16, alt: "Tortuga negra en la playa", text: "Menos de diez nidos por temporada: cada uno cuenta." },
  { name: "Laúd", img: HOME_MEDIA.especies.laud, grow: 34, alt: "Tortuga laúd anidando de noche", text: "La tortuga más grande del mundo. Aquí deja menos de diez nidos por temporada." },
];

const ease = [0.22, 1, 0.36, 1];

export function Species() {
  const reduce = useReducedMotion();
  const view = reduce ? {} : { initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.35 } };
  const card = {
    hidden: {},
    shown: (i) => ({ transition: { delayChildren: 0.15 + i * 0.18, staggerChildren: 0.12 } }),
  };
  const photo = {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    shown: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.9, ease } },
  };
  const photoImg = {
    hidden: { scale: 1.18 },
    shown: { scale: 1, transition: { duration: 1.2, ease } },
  };
  const line = {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <section className="lt-species" data-snap>
      <div className="lt-species__head">
        <Reveal as="h2" from="left" className="lt-display lt-species__title">Tres especies anidan en esta playa.</Reveal>
        <Reveal as="p" from="right" className="lt-species__sub">Las tres están en peligro de extinción.</Reveal>
      </div>

      <motion.div className="lt-species__row" {...view}>
        {SPECIES.map((s, i) => (
          <motion.article key={s.name} className="lt-species__card" style={{ "--grow": s.grow }} custom={i} variants={card}>
            <motion.div className="lt-species__photo" variants={photo}>
              <motion.img src={s.img} alt={s.alt} loading="lazy" decoding="async" variants={photoImg} />
            </motion.div>
            <motion.h3 className="lt-display" variants={line}>{s.name}</motion.h3>
            <motion.p variants={line}>{s.text}</motion.p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

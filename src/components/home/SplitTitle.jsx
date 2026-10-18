import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

/* Título que aparece palabra por palabra (cada palabra sube desde una
   máscara). `animateOnMount` para el hero; si no, al entrar en pantalla
   y cada vez que la sección vuelve. */
export function SplitTitle({ as = "h2", text, className, delay = 0, animateOnMount = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.5 } };
  return (
    <Tag className={className} aria-label={text} {...trigger} transition={{ staggerChildren: 0.07, delayChildren: delay }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <motion.span
              className="split-word__in"
              variants={{ hidden: { y: "110%", opacity: 0 }, shown: { y: "0%", opacity: 1, transition: { duration: 0.7, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {/* El espacio va fuera de la palabra: dentro de un inline-block se pierde */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

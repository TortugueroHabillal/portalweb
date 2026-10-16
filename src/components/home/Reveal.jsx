import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

/* Aparición suave al entrar en pantalla (una sola vez). Con movimiento
   reducido se muestra directamente. `as` elige la etiqueta de motion. */
export function Reveal({ as = "div", delay = 0, y = 24, className, style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, delay, ease },
      };
  return (
    <Tag className={className} style={style} {...anim} {...rest}>
      {children}
    </Tag>
  );
}

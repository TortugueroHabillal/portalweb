import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

/* Aparición suave al entrar en pantalla. Con movimiento reducido se muestra
   directamente. `as` elige la etiqueta de motion; `from` ("left" | "right")
   hace que entre desde un lado, y en ese caso se repite cada vez que la
   sección vuelve a la pantalla. */
export function Reveal({ as = "div", delay = 0, y = 24, from, className, style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const side = from === "left" ? -70 : from === "right" ? 70 : 0;
  const anim = reduce
    ? {}
    : {
        initial: side ? { opacity: 0, x: side } : { opacity: 0, y },
        whileInView: side ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 },
        viewport: { once: !side, amount: 0.25 },
        transition: { duration: side ? 0.9 : 0.7, delay, ease },
      };
  return (
    <Tag className={className} style={style} {...anim} {...rest}>
      {children}
    </Tag>
  );
}

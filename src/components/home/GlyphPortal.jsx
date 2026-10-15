import { useLayoutEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useScrollProgress } from "./useScrollProgress";

/* ---------- 3 · Portal de palabra ----------
   1) «ADOPTA» (naranja) «UN NIDO» (turquesa) se queda quieta para leerse.
   2) La frase crece un poco desde la «I» y un círculo turquesa se abre desde
      ese mismo punto hasta cubrir la pantalla; da paso a la sección Adopta,
      que tiene el mismo fondo.
   No se escala el texto a tamaños enormes (eso crea capas gigantes que la
   tarjeta de video no puede pintar): el color lo pone el círculo, que es
   barato de animar. Todo depende del scroll, así que funciona igual al
   bajar y al subir.
*/
export function GlyphPortal() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const stemRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useScrollProgress(scrollYProgress);

  // Centro de la «I» dentro de la pantalla fija y radio que cubre todo
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const rMax = useMotionValue(2000);
  const [originX, originY] = [useMotionValue("50%"), useMotionValue("50%")];

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const stem = stemRef.current;
      if (!stage || !stem) return;
      // Se mide con la frase en escala 1: offsets ignoran transformaciones
      const word = stem.closest(".mv-portal__word");
      let x = stem.offsetWidth / 2;
      let y = stem.offsetHeight * 0.55;
      for (let el = stem; el && el !== word; el = el.offsetParent) {
        x += el.offsetLeft;
        y += el.offsetTop;
      }
      originX.set(`${x}px`);
      originY.set(`${y}px`);
      const sx = word.offsetLeft + x;
      const sy = word.offsetTop + y;
      cx.set(sx);
      cy.set(sy);
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      rMax.set(Math.hypot(Math.max(sx, w - sx), Math.max(sy, h - sy)) + 20);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cx, cy, rMax, originX, originY]);

  // Lectura (0 → 0.3) · crece y se abre el círculo (0.3 → 0.72) · turquesa fijo
  const scale = useTransform(p, [0, 0.3, 0.72], [1, 1, 3]);
  const grow = useTransform(p, [0.34, 0.72], [0, 1]);
  const radius = useTransform(() => grow.get() * rMax.get());
  const clipPath = useMotionTemplate`circle(${radius}px at ${cx}px ${cy}px)`;
  const transformOrigin = useMotionTemplate`${originX} ${originY}`;

  const word = (
    <>
      <span className="mv-portal__line mv-portal__adopta">ADOPTA</span>{" "}
      <span className="mv-portal__line">
        UN N<span ref={stemRef}>I</span>DO
      </span>
    </>
  );

  if (reduce) {
    return (
      <section className="mv-portal mv-portal--static">
        <p className="mv-portal__word">{word}</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="mv-portal" aria-label="Adopta un nido">
      <div ref={stageRef} className="mv-portal__stage">
        <motion.p className="mv-portal__word" style={{ scale, transformOrigin }}>
          {word}
        </motion.p>
        <motion.div className="mv-portal__fill" style={{ clipPath }} />
      </div>
    </section>
  );
}

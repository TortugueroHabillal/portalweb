import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";
import { useScrollProgress } from "./useScrollProgress";

/* ---------- 6 · La orilla ----------
   El momento emocional justo antes de pedir: el video vertical enmarcado
   (bloque azul desplazado detrás y marco de línea al otro lado, que se
   separan un poco al bajar). */
export function Shore() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useScrollProgress(scrollYProgress);
  const blockY = useTransform(p, [0, 1], reduce ? [0, 0] : [40, -40]);
  const lineY = useTransform(p, [0, 1], reduce ? [0, 0] : [-30, 30]);

  // El video, el bloque azul y el marco entran desde fuera, por los lados,
  // cada vez que la sección vuelve a la pantalla
  // (El video no se desvanece: Chrome pausa los videos silenciados invisibles)
  const slide = (x, delay, fade = true) =>
    reduce
      ? {}
      : {
          initial: fade ? { x, opacity: 0 } : { x },
          whileInView: fade ? { x: 0, opacity: 1 } : { x: 0 },
          viewport: { once: false, amount: 0.3 },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
        };

  useEffect(() => {
    const section = ref.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => { }) : video.pause()));
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="lt-shore" data-snap>
      <div className="lt-shore__text">
        <Reveal as="h2" from="left" className="lt-display">Cada cría que llega al mar es la esperanza de su especie.</Reveal>
        <Reveal as="p" from="right" delay={0.1}>Se estima que solo 1 de cada 1,000 crías llegará a adulta. </Reveal>
        <Reveal as="p" from="right" delay={0.1}>Por ello, ninguna puede perderse.</Reveal>
      </div>
      <div className="lt-shore__art">
        <motion.div className="lt-shore__block" style={{ y: blockY }} {...slide(160, 0.15)} />
        <motion.div className="lt-shore__frame" style={{ y: lineY }} {...slide(-160, 0.3)} />
        <motion.div className="lt-shore__video" {...slide(220, 0, false)} onAnimationComplete={() => videoRef.current?.play().catch(() => {})}>
          <video ref={videoRef} src={HOME_MEDIA.video} poster={HOME_MEDIA.videoPoster} muted loop playsInline preload="metadata" aria-label="Crías de tortuga caminando hacia el mar" />
        </motion.div>
      </div>
    </section>
  );
}

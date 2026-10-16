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
        <Reveal as="h2" className="lt-display">Cada cría que llega al mar es la esperanza de su especie.</Reveal>
        <Reveal as="p" delay={0.1}>Se estima que solo 1 de cada 1,000 crías llegará a adulta. </Reveal>
        <Reveal as="p" delay={0.1}>Por ello, ninguna puede perderse.</Reveal>
      </div>
      <div className="lt-shore__art">
        <motion.div className="lt-shore__block" style={{ y: blockY }} />
        <motion.div className="lt-shore__frame" style={{ y: lineY }} />
        <div className="lt-shore__video">
          <video ref={videoRef} src={HOME_MEDIA.video} poster={HOME_MEDIA.videoPoster} muted loop playsInline preload="metadata" aria-label="Crías de tortuga caminando hacia el mar" />
        </div>
      </div>
    </section>
  );
}

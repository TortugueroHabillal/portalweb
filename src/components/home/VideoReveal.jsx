import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { HOME_MEDIA } from "./media";
import { useScrollProgress } from "./useScrollProgress";

/* ---------- 2 · Video que se expande y luego se va ----------
   Pantalla fija mientras se bajan ~1.8 pantallas.
   Escritorio: el video vertical arranca pequeño a la izquierda y crece pegado
   al borde hasta toda la altura; «Del nido / al mar» se queda a la derecha.
   Después el video sale por la izquierda, el texto por la derecha, y la foto
   aérea toma el protagonismo con el logo y el texto nuevo.
   Celular: el video llena la pantalla y se disuelve hacia la foto.
*/

function useAutoPause(sectionRef, videoRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(section);
    return () => io.disconnect();
  }, [sectionRef, videoRef]);
}

function RevealContent({ go }) {
  return (
    <>
      <img src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" width="600" height="386" />
      <h2 className="mv-display">Aquí</h2>
      <h2 className="mv-display"><em>empieza todo</em></h2>
      <p>Campamento Tortuguero El Habillal · Lázaro Cárdenas, Michoacán</p>
      <button className="mv-btn mv-btn--outline-arena" onClick={() => go("about")}>Conoce el campamento</button>
    </>
  );
}

function StaticVersion({ go }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useAutoPause(sectionRef, videoRef);
  return (
    <section ref={sectionRef} style={{ position: "relative", height: "100svh", overflow: "hidden", background: "var(--mv-abismo)" }}>
      <img className="mv-video__bg" src={HOME_MEDIA.campAerial} alt="Vista aérea del campamento" />
      <div className="mv-video__veil2" />
      <div className="mv-video__frame" style={{ left: "auto", right: "6vw", height: "80vh", transform: "translateY(-50%)" }}>
        <video ref={videoRef} src={HOME_MEDIA.video} poster={HOME_MEDIA.videoPoster} muted loop playsInline preload="metadata" />
      </div>
      <div className="mv-video__reveal" style={{ transform: "translateY(-50%)" }}>
        <RevealContent go={go} />
      </div>
    </section>
  );
}

function useEnterStyle(p, start, isMobile) {
  const range = [start, start + 0.08];
  return {
    opacity: useTransform(p, range, [0, 1]),
    x: useTransform(p, range, isMobile ? [0, 0] : [-70, 0]),
    y: useTransform(p, range, isMobile ? [24, 0] : [0, 0]),
  };
}

function ScrollVersion({ go, isMobile }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  useAutoPause(sectionRef, videoRef);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = useScrollProgress(scrollYProgress);

  // 1) El video crece (0 → 0.3)
  const frameH = useTransform(p, [0, 0.3], isMobile ? ["74svh", "100svh"] : ["58vh", "100vh"]);
  const frameW = useTransform(p, [0, 0.3], ["84vw", "100vw"]);
  const frameLeft = useTransform(p, [0, 0.3], isMobile ? ["8vw", "0vw"] : ["7vw", "0vw"]);
  // 2) El video se va (0.4 → 0.62)
  const frameX = useTransform(p, [0.4, 0.62], isMobile ? ["0%", "0%"] : ["0%", "-105%"]);
  const frameOpacity = useTransform(p, isMobile ? [0.4, 0.6] : [0.48, 0.62], [1, 0]);

  // Fondo: una capa oscura (solo opacidad, barato) lo apaga mientras manda el video
  const dim = useTransform(p, [0, 0.3, 0.42, 0.64], [0.4, 0.68, 0.68, 0]);
  const veil = useTransform(p, [0.42, 0.64], [1, 0]);
  const veil2 = useTransform(p, [0.6, 0.74], [0, 1]);

  // «Del nido / al mar» se queda mientras crece el video y sale junto con él
  const wordsX = useTransform(p, [0.4, 0.62], isMobile ? ["0vw", "0vw"] : ["0vw", "50vw"]);
  const wordsY = useTransform(p, [0.4, 0.6], isMobile ? ["0px", "40px"] : ["-50%", "-50%"]);
  const wordsOpacity = useTransform(p, isMobile ? [0.4, 0.56] : [0.48, 0.62], [1, 0]);

  // Texto nuevo que entra por la izquierda, escalonado
  const s = [
    useEnterStyle(p, 0.64, isMobile),
    useEnterStyle(p, 0.67, isMobile),
    useEnterStyle(p, 0.7, isMobile),
    useEnterStyle(p, 0.72, isMobile),
    useEnterStyle(p, 0.74, isMobile),
  ];

  return (
    <section ref={sectionRef} className="mv-video" aria-label="Del nido al mar" data-snap>
      <div className="mv-video__stage">
        <img className="mv-video__bg" src={HOME_MEDIA.campAerial} alt="Vista aérea del Campamento El Habillal" loading="lazy" decoding="async" />
        <motion.div className="mv-video__dim" style={{ opacity: dim }} />
        <motion.div className="mv-video__veil" style={{ opacity: veil }} />
        <motion.div className="mv-video__veil2" style={{ opacity: veil2 }} />

        <motion.div
          className="mv-video__frame"
          style={{
            height: frameH,
            width: isMobile ? frameW : undefined,
            aspectRatio: isMobile ? "auto" : "9 / 16",
            left: frameLeft,
            y: "-50%",
            x: frameX,
            opacity: frameOpacity,
          }}
        >
          <video ref={videoRef} src={HOME_MEDIA.video} poster={HOME_MEDIA.videoPoster} muted loop playsInline preload="metadata" aria-label="Video de una liberación de crías en El Habillal" />
        </motion.div>

        <motion.div className="mv-video__words" style={{ x: wordsX, y: wordsY, opacity: wordsOpacity }}>
          <h2 className="mv-display">Del nido</h2>
          <h2 className="mv-display"><em>al mar</em></h2>
        </motion.div>

        <div className="mv-video__reveal" style={{ transform: isMobile ? "none" : "translateY(-50%)" }}>
          <motion.img style={s[0]} src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" width="600" height="386" />
          <motion.h2 className="mv-display" style={s[1]}>Aquí</motion.h2>
          <motion.h2 className="mv-display" style={s[2]}><em>empieza todo</em></motion.h2>
          <motion.p style={s[3]}>Campamento Tortuguero El Habillal · Lázaro Cárdenas, Michoacán</motion.p>
          <motion.div style={s[4]}>
            <button className="mv-btn mv-btn--outline-arena" onClick={() => go("about")}>Conoce el campamento</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function VideoReveal({ go }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  if (reduce) return <StaticVersion go={go} />;
  return <ScrollVersion key={isMobile ? "m" : "d"} go={go} isMobile={isMobile} />;
}

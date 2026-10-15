import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { Reveal } from "../Reveal";
import { HOME_MEDIA } from "./media";
import { useScrollProgress } from "./useScrollProgress";

/* ---------- 6 · Galería «Cuatro acciones, un mismo fin» ----------
   Pantalla fija (también en celular):
   6a cuadrícula de 4 tarjetas → 6b se juntan y se apilan (Liberamos arriba)
   → 6c la foto de Liberamos se abre como ventana → 6d fotos horizontales del
   mismo tamaño suben por carriles a distintas velocidades.
   Solo con movimiento reducido se muestra una versión sin animación.
*/

const ACTIONS = [
  { label: "Educamos", src: HOME_MEDIA.educamos, alt: "Plática de educación ambiental en el Tortufest" },
  { label: "Patrullamos", src: HOME_MEDIA.patrullamos, alt: "Cuatrimoto y moto de patrullaje del campamento" },
  { label: "Reubicamos", src: HOME_MEDIA.reubicamos, alt: "Voluntario sembrando un nido en el corral de incubación" },
  { label: "Liberamos", src: HOME_MEDIA.liberamos, alt: "Visitantes acompañan a una cría que llega al mar", final: true },
];

const RISING = [
  { src: HOME_MEDIA.criaLaud, cap: "Cría de laúd rumbo al agua" },
  { src: HOME_MEDIA.corral, cap: "Corral de incubación" },
  { src: HOME_MEDIA.golfinaArena, cap: "Golfina después de anidar" },
  { src: HOME_MEDIA.liberacionEscuelas, cap: "Liberación con escuelas" },
  { src: HOME_MEDIA.tortugaNegra, cap: "Tortuga negra en la orilla" },
  { src: HOME_MEDIA.primerosPasos, cap: "Primeros pasos en la arena" },
];

// Medidas por formato. Posiciones en vw/vh relativas al centro de la tarjeta.
const LAYOUT = {
  desktop: {
    card: { w: 25, h: 27 },
    grid: [[-13.5, -14.5, 0], [13.5, -14.5, 0], [-13.5, 14.5, 0], [13.5, 14.5, 0]],
    stack: [[-2, -11, -8], [2, -13, 6], [-1, -9, -3], [0, -10, 0]],
    inset: { y: 36.5, x: 37.5 },
    photo: { w: 30, h: 20 }, // 3:2, en vw
    lanes: [6, 64, 35, 8, 62, 35],
  },
  mobile: {
    card: { w: 43, h: 21 },
    grid: [[-22.5, -11.5, 0], [22.5, -11.5, 0], [-22.5, 11.5, 0], [22.5, 11.5, 0]],
    stack: [[-2, -11, -7], [2, -12, 6], [-1, -9, -3], [0, -10, 0]],
    inset: { y: 39.5, x: 28.5 },
    photo: { w: 76, h: 50.7 },
    lanes: [4, 20, 12, 4, 20, 12],
  },
};

// Cuándo entra y sale cada foto que sube (progreso de la sección): mismo ritmo
// para todas, sin huecos. «Tú haces el cambio» se monta encima del final de
// esta sección (margen negativo en CSS), así que no queda tramo vacío.
const TIMING = [[0.45, 0.69], [0.5, 0.74], [0.55, 0.79], [0.6, 0.84], [0.65, 0.89], [0.71, 0.97]];

function Card({ action, index, p, L }) {
  const [gx, gy, gr] = L.grid[index];
  const [sx, sy, sr] = L.stack[index];
  const x = useTransform(p, [0.04, 0.24], [`${gx}vw`, `${sx}vw`]);
  const y = useTransform(p, [0.04, 0.24], [`${gy}vh`, `${sy}vh`]);
  const rotate = useTransform(p, [0.04, 0.24], [gr, sr]);
  const opacity = useTransform(p, [0.26, 0.27], [1, 0]);
  return (
    <motion.div
      className={`mv-card${action.final ? " mv-card--final" : ""}`}
      style={{
        x, y, rotate, opacity, zIndex: index + 1,
        width: `${L.card.w}vw`, height: `${L.card.h}vh`,
        marginLeft: `${-L.card.w / 2}vw`, marginTop: `${-L.card.h / 2}vh`,
      }}
    >
      <img src={action.src} alt={action.alt} loading="lazy" decoding="async" />
      <b>{action.label}</b>
    </motion.div>
  );
}

function RisingPhoto({ photo, index, p, L }) {
  const [from, to] = TIMING[index];
  const y = useTransform(p, [from, to], ["102vh", "-75vh"]);
  const opacity = useTransform(p, [from, from + 0.02, to - 0.05, to], [0, 1, 1, 0]);
  const scale = useTransform(p, [from, from + 0.06, to - 0.06, to], [0.9, 1, 1, 0.86]);
  return (
    <motion.figure
      className="mv-rise"
      style={{ left: `${L.lanes[index]}vw`, top: 0, width: `${L.photo.w}vw`, y, opacity, scale }}
    >
      <div className="mv-rise__img" style={{ height: `${L.photo.h}vw` }}>
        <img src={photo.src} alt={photo.cap} loading="lazy" decoding="async" />
      </div>
    </motion.figure>
  );
}

function ScrollGallery({ isMobile }) {
  const ref = useRef(null);
  const L = isMobile ? LAYOUT.mobile : LAYOUT.desktop;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useScrollProgress(scrollYProgress);

  const headOpacity = useTransform(p, [0.03, 0.12], [1, 0]);
  const headY = useTransform(p, [0.03, 0.12], [0, -30]);

  // Ventana que se abre desde el tamaño de la tarjeta apilada
  const winOpacity = useTransform(p, [0.26, 0.27], [0, 1]);
  const insetY = useTransform(p, [0.27, 0.44], [L.inset.y, 0]);
  const insetX = useTransform(p, [0.27, 0.44], [L.inset.x, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}%)`;
  const imgScale = useTransform(p, [0.27, 0.5], [1.25, 1]);
  const titleOpacity = useTransform(p, [0.38, 0.43, 0.49, 0.54], [0, 1, 1, 0]);
  const titleY = useTransform(p, [0.38, 0.43], [30, 0]);
  const darken = useTransform(p, [0.46, 0.56], [0, 0.82]);

  return (
    <section ref={ref} className="mv-gallery" aria-label="Lo que hacemos" data-snap>
      <div className="mv-gallery__stage">
        <motion.div className="mv-gallery__head" style={{ opacity: headOpacity, y: headY }}>
          <p className="mv-kicker">Lo que hacemos</p>
          <h2 className="mv-display">Cuatro acciones, <em>un mismo fin</em></h2>
        </motion.div>

        {ACTIONS.map((a, i) => (
          <Card key={a.label} action={a} index={i} p={p} L={L} />
        ))}

        <motion.div className="mv-window" style={{ opacity: winOpacity, clipPath }}>
          <motion.img src={HOME_MEDIA.liberamos} alt="" style={{ scale: imgScale }} loading="lazy" decoding="async" />
          <motion.div className="mv-window__shade" style={{ opacity: darken }} />
        </motion.div>
        <motion.h3 className="mv-display mv-window__title" style={{ opacity: titleOpacity, y: titleY }}>
          Y todo termina <em>de vuelta al mar</em>
        </motion.h3>

        {RISING.map((photo, i) => (
          <RisingPhoto key={photo.cap} photo={photo} index={i} p={p} L={L} />
        ))}
      </div>
    </section>
  );
}

function StaticGallery() {
  return (
    <section className="mv-gallery-m" aria-label="Lo que hacemos">
      <p className="mv-kicker">Lo que hacemos</p>
      <h2 className="mv-display" style={{ fontSize: 34 }}>Cuatro acciones, <em>un mismo fin</em></h2>
      <div className="mv-gallery-m__grid">
        {ACTIONS.map((a) => (
          <div key={a.label} className={`mv-card${a.final ? " mv-card--final" : ""}`}>
            <img src={a.src} alt={a.alt} loading="lazy" decoding="async" />
            <b>{a.label}</b>
          </div>
        ))}
      </div>
      <Reveal>
        <div className="mv-gallery-m__final">
          <img src={HOME_MEDIA.liberamos} alt="Liberación de crías en la playa" loading="lazy" decoding="async" />
          <h3 className="mv-display">Y todo termina <em>de vuelta al mar</em></h3>
        </div>
      </Reveal>
    </section>
  );
}

export function ActionsGallery() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  if (reduce) return <StaticGallery />;
  return <ScrollGallery key={isMobile ? "m" : "d"} isMobile={isMobile} />;
}

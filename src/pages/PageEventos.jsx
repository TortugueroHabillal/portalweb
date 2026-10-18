import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { snapToSections } from "../lib/smoothScroll";

/* Eventos y memoria: cada evento es un capítulo de una pantalla, con su año
   enorme de fondo y un mazo de fotos que se arrastra (o se toca) para ver
   la siguiente. Un riel de años a la derecha marca por dónde vas. */
const e = (name) => `/eventos/${name}.webp`;
const ease = [0.22, 1, 0.36, 1];

const EVENTS = [
  {
    id: "rodada",
    year: "2022",
    title: "Rodada El Habillal",
    text: "Un recorrido en bicicleta con la comunidad para llevar la conservación más allá de la playa.",
    photos: [
      { src: e("rodada-1"), alt: "Ciclistas en la rodada El Habillal" },
      { src: e("rodada-2"), alt: "Grupo de la rodada El Habillal" },
    ],
  },
  {
    id: "tortufest-1",
    year: "2022",
    title: "TortuFest, primera edición",
    text: "Diciembre de 2022: pláticas, exposiciones y arte para celebrar a las tortugas con la comunidad.",
    photos: [
      { src: e("tf1-1"), alt: "Discurso en la primera edición del TortuFest" },
      { src: e("tf1-2"), alt: "Escolta en la primera edición del TortuFest" },
      { src: e("tf1-3"), alt: "Exposición en la primera edición del TortuFest" },
      { src: e("tf1-4"), alt: "Exposición de arte en la primera edición del TortuFest" },
    ],
  },
  {
    id: "hutchison",
    year: "2023",
    title: "Encuentro por la Conservación de las Tortugas",
    text: "Con Hutchison Ports LCT: un encuentro para sumar a empresas y familias a la protección de las tortugas.",
    photos: [
      { src: e("hutchison-2"), alt: "Participantes del encuentro en la playa" },
      { src: e("hutchison-1"), alt: "Cría de tortuga negra asomándose de un coco" },
    ],
  },
  {
    id: "tortufest-2",
    year: "2024",
    title: "TortuFest, segunda edición",
    text: "Diciembre de 2024: el festival volvió con más comunidad, baile y liberación de crías.",
    photos: [
      { src: e("tf2-1"), alt: "Cartel de la segunda edición del TortuFest", contain: true },
      { src: e("tf2-2"), alt: "Discurso en la segunda edición del TortuFest" },
      { src: e("tf2-4"), alt: "Baile en la segunda edición del TortuFest" },
    ],
  },
];

/* ---------- Mazo de fotos ----------
   La de arriba se arrastra a un lado (o se toca «siguiente») y pasa al
   fondo del mazo. Las de abajo asoman giradas, como fotos sobre la mesa. */
const TILTS = [0, -4, 3.5, -2, 5];

function PhotoDeck({ photos, label }) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  const many = photos.length > 1;
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Se pasan solas cada 3.5 s mientras el mazo está en pantalla
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!many || reduce || paused || !inView) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [many, reduce, paused, inView, order]);

  return (
    <div className="ev-deck">
      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="ev-deck__stack"
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Fotos: ${label}`}
        tabIndex={0}
        onKeyDown={(ev) => {
          if (ev.key === "ArrowRight") next();
          if (ev.key === "ArrowLeft") prev();
        }}
      >
        {order
          .map((idx, depth) => ({ idx, depth }))
          .reverse()
          .map(({ idx, depth }) => {
            const p = photos[idx];
            const top = depth === 0;
            return (
              <motion.div
                key={idx}
                className={`ev-deck__card${p.contain ? " ev-deck__card--contain" : ""}`}
                style={{ zIndex: photos.length - depth }}
                initial={false}
                animate={{
                  rotate: reduce ? 0 : TILTS[depth % TILTS.length],
                  scale: 1 - Math.min(depth, 3) * 0.04,
                  y: Math.min(depth, 3) * -10,
                  x: 0,
                  opacity: depth > 3 ? 0 : 1,
                }}
                transition={{ duration: 0.55, ease }}
                drag={top && many && !reduce ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) next();
                }}
                whileDrag={{ cursor: "grabbing", rotate: 0 }}
                aria-hidden={!top}
              >
                <img src={p.src} alt={top ? p.alt : ""} loading="lazy" decoding="async" draggable="false" style={p.pos ? { objectPosition: p.pos } : undefined} />
              </motion.div>
            );
          })}
      </div>
      {many && (
        <div className="ev-deck__nav">
          <button type="button" onClick={prev} aria-label="Foto anterior">←</button>
          <span aria-live="polite">{order[0] + 1} / {photos.length}</span>
          <button type="button" onClick={next} aria-label="Foto siguiente">→</button>
        </div>
      )}
    </div>
  );
}

/* ---------- 1 · Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section id="ev-inicio" className="lt-hero ab-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title ab-hero__title" {...enter(0.1)}>
          Cuando la comunidad se reúne, la playa se cuida mejor.
        </motion.h1>
        <motion.p className="lt-hero__line" {...enter(0.28)}>Festivales, encuentros y rodadas que guardamos en la memoria.</motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <button className="lt-btn lt-btn--sea" onClick={() => document.getElementById("ev-rodada")?.scrollIntoView({ behavior: "smooth" })}>
            Recorre nuestra memoria
          </button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={e("hero")} alt="Comunidad reunida en la segunda edición del TortuFest" fetchPriority="high" />
      </div>
    </section>
  );
}

/* ---------- Un capítulo por evento ---------- */
function Chapter({ ev, index }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  return (
    <section id={`ev-${ev.id}`} className={`ev-chapter${flip ? " ev-chapter--flip" : ""}`} data-snap>
      <motion.span
        className="lt-display ev-year"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, x: flip ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.1, ease }}
      >
        {ev.year}
      </motion.span>
      <div className="ev-chapter__text">
        <Reveal as="h2" className="lt-display ev-title">{ev.title}</Reveal>
        <Reveal as="p" className="ev-text" delay={0.12}>{ev.text}</Reveal>
      </div>
      <Reveal className="ev-chapter__deck" delay={0.2}>
        <PhotoDeck photos={ev.photos} label={ev.title} />
      </Reveal>
    </section>
  );
}

/* ---------- Reconocimiento ---------- */
function Recognition() {
  const reduce = useReducedMotion();
  return (
    <section id="ev-semarnat" className="ev-recognition" data-snap>
      <div className="ev-recognition__grid">
        <motion.div
          className="ev-recognition__doc"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease }}
        >
          <img src={e("semarnat")} alt="Reconocimiento de la SEMARNAT al Campamento Tortuguero El Habillal" loading="lazy" decoding="async" />
        </motion.div>
        <div>
          <Reveal as="h2" className="lt-display ev-title">Un reconocimiento de la SEMARNAT.</Reveal>
          <Reveal as="p" className="ev-text" delay={0.12}>
            La Secretaría de Medio Ambiente y Recursos Naturales reconoció al campamento por su compromiso ininterrumpido con la
            Estrategia Nacional de Limpieza y Conservación de Playas y Costas de México.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cierre ---------- */
function NextEvent({ go }) {
  return (
    <section id="ev-siguiente" className="lt-action ab-join" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">El siguiente recuerdo lo hacemos contigo.</Reveal>
      <Reveal as="p" className="pg-end__sub ev-end__sub" delay={0.1}>Escríbenos para enterarte del próximo evento o para organizar uno con tu escuela o empresa.</Reveal>
      <Reveal className="ev-end__ctas" delay={0.2}>
        <button className="lt-btn lt-btn--hot lt-cta__btn" onClick={() => go("contacto")}>Quiero participar</button>
        <button className="lt-btn lt-btn--line ev-end__line" onClick={() => go("convocatorias")}>Súmate como voluntario</button>
      </Reveal>
    </section>
  );
}

/* ---------- Riel de años (escritorio) ---------- */
const RAIL = [
  ...EVENTS.map((ev) => ({ id: `ev-${ev.id}`, label: ev.year, title: ev.title })),
  { id: "ev-semarnat", label: "★", title: "Reconocimiento SEMARNAT" },
];

function YearRail() {
  const [active, setActive] = useState(null);
  const ids = useRef(RAIL.map((r) => r.id));
  useEffect(() => {
    const els = ids.current.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { threshold: 0.55 }
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("ev-inicio");
    const end = document.getElementById("ev-siguiente");
    const io2 = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(null)),
      { threshold: 0.55 }
    );
    [hero, end].filter(Boolean).forEach((el) => io2.observe(el));
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.nav
          className="ev-rail"
          aria-label="Eventos"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease }}
        >
          {RAIL.map((r) => (
            <button
              key={r.id}
              type="button"
              className={active === r.id ? "is-on" : ""}
              aria-current={active === r.id ? "true" : undefined}
              aria-label={r.title}
              onClick={() => document.getElementById(r.id)?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>{r.label}</span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export function PageEventos({ go }) {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home ev-page">
      <Hero />
      {EVENTS.map((ev, i) => <Chapter key={ev.id} ev={ev} index={i} />)}
      <Recognition />
      <NextEvent go={go} />
      <YearRail />
    </main>
  );
}

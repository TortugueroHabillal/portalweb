import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { snapToSections } from "../lib/smoothScroll";

/* Fotos propias de esta página (ninguna se repite con el Home) */
const n = (name) => `/nosotros/${name}.webp`;
const PHOTOS = {
  hero: n("equipo-entrada"),
  campamento: n("campamento-aereo"),
  temporada: n("temporada"),
  tortufest: n("tortufest"),
  corral: n("corral"),
};

const ease = [0.22, 1, 0.36, 1];

/* ---------- 1 · Hero ---------- */
function AboutHero({ go }) {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title ab-hero__title" {...enter(0.1)}>
          Un campamento nacido de la comunidad, por amor a nuestras especies.
        </motion.h1>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <button className="lt-btn lt-btn--hot" onClick={() => go("convocatorias")}>Súmate como voluntario</button>
          <button className="lt-btn lt-btn--line" onClick={() => go("visita")}>Visítanos</button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={PHOTOS.hero} alt="Equipo y voluntarios en la entrada del Campamento Tortuguero El Habillal" fetchPriority="high" />
      </div>
    </section>
  );
}

/* ---------- 2 · Nuestra historia ----------
   Solo hitos confirmados. La línea se dibuja y cada hito aparece en orden;
   se repite cada vez que la sección vuelve a la pantalla. */
const MILESTONES = [
  { when: "2013", img: PHOTOS.campamento, alt: "Vista aérea del campamento", text: "Se constituye el campamento, con autorización de la SEMARNAT." },
  { when: "Cada temporada", img: PHOTOS.temporada, alt: "Trabajo de campo durante la temporada", text: "Patrullajes nocturnos, corral de incubación y liberaciones." },
  {
    when: "2021",
    quote: "«…la ONU reconoció la labor de El Habillal en una entrevista a nuestro director.»",
    text: "Día Mundial de los Océanos.",
    link: "https://news.un.org/es/story/2021/06/1493152",
  },
  { when: "Tortufest", img: PHOTOS.tortufest, alt: "Crías de tortuga durante el TortuFest", text: "Dos ediciones del festival que acerca la conservación a la comunidad." },
  { when: "Hoy", img: PHOTOS.corral, alt: "Corral de incubación con nidos", text: "+1,000 nidos esta temporada y +100,000 crías liberadas en total.", hot: true },
];

function History() {
  const reduce = useReducedMotion();
  const view = reduce ? {} : { initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.35 } };
  const line = { hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.2, ease } } };
  const item = {
    hidden: { opacity: 0, y: 24 },
    shown: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 + i * 0.18, ease } }),
  };
  return (
    <section className="ab-history" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Trece temporadas sin faltar a la playa.</Reveal>
      <motion.div className="ab-timeline" {...view}>
        <motion.div className="ab-timeline__line" variants={line} />
        {MILESTONES.map((m, i) => (
          <motion.article key={m.when} className={`ab-mile${m.hot ? " ab-mile--hot" : ""}`} custom={i} variants={item}>
            <div className="ab-mile__media">
              {m.img ? <img src={m.img} alt={m.alt} loading="lazy" decoding="async" /> : <p className="ab-mile__quote">{m.quote}</p>}
            </div>
            <span className="ab-mile__dot" aria-hidden="true" />
            <h3 className="lt-display">{m.when}</h3>
            <p>
              {m.text}
              {m.link && (
                <>
                  {" "}
                  <a href={m.link} target="_blank" rel="noopener noreferrer">Leer en Noticias ONU ↗</a>
                </>
              )}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- 3 · Misión y visión ---------- */
function MissionVision() {
  return (
    <section className="ab-mission" data-snap>
      <div className="ab-mission__grid">
        <Reveal>
          <h2 className="lt-display">Misión</h2>
          <p>
            Somos una asociación civil sin fines de lucro comprometida con el cuidado del medio ambiente, con el objetivo
            principal de proteger y conservar la tortuga marina para preservar las especies que arriban a la costa de
            Michoacán.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="lt-display">Visión</h2>
          <p>
            Convertirnos en uno de los principales centros de protección y conservación de la tortuga marina del país,
            contribuyendo con investigación y cifras positivas en reproducción de crías, siendo un atractivo turístico
            sostenible y sustentable, y creando conciencia ambiental en cada ser humano.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 4 · Cómo trabajamos ----------
   Los cuatro pilares: el activo muestra su texto y la foto grande cambia.
   Se activa con el mouse, el teclado o tocando. */
const PILLARS = [
  { name: "Protegemos", img: n("protegemos"), alt: "Integrante del campamento trabajando en la playa", text: "Mediante patrullajes nocturnos en playa, colecta segura de nidos y resguardo activo en el corral de incubación." },
  { name: "Divulgamos", img: n("divulgamos"), alt: "Grupo escolar en la playa", text: "Educación ambiental sobre el respeto e importancia de nuestras especies a escuelas, visitantes y comunidad local." },
  { name: "Unimos", img: n("unimos"), alt: "Equipo y voluntarios del campamento", text: "Alianzas comunitarias con pescadores, familias de El Habillal, voluntarios de Lázaro Cárdenas y comunidad externa." },
  { name: "Respetamos", img: n("respetamos"), alt: "Nido de tortuga laúd", text: "Las prácticas de conservación ética en cada interacción: desde el arribo de hembras hasta la liberación de cada cría." },
];

function Pillars() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = PILLARS[active];
  return (
    <section className="ab-pillars" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Un compromiso vivo con nuestras especies.</Reveal>
      <div className="ab-pillars__grid">
        <ul className="ab-pillars__list">
          {PILLARS.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                className={`ab-pillar${active === i ? " is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="lt-display ab-pillar__name">{p.name}</span>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.span
                      className="ab-pillar__text"
                      initial={reduce ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      {p.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
        <div className="ab-pillars__photo">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={current.img}
              src={current.img}
              alt={current.alt}
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5 · Súmate ---------- */
const WAYS = [
  { key: "convocatorias", title: "Voluntariado", text: "Prácticas, servicio social y voluntariado de temporada.", cta: "Ver convocatorias", tone: "hot", featured: true },
  { key: "adopta", title: "Adopta un nido", text: "Lo cuidamos hasta que nace y te invitamos a su liberación.", cta: "Adoptar", tone: "hot" },
  { key: "dona", title: "Dona", text: "Desde $100, para la próxima noche de patrullaje.", cta: "Donar", tone: "sea" },
];

function JoinUs({ go }) {
  return (
    <section className="lt-action ab-join" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">Esto lo hacemos entre todos. Súmate.</Reveal>
      <div className="ab-join__grid">
        {WAYS.map((w, i) => (
          <Reveal key={w.key} as="article" className="lt-door ab-way" delay={i * 0.1}>
            <div className="lt-door__body">
              <h3 className="lt-display">{w.title}</h3>
              <p>{w.text}</p>
              <button className={`lt-btn lt-btn--${w.tone}`} onClick={() => go(w.key)}>{w.cta}</button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PageAbout({ go }) {
  // Mismo encuadre automático por secciones que el Home
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home ab-page">
      <AboutHero go={go} />
      <MissionVision />
      <History />
      <Pillars />
      <JoinUs go={go} />
    </main>
  );
}

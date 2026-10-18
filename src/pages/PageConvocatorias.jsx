import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/home/Reveal";
import { snapToSections } from "../lib/smoothScroll";

/* Fotos propias de esta página (ninguna se repite con Home ni Nosotros) */
const PHOTOS = {
  hero: "/convocatorias/equipo-stand.webp",
  cartel: "/convocatorias/cartel.webp",
};

const ease = [0.22, 1, 0.36, 1];

const MODALIDADES = [
  { name: "Servicio social", text: "Para estudiantes que necesitan liberar sus horas haciendo conservación real." },
  { name: "Prácticas profesionales", text: "Experiencia de campo en tu carrera, junto a nuestro equipo técnico." },
  { name: "Voluntariado de temporada", text: "Para la comunidad y cualquier persona comprometida con las tortugas." },
];

const ACTIVIDADES = [
  "Patrullajes nocturnos en playa y registro de hembras anidadoras.",
  "Traslado y colecta segura de nidos al corral de incubación.",
  "Monitoreo de nidos, conteo de eclosión y liberación de crías.",
  "Mantenimiento de instalaciones del campamento y atención a visitantes.",
  "Participación en programas educativos y recepción de grupos escolares.",
];

const PASOS = [
  { n: "1", t: "Elige tu modalidad", d: "Servicio social, prácticas o voluntariado, según tu disponibilidad." },
  { n: "2", t: "Contáctanos", d: "Envíanos un mensaje con tu interés y tus datos de contacto." },
  { n: "3", t: "Entrevista y registro", d: "Revisamos tu perfil y te citamos a una entrevista virtual o presencial antes de tu ingreso." },
];

function Hero({ go }) {
  const reduce = useReducedMotion();
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };
  return (
    <section className="lt-hero ab-hero" data-snap>
      <div className="lt-hero__text">
        <motion.h1 className="lt-display lt-hero__title ab-hero__title" {...enter(0.1)}>
          Únete al equipo que cuida la playa cada noche.
        </motion.h1>
        <motion.p className="lt-hero__line" {...enter(0.28)}>Servicio social, prácticas profesionales y voluntariado de temporada.</motion.p>
        <motion.div className="lt-hero__ctas" {...enter(0.42)}>
          <button className="lt-btn lt-btn--hot" onClick={() => go("contacto")}>Quiero participar</button>
          <button className="lt-btn lt-btn--line" onClick={() => document.getElementById("modalidades")?.scrollIntoView({ behavior: "smooth" })}>
            Ver modalidades
          </button>
        </motion.div>
      </div>
      <div className="lt-hero__photo">
        <img src={PHOTOS.hero} alt="Equipo del campamento en un módulo informativo" fetchPriority="high" />
      </div>
    </section>
  );
}

/* Modalidades + a quién buscamos */
function Modalidades() {
  return (
    <section id="modalidades" className="pg-sec pg-sec--espuma" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Tres formas de sumarte.</Reveal>
      <div className="pg-cards">
        {MODALIDADES.map((m, i) => (
          <Reveal key={m.name} as="article" className="pg-card" delay={i * 0.12}>
            <h3 className="lt-display">{m.name}</h3>
            <p>{m.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal as="p" className="pg-sub" delay={0.3}>
        Buscamos estudiantes de Biología, Medicina Veterinaria, Ingeniería Ambiental y carreras afines, y a cualquier persona
        comprometida con la conservación.
      </Reveal>
    </section>
  );
}

/* Actividades con el cartel oficial */
function Actividades() {
  const reduce = useReducedMotion();
  const view = reduce ? {} : { initial: "hidden", whileInView: "shown", viewport: { once: false, amount: 0.35 } };
  const item = {
    hidden: { opacity: 0, x: -24 },
    shown: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15 + i * 0.1, ease } }),
  };
  return (
    <section className="pg-sec pg-sec--agua" data-snap>
      <Reveal as="h2" className="lt-display ab-title">Esto harás en el campamento.</Reveal>
      <div className="pg-split">
        <div className="pg-split__img pg-split__img--contain">
          <img src={PHOTOS.cartel} alt="Cartel oficial de prácticas y voluntariado" loading="lazy" decoding="async" />
        </div>
        <motion.ol className="pg-list" {...view}>
          {ACTIVIDADES.map((a, i) => (
            <motion.li key={a} custom={i} variants={item}>{a}</motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* Pasos + llamado final, en el azul del cierre */
function Registro({ go }) {
  return (
    <section className="lt-action pg-end" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">Así te registras.</Reveal>
      <div className="pg-steps">
        {PASOS.map((p, i) => (
          <Reveal key={p.n} as="article" className="pg-step" delay={i * 0.12}>
            <span className="lt-display pg-step__n">{p.n}</span>
            <h3 className="lt-display">{p.t}</h3>
            <p>{p.d}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="pg-end__cta" delay={0.4}>
        <button className="lt-btn lt-btn--hot" onClick={() => go("contacto")}>Contáctanos</button>
      </Reveal>
    </section>
  );
}

export function PageConvocatorias({ go }) {
  useEffect(() => snapToSections(), []);
  return (
    <main className="lt-home pg-page">
      <Hero go={go} />
      <Modalidades />
      <Actividades />
      <Registro go={go} />
    </main>
  );
}

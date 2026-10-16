import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

const DOORS = [
  {
    key: "adopta",
    title: "Adopta un nido",
    text: "Lo cuidamos hasta que nace y te invitamos a su liberación.",
    cta: "Adoptar",
    tone: "hot",
    img: HOME_MEDIA.criaLaud,
    alt: "Cría de tortuga laúd en la arena",
    featured: true,
  },
  {
    key: "dona",
    title: "Dona",
    text: "Desde $100: gasolina, material para el corral y noches de vigilancia.",
    cta: "Donar",
    tone: "sea",
    img: HOME_MEDIA.donaCria,
    alt: "Cría de tortuga entrando al agua",
  },
  {
    key: "visita",
    title: "Visítanos",
    text: "Escuelas, familias y grupos: vive una liberación en persona.",
    cta: "Agendar visita",
    tone: "line",
    img: HOME_MEDIA.visitantes,
    alt: "Visitantes en el campamento",
  },
];

/* ---------- 7 · El mar ----------
   El único tramo profundo y el final del viaje: aquí, por fin, se pide. */
export function TakeAction({ go }) {
  return (
    <section className="lt-action" data-snap>
      <Reveal as="h2" className="lt-display lt-action__title">Ahora, la siguiente tortuga depende de ti.</Reveal>
      <div className="lt-action__grid">
        {DOORS.map((d, i) => (
          <Reveal key={d.key} as="article" className={`lt-door${d.featured ? " lt-door--featured" : ""}`} delay={i * 0.1}>
            <div className="lt-door__img"><img src={d.img} alt={d.alt} loading="lazy" decoding="async" /></div>
            <div className="lt-door__body">
              <h3 className="lt-display">{d.title}</h3>
              <p>{d.text}</p>
              <button className={`lt-btn lt-btn--${d.tone}`} onClick={() => go(d.key)}>{d.cta}</button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

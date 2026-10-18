import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

const THREATS = [
  { name: "Saqueo", text: "Se extraen para su venta ilegal; un nido sin vigilancia puede desaparecer en minutos." },
  { name: "Depredadores", text: "Perros, aves y cangrejos encuentran los nidos y a las crías recién nacidas." },
  { name: "Marea y luz", text: "El mar puede inundar el nido y las luces de la costa desorientan a las crías." },
];

/* ---------- 2 · El problema ----------
   La primera razón para ayudar: qué pasa si nadie está en la playa. */
export function Problem() {
  return (
    <section id="viaje" className="lt-problem" data-snap>
      <div className="lt-problem__head">
        <div>
          <Reveal as="h2" from="left" className="lt-display">Una tortuga pone su nido y regresa al mar.</Reveal>
          <Reveal as="p" from="right" className="lt-problem__lead" delay={0.1}>
            Pero sus huevos quedan amenazados:
          </Reveal>
        </div>
        <Reveal className="lt-problem__photo" delay={0.1}>
          <img src={HOME_MEDIA.golfinaNoche} alt="Tortuga negra en la playa" loading="lazy" decoding="async" />
        </Reveal>
      </div>
      <div className="lt-problem__list">
        {THREATS.map((t, i) => (
          <Reveal key={t.name} className="lt-problem__item" delay={i * 0.1}>
            <h3 className="lt-display">{t.name}</h3>
            <p>{t.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

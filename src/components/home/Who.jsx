import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

/* ---------- 3 · Quiénes somos ----------
   Título de la sección, después el logo y la presentación (constitución y
   permiso SEMARNAT). */
export function Who() {
  return (
    <section className="lt-who" data-snap>
      <Reveal as="h2" from="left" className="lt-display lt-who__title">Por eso, nosotros estamos cada noche en la playa.</Reveal>
      <Reveal className="lt-who__logo" delay={0.1}>
        <img src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" width="600" height="386" />
      </Reveal>
      <Reveal as="p" from="right" className="lt-who__text" delay={0.2}>
        Somos un campamento tortuguero constituido en El Habillal, Lázaro Cárdenas, Michoacán, desde 2013, con
        autorización vigente de la SEMARNAT de <em>Aprovechamiento no extractivo de especies silvestres</em>.
      </Reveal>
    </section>
  );
}

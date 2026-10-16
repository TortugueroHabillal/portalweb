import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

/* ---------- 6 · Aliados ----------
   Una sola tira larga con cada logo una vez, grande, girando sin fin de
   borde a borde. */
export function Allies() {
  return (
    <section className="lt-allies-section" data-snap>
      <Reveal as="h2" className="lt-display lt-allies-section__title">
        Más de 35 empresas, instituciones y comercios de Lázaro Cárdenas creen en nuestra labor y la hacen posible.
      </Reveal>
      <div className="lt-allies" role="img" aria-label="Logos de empresas, instituciones y comercios aliados">
        <div className="lt-allies__track">
          {/* Dos copias de la misma tira para que el giro no tenga corte */}
          <img src={HOME_MEDIA.aliados} alt="" loading="lazy" decoding="async" />
          <img src={HOME_MEDIA.aliados} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}

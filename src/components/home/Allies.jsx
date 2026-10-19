import { Reveal } from "./Reveal";

/* ---------- 6 · Aliados ----------
   Dos filas de logos en tarjetas blancas que avanzan en sentidos opuestos.
   Las tarjetas tienen anchos distintos y van desfasadas en altura, para que
   la tira se sienta viva e irregular. Al pasar el mouse se detienen. */
const l = (slug, name) => ({ src: `/home/aliados/${slug}.webp`, name });

const ALLIES = [
  l("hutchison-ports", "Hutchison Ports"),
  l("apm-terminals", "APM Terminals"),
  l("arcelormittal", "ArcelorMittal"),
  l("coca-cola-femsa-logo", "Coca-Cola FEMSA"),
  l("logo-fester", "Fester"),
  l("logo-profepa", "PROFEPA"),
  l("secretaria-medio-ambiente", "Secretaría de Medio Ambiente"),
  l("tecnm", "Tecnológico Nacional de México"),
  l("itlac", "Instituto Tecnológico de Lázaro Cárdenas"),
  l("uplzc", "Universidad Politécnica de Lázaro Cárdenas"),
  l("lazaro-cardenas-logo", "Ayuntamiento de Lázaro Cárdenas"),
  l("visita-lzc", "Visita Lázaro Cárdenas"),
  l("michoacan", "Gobierno de Michoacán"),
  l("fge", "Fiscalía General del Estado de Michoacán"),
  l("com-pesca-del-estado", "Comisión de Pesca del Estado"),
  l("logo-pesca-en-directo", "Pesca en Directo"),
  l("canaco", "CANACO Servytur Lázaro Cárdenas"),
  l("la-silver", "La Silver"),
  l("cultivando-futuros", "Cultivando Futuros"),
  l("voluntarios-modelo", "Voluntarios Modelo"),
];

const ROWS = [ALLIES.filter((_, i) => i % 2 === 0), ALLIES.filter((_, i) => i % 2 === 1)];

function Row({ items, reverse }) {
  // Dos copias seguidas para que el giro no tenga corte
  const loop = [...items, ...items];
  return (
    <div className={`lt-logos__row${reverse ? " lt-logos__row--rev" : ""}`}>
      <ul className="lt-logos__track">
        {loop.map((a, i) => (
          <li key={i} className="lt-logos__card" aria-hidden={i >= items.length ? "true" : undefined}>
            <img src={a.src} alt={i < items.length ? a.name : ""} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Allies() {
  return (
    <section className="lt-allies-section" data-snap>
      <Reveal as="h2" from="left" className="lt-display lt-allies-section__title">
        Más de 35 empresas, instituciones y comercios de Lázaro Cárdenas creen en nuestra labor y la hacen posible.
      </Reveal>
      <div className="lt-logos" aria-label="Algunos de nuestros aliados">
        <Row items={ROWS[0]} />
        <Row items={ROWS[1]} reverse />
      </div>
    </section>
  );
}

import { AnimatedCounter } from "../AnimatedCounter";
import { Reveal } from "./Reveal";

/* Nidos protegidos en la temporada actual: actualizar aquí cuando haya cifra nueva */
const SEASON_NESTS = 1000;

/* ---------- 5 · Las pruebas ----------
   Resultados + reconocimiento de la ONU, en una sola pantalla.
   (Los aliados tienen su propia sección a continuación.) */
export function Proof() {
  return (
    <section className="lt-proof" data-snap>
      <Reveal as="h2" from="left" className="lt-display lt-proof__title">Y este es nuestro impacto.</Reveal>

      <div className="lt-proof__stats">
        <Reveal>
          <div className="lt-proof__n">+<AnimatedCounter value={100000} /></div>
          <p>crías liberadas al mar</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="lt-proof__n lt-proof__n--hot">+<AnimatedCounter value={SEASON_NESTS} /></div>
          <p>nidos protegidos esta temporada</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="lt-proof__n"><AnimatedCounter value={13} /></div>
          <p>temporadas sin faltar a la playa</p>
        </Reveal>
      </div>

      <Reveal as="blockquote" from="right" className="lt-proof__quote">
        <p>«En el Día Mundial de los Océanos de 2021, la ONU reconoció la labor de El Habillal en una entrevista a nuestro director.»</p>
        <a href="https://news.un.org/es/story/2021/06/1493152" target="_blank" rel="noopener noreferrer">Leer la entrevista en Noticias ONU ↗</a>
      </Reveal>
    </section>
  );
}

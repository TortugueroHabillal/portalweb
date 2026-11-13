import { PhotoDeck } from "../components/PhotoDeck";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Eventos — mismo estilo que el Home 2026: arena → mar profundo.
   Cada evento lleva su año en grande, en el azul del logo.
   Fotos propias de esta página: ninguna se repite con otras páginas. */
const e = (name) => `/eventos/${name}.webp`;

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

export function PageEventos({ go }) {
  return (
    <main className="p8">
      <PageHero
        title={<>Cuando la comunidad se reúne, <em>la playa se cuida mejor.</em></>}
        lede={<>Festivales, encuentros y rodadas que guardamos en la memoria.</>}
        img={e("hero-encuentro")}
        alt="Niñas, niños y equipo del campamento en la playa durante el Encuentro por la Conservación de las Tortugas"
      >
        <a className="btn btn-t" href="#ev-rodada">Recorre nuestra memoria</a>
      </PageHero>

      {EVENTS.map((ev, i) => (
        <section key={ev.id} id={`ev-${ev.id}`} className={`sec chapter${i % 2 ? " flip" : ""}`}>
          <div className="wrap chapter-in">
            <div className="chapter-txt">
              <span className="year" data-y={ev.year} aria-hidden="true">{ev.year}</span>
              <h2>{ev.title}</h2>
              <p className="body">{ev.text}</p>
            </div>
            <PhotoDeck photos={ev.photos} label={ev.title} />
          </div>
        </section>
      ))}

      <section className="sec">
        <div className="wrap split2">
          <figure className="poster">
            <img src={e("semarnat")} alt="Reconocimiento de la SEMARNAT al Campamento Tortuguero El Habillal" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h2>Un reconocimiento de la SEMARNAT.</h2>
            <p className="body">
              La Secretaría de Medio Ambiente y Recursos Naturales reconoció al campamento por su compromiso ininterrumpido con
              la Estrategia Nacional de Limpieza y Conservación de Playas y Costas de México.
            </p>
          </div>
        </div>
      </section>

      <section className="deep">
        <div className="wrap">
          <h2>El siguiente recuerdo lo hacemos contigo.</h2>
          <p className="body intro">
            Escríbenos para enterarte del próximo evento o para organizar uno con tu escuela o empresa.
          </p>
          <div className="ctas">
            <button className="btn btn-t" onClick={() => go("contacto")}>Quiero participar</button>
            <button className="tl tl-light" onClick={() => go("convocatorias")}>Súmate como voluntario</button>
          </div>
        </div>
      </section>
    </main>
  );
}

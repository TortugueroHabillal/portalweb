import { useState } from "react";
import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Nosotros — mismo estilo que el Home 2026: arena → mar profundo.
   Fotos propias de esta página: ninguna se repite con el Home ni con Visítanos. */
const n = (name) => `/nosotros/${name}.webp`;

const MILESTONES = [
  { when: "2013", title: "Nace el campamento", img: n("campamento-aereo"), alt: "Vista aérea del campamento", text: "Se constituye el campamento en El Habillal, con autorización de la SEMARNAT." },
  { when: "Cada temporada", title: "Noches en la playa", img: n("temporada"), alt: "Trabajo de campo durante la temporada", text: "Patrullajes nocturnos, corral de incubación y liberaciones." },
  {
    when: "2021",
    title: "Reconocimiento de la ONU",
    quote: "En el Día Mundial de los Océanos, la ONU reconoció la labor de El Habillal en una entrevista a nuestro director.",
    link: "https://news.un.org/es/story/2021/06/1493152",
  },
  { when: "TortuFest", title: "La fiesta de la comunidad", img: "/tortufest_1ed_platica.webp", alt: "Plática durante el TortuFest", text: "Dos ediciones del festival que acerca la conservación a la comunidad." },
  { when: "Hoy", title: "Más de 100,000 crías liberadas", img: n("corral"), alt: "Corral de incubación con nidos", text: "Rescatamos más de 1,400 nidos por temporada." },
];

const PILLARS = [
  { name: "Protegemos", img: n("protegemos"), alt: "Integrante del campamento trabajando en el corral", text: "Mediante patrullajes nocturnos en playa, colecta segura de nidos y resguardo activo en el corral de incubación." },
  { name: "Divulgamos", img: n("divulgamos"), alt: "Grupo escolar en la playa", text: "Educación ambiental sobre el respeto e importancia de nuestras especies a escuelas, visitantes y comunidad local." },
  { name: "Unimos", img: n("unimos"), alt: "Equipo y voluntarios del campamento", text: "Alianzas comunitarias con pescadores, familias de El Habillal, voluntarios de Lázaro Cárdenas y comunidad externa." },
  { name: "Respetamos", img: n("respetamos"), alt: "Nido de tortuga laúd", text: "Prácticas de conservación ética en cada interacción: desde el arribo de las hembras hasta la liberación de cada cría." },
];

const WAYS = [
  { key: "convocatorias", title: "Voluntariado", text: "Prácticas, servicio social y voluntariado de temporada.", cta: "Ver convocatorias", tone: "btn-t" },
  { key: "adopta", title: "Adopta un nido", text: "$220 MXN por nido. Ponle tu nombre y acompáñalo hasta su liberación.", cta: "Adoptar un nido", tone: "btn-t" },
  { key: "dona", title: "Haz un donativo", text: "Apoya los recorridos de vigilancia y la operación del campamento.", cta: "Donar", tone: "btn-o" },
];

export function PageAbout({ go }) {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];

  return (
    <main className="p8">
      {/* Hero */}
      <PageHero
        title={<>Un campamento nacido de la comunidad, <em>por amor a nuestras especies.</em></>}
        img={n("equipo-entrada")}
        alt="Equipo y voluntarios en la entrada del Campamento Tortuguero El Habillal"
      >
        <button className="btn btn-t" onClick={() => go("convocatorias")}>Súmate como voluntario</button>
        <button className="tl" onClick={() => go("visita")}>o visítanos</button>
      </PageHero>

      {/* Misión y visión */}
      <section className="sec">
        <div className="wrap duo">
          <div>
            <h3>Misión</h3>
            <p className="body">
              Somos una asociación civil sin fines de lucro comprometida con el cuidado del medio ambiente, con el objetivo
              principal de proteger y conservar la tortuga marina para preservar las especies que arriban a la costa de
              Michoacán.
            </p>
          </div>
          <div>
            <h3>Visión</h3>
            <p className="body">
              Convertirnos en uno de los principales centros de protección y conservación de la tortuga marina del país,
              contribuyendo con investigación y cifras positivas en reproducción de crías, siendo un atractivo turístico
              sostenible y sustentable, y creando conciencia ambiental en cada ser humano.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <h2>Desde 2013, cada temporada en la playa.</h2>
            </div>
          </div>
          <ol className="tline">
            {MILESTONES.map((m) => (
              <li key={m.when}>
                <span className="when">{m.when}</span>
                <div>
                  <h3>{m.title}</h3>
                  {m.text && <p>{m.text}</p>}
                </div>
                {m.img ? (
                  <figure><img src={m.img} alt={m.alt} loading="lazy" decoding="async" /></figure>
                ) : (
                  <blockquote>
                    «{m.quote}»
                    <br />
                    <a className="src" href={m.link} target="_blank" rel="noopener noreferrer">Leer en Noticias ONU</a>
                  </blockquote>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <h2>Un compromiso vivo con nuestras especies.</h2>
            </div>
          </div>
          <div className="pillars">
            <ul>
              {PILLARS.map((p, i) => (
                <li key={p.name}>
                  <button type="button" aria-pressed={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                    <span>{p.name}</span>
                    {active === i && <p>{p.text}</p>}
                  </button>
                </li>
              ))}
            </ul>
            <figure className="big"><img src={pillar.img} alt={pillar.alt} /></figure>
          </div>
        </div>
      </section>

      {/* Súmate */}
      <section className="deep">
        <div className="wrap">
          <h2>Esto lo hacemos entre todos.</h2>
          <div className="ways">
            {WAYS.map((w) => (
              <article key={w.key}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <button className={`btn ${w.tone}`} onClick={() => go(w.key)}>{w.cta}</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

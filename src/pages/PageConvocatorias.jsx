import { PageHero } from "../components/PageHero";
import "../styles/pages-v8.css";

/* Convocatorias — mismo estilo que el Home 2026: arena → mar profundo.
   Fotos propias de esta página: ninguna se repite con otras páginas. */
const PHOTOS = {
  hero: "/convocatorias/equipo-stand.webp",
  cartel: "/convocatorias/cartel.webp",
};

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

export function PageConvocatorias({ go }) {
  return (
    <main className="p8">
      <PageHero
        title={<>Únete al equipo que cuida la playa <em>cada noche.</em></>}
        lede={<>Servicio social, prácticas profesionales y voluntariado de temporada.</>}
        img={PHOTOS.hero}
        alt="Equipo del campamento en un módulo informativo"
      >
        <button className="btn btn-t" onClick={() => go("contacto")}>Quiero participar</button>
        <a className="tl" href="#modalidades">Ver modalidades</a>
      </PageHero>

      <section className="sec" id="modalidades">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <h2>Tres formas de sumarte.</h2>
            </div>
          </div>
          <div className="trio">
            {MODALIDADES.map((m) => (
              <article key={m.name}>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <p className="note">
            Buscamos estudiantes de Biología, Medicina Veterinaria, Ingeniería Ambiental y carreras afines, y a cualquier
            persona comprometida con la conservación.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split2">
          <figure className="poster">
            <img src={PHOTOS.cartel} alt="Cartel oficial de prácticas y voluntariado" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h2>Esto harás en el campamento.</h2>
            <ol className="acts">
              {ACTIVIDADES.map((a) => <li key={a}>{a}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="deep">
        <div className="wrap">
          <h2>Así te registras.</h2>
          <ol className="steps">
            {PASOS.map((p) => (
              <li key={p.n}>
                <b>{p.n}</b>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>
          <button className="btn btn-t" onClick={() => go("contacto")}>Contáctanos</button>
        </div>
      </section>
    </main>
  );
}

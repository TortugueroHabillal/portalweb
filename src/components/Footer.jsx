import { HOME_MEDIA } from "./home/media";

/* Footer compacto: azul marino fijo con corte de ola, sin animación */
export function Footer({ go }) {
  const to = (route) => () => go && go(route);
  return (
    <footer className="sfoot">
      <svg className="sfoot-waves" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,20 C200,60 350,0 600,24 C850,48 1000,4 1200,28 L1200,60 L0,60 Z" fill="#0E4A5A" />
      </svg>
      <div className="sfoot-in">
        <div className="sfoot-c">
          <button className="sfoot-brand" onClick={to("home")}>
            <img src={HOME_MEDIA.logo} alt="" loading="lazy" />
            <span>
              Campamento Tortuguero
              <br />
              El Habillal
            </span>
          </button>
          <nav aria-label="Pie de página">
            <button onClick={to("adopta")}>Adopta</button>
            <button onClick={to("dona")}>Dona</button>
            <button onClick={to("visita")}>Visítanos</button>
            <button onClick={to("about")}>Nosotros</button>
            <button onClick={to("eventos")}>Eventos</button>
            <button onClick={to("convocatorias")}>Convocatorias</button>
            <button onClick={to("contacto")}>Contacto</button>
            <a href="mailto:camp.tortuguero.elhabillal@gmail.com">Correo</a>
            <a href="https://wa.me/527531631707" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://www.instagram.com/habillalcampamento/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/campamentortuguerohabillal/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.tiktok.com/@tortuguerohabillal" target="_blank" rel="noopener noreferrer">TikTok</a>
          </nav>
        </div>
        <div className="sfoot-b">
          <span>© {new Date().getFullYear()} · La Caroa, Tenencia, 60981 El Habillal, Michoacán</span>
          <button onClick={to("privacidad")}>Aviso de privacidad</button>
        </div>
      </div>
    </footer>
  );
}

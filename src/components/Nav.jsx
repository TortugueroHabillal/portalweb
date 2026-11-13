import { useEffect, useState } from "react";
import { HOME_MEDIA } from "./home/media";

const PAGES = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Nosotros" },
  { id: "visita", label: "Visítanos" },
  { id: "eventos", label: "Eventos" },
  { id: "convocatorias", label: "Convocatorias" },
  { id: "contacto", label: "Contacto" },
];

/* ---------- Menú: barra a todo lo ancho ----------
   Logo a la izquierda, secciones al centro y Adopta / Dona a la derecha.
   En pantallas angostas las secciones se abren con ☰ en un panel debajo. */
export function Nav({ current, setCurrent }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navigate = (id) => {
    setOpen(false);
    setCurrent(id);
  };
  const cur = (id) => (current === id ? "page" : undefined);

  return (
    <>
      <header className={`snav${solid ? " solid" : ""}`}>
        <button className="snav-brand" onClick={() => navigate("home")} aria-label="Ir a inicio">
          <img src={HOME_MEDIA.logo} alt="" />
          <span>
            <small>Campamento tortuguero</small>
            El Habillal
          </span>
        </button>
        <nav className="snav-links" aria-label="Principal">
          {PAGES.map((p) => (
            <button key={p.id} aria-current={cur(p.id)} onClick={() => navigate(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
        <div className="snav-acts">
          <button aria-current={cur("adopta")} onClick={() => navigate("adopta")}>Adopta</button>
          <button aria-current={cur("dona")} onClick={() => navigate("dona")}>Dona</button>
        </div>
        <button
          className={`snav-burger${open ? " x" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="snav-panel"
        >
          <i />
          <i />
          <i />
        </button>
      </header>
      {open && (
        <nav className="snav-panel" id="snav-panel" aria-label="Secciones">
          {PAGES.map((p) => (
            <button key={p.id} aria-current={cur(p.id)} onClick={() => navigate(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}

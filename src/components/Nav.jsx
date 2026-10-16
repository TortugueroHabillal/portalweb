import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HOME_MEDIA } from "./home/media";
import { useMediaQuery } from "../hooks/useMediaQuery";

const PAGES = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Nosotros" },
  { id: "visita", label: "Visítanos" },
  { id: "eventos", label: "Eventos" },
  { id: "adopta", label: "Adopta" },
  { id: "convocatorias", label: "Convocatorias" },
  { id: "contacto", label: "Contacto" },
];

const ease = [0.22, 1, 0.36, 1];

/* ---------- Menú «pastilla» flotante ----------
   Siempre muestra logo + nombre + Dona. Nunca cubre la pantalla:
   - Escritorio ancho: arriba de la página los enlaces están a la vista; al
     bajar se encogen y el botón ☰ los vuelve a desplegar en horizontal.
   - Pantallas angostas: el botón ☰ despliega los enlaces en una segunda
     fila horizontal (deslizable) dentro de la misma pastilla.
*/
export function Nav({ current, setCurrent }) {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1081px)");
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const showLinks = wide ? !compact || expanded : expanded;

  useEffect(() => {
    const onScroll = () => {
      const isCompact = window.scrollY > 80;
      setCompact(isCompact);
      if (!isCompact && wide) setExpanded(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [wide]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const navigate = (id) => {
    setExpanded(false);
    setCurrent(id);
  };

  const showBurger = !wide || compact;

  return (
    <header className={`mv-nav${!wide && expanded ? " mv-nav--open" : ""}`}>
      <button className="mv-nav__brand" onClick={() => navigate("home")} aria-label="Ir a inicio">
        <img src={HOME_MEDIA.logo} alt="" />
        <span className="mv-nav__name">
          <small>Campamento tortuguero</small>
          El Habillal
        </span>
      </button>

      <AnimatePresence initial={false}>
        {showLinks && (
          <motion.nav
            id="mv-links"
            className="mv-nav__links"
            aria-label="Principal"
            initial={wide ? { opacity: 0, width: 0 } : { opacity: 0, height: 0 }}
            animate={wide ? { opacity: 1, width: "auto" } : { opacity: 1, height: "auto" }}
            exit={wide ? { opacity: 0, width: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
          >
            {PAGES.map((p) => (
              <button
                key={p.id}
                className="mv-nav__link"
                aria-current={current === p.id ? "page" : undefined}
                onClick={() => navigate(p.id)}
              >
                {p.label}
                {current === p.id && <motion.span layoutId="mv-nav-dot" className="mv-nav__dot" />}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="mv-nav__actions">
        <button className="mv-btn mv-btn--dona mv-nav__cta" onClick={() => navigate("dona")}>Dona</button>
        {showBurger && (
          <button
            className={`mv-nav__burger${expanded ? " mv-nav__burger--x" : ""}`}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Ocultar menú" : "Mostrar menú"}
            aria-expanded={expanded}
            aria-controls="mv-links"
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>
    </header>
  );
}

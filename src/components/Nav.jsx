import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BackgroundPaths } from "./home/BackgroundPaths";
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
   Arriba de la página muestra todos los enlaces; al bajar se encoge a
   logo + Dona + botón de menú.
   Escritorio ancho: el botón vuelve a desplegar los enlaces en horizontal
   dentro de la misma pastilla. Pantallas angostas: menú a pantalla completa.
*/
export function Nav({ current, setCurrent }) {
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false); // menú a pantalla completa (angosto)
  const [expanded, setExpanded] = useState(false); // enlaces en horizontal (ancho)
  const wide = useMediaQuery("(min-width: 1081px)");
  const showLinks = wide && (!compact || expanded);
  const closeRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const isCompact = window.scrollY > 80;
      setCompact(isCompact);
      if (!isCompact) setExpanded(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navigate = (id) => {
    setOpen(false);
    setExpanded(false);
    setCurrent(id);
  };

  const closeMenu = () => {
    setOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <>
      <header className={`mv-nav${compact ? " mv-nav--compact" : ""}`}>
        <button className="mv-nav__logo" onClick={() => navigate("home")} aria-label="Ir a inicio">
          <img src={HOME_MEDIA.logo} alt="Campamento Tortuguero El Habillal" />
        </button>

        <AnimatePresence initial={false}>
          {showLinks && (
            <motion.nav
              className="mv-nav__links"
              aria-label="Principal"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
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

        <button className="mv-btn mv-btn--dona mv-nav__cta" onClick={() => navigate("dona")}>Dona</button>
        {(!wide || compact) && (
          <button
            ref={burgerRef}
            className={`mv-nav__burger${expanded ? " mv-nav__burger--x" : ""}`}
            onClick={() => (wide ? setExpanded((v) => !v) : setOpen(true))}
            aria-label={expanded ? "Ocultar enlaces" : "Abrir menú"}
            aria-expanded={wide ? expanded : open}
            aria-controls={wide ? undefined : "mv-menu"}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mv-menu"
            className="mv-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: reduce ? 0.15 : 0.6, ease }}
          >
            <div className="mv-menu__waves">
              <BackgroundPaths count={4} />
            </div>
            <div className="mv-menu__top">
              <img src={HOME_MEDIA.logo} alt="Campamento Tortuguero El Habillal" />
              <button ref={closeRef} className="mv-menu__close" onClick={closeMenu} aria-label="Cerrar menú">✕</button>
            </div>
            <ul className="mv-menu__list">
              {PAGES.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={reduce ? false : { opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease }}
                >
                  <button className="mv-menu__item" aria-current={current === p.id ? "page" : undefined} onClick={() => navigate(p.id)}>
                    {p.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mv-menu__ctas"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              <button className="mv-btn mv-btn--dona" onClick={() => navigate("dona")}>Dona ahora</button>
              <button className="mv-btn mv-btn--outline" onClick={() => navigate("adopta")}>Adopta un nido</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

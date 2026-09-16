import { useState } from "react";
import { TOKENS, LOGO_URL } from "../theme";

const ICONS = {
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" /><path d="M15.5 14.3c2.4.2 4 2.1 4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  megaphone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10v4a1 1 0 0 0 1 1h2l1.5 5h2L8 15h1l9 4V5l-9 4H4a1 1 0 0 0-1 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M18 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="5.5" width="16" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  ),
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" /></svg>
  ),
  turtle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12.5" rx="7" ry="5.5" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 10.5 2.5 8m1 5-3 1M18.5 10.5 21.5 8m-1 5 3 1M9.5 18l-1 2.5M14.5 18l1 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 20.2s-7.8-4.7-9.9-9.6C.6 6.9 3 3.7 6.4 3.7c2 0 3.6 1 5.6 3 2-2 3.6-3 5.6-3 3.4 0 5.8 3.2 4.3 6.9-2.1 4.9-9.9 9.6-9.9 9.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  egg: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3.2c3.9 4.5 6.2 8.8 6.2 11.7a6.2 6.2 0 1 1-12.4 0c0-2.9 2.3-7.2 6.2-11.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
  ),
};

function NavIcon({ name }) {
  return ICONS[name] || null;
}

const LEFT_PAGES = [
  { id: "home", label: "Inicio", icon: "home" },
  { id: "about", label: "Nosotros", icon: "users" },
  { id: "convocatorias", label: "Convocatorias", icon: "megaphone" },
  { id: "eventos", label: "Eventos", icon: "calendar" },
];
const RIGHT_PAGES = [
  { id: "visita", label: "Visítanos", icon: "pin" },
  { id: "adopta", label: "Adopta", icon: "egg" },
  { id: "dona", label: "Dona", icon: "heart" },
  { id: "contacto", label: "Contacto", icon: "mail" },
];
const ALL_PAGES = [...LEFT_PAGES, ...RIGHT_PAGES];

export function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);

  function NavItem({ p }) {
    const isActive = current === p.id;
    return (
      <button
        className="tt-nav2-item"
        onClick={() => setCurrent(p.id)}
        style={{
          color: isActive ? TOKENS.azulOlaOscuro : TOKENS.conchaSuave,
          fontWeight: isActive ? 700 : 600,
        }}
      >
        <NavIcon name={p.icon} />
        {p.label}
      </button>
    );
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(195, 223, 233, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(160, 200, 215, 0.6)",
      }}
    >
      <div className="tt-nav2-bar">
        <div className="tt-nav2-group">
          {LEFT_PAGES.map((p) => (
            <NavItem key={p.id} p={p} />
          ))}
        </div>

        <div className="tt-nav2-logo-wrap">
          <button className="tt-nav2-logo" onClick={() => setCurrent("home")} aria-label="Ir a inicio">
            <img src={LOGO_URL} alt="Campamento La Habillal" />
          </button>
        </div>

        <div className="tt-nav2-group">
          {RIGHT_PAGES.map((p) => (
            <NavItem key={p.id} p={p} />
          ))}
        </div>

        <button
          className="tt-nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span style={{ display: "block", width: "20px", height: "2px", background: TOKENS.azulOlaOscuro, transition: "transform 0.2s ease", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: TOKENS.azulOlaOscuro, opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }} />
          <span style={{ display: "block", width: "20px", height: "2px", background: TOKENS.azulOlaOscuro, transition: "transform 0.2s ease", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      <nav className={`tt-nav-links${open ? " tt-nav-open" : ""}`} style={{ padding: open ? "10px 12px 16px" : 0 }}>
        {ALL_PAGES.map((p) => {
          const isActive = current === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setCurrent(p.id);
                setOpen(false);
              }}
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "13px",
                fontWeight: isActive ? 700 : 500,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: isActive ? TOKENS.azulOla : "transparent",
                color: isActive ? "#fff" : TOKENS.azulOlaOscuro,
              }}
            >
              <NavIcon name={p.icon} />
              {p.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

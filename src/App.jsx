import { useEffect, useState } from "react";
import { FONT_IMPORT, GLOBAL_STYLE, TOKENS, MAREA } from "./theme";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { PageHome } from "./pages/PageHome";
import { PageAbout } from "./pages/PageAbout";
import { PageConvocatorias } from "./pages/PageConvocatorias";
import { PageEventos } from "./pages/PageEventos";
import { PageVisita } from "./pages/PageVisita";
import { PageAdopta } from "./pages/PageAdopta";
import { PageDona } from "./pages/PageDona";
import { PageContacto } from "./pages/PageContacto";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { PagePrivacidad } from "./pages/PagePrivacidad";
import { startSmoothScroll, stopSmoothScroll, scrollToTop } from "./lib/smoothScroll";

function getInitialPage() {
  const path = window.location.pathname.replace(/^\//, "").toLowerCase();
  if (path === "dona/exito") return "donation-success";
  if (path === "adopta/exito") return "adoption-success";
  const valid = ["home", "about", "convocatorias", "eventos", "visita", "adopta", "dona", "contacto", "privacidad"];
  return valid.includes(path) ? path : "home";
}

function pathForPage(page) {
  switch (page) {
    case "home": return "/";
    case "donation-success": return "/dona/exito";
    case "adoption-success": return "/adopta/exito";
    default: return `/${page}`;
  }
}

const SITE_TITLE = 'Campamento Tortuguero "El Habillal" A.C.';
const PAGE_TITLES = {
  home: SITE_TITLE,
  about: `Nosotros — ${SITE_TITLE}`,
  convocatorias: `Convocatorias — ${SITE_TITLE}`,
  eventos: `Eventos y Memoria — ${SITE_TITLE}`,
  visita: `Visítanos — ${SITE_TITLE}`,
  adopta: `Adopta un Nido — ${SITE_TITLE}`,
  dona: `Dona — ${SITE_TITLE}`,
  contacto: `Contacto — ${SITE_TITLE}`,
  privacidad: `Aviso de privacidad — ${SITE_TITLE}`,
  "donation-success": `Donativo Confirmado — ${SITE_TITLE}`,
  "adoption-success": `Adopción Confirmada — ${SITE_TITLE}`,
};

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  useEffect(() => {
    const onPopState = () => setPage(getInitialPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[page] || SITE_TITLE;
  }, [page]);

  const go = (nextPage) => {
    setPage(nextPage);
    const path = pathForPage(nextPage);
    if (window.location.pathname !== path) {
      window.history.pushState({ page: nextPage }, "", path);
    }
    scrollToTop();
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <PageHome go={go} />;
      case "about": return <PageAbout />;
      case "convocatorias": return <PageConvocatorias go={go} />;
      case "eventos": return <PageEventos />;
      case "visita": return <PageVisita />;
      case "adopta": return <PageAdopta />;
      case "dona": return <PageDona />;
      case "contacto": return <PageContacto />;
      case "privacidad": return <PagePrivacidad />;
      case "donation-success": return <PaymentSuccessPage type="donation" />;
      case "adoption-success": return <PaymentSuccessPage type="adoption" />;
      default: return null;
    }
  };

  const getFooterFromColor = () => {
    switch (page) {
      case "home": return MAREA.arena;
      case "about": return TOKENS.espuma;
      case "convocatorias": return TOKENS.cieloClaro;
      case "eventos": return TOKENS.espuma;
      case "visita": return TOKENS.espuma;
      case "adopta": return TOKENS.noche;
      case "dona": return TOKENS.espuma;
      case "contacto": return TOKENS.cieloClaro;
      default: return TOKENS.arena;
    }
  };

  return (
    <div style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <style>{GLOBAL_STYLE}</style>
      <Nav current={page === "donation-success" ? "dona" : page === "adoption-success" ? "adopta" : page} setCurrent={go} />
      {/* El menú flota sobre el hero del Home; en las demás páginas reservamos su espacio */}
      {page !== "home" && <div aria-hidden="true" style={{ height: 78, background: MAREA.abismo }} />}
      {renderPage()}
      <Footer go={go} fromColor={getFooterFromColor()} />
    </div>
  );
}

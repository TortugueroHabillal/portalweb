import { lazy, Suspense, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { PageHome } from "./pages/PageHome";
import { scrollToTop } from "./lib/smoothScroll";

/* El Home carga de inmediato; el resto de páginas se descarga solo cuando se visita. */
const lazyPage = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const PageAbout = lazyPage(() => import("./pages/PageAbout"), "PageAbout");
const PageConvocatorias = lazyPage(() => import("./pages/PageConvocatorias"), "PageConvocatorias");
const PageEventos = lazyPage(() => import("./pages/PageEventos"), "PageEventos");
const PageVisita = lazyPage(() => import("./pages/PageVisita"), "PageVisita");
const PageAdopta = lazyPage(() => import("./pages/PageAdopta"), "PageAdopta");
const PageDona = lazyPage(() => import("./pages/PageDona"), "PageDona");
const PageContacto = lazyPage(() => import("./pages/PageContacto"), "PageContacto");
const PaymentSuccessPage = lazyPage(() => import("./pages/PaymentSuccessPage"), "PaymentSuccessPage");
const PagePrivacidad = lazyPage(() => import("./pages/PagePrivacidad"), "PagePrivacidad");

/* Páginas que todavía no tienen su propio hero bajo el menú fijo */
const NEEDS_NAV_SPACE = ["privacidad", "donation-success", "adoption-success"];

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
      case "about": return <PageAbout go={go} />;
      case "convocatorias": return <PageConvocatorias go={go} />;
      case "eventos": return <PageEventos go={go} />;
      case "visita": return <PageVisita />;
      case "adopta": return <PageAdopta />;
      case "dona": return <PageDona go={go} />;
      case "contacto": return <PageContacto />;
      case "privacidad": return <PagePrivacidad />;
      case "donation-success": return <PaymentSuccessPage type="donation" />;
      case "adoption-success": return <PaymentSuccessPage type="adoption" />;
      default: return null;
    }
  };


  return (
    <>
      <Nav current={page === "donation-success" ? "dona" : page === "adoption-success" ? "adopta" : page} setCurrent={go} />
      {NEEDS_NAV_SPACE.includes(page) && <div className="nav-space" aria-hidden="true" />}
      <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>{renderPage()}</Suspense>
      <Footer go={go} />
    </>
  );
}

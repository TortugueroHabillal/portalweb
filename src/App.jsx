import { useState } from "react";
import { FONT_IMPORT, GLOBAL_STYLE, TOKENS } from "./theme";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { FinalCTA } from "./components/FinalCTA";
import { PageHome } from "./pages/PageHome";
import { PageAbout } from "./pages/PageAbout";
import { PageConvocatorias } from "./pages/PageConvocatorias";
import { PageEventos } from "./pages/PageEventos";
import { PageVisita } from "./pages/PageVisita";
import { PageAdopta } from "./pages/PageAdopta";
import { PageDona } from "./pages/PageDona";
import { PageContacto } from "./pages/PageContacto";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";

export default function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\//, "").toLowerCase();
    if (path === "dona/exito") return "donation-success";
    if (path === "adopta/exito") return "adoption-success";
    const valid = ["home", "about", "convocatorias", "eventos", "visita", "adopta", "dona", "contacto"];
    return valid.includes(path) ? path : "home";
  };

  const [page, setPage] = useState(getInitialPage);

  const renderPage = () => {
    switch (page) {
      case "home": return <PageHome go={setPage} />;
      case "about": return <PageAbout />;
      case "convocatorias": return <PageConvocatorias go={setPage} />;
      case "eventos": return <PageEventos />;
      case "visita": return <PageVisita />;
      case "adopta": return <PageAdopta />;
      case "dona": return <PageDona />;
      case "contacto": return <PageContacto />;
      case "donation-success": return <PaymentSuccessPage type="donation" />;
      case "adoption-success": return <PaymentSuccessPage type="adoption" />;
      default: return null;
    }
  };

  const getFooterFromColor = () => {
    switch (page) {
      case "home": return TOKENS.cieloClaro;
      case "about": return TOKENS.arena;
      case "convocatorias": return TOKENS.arena;
      case "eventos": return TOKENS.arena;
      case "visita": return "#D4E7D7";
      case "adopta": return TOKENS.arena;
      case "dona": return TOKENS.arena;
      case "contacto": return TOKENS.cieloClaro;
      default: return TOKENS.arena;
    }
  };

  return (
    <div style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{FONT_IMPORT}</style>
      <style>{GLOBAL_STYLE}</style>
      <Nav current={page === "donation-success" ? "dona" : page === "adoption-success" ? "adopta" : page} setCurrent={setPage} />
      {renderPage()}
      {page === "home" && <FinalCTA go={setPage} />}
      <Footer go={setPage} fromColor={getFooterFromColor()} />
    </div>
  );
}

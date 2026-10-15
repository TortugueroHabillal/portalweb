import { HomeHero } from "../components/home/HomeHero";
import { VideoReveal } from "../components/home/VideoReveal";
import { GlyphPortal } from "../components/home/GlyphPortal";
import { AdoptaFeature } from "../components/home/AdoptaFeature";
import { ImpactSection } from "../components/home/ImpactSection";
import { ActionsGallery } from "../components/home/ActionsGallery";
import { ChangeCTA } from "../components/home/ChangeCTA";
import { VisitStrip } from "../components/home/VisitStrip";
import { useEffect } from "react";
import { snapToSections } from "../lib/smoothScroll";

/* Home «Marea viva»:
   Hero → Video que se expande → Portal ADOPTA → Adopta → Impacto
   → Galería 4 acciones → Tú haces el cambio → Visítanos → footer */
export function PageHome({ go }) {
  // Al detenerse cerca del inicio de una sección, el scroll la completa
  useEffect(() => snapToSections(), []);

  return (
    <main>
      <HomeHero go={go} />
      <VideoReveal go={go} />
      <GlyphPortal />
      <AdoptaFeature go={go} />
      <ImpactSection go={go} />
      <ActionsGallery />
      <ChangeCTA go={go} />
      <VisitStrip go={go} />
    </main>
  );
}

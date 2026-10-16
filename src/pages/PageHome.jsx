import { useEffect } from "react";
import { HomeHero } from "../components/home/HomeHero";
import { Problem } from "../components/home/Problem";
import { Who } from "../components/home/Who";
import { Work } from "../components/home/Work";
import { Proof } from "../components/home/Proof";
import { Allies } from "../components/home/Allies";
import { Species } from "../components/home/Species";
import { Shore } from "../components/home/Shore";
import { TakeAction } from "../components/home/TakeAction";
import { snapToSections } from "../lib/smoothScroll";

/* Home claro: el viaje del nido al mar.
   El fondo pasa de arena a azul profundo conforme se baja. Primero se
   demuestra por qué vale la pena ayudar (problema → respuesta → pruebas →
   especies → la orilla) y al final se pide (adopta / dona / visita). */
export function PageHome({ go }) {
  // Al detenerse cerca del inicio de una sección, el scroll la completa
  useEffect(() => snapToSections(), []);

  return (
    <main className="lt-home">
      <HomeHero go={go} />
      <Problem />
      <Who />
      <Work />
      <Proof />
      <Allies />
      <Species go={go} />
      <Shore />
      <TakeAction go={go} />
    </main>
  );
}

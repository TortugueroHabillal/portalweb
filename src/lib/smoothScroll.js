import Lenis from "lenis";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";

/* Scroll suave para todo el sitio (Lenis). Se desactiva si el visitante
   pidió reducir el movimiento. Las animaciones de motion siguen leyendo el
   scroll nativo, así que funcionan igual. */
let lenis = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return lenis;
  lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 1.05 });
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export const getLenis = () => lenis;

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

/* Imanta el scroll al inicio de los elementos [data-snap] cuando el visitante
   se detiene cerca (dentro del 30% de la pantalla). Solo llevan imán las
   secciones que NO vienen justo después de una sección fija larga (video,
   portal, galería): ahí el imán jalaría hacia abajo a quien quiere regresar.
   Devuelve la función de limpieza. */
export function snapToSections(root = document) {
  // Los efectos de los hijos corren antes que los de App: arrancamos Lenis aquí también
  if (!startSmoothScroll()) return () => {};
  const snap = new Snap(lenis, { type: "proximity", distanceThreshold: "30%", duration: 0.8, debounce: 450 });
  root.querySelectorAll("[data-snap]").forEach((el) => snap.addElement(el, { align: ["start"] }));
  return () => snap.destroy();
}

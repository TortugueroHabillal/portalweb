/* Encuadre automático por secciones con el scroll-snap nativo del navegador.
   Cada sección del Home mide una pantalla y el navegador la alinea solo al
   detenerse, con rueda, trackpad o dedo (más fiable que hacerlo con JS).
   Se activa solo en el Home: agrega la clase `snap-home` al <html>. */
export function snapToSections() {
  const html = document.documentElement;
  html.classList.add("snap-home");
  return () => html.classList.remove("snap-home");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

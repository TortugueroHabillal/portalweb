/* Rutas de los medios del Home.
   Las versiones optimizadas viven en public/home/; los originales pesados
   en originales/ (fuera de git). */
const h = (name) => `/home/${name}`;
const f = (name) => `/home/fotos/${name}.webp`;

export const HOME_MEDIA = {
  logo: h("logo-habillal.webp"),
  aliados: h("aliados.webp"),
  video: h("video-liberacion.mp4"),
  videoPoster: h("video-liberacion-poster.jpg"),

  // Especies (recortes sin fondo, vistos de lado)
  golfina: h("golfina.webp"),
  negra: h("negra-h.webp"),
  laud: h("laud.webp"),

  // Fotos
  criasOrilla: f("crias-orilla"),
  golfinaNoche: f("hero-golfina"),
  patrullamos: f("patrullamos"),
  reubicamos: f("reubicamos"),
  liberamos: f("liberamos"),
  educamos: f("educamos"),
  criaLaud: f("cria-laud"),
  donaCria: f("dona-cria"),
  visitantes: f("visitantes"),
};

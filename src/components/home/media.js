/* Rutas de los medios del Home rediseñado.
   Las versiones optimizadas viven en public/home/; los originales pesados
   en originales/ (fuera de git). */
const h = (name) => `/home/${name}`;
const f = (name) => `/home/fotos/${name}.webp`;

export const HOME_MEDIA = {
  logo: h("logo-habillal.webp"),
  golfina: h("golfina.webp"),
  laud: h("laud.webp"),
  negra: h("negra.webp"),
  laudCria: h("laud-cria.webp"),
  manoGolfina: h("mano-golfina.webp"),
  video: h("video-liberacion.mp4"),
  videoPoster: h("video-liberacion-poster.jpg"),

  campAerial: f("campamento-aereo"),
  visitantes: f("visitantes"),
  adoptaNido: f("adopta-nido"),
  donaCria: f("dona-cria"),

  educamos: f("educamos"),
  patrullamos: f("patrullamos"),
  reubicamos: f("reubicamos"),
  liberamos: f("liberamos"),

  criaLaud: f("cria-laud"),
  corral: f("corral"),
  golfinaArena: f("golfina-arena"),
  liberacionEscuelas: f("liberacion-escuelas"),
  tortugaNegra: f("tortuga-negra"),
  primerosPasos: f("primeros-pasos"),
};

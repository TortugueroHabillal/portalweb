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

  // Especies: fotos reales
  especies: {
    golfina: "/home/especies/golfina.webp",
    negra: "/home/especies/negra.webp",
    laud: "/home/especies/laud.webp",
  },

  // Recortes sin fondo (ya no se usan en el Home)
  golfina: h("golfina.webp"),
  negra: h("negra-h.webp"),
  laud: h("laud.webp"),

  // Fotos
  criasOrilla: f("crias-orilla"),
  golfinaNoche: f("negra-playa"),
  donaCrias: f("dona-crias"),
  patrullamos: f("patrullamos"),
  reubicamos: f("reubicamos"),
  liberamos: f("liberamos"),
  educamos: f("educamos"),
  criaLaud: f("cria-laud"),
  donaCria: f("dona-cria"),
  visitantes: f("visitantes"),
};

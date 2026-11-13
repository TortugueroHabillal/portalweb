/* ============================================================
   SISTEMA DE DISEÑO — Campamento Tortuguero La Habillal
   Paleta: arena / noche marina / verde tortuga / coral tierra
           + azul cielo y azul ola (acento marino/costero)
   Tipografía: Fraunces (display) + Public Sans (cuerpo)
   ============================================================ */

export const LOGO_URL = "/logo-el-habillal.png";

/* Fuentes: se cargan en index.html (Public Sans y Fraunces para el certificado). */

export const TOKENS = {
  arena: "#EDE6D6",
  arenaOscura: "#E1D6BE",
  noche: "#10262B",
  nocheClara: "#1B3A41",
  verde: "#4C6B4F",
  verdeOscuro: "#374F3A",
  coral: "#BE6A4A",
  coralOscuro: "#A2573B",
  espuma: "#DCEAE3",
  concha: "#2B2620",
  conchaSuave: "#5B554A",
  // acento marino / azul claro
  cielo: "#BFE1EA",
  cieloClaro: "#EAF5F8",
  cieloOscuro: "#8FC2D1",
  azulOla: "#3E7C93",
  azulOlaOscuro: "#2C5C6D",
  // acento de choque — reservado para CTAs y remarcados importantes, nunca para vectores decorativos
  atardecer: "#E2531F",
  atardecerOscuro: "#A63C15",
  // verde marino — variación de acento para vectores/acentos decorativos, sin recurrir al naranja
  verdeMar: "#1F6F5C",
  verdeMarOscuro: "#175747",
};

/* ---------- Paleta del tema claro (rediseño 2026) ----------
   El Home va de arena a azul profundo, como el viaje del nido al mar.
   
*/
export const MAREA = {
  arena: "#F5EEE0",     // inicio, fondos cálidos
  espuma: "#EAF6F4",    // fondos claros
  agua: "#D5EEF2",
  celeste: "#BFE6EE",   // color principal claro
  azul: "#2FB3C6",      // azul del logo: botones y acentos
  mar: "#136C80",
  profundo: "#0E4A5A",  // solo al final
  tinta: "#0F2E36",     // texto
  naranja: "#E2531F",   // solo Adopta / Dona
};

/* ---------- Escala de espaciado (padding/margin de secciones) ----------
   Usar siempre uno de estos valores en vez de números sueltos.
*/
export const SPACE = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 96,
};

/* ---------- Escala de radios (solo 3 valores en todo el sitio) ----------
   none  -> fotos/recortes editoriales (sin esquinas redondeadas)
   card  -> tarjetas, contenedores, inputs
   pill  -> botones y etiquetas tipo cápsula
*/
export const RADIUS = {
  none: 0,
  card: 16,
  pill: 999,
};

/* ---------- Alternancia de fondo de sección (2 tonos casi-blancos, sin hex sueltos) ----------
   Cada sección de página elige "claro" o "arena" y se alternan en el orden en que aparecen.
*/
export const SECTION_BG = {
  claro: "#EAF5F8", // = cieloClaro
  arena: "#EDE6D6", // = arena
};

/* ---------- Material real del campamento (fotos y video subidos a /public) ---------- */
const p = (name) => encodeURI(`/${name}`);

export const IMAGES = {
  // especies — tortugas adultas
  turtleCloseup: p("golfinacloseup.jpeg"),
  turtleInfrared: p("golfinainfrarrojo.jpeg"),
  turtleOnBeach: p("tortuganegraenplaya.jpg"),
  turtleFrontal: p("WhatsApp Image 2026-05-24 at 11.49.17 PM.jpeg"),
  turtleDusk: p("WhatsApp Image 2026-03-24 at 9.50.06 PM.jpeg"),
  turtleSunrise: p("WhatsApp Image 2026-09-12 at 7.13.56 PM (1).jpeg"),
  tortufes2edCria: p("tortufest_2ed_crias.jpeg"),
  laudcria: p("laudcria.jpeg"),
  laud: p("laud.jpeg"),

  // especies — crías (variedad amplia, evitar repetir)
  hatchlingCoconut: p("tortunegracriaencoco.jpeg"),
  hatchlingCoconut2: p("WhatsApp Image 2026-05-24 at 11.39.07 PM (1).jpeg"),
  hatchlingLeatherback: p("WhatsApp Image 2026-09-12 at 7.13.56 PM (2).jpeg"),
  hatchlingDuskWalk: p("WhatsApp Image 2024-12-06 at 6.13.22 AM (1).jpeg"),
  hatchlingSilhouetteSingle: p("criacloseup.jpg"),
  hatchlingLeatherbackProfile: p("criamar2.jpeg"),
  hatchlingLeatherbackMacro: p("criamar4.jpeg"),
  liberacionSunsetPeople: p("crias.jpeg"),
  hatchlingsMarker: p("crias2.jpg"),
  hatchlingsMassSunset: p("crias3.jpg"),
  hatchlingsToWaves: p("criasmar.jpg"),
  herohero: p("criamar4.jpeg"),
  hatchlingsBucket: p("criasmonton.jpeg"),
  criasAtardecer: p("criasatardecer.jpeg"),
  liberacionCrowd: p("liberacioncrias.jpeg"),
  liberacionCrowd2: p("liberacioncrias1.jpeg"),

  // conservación — nidos y corral de incubación
  nestEggsLaud: p("nidolaud.jpeg"),
  nestEggsHole: p("nido.jpeg"),
  nestEggsHole2: p("WhatsApp Image 2026-05-26 at 10.52.29 PM (1).jpeg"),
  nestEggsGeneric: p("nidotortu.jpeg"),
  corralNidos: p("corralnidos.jpeg"),
  corralNidosAmplio: p("corrar1.jpeg"),
  tortu1: p("tortu1.jpg"),
  tortus: p("tortus.jpg"),

  // equipo — para Nosotros y Contacto
  teamEntrance: p("equipo3.jpg"),
  teamFieldwork: p("equipo1.jpg"),
  teamFilming: p("equipo2.jpeg"),
  teamDigging: p("equipo4.jpeg"),
  teamEquipment: p("equipomotos.jpeg"),
  teamNesting: p("equipo7.jpg"),
  // comunidad / visitantes
  touristsSunsetRelease: p("grupoturista2.jpeg"),
  nightPatrolTeam: p("grupoturistico.jpeg"),
  tourists1: p("turistas2.jpg"),
  adoptado1: p("adopta1.jpg"),
  // campamento — vistas aéreas
  campAerial: p("vista_aerea_camp.jpeg"),
  campAerial2: p("WhatsApp Image 2026-09-13 at 12.58.16 AM.jpeg"),

  // reconocimientos y documentos
  certificadoSemarnat: p("certificado.jpeg"),
  practicasFlyer: p("practicas_cartel.jpeg"),

  // TortuFest — 1ra edición
  tortufest1edArtexpo: p("tortufest_1ed_artexpo.jpeg"),
  tortufest1edEscolta: p("tortufest_1ed_escolta.jpeg"),
  tortufest1edExpo: p("tortufest_1ed_expo.jpeg"),
  tortufest1edPlatica: p("tortufest_1ed_platica.webp"),
  tortufest1edSpeech: p("tortufest_1ed_speech.jpeg"),

  // TortuFest — 2da edición
  tortufest2edCartel: p("tortufest_2ed_cartel.jpeg"),
  tortufest2ed1: p("tortufest_2ed_1.jpeg"),
  tortufest2edGroup: p("tortufest_2ed_group.webp"),
  tortufest2edAdminspeech: p("tortufest_2ed_adminspeech.jpeg"),
  tortufest2edBaile1: p("tortufest_2ed_baile1.jpeg"),
  tortufest2edBaile2: p("tortufest_2ed_baile2.jpeg"),

  // Rodada El Habillal
  rodadaGroup: p("rodada2.jpeg"),
  rodadaBicis: p("rodadabicis1.jpeg"),

  // Encuentro por la Conservación de las Tortugas — Hutchison Ports LCT
  hutchinsonFamily: p("hutchinson_encuentro1.jpeg"),
  hutchinsonLine: p("hutchinson2.jpeg"),
  hutchinsonBikes: p("hutchinson3.jpeg"),
  hutchinsonHatchling: p("hutchinson4.jpeg"),

  // SPONSORS
  sponsors: p("sponsors.png")
};

export const VIDEOS = {
  hero: p("hero6.mp4"),
  golfinaLayingEggs: p("golfinaponehuevos.mp4"),
  laudNesting: p("laudcavandonido.mp4"),
  laudReturn: p("laudvueltaalmar.mp4"),
  golfinaSunset: p("golfinasunset.mp4")
};

/* ============================================================
   ANIMACIÓN GLOBAL — keyframes + utilidades responsivas + prefers-reduced-motion
   ============================================================ */


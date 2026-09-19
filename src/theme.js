/* ============================================================
   SISTEMA DE DISEÑO — Campamento Tortuguero La Habillal
   Paleta: arena / noche marina / verde tortuga / coral tierra
           + azul cielo y azul ola (acento marino/costero)
   Tipografía: Fraunces (display) + Public Sans (cuerpo)
   ============================================================ */

export const LOGO_URL = "/logo-el-habillal.png";

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Public+Sans:wght@400;500;600;700&display=swap');`;

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
  tortufest1edPlatica: p("tortufest_1ed_platica.jpeg"),
  tortufest1edSpeech: p("tortufest_1ed_speech.jpeg"),

  // TortuFest — 2da edición
  tortufest2edCartel: p("tortufest_2ed_cartel.jpeg"),
  tortufest2ed1: p("tortufest_2ed_1.jpeg"),
  tortufest2edGroup: p("tortufest_2ed_group.jpeg"),
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
export const GLOBAL_STYLE = `
  @keyframes ttFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ttFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ttFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes ttFloatSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(1.5deg); } }
  @keyframes ttPulseRing { 0% { box-shadow: 0 0 0 0 rgba(62,124,147,0.35); } 70% { box-shadow: 0 0 0 14px rgba(62,124,147,0); } 100% { box-shadow: 0 0 0 0 rgba(62,124,147,0); } }
  @keyframes ttWaveScroll { from { transform: translateX(0); } to { transform: translateX(-1200px); } }
  @keyframes ttDriftX { 0%, 100% { transform: translateX(0) rotate(-4deg); } 50% { transform: translateX(26px) rotate(2deg); } }
  @keyframes ttCrawl {
    0% { left: -18%; transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-6px) rotate(2deg); }
    100% { left: 112%; transform: translateY(0) rotate(-2deg); }
  }
  .tt-wave-scroll { animation: ttWaveScroll 18s linear infinite; }
  .tt-turtle-drift { animation: ttDriftX 14s ease-in-out infinite; }
  .tt-turtle-crawl { position: absolute; left: -18%; animation: ttCrawl 28s linear infinite; }

  /* Brazada de aletas — pequeña rotación de vaivén alrededor del punto de apoyo de cada aleta */
  @keyframes ttFlipperStroke { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
  .tt-flipper { transform-origin: 0 0; animation: ttFlipperStroke 0.9s ease-in-out infinite; }
  .tt-flipper-back { animation-duration: 0.9s; }

  .tt-photo-zoom { cursor: pointer; }
  .tt-photo-zoom .tt-photo-media { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
  .tt-photo-zoom:hover .tt-photo-media { transform: scale(1.08); }

  .tt-carousel-wrap { position: relative; min-width: 0; max-width: 100%; }
  .tt-carousel-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; padding: 4px 4px 12px; min-width: 0; max-width: 100%; }
  .tt-carousel-track::-webkit-scrollbar { display: none; }
  .tt-carousel-item { scroll-snap-align: start; flex: 0 0 auto; }

  /* evita que las columnas de grid/flex se estiren al ancho del contenido interno (rompe la página) */
  .tt-event-grid, .tt-event-grid > *,
  .tt-cols-2 > *, .tt-cols-3 > *, .tt-cols-4 > *,
  .tt-proximo-grid > *, .tt-hero-grid > *,
  .tt-mgrid > *, .tt-mosaic > *, .tt-diamond-cluster > * {
    min-width: 0;
    max-width: 100%;
  }
  .tt-carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; background: rgba(16,38,43,0.72); color: #fff; font-size: 18px; line-height: 1; display: flex; align-items: center; justify-content: center; z-index: 3; transition: background 0.2s ease, transform 0.2s ease; }
  .tt-carousel-btn:hover { background: rgba(16,38,43,0.92); }
  .tt-carousel-prev { left: -6px; }
  .tt-carousel-next { right: -6px; }
  @media (max-width: 640px) {
    .tt-carousel-prev { left: -2px; }
    .tt-carousel-next { right: -2px; }
  }

  .tt-cols-2-top { align-items: start; }

  /* Nav — estilo revista: dos grupos de icono+etiqueta flanqueando el logo central */
  .tt-nav-toggle { display: none; }
  .tt-nav2-bar { display: flex; align-items: center; justify-content: center; padding: 4px 8px; position: relative; }
  .tt-nav2-group { display: flex; align-items: center; justify-content: space-evenly; flex: 1; min-width: 0; }
  .tt-nav2-item {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    padding: 10px 6px; background: none; border: none; cursor: pointer;
    font-family: 'Public Sans', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap;
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .tt-nav2-item:hover { transform: translateY(-2px); }
  .tt-nav2-logo-wrap { flex-shrink: 0; margin: 0 14px; }
  .tt-nav2-logo {
    height: 72px; width: auto; background: none; display: flex; align-items: center;
    justify-content: center; box-sizing: border-box; padding: 0; cursor: pointer;
    border: none; transition: transform 0.25s ease;
  }
  .tt-nav2-logo:hover { transform: scale(1.05); }
  .tt-nav2-logo img { height: 100%; width: auto; object-fit: contain; display: block; }
  .tt-nav-links { display: none; }
  @media (max-width: 880px) {
    .tt-nav-toggle { display: flex; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); }
    .tt-nav2-group { display: none; }
    .tt-nav2-logo { height: 52px; }
    .tt-nav-links {
      display: none; position: absolute; top: 100%; left: 0; right: 0;
      flex-direction: column; align-items: stretch; gap: 4px;
      max-height: calc(100vh - 72px);
      overflow-y: auto;
      box-sizing: border-box;
      background: #C3DFE9;
      box-shadow: 0 16px 28px -16px rgba(16,38,43,0.35);
      z-index: 30;
    }
    .tt-nav-links.tt-nav-open { display: flex; }
    .tt-nav-links button { width: 100%; text-align: left; box-sizing: border-box; }
  }

  /* Mosaico de fotos + redes (home) — auto-flow, se reacomoda solo sin salirse del marco */
  .tt-mosaic { display: grid; grid-template-columns: 1fr 1.2fr 1fr; grid-auto-rows: 160px; gap: 14px; overflow: hidden; }
  @media (max-width: 760px) {
    .tt-mosaic { grid-template-columns: 1fr 1fr 1fr; grid-auto-rows: 140px; }
  }
  @media (max-width: 560px) {
    .tt-mosaic { grid-template-columns: 1fr 1fr; grid-auto-rows: 130px; gap: 10px; }
  }

  /* Galería moderna en grid (sin carrusel) para eventos */
  .tt-mgrid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 170px; gap: 12px; overflow: hidden; }
  @media (max-width: 760px) {
    .tt-mgrid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 140px; }
  }
  @media (max-width: 480px) {
    .tt-mgrid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
    .tt-mgrid > * { grid-column: span 1 !important; grid-row: span 1 !important; }
  }

  /* Grid de formulario (2 columnas en escritorio) */
  .tt-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) {
    .tt-form-grid { grid-template-columns: 1fr; }
  }
  .tt-form-grid .tt-field-full { grid-column: 1 / -1; }

  .tt-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; position: relative; z-index: 1; }
  .tt-hero-bg { position: absolute; inset: 0; z-index: 0; }
  @media (max-width: 760px) {
    .tt-hero-bg { display: none; }
  }

  /* Hero de impacto — Split en escritorio (Texto izquierda en fondo azul + Foto derecha), apilado en móvil */
  .tt-hero-shock {
    position: relative;
    min-height: 480px;
    max-height: 640px;
    background: ${TOKENS.noche};
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: stretch;
    overflow: hidden;
  }
  .tt-hero-shock .tt-hero-shock-msg {
    position: relative;
    z-index: 2;
    padding: 32px 3vw 32px 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }
  .tt-hero-shock .tt-hero-shock-media {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
  }
  .tt-hero-shock .tt-hero-shock-media img,
  .tt-hero-shock .tt-hero-shock-media video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
    display: block;
  }
  /* Difumina el borde inferior de la foto hacia el tono del hero — evita el corte duro donde choca la ola divisora */
  .tt-hero-shock-fade {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 38%;
    background: linear-gradient(180deg, rgba(16,38,43,0) 0%, ${TOKENS.noche} 100%);
    pointer-events: none;
  }
  .tt-hero-buttons { display: flex; gap: 14px; flex-wrap: nowrap; align-items: center; }

  @media (max-width: 900px) {
    .tt-hero-shock {
      display: flex;
      flex-direction: column-reverse;
      min-height: calc(100vh - 70px);
      max-height: none;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
    .tt-hero-shock .tt-hero-shock-media {
      height: 220px;
      width: 100%;
      flex: none;
    }
    .tt-hero-shock .tt-hero-shock-media img,
    .tt-hero-shock .tt-hero-shock-media video {
      height: 220px;
      width: 100%;
      object-fit: cover;
    }
    .tt-hero-shock .tt-hero-shock-msg {
      padding: 18px 20px 24px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .tt-hero-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
    }
    .tt-hero-buttons button {
      width: 100%;
      padding: 13px 6px !important;
      font-size: 13.5px !important;
      text-align: center;
      white-space: nowrap;
      box-sizing: border-box;
    }
  }

  .tt-mgrid-half-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
  }
  @media (max-width: 600px) {
    .tt-mgrid-half-row {
      grid-template-columns: 1fr !important;
    }
  }

  /* About Us Intro Section — flush right on desktop, 100% full width on mobile */
  .tt-about-intro-grid {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 48px;
    align-items: center;
    max-width: 1400px;
    margin-left: auto;
    margin-right: 0;
    padding-right: 0;
  }
  .tt-about-intro-photo {
    width: 100%;
  }
  .tt-about-intro-photo img {
    border-radius: 0 !important;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 900px) {
    .tt-about-intro-grid {
      display: flex;
      flex-direction: column;
      margin: 0;
      width: 100%;
      gap: 24px;
    }
    .tt-about-intro-photo {
      width: 100%;
      margin: 0;
    }
    .tt-about-intro-photo img {
      border-radius: 0 !important;
    }
  }

  /* Collage de fotos cuadradas en diagonal (adopta) */
  .tt-square-collage { position: relative; min-height: 380px; }
  .tt-square-collage .tt-square-tile { position: absolute; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 40px -22px rgba(16,38,43,0.4); }
  .tt-square-collage .tt-square-blob { position: absolute; z-index: 0; border-radius: 48% 52% 46% 54% / 54% 46% 54% 46%; }
  @media (max-width: 760px) {
    .tt-square-collage { min-height: 280px; }
  }

  /* Barra de KPIs en una sola tarjeta blanca (adopta) */
  .tt-kpi-bar { display: flex; background: #fff; border-radius: 20px; box-shadow: 0 18px 40px -26px rgba(16,38,43,0.4); overflow: hidden; }
  .tt-kpi-bar > div { flex: 1; min-width: 0; box-sizing: border-box; text-align: center; padding: 22px 10px; border-left: 1px solid ${TOKENS.arenaOscura}; }
  .tt-kpi-bar > div:first-child { border-left: none; }
  @media (max-width: 640px) {
    .tt-kpi-bar { flex-wrap: wrap; border-radius: 16px; }
    .tt-kpi-bar > div { flex: 1 1 50%; min-width: 0; border-left: none; border-top: 1px solid ${TOKENS.arenaOscura}; }
    .tt-kpi-bar > div:nth-child(odd) { border-right: 1px solid ${TOKENS.arenaOscura}; }
    .tt-kpi-bar > div:nth-child(-n+2) { border-top: none; }
  }

  /* Carrusel Infinito de Sponsors */
  .tt-marquee-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 14px;
    border: 1px solid ${TOKENS.arenaOscura};
    background: #fff;
  }
  .tt-marquee-container.tt-marquee-full {
    border: none;
    border-radius: 0;
    background: transparent;
    max-width: 100vw;
  }
  .tt-marquee-track {
    display: flex;
    width: max-content;
    animation: ttSponsorMarquee 26s linear infinite;
  }
  .tt-marquee-track:hover {
    animation-play-state: paused;
  }
  .tt-marquee-track img {
    height: 140px;
    width: auto;
    object-fit: cover;
    object-position: center bottom;
    flex-shrink: 0;
    display: block;
  }
  @keyframes ttSponsorMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.3333%); }
  }

  /* Cuatro Frentes — Filas responsivas: cada pareja foto+texto se mantiene unida y alterna de lado */
  .tt-pillar-row { display: flex; align-items: center; justify-content: flex-start; gap: 44px; padding: 36px 0; border-top: 1px solid ${TOKENS.arenaOscura}; }
  .tt-pillar-row:first-child { border-top: none; }
  .tt-pillar-row.tt-pillar-align-right { justify-content: flex-end; }
  .tt-pillar-photo { flex: 0 0 420px; width: 420px; max-width: 100%; }
  .tt-pillar-body { flex: 0 1 480px; min-width: 0; max-width: 480px; }

  @media (max-width: 860px) {
    .tt-pillar-row, .tt-pillar-row.tt-pillar-align-right {
      flex-direction: column !important;
      align-items: center;
      justify-content: center !important;
      gap: 18px;
      padding: 24px 0;
      text-align: center;
    }
    .tt-pillar-photo { flex: none; width: 100%; }
    .tt-pillar-body { max-width: 100%; }
  }

  /* Variante compacta de Cuatro Frentes (reutilizada fuera de Home, ej. Dona) */
  .tt-pillar-row.tt-pillar-compact { gap: 24px; padding: 20px 0; }
  .tt-pillar-compact .tt-pillar-photo { flex: 0 0 200px; width: 200px; }
  .tt-pillar-compact .tt-pillar-body { max-width: 340px; }
  @media (max-width: 860px) {
    .tt-pillar-compact .tt-pillar-photo { width: 100%; }
    .tt-pillar-compact .tt-pillar-body { max-width: 100%; }
  }

  /* Especies del Habillal — Collage asimétrico de 4 secciones (golfina domina) */
  .tt-species-collage {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: 240px 240px;
    gap: 16px;
  }
  .tt-species-collage .tt-species-tile-main { grid-column: 1; grid-row: 1 / span 2; }
  .tt-species-collage .tt-species-tile-b { grid-column: 2; grid-row: 1; }
  .tt-species-collage .tt-species-tile-c { grid-column: 3; grid-row: 1; }
  .tt-species-collage .tt-species-tile-urgent { grid-column: 2 / span 2; grid-row: 2; }
  @media (max-width: 860px) {
    .tt-species-collage {
      grid-template-columns: 1fr;
      grid-template-rows: none;
    }
    .tt-species-collage .tt-species-tile-main,
    .tt-species-collage .tt-species-tile-b,
    .tt-species-collage .tt-species-tile-c,
    .tt-species-collage .tt-species-tile-urgent {
      grid-column: 1;
      grid-row: auto;
      height: 260px;
    }
  }

  /* Reglas de Visita — fotos asimétricas a un lado, lineamientos al otro */
  .tt-visita-reglas-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 32px; align-items: start; }
  @media (max-width: 860px) {
    .tt-visita-reglas-grid { grid-template-columns: 1fr; }
  }

  /* Galería de Visita — bento de 3 fotos (una grande + dos apiladas), mismo lenguaje que el collage de Especies */
  .tt-visita-gallery {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 200px 200px;
    gap: 16px;
  }
  .tt-visita-gallery .tt-visita-photo-main { grid-column: 1; grid-row: 1 / span 2; }
  .tt-visita-gallery .tt-visita-photo-b { grid-column: 2; grid-row: 1; }
  .tt-visita-gallery .tt-visita-photo-c { grid-column: 2; grid-row: 2; }
  @media (max-width: 760px) {
    .tt-visita-gallery {
      grid-template-columns: 1fr;
      grid-template-rows: none;
    }
    .tt-visita-gallery .tt-visita-photo-main,
    .tt-visita-gallery .tt-visita-photo-b,
    .tt-visita-gallery .tt-visita-photo-c {
      grid-column: 1;
      grid-row: auto;
      height: 240px;
    }
  }

  .tt-species-tile {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 14px 30px -18px rgba(16,38,43,0.35);
  }
  .tt-species-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }
  .tt-species-tile:hover img { transform: scale(1.08); }
  .tt-species-tile-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 18px;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(16,38,43,0) 40%, rgba(16,38,43,0.55) 75%, rgba(16,38,43,0.88) 100%);
    transition: background 0.35s ease;
  }
  .tt-species-tile:hover .tt-species-tile-overlay {
    background: linear-gradient(180deg, rgba(16,38,43,0.15) 0%, rgba(16,38,43,0.72) 55%, rgba(16,38,43,0.94) 100%);
  }
  .tt-species-tile-name {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.15;
  }
  .tt-species-tile-sci {
    font-family: 'Public Sans', sans-serif;
    font-style: italic;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    margin: 3px 0 0;
  }
  .tt-species-tile-fact {
    font-family: 'Public Sans', sans-serif;
    font-weight: 500;
    color: rgba(255,255,255,0.92);
    line-height: 1.5;
    margin: 8px 0 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, opacity 0.3s ease;
  }
  .tt-species-tile:hover .tt-species-tile-fact,
  .tt-species-tile:focus-within .tt-species-tile-fact {
    max-height: 140px;
    opacity: 1;
  }

  /* Cuatro Frentes — Grid Bento de 4 acciones con diseño asimétrico */
  .tt-frentes-bento-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 200px 200px;
    gap: 16px;
  }
  .tt-frentes-bento-grid .tt-frente-patrullajes {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
  .tt-frentes-bento-grid .tt-frente-reubicacion {
    grid-column: 1;
    grid-row: 2;
  }
  .tt-frentes-bento-grid .tt-frente-liberacion {
    grid-column: 2;
    grid-row: 2;
  }
  .tt-frentes-bento-grid .tt-frente-educacion {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
  }

  @media (max-width: 900px) {
    .tt-frentes-bento-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tt-frentes-bento-grid .tt-frente-bento-card,
    .tt-frentes-bento-grid .tt-frente-patrullajes,
    .tt-frentes-bento-grid .tt-frente-reubicacion,
    .tt-frentes-bento-grid .tt-frente-liberacion,
    .tt-frentes-bento-grid .tt-frente-educacion {
      display: block !important;
      grid-column: auto !important;
      grid-row: auto !important;
      width: 100% !important;
      height: 220px !important;
      min-height: 220px !important;
    }

    .tt-nextevent-section,
    .tt-theask-section {
      text-align: center;
    }
    .tt-nextevent-section p,
    .tt-theask-section p {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .tt-nextevent-buttons,
    .tt-theask-buttons {
      justify-content: center !important;
      align-items: center !important;
    }

    .tt-onu-impact-card {
      text-align: center !important;
      align-items: center !important;
    }
  }

  .tt-pillar-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px -16px rgba(16,38,43,0.28) !important;
  }
  .tt-pillar-card:hover img {
    transform: scale(1.06);
  }

  @media (max-width: 900px) {
    .tt-species-grid { grid-template-columns: 1fr; gap: 20px; }
  }

  .tt-vector-composition-outer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
  .tt-vector-composition-wrap {
    position: relative;
    width: 450px;
    height: 420px;
    margin: 0 auto;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  @media (max-width: 900px) {
    .tt-vector-composition-outer {
      height: 360px;
      margin-top: 15px;
    }
    .tt-vector-composition-wrap {
      transform: scale(0.82);
      transform-origin: center center;
    }
  }
  @media (max-width: 480px) {
    .tt-vector-composition-outer {
      height: 320px;
      margin-top: 20px;
    }
    .tt-vector-composition-wrap {
      transform: scale(0.70);
      transform-origin: center center;
    }
  }
  @media (max-width: 360px) {
    .tt-vector-composition-outer {
      height: 270px;
      margin-top: 15px;
    }
    .tt-vector-composition-wrap {
      transform: scale(0.62);
      transform-origin: center center;
    }
  }

  /* About Page Wave Split Layout Styles */
  .tt-about-wave-svg, .tt-about-desktop-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  .tt-about-mobile-wave, .tt-about-mobile-wave-sketch {
    display: none;
  }
  @media (max-width: 900px) {
    .tt-about-desktop-wave {
      display: none !important;
    }
    .tt-about-mobile-wave-sketch {
      display: block !important;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
  }

  .tt-cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
  .tt-cols-2-wide { grid-template-columns: 0.85fr 1.25fr; gap: 48px; }
  .tt-cols-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
  .tt-cols-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .tt-event-grid { display: grid; grid-template-columns: 0.9fr 1.6fr; gap: 28px; align-items: center; }
  .tt-proximo-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 40px; align-items: center; }
  .tt-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; }

  @media (max-width: 900px) {
    .tt-hero-grid, .tt-cols-2, .tt-cols-3, .tt-event-grid, .tt-proximo-grid, .tt-footer-grid { grid-template-columns: 1fr; }
    /* Grid de Formulario para Visitas y Contacto */
  .tt-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .tt-form-grid .tt-field-full {
    grid-column: 1 / span 2;
  }
  @media (max-width: 640px) {
    .tt-form-grid {
      grid-template-columns: 1fr !important;
    }
    .tt-form-grid .tt-field-full,
    .tt-form-grid > div {
      grid-column: 1 / span 1 !important;
    }
  }

  .tt-cols-4 { grid-template-columns: repeat(2, 1fr); }

    .tt-adopta-hero-action {
      display: flex !important;
      justify-content: center !important;
      width: 100% !important;
    }
    .tt-adopta-hero-note {
      text-align: center !important;
      width: 100% !important;
    }
  }

  .tt-faq-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    align-items: center;
  }
  @media (max-width: 860px) {
    .tt-faq-item {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    .tt-faq-item > div {
      order: unset !important;
    }
  }
  /* Asegura el centrado perfecto de botones y WhatsApp en dispositivos móviles */
  @media (max-width: 768px) {
    .tt-adopta-hero-action,
    .tt-btn-center-mobile,
    .tt-hero-buttons,
    button[type="submit"],
    a[href*="wa.me"] {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      text-align: center !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
  @media (max-width: 520px) {
    .tt-cols-4 { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

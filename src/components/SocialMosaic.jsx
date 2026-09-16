import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "./Reveal";
import { PhotoFrame } from "./PhotoFrame";

const FACEBOOK_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" fill="#fff"/></svg>
);
const INSTAGRAM_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="1.7"/><circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.7"/><circle cx="17.3" cy="6.7" r="1.1" fill="#fff"/></svg>
);
const TIKTOK_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 3c.4 2.2 1.9 3.7 4.2 3.9v2.6c-1.5 0-2.9-.4-4.2-1.3v6.6c0 3.3-2.4 5.5-5.4 5.5-2.9 0-5.3-2.2-5.3-5.4 0-3.1 2.6-5.4 5.6-5.3v2.7c-1.5-.1-2.8.9-2.8 2.6 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.8-1.3 2.8-3V3h2.5Z" fill="#fff"/></svg>
);

/* Reemplaza estos enlaces por las URL reales de cada red cuando estén disponibles. */
const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  tiktok: "#",
};

function SocialTile({ icon, network, handle, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        height: "100%",
        borderRadius: "14px",
        background: `linear-gradient(155deg, ${TOKENS.nocheClara} 0%, ${TOKENS.noche} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px 10px",
        textAlign: "center",
        boxSizing: "border-box",
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {icon}
      <div>
        <div style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: "11.5px", color: "#fff", letterSpacing: "0.02em" }}>
          {network}
        </div>
        <div style={{ fontFamily: "'Public Sans', sans-serif", fontSize: "10.5px", color: TOKENS.cielo, marginTop: "3px" }}>
          {handle}
        </div>
      </div>
    </a>
  );
}

/* ---------- Mosaico de fotos + redes sociales — auto-flow: se reacomoda solo en cualquier ancho, sin romper el marco ---------- */
export function SocialMosaic() {
  return (
    <div className="tt-mosaic">
      <Reveal delay={0}>
        <SocialTile icon={FACEBOOK_ICON} network="Facebook" handle='"Campamento Tortuguero El Habillal A.C."' href={SOCIAL_LINKS.facebook} />
      </Reveal>
      <Reveal delay={60}>
        <PhotoFrame shape="wide" tone="azul" src={IMAGES.criasAtardecer} style={{ height: "100%" }} />
      </Reveal>
      <Reveal delay={120}>
        <SocialTile icon={INSTAGRAM_ICON} network="Instagram" handle="@habillalcampamento" href={SOCIAL_LINKS.instagram} />
      </Reveal>

      <Reveal delay={180}>
        <PhotoFrame shape="wide" tone="verde" src={IMAGES.hatchlingsBucket} style={{ height: "100%" }} />
      </Reveal>
      <Reveal delay={240}>
        <SocialTile icon={TIKTOK_ICON} network="TikTok" handle="Tortuguero Habillal" href={SOCIAL_LINKS.tiktok} />
      </Reveal>
      <Reveal delay={300}>
        <PhotoFrame shape="wide" tone="coral" src={IMAGES.nestEggsLaud} style={{ height: "100%" }} />
      </Reveal>
    </div>
  );
}

import { TOKENS } from "../theme";

/* ---------- Marco de foto — placeholder editorial o foto real ----------
   shape: "portrait" | "arch" | "circle" | "wide"
   tone: "verde" | "noche" | "coral" | "arena" | "azul"
   src: si se pasa, muestra una foto real (guía) en vez del bloque de color
*/
export function PhotoFrame({ shape = "portrait", tone = "verde", note, crop, caption, src, video, vignette = true, hoverZoom, style }) {
  const toneMap = {
    verde: `linear-gradient(160deg, ${TOKENS.verde} 0%, ${TOKENS.verdeOscuro} 100%)`,
    noche: `linear-gradient(160deg, ${TOKENS.nocheClara} 0%, ${TOKENS.noche} 100%)`,
    coral: `linear-gradient(160deg, ${TOKENS.coral} 0%, ${TOKENS.coralOscuro} 100%)`,
    arena: `linear-gradient(160deg, ${TOKENS.arenaOscura} 0%, #cbbd98 100%)`,
    azul: `linear-gradient(160deg, ${TOKENS.azulOla} 0%, ${TOKENS.azulOlaOscuro} 100%)`,
  };
  const radius =
    shape === "circle"
      ? "50%"
      : shape === "arch"
      ? "160px 160px 8px 8px"
      : "0px";
  const aspect =
    shape === "circle" ? "1 / 1" : shape === "wide" ? "16 / 9" : shape === "arch" ? "3 / 4.2" : "4 / 5";
  const hasMedia = !!(src || video);
  const zoom = hoverZoom !== undefined ? hoverZoom : hasMedia;

  return (
    <div
      className={zoom ? "tt-photo-zoom" : undefined}
      style={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        aspectRatio: aspect,
        borderRadius: radius,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        boxSizing: "border-box",
        border: hasMedia ? "none" : `1.5px dashed ${tone === "arena" ? TOKENS.conchaSuave : "rgba(255,255,255,0.45)"}`,
        ...style,
      }}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          poster={src || undefined}
          className="tt-photo-media"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : src ? (
        <img
          src={src}
          alt=""
          className="tt-photo-media"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <>
          <div className="tt-photo-media" style={{ position: "absolute", inset: 0, background: toneMap[tone] }} />
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, opacity: 0.18 }}
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="20%" cy="30%" r="70" fill="white" />
            <circle cx="80%" cy="70%" r="100" fill="black" />
          </svg>
        </>
      )}
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 120% at 50% 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.32) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      {hasMedia ? null : (
        <div
          style={{
            position: "relative",
            padding: "10px 12px",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "11px",
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.92)",
            background: "rgba(0,0,0,0.24)",
            width: "100%",
          }}
        >
          <strong style={{ display: "block", fontSize: "10px", letterSpacing: "0.02em" }}>
            FOTO — {crop || "recorte sugerido"}
          </strong>
          {note && <span>{note}</span>}
        </div>
      )}
    </div>
  );
}

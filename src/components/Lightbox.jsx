import { PhotoFrame } from "./PhotoFrame";

/* ---------- Lightbox ---------- */
export function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(16,38,43,0.86)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "32px",
        animation: "ttFadeIn 0.25s ease",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "760px", width: "100%" }}>
        <PhotoFrame
          shape="wide"
          tone={item.tone}
          crop={item.crop}
          note={item.note}
          src={item.src}
          video={item.video}
          style={{ aspectRatio: "16 / 10" }}
        />
        {item.caption && (
          <p
            style={{
              marginTop: "16px",
              color: "#fff",
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {item.caption}
          </p>
        )}
        <button
          onClick={onClose}
          style={{
            marginTop: "16px",
            display: "block",
            marginInline: "auto",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "#fff",
            borderRadius: "999px",
            padding: "8px 22px",
            cursor: "pointer",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: "13px",
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { PhotoFrame } from "./PhotoFrame";
import { Lightbox } from "./Lightbox";

/* ---------- Galería en carrusel horizontal ---------- */
export function Gallery({ items }) {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 520), behavior: "smooth" });
  };

  return (
    <>
      <div className="tt-carousel-wrap">
        <div ref={trackRef} className="tt-carousel-track">
          {items.map((it, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className="tt-carousel-item"
              style={{ width: it.featured ? "420px" : "270px", height: "230px" }}
            >
              <div
                onClick={() => setActive(it)}
                style={{ height: "100%", borderRadius: "14px", overflow: "hidden", cursor: "pointer" }}
                role="button"
                aria-label={`Ver foto: ${it.caption || it.crop || ""}`}
              >
                <PhotoFrame
                  shape="wide"
                  tone={it.tone}
                  crop={it.crop}
                  note={it.note}
                  caption={it.caption}
                  src={it.src}
                  video={it.video}
                  style={{ height: "100%", borderRadius: 0 }}
                />
              </div>
            </Reveal>
          ))}
        </div>
        <button className="tt-carousel-btn tt-carousel-prev" onClick={() => scrollByPage(-1)} aria-label="Anterior">‹</button>
        <button className="tt-carousel-btn tt-carousel-next" onClick={() => scrollByPage(1)} aria-label="Siguiente">›</button>
      </div>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}

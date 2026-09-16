import { useState } from "react";
import { Reveal } from "./Reveal";
import { PhotoFrame } from "./PhotoFrame";
import { Lightbox } from "./Lightbox";

/* ---------- Galería moderna en grid — tamaños variados, sin carrusel, caption discreta ---------- */
export function MosaicGrid({ items }) {
  const [active, setActive] = useState(null);

  const regularItems = items.filter((it) => !it.halfWidth);
  const halfItems = items.filter((it) => it.halfWidth);

  return (
    <>
      <div className="tt-mgrid">
        {regularItems.map((it, i) => (
          <Reveal
            key={i}
            delay={i * 80}
            from={i % 2 === 0 ? "left" : "right"}
            distance={36}
            style={{
              gridColumn: it.fullWidth ? "1 / -1" : it.big ? "span 2" : "span 1",
              gridRow: it.big ? "span 2" : "span 1",
            }}
          >
            <div
              onClick={() => setActive(it)}
              style={{ position: "relative", height: "100%", borderRadius: 0, overflow: "hidden", cursor: "pointer" }}
              role="button"
              aria-label={`Ver foto: ${it.caption || ""}`}
            >
              <PhotoFrame shape="wide" tone={it.tone} src={it.src} style={{ height: "100%", borderRadius: 0 }} />
              {it.caption && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "8px 10px",
                    background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent)",
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: "11.5px",
                    color: "#fff",
                    pointerEvents: "none",
                  }}
                >
                  {it.caption}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {halfItems.length > 0 && (
        <div className="tt-mgrid-half-row">
          {halfItems.map((it, i) => (
            <Reveal
              key={i}
              delay={(regularItems.length + i) * 80}
              from={i % 2 === 0 ? "left" : "right"}
              distance={36}
              style={{ height: "170px" }}
            >
              <div
                onClick={() => setActive(it)}
                style={{ position: "relative", height: "100%", borderRadius: 0, overflow: "hidden", cursor: "pointer" }}
                role="button"
                aria-label={`Ver foto: ${it.caption || ""}`}
              >
                <PhotoFrame shape="wide" tone={it.tone} src={it.src} style={{ height: "100%", borderRadius: 0 }} />
                {it.caption && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "8px 10px",
                      background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent)",
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: "11.5px",
                      color: "#fff",
                      pointerEvents: "none",
                    }}
                  >
                    {it.caption}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}

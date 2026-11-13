import { useRef, useState } from "react";

/* Mazo de fotos: la de arriba se pasa con las flechas, el teclado o arrastrándola a un lado.
   Sin avance automático. La animación es CSS (.deck-card en pages-v8.css). */
export function PhotoDeck({ photos, label }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const drag = useRef(null);
  const many = photos.length > 1;
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  const onDown = (e) => {
    if (!many) return;
    drag.current = { x: e.clientX, t: performance.now() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => drag.current && setDx(e.clientX - drag.current.x);
  const onUp = (e) => {
    if (!drag.current) return;
    const d = e.clientX - drag.current.x;
    const v = Math.abs(d) / Math.max(1, performance.now() - drag.current.t);
    drag.current = null;
    setDx(0);
    if (Math.abs(d) > 90 || v > 0.5) next();
  };

  return (
    <div className="deck">
      <div
        className="deck-stack"
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Fotos: ${label}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
      >
        {order.map((idx, depth) => {
          const p = photos[idx];
          const top = depth === 0;
          return (
            <div
              key={idx}
              className={`deck-card${p.contain ? " contain" : ""}${top && dx ? " dragging" : ""}`}
              data-depth={Math.min(depth, 4)}
              style={{ zIndex: photos.length - depth, ...(top && dx ? { "--dx": `${dx}px` } : null) }}
              aria-hidden={!top}
              onPointerDown={top ? onDown : undefined}
              onPointerMove={top ? onMove : undefined}
              onPointerUp={top ? onUp : undefined}
              onPointerCancel={top ? onUp : undefined}
            >
              <img src={p.src} alt={top ? p.alt : ""} loading="lazy" decoding="async" draggable="false" />
            </div>
          );
        })}
      </div>
      {many && (
        <div className="deck-nav">
          <button type="button" onClick={prev} aria-label="Foto anterior">←</button>
          <span aria-live="polite">{order[0] + 1} / {photos.length}</span>
          <button type="button" onClick={next} aria-label="Foto siguiente">→</button>
        </div>
      )}
    </div>
  );
}

/* ---------- Silueta decorativa de tortuga — una sola pieza azul, sin patitas separadas ----------
   Un único <path> fusiona caparazón + aletas + cabeza, así nunca se ven "cortadas" al animarse.
*/
export function TurtleSilhouette({ size = 260, color = "rgba(62,124,147,0.14)", style, crawl = false }) {
  return (
    <svg
      viewBox="0 0 120 76"
      width={size}
      height={size * 0.63}
      className={crawl ? "tt-turtle-crawl" : undefined}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M60,6
           C68,6 74,11 76,17
           C86,12 98,16 99,25
           C110,24 118,32 112,40
           C118,48 110,56 99,55
           C98,64 86,68 76,63
           C74,69 68,74 60,74
           C52,74 46,69 44,63
           C34,68 22,64 21,55
           C10,56 2,48 8,40
           C2,32 10,24 21,25
           C22,16 34,12 44,17
           C46,11 52,6 60,6 Z"
      />
      <circle cx="105" cy="40" r="9" fill={color} />
    </svg>
  );
}

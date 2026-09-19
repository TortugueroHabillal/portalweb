/* ---------- Círculos decorativos — motivo vector reutilizable en toda la página, en variaciones de azul/verde ----------
   El naranja se reserva para CTAs y remarcados importantes, nunca para vectores decorativos.
*/
export function CircleVectors({ variant = "light" }) {
  const c1 = variant === "light" ? "rgba(62,124,147,0.14)" : "rgba(62,124,147,0.45)";
  const c2 = variant === "light" ? "rgba(76,107,79,0.16)" : "rgba(76,107,79,0.4)";
  const c3 = variant === "light" ? "rgba(191,225,234,0.6)" : "rgba(191,225,234,0.3)";
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
      <div style={{ position: "absolute", top: "-60px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: c1 }} />
      <div style={{ position: "absolute", bottom: "8%", left: "-70px", width: "180px", height: "180px", borderRadius: "50%", border: `2px solid ${c3}`, background: "transparent" }} />
      <div style={{ position: "absolute", top: "38%", left: "6%", width: "16px", height: "16px", borderRadius: "50%", background: c3 }} />
      <div style={{ position: "absolute", top: "18%", right: "18%", width: "10px", height: "10px", borderRadius: "50%", background: c2 }} />
      <div style={{ position: "absolute", bottom: "14%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", background: c2 }} />
    </div>
  );
}

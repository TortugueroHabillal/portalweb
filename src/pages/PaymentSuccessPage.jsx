import { useEffect, useState } from "react";
import { TOKENS } from "../theme";
import { getAdoptionCheckoutStatus, getDonationCheckoutStatus } from "../lib/payments";

function money(value, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(Number(value || 0) / 100);
}

export function PaymentSuccessPage({ type }) {
  const isDonation = type === "donation";
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) { setError("No encontramos la sesión de pago."); return undefined; }
    let active = true;
    let timer;
    let attempts = 0;
    const refresh = async () => {
      try {
        const value = await (isDonation ? getDonationCheckoutStatus(sessionId) : getAdoptionCheckoutStatus(sessionId));
        if (!active) return;
        setResult(value);
        const complete = value.payment_status === "PAID" && (isDonation || Boolean(value.nest_code));
        if (complete || attempts >= 20) return;
      } catch (requestError) {
        if (attempts >= 20 && active) setError(requestError.message);
      }
      attempts += 1;
      if (active) timer = window.setTimeout(refresh, 1500);
    };
    refresh();
    return () => { active = false; window.clearTimeout(timer); };
  }, [isDonation, sessionId]);

  const confirmed = result?.payment_status === "PAID" && (isDonation || Boolean(result?.nest_code));
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "56px 20px", background: TOKENS.espuma }}>
      <section style={{ width: "100%", maxWidth: "620px", padding: "clamp(26px, 5vw, 42px)", border: `1px solid ${confirmed ? TOKENS.verde : TOKENS.arenaOscura}`, borderRadius: "8px", background: "#fff", boxShadow: "0 24px 55px -35px rgba(16,38,43,.55)", textAlign: "center" }}>
        {confirmed ? <>
          <div aria-hidden="true" style={{ width: "54px", height: "54px", display: "grid", placeItems: "center", margin: "0 auto 18px", borderRadius: "50%", background: "#EAF6ED", color: TOKENS.verdeOscuro, fontSize: "28px", fontWeight: 900 }}>✓</div>
          <h1 style={{ margin: "0 0 10px", color: TOKENS.noche, fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 5vw, 38px)" }}>{isDonation ? "Donativo confirmado" : "Adopción confirmada"}</h1>
          <p style={{ margin: "0 0 22px", color: TOKENS.conchaSuave, lineHeight: 1.6 }}>{isDonation ? "Gracias por apoyar la conservación de las tortugas marinas." : "Gracias por acompañar la protección de un nido de esta temporada."}</p>
          {isDonation ? <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginBottom: "24px" }}>
            <Amount label="Cobrado" value={money(result.amount_minor, result.currency)} />
            <Amount label="Comisión" value={money(result.processor_fee_minor, result.currency)} />
            <Amount label="Neto percibido" value={money(result.net_amount_minor, result.currency)} strong />
          </div> : <div style={{ marginBottom: "24px", padding: "16px", borderRadius: "8px", background: "#F0F8F2" }}><span style={{ display: "block", color: TOKENS.conchaSuave, fontSize: "12px" }}>Nido asignado</span><strong style={{ display: "block", marginTop: "4px", color: TOKENS.verdeOscuro, fontSize: "34px" }}>#{result.nest_code}</strong></div>}
          <button type="button" onClick={() => window.location.replace(isDonation ? "/dona" : "/adopta")} style={{ width: "100%", maxWidth: "320px", padding: "13px 18px", border: 0, borderRadius: "8px", background: TOKENS.verdeOscuro, color: "#fff", fontWeight: 800, cursor: "pointer" }}>Volver a {isDonation ? "donaciones" : "adopciones"}</button>
        </> : <>
          <h1 style={{ margin: "0 0 10px", color: TOKENS.noche, fontFamily: "'Fraunces', serif", fontSize: "30px" }}>Confirmando tu pago</h1>
          <p role={error ? "alert" : "status"} style={{ margin: 0, color: error ? "#B42318" : TOKENS.conchaSuave }}>{error || "Stripe recibió la operación. Esperamos la confirmación segura del pago."}</p>
        </>}
      </section>
    </main>
  );
}

function Amount({ label, value, strong = false }) {
  return <div style={{ padding: "12px 6px", borderRadius: "6px", background: strong ? "#EAF6ED" : "#F8FAFC" }}><span style={{ display: "block", color: "#64748B", fontSize: "10px", fontWeight: 700 }}>{label}</span><strong style={{ display: "block", marginTop: "4px", color: strong ? "#285E3B" : "#0F172A", fontSize: "14px" }}>{value}</strong></div>;
}

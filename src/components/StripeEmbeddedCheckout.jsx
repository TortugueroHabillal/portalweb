import { useCallback, useRef } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TOKENS } from "../theme";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export function StripeEmbeddedCheckout({ checkoutKey, createClientSecret, onCancel }) {
  const createClientSecretRef = useRef(createClientSecret);
  createClientSecretRef.current = createClientSecret;
  const fetchClientSecret = useCallback(() => createClientSecretRef.current(), []);
  if (!stripePromise) {
    return <p role="alert" style={{ color: "#B42318", fontSize: "13px", fontWeight: 600 }}>La clave publicable de Stripe todavía no está configurada.</p>;
  }
  return (
    <div style={{ border: "1px solid #D8DEE9", borderRadius: "12px", background: "#fff", overflow: "hidden", boxShadow: "0 18px 45px -28px rgba(15,23,42,.45)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", padding: "15px 18px", borderBottom: "1px solid #E6E9EF", background: "#F8FAFC" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 700 }}>Procesado por</span>
          <strong style={{ color: "#635BFF", fontFamily: "Arial, sans-serif", fontSize: "19px", letterSpacing: 0 }}>stripe</strong>
        </div>
        <button type="button" onClick={onCancel} style={{ border: "1px solid #CBD5E1", borderRadius: "6px", background: "#fff", padding: "7px 10px", color: TOKENS.azulOlaOscuro, cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>Cambiar datos</button>
      </div>
      <div style={{ padding: "12px" }}>
        <EmbeddedCheckoutProvider key={checkoutKey} stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

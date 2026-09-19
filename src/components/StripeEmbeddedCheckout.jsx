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
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", padding: "0 2px 12px", borderBottom: `1px solid ${TOKENS.arenaOscura}`, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: TOKENS.conchaSuave, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Procesado por</span>
          <strong style={{ color: "#635BFF", fontFamily: "Arial, sans-serif", fontSize: "18px", letterSpacing: 0 }}>stripe</strong>
        </div>
        <button type="button" onClick={onCancel} style={{ border: "none", background: "none", padding: 0, color: TOKENS.azulOlaOscuro, cursor: "pointer", fontSize: "12.5px", fontWeight: 700, textDecoration: "underline" }}>Cambiar datos</button>
      </div>
      <div style={{ width: "100%" }}>
        <EmbeddedCheckoutProvider key={checkoutKey} stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

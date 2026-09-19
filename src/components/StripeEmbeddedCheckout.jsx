import { useCallback } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TOKENS } from "../theme";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export function StripeEmbeddedCheckout({ checkoutKey, createClientSecret, onCancel }) {
  const fetchClientSecret = useCallback(() => createClientSecret(), [createClientSecret]);
  if (!stripePromise) {
    return <p role="alert" style={{ color: "#B42318", fontSize: "13px", fontWeight: 600 }}>La clave publicable de Stripe todavía no está configurada.</p>;
  }
  return (
    <div style={{ border: `1px solid ${TOKENS.arenaOscura}`, borderRadius: "16px", background: "#fff", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 16px", borderBottom: `1px solid ${TOKENS.arenaOscura}`, background: "#FAFCFC" }}>
        <strong style={{ fontSize: "12px", color: TOKENS.noche }}>Pago seguro procesado por Stripe</strong>
        <button type="button" onClick={onCancel} style={{ border: 0, background: "transparent", color: TOKENS.azulOlaOscuro, cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>Cambiar datos</button>
      </div>
      <div style={{ padding: "8px" }}>
        <EmbeddedCheckoutProvider key={checkoutKey} stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

export function StripeCheckoutHeader() {
  return (
    <div className="stripe-checkout-heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "18px", paddingBottom: "14px", borderBottom: "1px solid #E2E8F0" }}>
      <strong style={{ color: "#0F172A", fontSize: "14px" }}>Pago en línea seguro</strong>
      <div aria-label="Pago procesado por Stripe" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#64748B", fontSize: "11px", fontWeight: 700 }}>Procesado por</span>
        <strong style={{ color: "#635BFF", fontFamily: "Arial, sans-serif", fontSize: "19px", letterSpacing: 0 }}>stripe</strong>
      </div>
    </div>
  );
}

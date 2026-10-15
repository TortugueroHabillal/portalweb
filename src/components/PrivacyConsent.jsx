import { TOKENS } from "../theme";

/* ---------- Consentimiento del aviso de privacidad (LFPDPPP; RM-56, RD-04) ----------
   Se muestra en cada formulario que recaba datos personales. El formulario no se envía sin aceptarlo. */
export function PrivacyConsent({ checked, onChange, dark = false, id = "privacy-consent" }) {
  const color = dark ? TOKENS.espuma : TOKENS.conchaSuave;
  return (
    <label htmlFor={id} style={{ display: "flex", gap: "10px", alignItems: "flex-start", margin: "0 0 14px", fontFamily: "'Public Sans', sans-serif", fontSize: "13px", lineHeight: 1.5, color, cursor: "pointer" }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: TOKENS.verdeOscuro, flexShrink: 0 }}
      />
      <span>
        He leído y acepto el{" "}
        <a href="/privacidad" target="_blank" rel="noopener noreferrer" style={{ color: dark ? TOKENS.espuma : TOKENS.verdeOscuro, fontWeight: 700, textDecoration: "underline" }}>
          aviso de privacidad
        </a>
        . Solo usaremos tus datos para atender este trámite.
      </span>
    </label>
  );
}

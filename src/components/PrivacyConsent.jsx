/* ---------- Consentimiento del aviso de privacidad (LFPDPPP; RM-56, RD-04) ----------
   Se muestra en cada formulario que recaba datos personales. El formulario no se envía sin aceptarlo.
   Estilos en pages-v8.css (.consent); sobre fondo oscuro toma los colores claros solo. */
export function PrivacyConsent({ checked, onChange, id = "privacy-consent" }) {
  return (
    <label htmlFor={id} className="consent">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} required />
      <span>
        He leído y acepto el{" "}
        <a href="/privacidad" target="_blank" rel="noopener noreferrer">aviso de privacidad</a>
        . Solo usaremos tus datos para atender este trámite.
      </span>
    </label>
  );
}

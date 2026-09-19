const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");

async function callFunction(name, { method = "POST", body } = {}) {
  if (!SUPABASE_URL) throw new Error("El portal no tiene configurada la URL de pagos.");
  let response;
  try {
    response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("No pudimos conectar con la pasarela. Comprueba tu conexión e inténtalo nuevamente.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(paymentError(data.error));
  return data;
}

export async function createDonationCheckout(payload) {
  const data = await callFunction("create-donation-checkout", {
    body: { ...payload, request_id: crypto.randomUUID(), checkout_mode: "embedded", return_url: `${window.location.origin}/dona?checkout=complete&session_id={CHECKOUT_SESSION_ID}` },
  });
  if (!data.client_secret) throw new Error("Stripe no devolvió una sesión de pago válida.");
  return data.client_secret;
}

export async function createAdoptionCheckout(payload) {
  const data = await callFunction("create-adoption-checkout", {
    body: { ...payload, request_id: crypto.randomUUID(), checkout_mode: "embedded", return_url: `${window.location.origin}/adopta?checkout=complete&session_id={CHECKOUT_SESSION_ID}` },
  });
  if (!data.client_secret) throw new Error("Stripe no devolvió una sesión de pago válida.");
  return data.client_secret;
}

export async function listAdoptionMonths() {
  const data = await callFunction("list-adoptable-nests", { method: "GET" });
  return Array.isArray(data.months) ? data.months : [];
}

export async function getAdoptionCheckoutStatus(sessionId) {
  return callFunction(`adoption-checkout-status?session_id=${encodeURIComponent(sessionId)}`, { method: "GET" });
}

function paymentError(code) {
  const messages = {
    origin_not_allowed: "Este sitio todavía no está autorizado para iniciar pagos.",
    invalid_donor_email: "Escribe un correo electrónico válido.",
    invalid_sponsor_email: "Escribe un correo electrónico válido.",
    invalid_amount: "El monto del donativo no es válido.",
    invalid_preferred_collection_month: "Selecciona un mes de colecta disponible.",
    checkout_not_configured: "La pasarela todavía no está configurada.",
    donation_registration_failed: "No se pudo reservar el donativo. Inténtalo nuevamente.",
    adoption_registration_failed: "No se pudo reservar la adopción para ese mes. Inténtalo nuevamente.",
    adoptable_nests_unavailable: "No se pudieron consultar los meses disponibles.",
    adoption_checkout_not_found: "No encontramos esta confirmación de adopción.",
    adoption_status_unavailable: "No pudimos confirmar todavía la asignación del nido.",
  };
  return messages[code] || "No fue posible iniciar el pago. Inténtalo nuevamente.";
}

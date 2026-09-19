import { supabase } from './supabase';

export async function createVisitRequest(payload) {
  const { data, error } = await supabase.rpc('fn_public_create_visit_request', {
    p_idempotency_key: payload.idempotencyKey,
    p_requester_name: payload.name,
    p_requester_email: payload.email,
    p_requester_phone: payload.phone || null,
    p_origin: payload.origin || null,
    p_preferred_date: payload.preferredDate,
    p_attendees: payload.attendees || 1,
    p_group_type: payload.groupType || null,
  });

  if (error) throw new Error(visitRequestError(error.message));
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.public_reference || !result?.request_number || result.request_status !== 'PENDING') {
    throw new Error('No pudimos confirmar el registro de tu solicitud. Inténtalo nuevamente.');
  }
  return result;
}

function visitRequestError(message = '') {
  const normalized = message.toLowerCase();
  if (normalized.includes('fecha de visita')) return 'Selecciona una fecha válida dentro de los próximos 12 meses.';
  if (normalized.includes('correo')) return 'Escribe un correo electrónico válido.';
  if (normalized.includes('asistentes')) return 'El grupo debe tener entre 1 y 50 asistentes.';
  if (normalized.includes('nombre')) return 'Escribe tu nombre completo.';
  if (normalized.includes('tipo de grupo')) return 'Selecciona un tipo de grupo válido.';
  return 'No pudimos registrar tu solicitud. Comprueba tu conexión e inténtalo nuevamente.';
}

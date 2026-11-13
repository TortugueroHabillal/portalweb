import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const api = readFileSync(new URL('../src/lib/visits.js', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/PageVisita.jsx', import.meta.url), 'utf8');

test('visit form uses the public RPC and only the publishable Supabase client', () => {
  assert.match(api, /fn_public_create_visit_request/);
  assert.match(api, /p_idempotency_key/);
  assert.doesNotMatch(`${api}${page}`, /SUPABASE_SECRET_KEY|service_role|sb_secret_/i);
});

test('current public fields map to the visit request contract', () => {
  for (const field of ['p_requester_name', 'p_requester_email', 'p_origin', 'p_preferred_date', 'p_attendees', 'p_group_type']) {
    assert.match(api, new RegExp(field));
  }
});

test('phone is required in the form and sent to the RPC', () => {
  assert.match(page, /Teléfono \/ WhatsApp \*/);
  assert.match(page, /type="tel"[\s\S]*required/);
  assert.match(page, /phone: form\.telefono\.trim\(\)/);
  assert.match(api, /p_requester_phone: payload\.phone/);
});

test('group options send canonical backend values while displaying Spanish labels', () => {
  assert.match(page, /\["TOURISM", "Turístico"\]/);
  assert.match(page, /<option key=\{value\} value=\{value\}>\{label\}<\/option>/);
});

test('success waits for the backend and displays the returned folio', () => {
  assert.match(page, /await createVisitRequest/);
  assert.match(page, /setRequestNumber\(result\.request_number\)/);
  assert.match(page, /folio <strong>#\{requestNumber\}/);
  assert.match(page, /sending \? "Enviando solicitud\.\.\."/);
  assert.match(page, /role="alert"/);
});

test('retry keeps one idempotency key and a new request rotates it', () => {
  assert.match(page, /useRef\(uuid\(\)\)/);
  assert.match(page, /idempotencyKey: idempotencyKey\.current/);
  assert.match(page, /idempotencyKey\.current = uuid\(\)/);
});

test('submit button is a native submit that disables while sending', () => {
  assert.match(page, /type="submit" disabled=\{sending\}/);
});

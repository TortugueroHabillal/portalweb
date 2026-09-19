import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const api = readFileSync(new URL("../src/lib/payments.js", import.meta.url), "utf8");
const stripe = readFileSync(new URL("../src/components/StripeEmbeddedCheckout.jsx", import.meta.url), "utf8");
const donation = readFileSync(new URL("../src/pages/PageDona.jsx", import.meta.url), "utf8");
const adoption = readFileSync(new URL("../src/pages/PageAdopta.jsx", import.meta.url), "utf8");
const success = readFileSync(new URL("../src/pages/PaymentSuccessPage.jsx", import.meta.url), "utf8");
const supabase = readFileSync(new URL("../src/lib/supabase.ts", import.meta.url), "utf8");

test("frontend uses only publishable browser keys", () => {
  assert.match(stripe, /VITE_STRIPE_PUBLISHABLE_KEY/);
  assert.match(supabase, /VITE_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(`${api}${stripe}${donation}${adoption}`, /STRIPE_SECRET_KEY|SUPABASE_SECRET_KEY/);
});

test("checkouts request embedded sessions with same-origin returns", () => {
  assert.match(api, /checkout_mode:\s*"embedded"/);
  assert.match(api, /window\.location\.origin.*\/dona\/exito\?session_id=\{CHECKOUT_SESSION_ID\}/);
  assert.match(api, /window\.location\.origin.*\/adopta\/exito\?session_id=\{CHECKOUT_SESSION_ID\}/);
  assert.match(stripe, /EmbeddedCheckoutProvider/);
  assert.match(stripe, /EmbeddedCheckout/);
});

test("donations are one-time and preserve variable amount", () => {
  assert.doesNotMatch(donation, /setFrequency|Mensual \(Recomendado\)|\/ mes/);
  assert.match(donation, /amount_minor: amountMinor/);
  assert.match(donation, /donativo mínimo.*\$10 MXN/);
  assert.match(donation, /amount:\s*100/);
  assert.match(donation, /amount:\s*250/);
  assert.match(donation, /amount:\s*500/);
  assert.match(donation, /amount:\s*1000/);
  assert.match(donation, /STRIPE_DOMESTIC_RATE_WITH_VAT/);
  assert.match(donation, /coverProcessingCosts/);
  assert.doesNotMatch(donation, /wa\.me|Donar vía WhatsApp|handleWhatsAppDonate/);
});

test("web adoption creates one 220 MXN adoption with random server allocation", () => {
  assert.doesNotMatch(adoption, /nidosQty|\[1, 2, 3, 4\]/);
  assert.match(adoption, /\$220 MXN/);
  assert.doesNotMatch(adoption, /listAdoptionMonths|preferred_collection_month|selectedMonth/);
  assert.match(adoption, /forma aleatoria un nido activo disponible/);
  assert.match(success, /nest_code/);
  assert.match(success, /Donativo confirmado/);
  assert.match(success, /Adopción confirmada/);
  assert.match(success, /Monto cobrado/);
  assert.match(success, /certificado digital/);
  assert.doesNotMatch(success, /processor_fee_minor|net_amount_minor/);
});

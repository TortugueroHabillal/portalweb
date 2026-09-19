import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const api = readFileSync(new URL("../src/lib/payments.js", import.meta.url), "utf8");
const stripe = readFileSync(new URL("../src/components/StripeEmbeddedCheckout.jsx", import.meta.url), "utf8");
const donation = readFileSync(new URL("../src/pages/PageDona.jsx", import.meta.url), "utf8");
const adoption = readFileSync(new URL("../src/pages/PageAdopta.jsx", import.meta.url), "utf8");
const supabase = readFileSync(new URL("../src/lib/supabase.ts", import.meta.url), "utf8");

test("frontend uses only publishable browser keys", () => {
  assert.match(stripe, /VITE_STRIPE_PUBLISHABLE_KEY/);
  assert.match(supabase, /VITE_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(`${api}${stripe}${donation}${adoption}`, /STRIPE_SECRET_KEY|SUPABASE_SECRET_KEY/);
});

test("checkouts request embedded sessions with same-origin returns", () => {
  assert.match(api, /checkout_mode:\s*"embedded"/);
  assert.match(api, /window\.location\.origin.*\/dona\?checkout=complete/);
  assert.match(api, /window\.location\.origin.*\/adopta\?checkout=complete/);
  assert.match(stripe, /EmbeddedCheckoutProvider/);
  assert.match(stripe, /EmbeddedCheckout/);
});

test("donations are one-time and preserve variable amount", () => {
  assert.doesNotMatch(donation, /setFrequency|Mensual \(Recomendado\)|\/ mes/);
  assert.match(donation, /amount_minor: amountMinor/);
  assert.match(donation, /donativo mínimo.*\$10 MXN/);
});

test("web adoption creates one 220 MXN adoption with random server allocation", () => {
  assert.doesNotMatch(adoption, /nidosQty|\[1, 2, 3, 4\]/);
  assert.match(adoption, /\$220 MXN/);
  assert.doesNotMatch(adoption, /listAdoptionMonths|preferred_collection_month|selectedMonth/);
  assert.match(adoption, /forma aleatoria un nido activo disponible/);
  assert.match(adoption, /nest_code/);
});

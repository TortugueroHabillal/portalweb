import SEO from "../seo.json";

/* Al cambiar de página actualiza título, descripción, vista previa (Open Graph / X)
   y dirección canónica. El HTML de cada página ya sale con estos datos desde el build
   (scripts/seo-build.mjs) para quien no ejecuta JavaScript, como WhatsApp o Facebook. */
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function applySeo(page) {
  const p = SEO.pages[page];
  const hidden = SEO.noindex[page];
  const title = p?.title || hidden?.title || SEO.pages.home.title;
  document.title = title;
  if (!p) {
    setMeta("name", "robots", "noindex");
    return;
  }
  const url = SEO.site + p.path;
  setMeta("name", "robots", "index, follow");
  setMeta("name", "description", p.description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", p.description);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", p.description);
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

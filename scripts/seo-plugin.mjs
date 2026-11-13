import { readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

/* SEO sin servidor: los datos viven en src/seo.json.
   - En dev y build llena los %SEO_*% de index.html con los datos del Home.
   - Al terminar el build escribe dist/<página>.html con el título, la descripción y la
     vista previa de cada página (WhatsApp, Facebook y Google los leen sin ejecutar JavaScript),
     además de sitemap.xml y robots.txt. */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function fill(html, seo, page) {
  const url = seo.site + page.path;
  return html
    .replaceAll("%SEO_TITLE%", esc(page.title))
    .replaceAll("%SEO_DESCRIPTION%", esc(page.description))
    .replaceAll("%SEO_URL%", esc(url))
    .replaceAll("%SEO_IMAGE%", esc(seo.site + seo.image))
    .replaceAll("%SEO_SITE%", esc(seo.site));
}

export function seoPlugin() {
  const root = process.cwd();
  const load = () => JSON.parse(readFileSync(resolve(root, "src/seo.json"), "utf8"));
  let outDir = "dist";
  return {
    name: "habillal-seo",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      const seo = load();
      return fill(html, seo, seo.pages.home);
    },
    closeBundle() {
      const seo = load();
      const base = readFileSync(join(outDir, "index.html"), "utf8");
      const home = seo.pages.home;
      // index.html ya trae los datos del Home; cada página recibe los suyos.
      for (const [key, page] of Object.entries(seo.pages)) {
        if (key === "home") continue;
        const swap = (s) =>
          s.replaceAll(esc(home.title), esc(page.title))
            .replaceAll(esc(home.description), esc(page.description))
            .replaceAll(`content="${esc(seo.site + home.path)}"`, `content="${esc(seo.site + page.path)}"`)
            .replaceAll(`href="${esc(seo.site + home.path)}"`, `href="${esc(seo.site + page.path)}"`);
        // adopta.html, dona.html… Vercel los sirve en /adopta, /dona (cleanUrls en vercel.json)
        writeFileSync(join(outDir, `${page.path.replace(/^\//, "")}.html`), swap(base));
      }
      const today = new Date().toISOString().slice(0, 10);
      const urls = Object.values(seo.pages)
        .map((p) => `  <url><loc>${seo.site}${p.path}</loc><lastmod>${today}</lastmod></url>`)
        .join("\n");
      writeFileSync(
        join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      writeFileSync(
        join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\nDisallow: /dona/exito\nDisallow: /adopta/exito\n\nSitemap: ${seo.site}/sitemap.xml\n`
      );
    },
  };
}

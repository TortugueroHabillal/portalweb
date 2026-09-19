import { Reveal } from "./Reveal";

/* ---------- Hero oscuro dividido (texto + foto) — patrón único reutilizado en las páginas de nivel superior ---------- */
export function HeroShock({ image, imageAlt, align = "left", children }) {
  return (
    <section className="tt-hero-shock">
      <div className="tt-hero-shock-msg" style={align === "center" ? { textAlign: "center", alignItems: "center" } : undefined}>
        <Reveal from="left" distance={45}>
          {children}
        </Reveal>
      </div>
      <div className="tt-hero-shock-media">
        <img src={image} alt={imageAlt} />
        <div className="tt-hero-shock-fade" aria-hidden="true" />
      </div>
    </section>
  );
}

import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "./Reveal";
import { Eyebrow, H2 } from "./Typography";

/* ---------- Tira de logos — instituciones y comercios patrocinadores ----------
   Recorta la franja de logos del flyer oficial de TortuFest (parte inferior).
*/
export function SponsorsStrip() {
  return (
    <section style={{ background: "#fff", padding: "44px 32px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <H2 center maxWidth="26ch">
            Instituciones y aliados que respaldan nuestra labor
          </H2>
        </Reveal>
        <Reveal delay={100} style={{ marginTop: "26px" }}>
          <div className="tt-marquee-container">
            <div className="tt-marquee-track">
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

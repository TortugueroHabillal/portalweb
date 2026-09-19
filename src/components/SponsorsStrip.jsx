import { TOKENS, SECTION_BG, IMAGES } from "../theme";
import { Reveal } from "./Reveal";
import { Eyebrow, H2 } from "./Typography";
import { WaveDivider } from "./WaveDivider";

/* ---------- Tira de logos — instituciones y comercios patrocinadores ----------
   Recorta la franja de logos del flyer oficial de TortuFest (parte inferior).
*/
export function SponsorsStrip() {
  return (
    <div>
      <WaveDivider fromColor={SECTION_BG.claro} toColor={TOKENS.espuma} />
      <section style={{ background: TOKENS.espuma, padding: "44px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center", padding: "0 32px" }}>
          <Reveal>
            <H2 center maxWidth="26ch">
              Aliados que respaldan nuestra labor
            </H2>
          </Reveal>
        </div>
        <Reveal delay={100} style={{ marginTop: "26px" }}>
          <div className="tt-marquee-container tt-marquee-full">
            <div className="tt-marquee-track">
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
              <img src={IMAGES.sponsors} alt="Patrocinadores y aliados" />
            </div>
          </div>
        </Reveal>
      </section>
      <WaveDivider fromColor={TOKENS.espuma} toColor={SECTION_BG.claro} />
    </div>
  );
}

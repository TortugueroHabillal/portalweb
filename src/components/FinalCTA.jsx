import { TOKENS, IMAGES } from "../theme";
import { Reveal } from "./Reveal";
import { Eyebrow, H2 } from "./Typography";
import { Button } from "./Button";

/* ---------- Banner final de captación — antes del footer, en todas las páginas ---------- */
export function FinalCTA({ go }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "80px 32px",
        overflow: "hidden",
        background: `linear-gradient(160deg, rgba(16,38,43,0.90), rgba(44,92,109,0.86)), url("${IMAGES.hatchlingSilhouetteSingle}") center 30%/cover`,
      }}
    >
      <Reveal style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Eyebrow color={TOKENS.cielo} center>Protegiendo nidos, salvando especies</Eyebrow>
        <H2 color="#FBF8F2" center maxWidth="20ch">
          Tu donativo de hoy es la liberación de mañana
        </H2>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            color: "#CBD9D6",
            fontSize: "15px",
            lineHeight: 1.7,
            margin: "16px auto 28px",
            maxWidth: "46ch",
          }}
        >
          Ya viste el trabajo real detrás de cada nido en El Habillal. Faltas tú: tu aportación marca la diferencia en el futuro de nuestras tortugas marinas.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button tone="coral" size="lg" onClick={() => go("dona")}>Quiero donar ahora</Button>
        </div>
      </Reveal>
    </section>
  );
}

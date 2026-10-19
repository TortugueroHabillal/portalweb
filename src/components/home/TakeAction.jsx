import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { HOME_MEDIA } from "./media";

/* Montos e impacto: los mismos de la página Dona */
const TIERS = [
  { amount: 100, impact: "Permite reabastecer insumos para la protección y vigilancia de nidos." },
  { amount: 250, impact: "Apoyas el resguardo y seguimiento de los nidos durante la temporada." },
  { amount: 500, impact: "Apoyas con equipamiento y materiales para el cuidado de crías." },
  { amount: 1000, impact: "Sustentas los recorridos de vigilancia y la operación del campamento." },
];

const ease = [0.22, 1, 0.36, 1];
const money = (n) => `$${n.toLocaleString("es-MX")}`;

/* ---------- 9 · El mar ----------
   El final del viaje: aquí, por fin, se pide. Adopta es el protagonista
   (foto completa + precio enorme); Dona y Visítanos van debajo. */
export function TakeAction({ go }) {
  const reduce = useReducedMotion();
  const [tier, setTier] = useState(TIERS[1]);

  const donate = () => {
    try {
      sessionStorage.setItem("donaMontoPersonalizado", String(tier.amount));
    } catch {
      /* sin almacenamiento: la página Dona abre con su monto por defecto */
    }
    go("dona");
  };

  return (
    <>
      <section className="lt-action lt-cta" data-snap>
        <Reveal as="h2" from="left" className="lt-display lt-action__title">Ahora, la siguiente tortuga depende de ti.</Reveal>

        <Reveal as="article" className="lt-cta__adopt">
          <div className="lt-cta__photo">
            <img src={HOME_MEDIA.criaLaud} alt="Cría de tortuga laúd en la arena" loading="lazy" decoding="async" />
          </div>
          <div className="lt-cta__body">
            <h3 className="lt-display">Adopta un nido</h3>
            <Reveal as="p" from="left" delay={0.2} className="lt-cta__price">
              <span className="lt-display">$220<small className="lt-cta__cur">MXN</small></span>
            </Reveal>
            <p>Lo cuidamos en el corral hasta que nace y te invitamos a ver a sus crías llegar al mar.</p>
            <button className="lt-btn lt-btn--hot lt-cta__btn" onClick={() => go("adopta")}>Adoptar mi nido</button>
          </div>
        </Reveal>

      </section>

      <section className="lt-action lt-cta lt-cta--dona" data-snap>
        <div className="lt-cta__donagrid">
          <Reveal className="lt-cta__donaphoto" from="left">
            <img src={HOME_MEDIA.donaCrias} alt="Crías de tortuga recién nacidas" loading="lazy" decoding="async" />
          </Reveal>
          <Reveal as="article" className="lt-cta__dona" from="right">
            <div className="lt-cta__dona-head">
              <div>
                <h2 className="lt-display lt-cta__dona-title">O dona  la causa.</h2>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={tier.amount}
                    className="lt-display lt-cta__amount"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {money(tier.amount)}<small className="lt-cta__cur">MXN</small>
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="lt-cta__chips" role="group" aria-label="Elige un monto">
                {TIERS.map((t) => (
                  <button
                    key={t.amount}
                    type="button"
                    className={`lt-cta__chip${t === tier ? " is-on" : ""}`}
                    aria-pressed={t === tier}
                    onClick={() => setTier(t)}
                  >
                    {money(t.amount)}
                  </button>
                ))}
              </div>
            </div>
            <div className="lt-cta__dona-foot">
              <div className="lt-cta__impact" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={tier.amount}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {tier.impact}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button className="lt-btn lt-btn--sea" onClick={donate}>Donar {money(tier.amount)}</button>
            </div>
          </Reveal>
        </div>
        <Reveal className="lt-cta__visitline" delay={0.2}>
          <p>¿Prefieres vivirlo en persona?</p>
          <button className="lt-btn lt-btn--line" onClick={() => go("visita")}>Agenda una visita</button>
        </Reveal>
      </section>
    </>
  );
}

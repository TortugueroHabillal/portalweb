import { useEffect, useRef, useState } from "react";
import { HOME_MEDIA } from "../components/home/media";
import "../styles/home-v8.css";

/* Home 2026 — "Antes de llegar al mar"
   Un solo fondo de playa: arena seca → arena mojada → mar.
   Orden: emoción (hero + la cría) → confianza (Somos) → acción (Adopta / Dona) → visita. */

const V8 = (f) => `/home/v8/${f}`;

const AMOUNTS = [
  { v: 100, t: "Contribuye a los insumos utilizados durante la protección y vigilancia de nidos." },
  { v: 250, t: "Apoya el resguardo y seguimiento de los nidos durante la temporada." },
  { v: 500, t: "Fortalece el equipamiento y los materiales para el cuidado de crías." },
  { v: 1000, t: "Apoya los recorridos de vigilancia y la operación del campamento." },
];
const money = (n) => `$${n.toLocaleString("en-US")}`;

export function PageHome({ go }) {
  const root = useRef(null);
  const [amount, setAmount] = useState(250);
  const current = AMOUNTS.find((a) => a.v === amount);

  const donate = () => {
    try { sessionStorage.setItem("donaMontoPersonalizado", String(amount)); } catch { /* sin almacenamiento */ }
    go("dona");
  };

  useEffect(() => {
    const el = root.current;
    const $ = (sel) => el.querySelector(sel);
    const cleanups = [];
    const on = (target, ev, fn, opts) => {
      target.addEventListener(ev, fn, opts);
      cleanups.push(() => target.removeEventListener(ev, fn, opts));
    };
    let alive = true;

    /* --- foto del equipo y cifra: aparecen al entrar en pantalla --- */
    const io1 = new IntersectionObserver(([e], o) => { if (e.isIntersecting) { $("#shot").classList.add("in"); o.disconnect(); } }, { threshold: 0.3 });
    io1.observe($("#shot"));
    const io2 = new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const n = $("#bigNum"), t0 = performance.now();
      const f = (t) => {
        if (!alive) return;
        const p = Math.min(1, (t - t0) / 1800);
        n.textContent = Math.round(100000 * (1 - Math.pow(1 - p, 4))).toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0.4 });
    io2.observe($("#bigNum"));

    /* --- fondo: las zonas de arena y mar se anclan a las secciones --- */
    const beach = $(".beach"), walk = $("#walk");
    const zones = () => {
      const H = beach.offsetHeight, act = $("#actua").offsetTop;
      const set = (sel, top, h) => { const z = $(sel); z.style.top = top + "px"; z.style.height = Math.max(0, h) + "px"; };
      const hf = $(".act .half");
      const mt = innerWidth <= 820 ? act + hf.offsetTop + hf.offsetHeight - 120 : H;
      set(".z-seca", 0, act - 120);
      set(".z-mojada", act - 420, Math.max(380, mt - act + 420));
      set(".z-mar", mt, H - mt);
      /* hero móvil: la foto empieza justo debajo de los botones */
      const ph = $(".hero .ph"), c = $(".hero .ctas"), hw = $(".hero .wrap");
      ph.style.top = innerWidth <= 820 ? hw.offsetTop + c.offsetTop + c.offsetHeight - 10 + "px" : "";
    };

    /* --- la cría: queda al centro y aletea solo mientras haces scroll --- */
    let cria = null;
    const P3 = 0.7;
    const frame = () => {
      const r = walk.getBoundingClientRect(), span = r.height - innerHeight;
      const t = Math.min(1, Math.max(0, -r.top / span));
      const stTop = walk.querySelector(".stick").getBoundingClientRect().top;
      const kb = walk.querySelector(".k").getBoundingClientRect().bottom - stTop;
      const cw = cria ? cria.getBoundingClientRect().width : 150;
      const solo = walk.querySelector(".solo"), sh = solo.offsetHeight;
      const gap = Math.min(120, Math.max(84, innerWidth * 0.09));
      let ry;
      if (innerWidth <= 820) {
        ry = Math.max(innerHeight * 0.5, kb + cw * 0.62 + 18);
        ry = Math.min(ry, innerHeight - sh - gap - 28);
      } else {
        const sb = solo.getBoundingClientRect().top - stTop + sh;
        ry = Math.max(innerHeight * 0.55, Math.max(kb, sb) + cw * 0.55 + 24);
        ry = Math.min(ry, innerHeight - cw * 0.55 - 16);
      }
      walk.style.setProperty("--ry", ry + "px");
      walk.classList.add("p2");
      walk.classList.toggle("p4", t >= P3 + 0.04);
    };

    let walkPh = 0, lastSY = scrollY, raf = 0;
    on(window, "scroll", () => { walkPh += Math.min(Math.abs(scrollY - lastSY), 120) / 120; lastSY = scrollY; }, { passive: true });
    const loop = () => {
      if (!alive) return;
      if (cria) {
        const w = cria.getBoundingClientRect().width || 150;
        const ry = parseFloat(walk.style.getPropertyValue("--ry")) || innerHeight * 0.53;
        const ph = walkPh, sway = Math.sin(ph) * 1.2;
        cria.style.transform = `translate(${innerWidth / 2 - w / 2}px,${ry - w / 2}px) rotate(${180 + sway}deg)`;
        const f = Math.sin(ph) * 7, sc = 1 - Math.abs(Math.sin(ph)) * 0.06, rf = Math.sin(ph + 1.3) * 5;
        const g = (id) => cria.querySelector("#" + id);
        g("gfl").style.transform = `rotate(${-f}deg) scale(${sc})`;
        g("gfr").style.transform = `rotate(${f}deg) scale(${sc})`;
        g("grl").style.transform = `rotate(${rf}deg)`;
        g("grr").style.transform = `rotate(${-rf}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(raf));

    const holder = $("#cria");
    fetch(V8("golfina-cria.svg"))
      .then((r) => r.text())
      .then((svg) => { if (!alive) return; holder.innerHTML = svg; cria = holder; frame(); });

    const all = () => { zones(); frame(); };
    on(window, "scroll", frame, { passive: true });
    on(window, "resize", all);
    on(window, "load", all);
    all();
    if (document.fonts) document.fonts.ready.then(() => alive && all());
    const t1 = setTimeout(all, 1200);
    cleanups.push(() => clearTimeout(t1));

    return () => {
      alive = false;
      io1.disconnect();
      io2.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <main className="h8" ref={root}>
      <div className="beach">
        <div className="zone z-seca" />
        <div className="zone z-mojada" />
        <div className="zone z-mar" />

        {/* 1 · HERO */}
        <header className="hero">
          <div className="ph" role="img" aria-label="Cría de tortuga laúd sobre la arena de El Habillal" />
          <div className="wrap">
            <h1>Antes de llegar al mar, tienen que <em>sobrevivir a la arena.</em></h1>
            <p>En El Habillal cuidamos cada nido hasta que sus crías llegan al mar.</p>
            <div className="ctas">
              <a className="btn btn-t" href="#actua">Adopta un nido</a>
              <a className="tl" href="#dona-opt">o haz un donativo</a>
            </div>
          </div>
        </header>

        {/* 2 · LA CRÍA: de 1,000 solo una */}
        <section className="walk" id="walk">
          <div className="stick">
            <p className="k"><span className="big"><b>1,000</b> crías</span><span className="ln">salen a la arena.</span></p>
            <p className="solo">
              <span className="ln pre">Se estima que</span>
              <span className="big">solo <b>una</b></span>
              <span className="ln">llegará a adulta.</span>
              <a className="btn btn-c solo-cta" href="#actua">Sé parte de su camino</a>
            </p>
            <div className="cria" id="cria" aria-hidden="true" />
          </div>
        </section>

        {/* 3 · SOMOS EL HABILLAL */}
        <section className="proof" id="somos">
          <div className="wrap">
            <div className="pgrid">
              <div className="left">
                <figure className="shot" id="shot">
                  <img src="/tortufest_2ed_group.webp" alt="Equipo y voluntarios del Campamento Tortuguero El Habillal" />
                  <span className="seal"><img src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" /></span>
                </figure>
                <img className="bigmark" src={HOME_MEDIA.logo} alt="Logo del Campamento Tortuguero El Habillal" />
              </div>
              <div>
                <p className="lead">Somos El Habillal.</p>
                <h2 className="who">13 temporadas sin faltar a la playa.</h2>
                <p className="bio">
                  Somos una asociación civil sin fines de lucro de Lázaro Cárdenas, Michoacán. Con autorización de la
                  SEMARNAT, pescadores, familias de El Habillal, voluntarios y estudiantes patrullamos de noche, llevamos
                  cada nido al corral de incubación y acompañamos a las crías hasta el mar.
                </p>
                <div className="sp">
                  <h4>Nuestras especies</h4>
                  <figure><img src="/home/especies/golfina.webp" alt="Tortuga golfina" loading="lazy" /><figcaption>Golfina</figcaption></figure>
                  <figure><img src="/home/fotos/negra-playa.webp" alt="Tortuga negra" loading="lazy" /><figcaption>Negra</figcaption></figure>
                  <figure><img src="/home/especies/laud.webp" alt="Tortuga laúd" loading="lazy" className="pos-low" /><figcaption>Laúd</figcaption></figure>
                </div>
                <p className="since">Más de <b id="bigNum">100,000</b> crías liberadas. Rescatamos más de 1,400 nidos por temporada.</p>
                <blockquote className="onu">
                  «En el Día Mundial de los Océanos de 2021, la ONU reconoció nuestra labor en una entrevista a nuestro director.»
                  <a href="https://news.un.org/es/story/2021/06/1493152" target="_blank" rel="noopener noreferrer">Leer la entrevista en Noticias ONU</a>
                </blockquote>
                <button className="more" onClick={() => go("about")}>Conoce al equipo</button>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · AYÚDALAS A LLEGAR AL MAR */}
        <section className="act" id="actua">
          <div className="split">
            <figure className="half"><img src={V8("accion-propia.webp")} alt="Cría de tortuga camino al mar en El Habillal" loading="lazy" /></figure>
            <div className="side">
              <h2>Ayúdalas a llegar al mar.</h2>
              <div className="opt">
                <h3>Adopta un nido</h3>
                <p className="price"><b>$220</b> MXN por nido</p>
                <p className="hook">Ponle tu nombre a un nido y acompáñalo hasta su liberación. Recibes tu certificado de adopción.</p>
                <button className="btn btn-t" onClick={() => go("adopta")}>Adoptar un nido</button>
              </div>
              <div className="opt" id="dona-opt">
                <h3>Haz un donativo</h3>
                <div className="amts" role="group" aria-label="Monto del donativo">
                  {AMOUNTS.map((a) => (
                    <button key={a.v} className={a.v === amount ? "on" : ""} aria-pressed={a.v === amount} onClick={() => setAmount(a.v)}>
                      {money(a.v)}
                    </button>
                  ))}
                </div>
                <p className="hook">{current.t}</p>
                <button className="btn btn-o" onClick={donate}>Donar {money(amount)}</button>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · VISITA */}
        <section className="visit">
          <img src="/visita/liberacion-visitantes.webp" alt="Visitantes acompañando una liberación de crías" loading="lazy" />
          <div className="wrap">
            <b>Ven a vivirlo en persona.</b>
            <p>Visita el campamento en la temporada de liberación 2026–2027.</p>
            <button className="btn btn-c" onClick={() => go("visita")}>Agenda una visita</button>
          </div>
        </section>
      </div>
    </main>
  );
}

import { TOKENS } from "../theme";

const CONTACT_EMAIL = "camp.tortuguero.elhabillal@gmail.com";
const CONTACT_PHONE = "753 163 1707";
const UPDATED = "octubre de 2026";

const SECTIONS = [
  {
    title: "Responsable de tus datos",
    body: [
      `Campamento Tortuguero "El Habillal" A.C., con domicilio en La Caroa, Tenencia, C.P. 60981, El Habillal, Michoacán, es responsable del tratamiento de los datos personales que nos proporcionas, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.`,
    ],
  },
  {
    title: "Qué datos recabamos y para qué",
    body: [
      "Solicitud de visita: nombre, correo electrónico, teléfono, procedencia, fecha y número de asistentes. Los usamos para agendar, confirmar o reprogramar tu visita y avisarte por correo de cada cambio.",
      "Adopción simbólica de un nido: nombre y correo electrónico. Los usamos para vincular tu adopción a un nido, emitir tu certificado e informarte el resultado de tu nido.",
      "Donativo: correo electrónico y, si lo deseas, tu nombre. Si no das nombre, el donativo se registra como anónimo. Usamos el correo solo para enviarte el comprobante.",
      "Contacto: nombre, correo, teléfono (opcional) y tu mensaje, para responderte.",
      "Solo pedimos los datos mínimos de cada trámite. No recabamos datos personales sensibles.",
    ],
  },
  {
    title: "Pagos",
    body: [
      "Los pagos con tarjeta los procesa la pasarela Stripe. El campamento no recibe ni guarda números de tarjeta.",
    ],
  },
  {
    title: "Quién puede ver tus datos",
    body: [
      "Dentro del campamento, solo el administrador tiene acceso a los datos de visitantes, adoptantes y donantes. El personal voluntario no puede consultarlos.",
      "Compartimos tus datos únicamente con los proveedores necesarios para operar el servicio: la pasarela de pago, el servicio de envío de correos y el servicio de almacenamiento de la base de datos. No vendemos ni cedemos tus datos a terceros.",
      "En el portal solo se publican cifras agregadas (por ejemplo, el número de donativos), nunca nombres ni montos individuales.",
    ],
  },
  {
    title: "Tus derechos ARCO",
    body: [
      `Puedes solicitar el acceso, rectificación, cancelación u oposición al uso de tus datos, o revocar tu consentimiento, escribiendo a ${CONTACT_EMAIL} con el asunto "Derechos ARCO". Indica tu nombre, el trámite que realizaste y lo que solicitas. Te responderemos en un plazo máximo de 20 días hábiles. También puedes llamar al ${CONTACT_PHONE}.`,
    ],
  },
  {
    title: "Conservación",
    body: [
      "Conservamos tus datos mientras sean necesarios para el trámite y para los informes de la temporada del campamento; después se eliminan o se anonimizan.",
    ],
  },
  {
    title: "Cambios a este aviso",
    body: [
      `Cualquier cambio a este aviso se publicará en esta página. Última actualización: ${UPDATED}.`,
    ],
  },
];

export function PagePrivacidad() {
  return (
    <main style={{ background: TOKENS.arena, padding: "120px 20px 80px" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto", fontFamily: "'Public Sans', sans-serif", color: TOKENS.concha }}>
        <p style={{ margin: 0, fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: TOKENS.verdeOscuro, fontWeight: 700 }}>Aviso de privacidad integral</p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", lineHeight: 1.15, margin: "10px 0 28px" }}>Cómo cuidamos tus datos</h1>
        {SECTIONS.map((s) => (
          <section key={s.title} style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "19px", margin: "0 0 10px" }}>{s.title}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} style={{ margin: "0 0 10px", fontSize: "15px", lineHeight: 1.65, color: TOKENS.conchaSuave }}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}

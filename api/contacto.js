import { Resend } from "resend";

const resend = new Resend(process.env.PORTAL_CONTACT);

/* Lo que escribe el visitante se escapa antes de ponerlo en el HTML del correo,
   para que nadie pueda inyectar enlaces o etiquetas. */
const escape = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const body = req.body || {};
  const nombre = clean(body.nombre, 120);
  const correo = clean(body.correo, 160).toLowerCase();
  const telefono = clean(body.telefono, 30);
  const mensaje = clean(body.mensaje, 4000);

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  if (!EMAIL.test(correo)) {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  try {
    const data = await resend.emails.send({
      from: "EcoPortal Contacto <onboarding@resend.dev>", // O tu correo con dominio verificado ej. contacto@campamentolahabillal.org
      to: ["camp.tortuguero.elhabillal@gmail.com"],
      replyTo: correo,
      subject: `Nuevo mensaje de contacto de ${nombre.replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #10262B; background: #FAF8F3; border: 1px solid #CBD9D6;">
          <h2 style="color: #136C80; border-bottom: 2px solid #2FB3C6; padding-bottom: 8px; margin-top: 0;">
            Mensaje recibido desde el sitio
          </h2>
          <p><strong>Nombre:</strong> ${escape(nombre)}</p>
          <p><strong>Correo electrónico:</strong> <a href="mailto:${escape(correo)}">${escape(correo)}</a></p>
          <p><strong>Teléfono / WhatsApp:</strong> ${escape(telefono) || "No especificado"}</p>
          <hr style="border: none; border-top: 1px solid #CBD9D6; margin: 16px 0;" />
          <h3 style="color: #10262B; margin-bottom: 8px;">Mensaje:</h3>
          <p style="white-space: pre-wrap; background: #FFFFFF; padding: 14px; border-left: 4px solid #2FB3C6; margin: 0;">${escape(mensaje)}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, id: data?.data?.id ?? null });
  } catch {
    return res.status(500).json({ error: "No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp." });
  }
}

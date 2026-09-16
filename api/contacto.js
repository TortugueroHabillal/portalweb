import { Resend } from "resend";

const resend = new Resend(process.env.PORTAL_CONTACT);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, correo, telefono, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const data = await resend.emails.send({
      from: "EcoPortal Contacto <onboarding@resend.dev>", // O tu correo con dominio verificado ej. contacto@campamentolahabillal.org
      to: ["camp.tortuguero.elhabillal@gmail.com"],
      replyTo: correo,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #10262B; background: #FAF8F3; border: 1px solid #CBD9D6;">
          <h2 style="color: #1F5F5B; border-bottom: 2px solid #1F5F5B; padding-bottom: 8px; margin-top: 0;">
            Mensaje recibido desde EcoPortal
          </h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Correo electrónico:</strong> <a href="mailto:${correo}">${correo}</a></p>
          <p><strong>Teléfono / WhatsApp:</strong> ${telefono || "No especificado"}</p>
          <hr style="border: none; border-top: 1px solid #CBD9D6; margin: 16px 0;" />
          <h3 style="color: #10262B; margin-bottom: 8px;">Mensaje:</h3>
          <p style="white-space: pre-wrap; background: #FFFFFF; padding: 14px; border-left: 4px solid #F07865; margin: 0;">${mensaje}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Error al enviar el correo" });
  }
}

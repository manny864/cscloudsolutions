'use server';

import dns from 'node:dns/promises';
import { z } from 'zod';

const ContactSchema = z.object({
  nombre: z.string().min(2).max(80),
  email: z.string().email().max(120),
  empresa: z.string().max(120).optional().default(''),
  telefono: z.string().max(40).optional().default(''),
  mensaje: z.string().max(1000).optional().default(''),
  recaptchaToken: z.string().min(10)
});

export type ContactFormInput = z.infer<typeof ContactSchema>;

export type ActionResult = {
  ok: boolean;
  message: string;
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
    cache: 'no-store'
  });

  const data = (await res.json()) as { success?: boolean; score?: number };
  if (!data?.success) return false;
  if (typeof data.score === 'number' && data.score < 0.5) return false;
  return true;
}

async function hasMxRecords(email: string): Promise<boolean> {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  
  // Si estamos en local (desarrollo), nos saltamos la validación DNS
  // para evitar bloqueos por firewall o antivirus locales.
  if (process.env.NODE_ENV !== 'production') {
    console.log(`💻 [Local Dev] Saltando validación MX estricta para: ${domain}`);
    return true; 
  }

  try {
    const mx = await dns.resolveMx(domain);
    return Array.isArray(mx) && mx.length > 0;
  } catch {
    return false;
  }
}

async function getGraphAccessToken(): Promise<string | null> {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    console.error('Missing Azure credentials in environment');
    return null;
  }

  try {
    const res = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials'
        }),
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('Azure token error:', error);
      return null;
    }

    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error('Failed to get Graph token:', err);
    return null;
  }
}

async function sendEmailViaGraph(
  nombre: string,
  email: string,
  empresa: string,
  telefono: string,
  mensaje: string
): Promise<boolean> {
  const token = await getGraphAccessToken();
  if (!token) return false;

  const senderEmail = process.env.AZURE_SENDER_EMAIL;
  const recipientEmail = process.env.AZURE_RECIPIENT_EMAIL || senderEmail;

  if (!senderEmail || !recipientEmail) {
    console.error('Missing sender/recipient email config');
    return false;
  }

  const emailBody = {
    message: {
      subject: `Nuevo contacto desde el sitio web — ${nombre}`,
      body: {
        contentType: 'HTML',
        content: `
          <h2>Nuevo contacto desde CSCloudSolutions</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
          <p><strong>Teléfono:</strong> ${telefono || 'No especificado'}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Enviado desde el formulario de contacto del sitio web</p>
        `
      },
      toRecipients: [{ emailAddress: { address: recipientEmail } }],
      replyTo: [{ emailAddress: { address: email, name: nombre } }]
    },
    saveToSentItems: true
  };

  try {
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody),
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('Graph sendMail error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to send email via Graph:', err);
    return false;
  }
}

export async function submitContact(payload: ContactFormInput): Promise<ActionResult> {
  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, message: 'Revisá los datos e intentá nuevamente.' };
  }

  const { nombre, email, empresa, telefono, mensaje, recaptchaToken } = parsed.data;

  const recaptchaOk = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaOk) {
    return { ok: false, message: 'Validación de seguridad fallida. Probá de nuevo en unos segundos.' };
  }

  const mxOk = await hasMxRecords(email);
  if (!mxOk) {
    return { ok: false, message: 'Ese correo no parece válido (dominio sin MX). Usá un email corporativo.' };
  }

  const sent = await sendEmailViaGraph(nombre, email, empresa, telefono, mensaje);

  if (sent) {
    return { ok: true, message: '¡Listo! Te respondemos a la brevedad.' };
  }

  return { ok: false, message: 'No pudimos enviar la consulta. Probá nuevamente.' };
}
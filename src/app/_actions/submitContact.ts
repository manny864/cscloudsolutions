'use server';

import dns from 'node:dns/promises';
import { z } from 'zod';
import { headers } from 'next/headers';

// Simple in-memory rate limiter (per IP). For production, use Redis or an external store.
const rateLimitMap = new Map<string, { count: number; firstRequestAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max submissions per IP per window

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

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize header values to prevent header injection (remove CRLF and limit length)
function sanitizeHeaderValue(s: string, max = 128) {
  return s.replace(/[\r\n]/g, ' ').trim().slice(0, max);
}

async function fetchWithTimeout(resource: RequestInfo, options: RequestInit = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// Send with retries and exponential backoff
async function sendMailWithRetries(url: string, options: RequestInit, attempts = 3): Promise<boolean> {
  const baseDelay = 300; // ms
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetchWithTimeout(url, options, 8000);
      if (res.ok) return true;
      // Log status but avoid bodies
      console.error(`Graph sendMail attempt ${i+1} failed: status ${res.status}`);
    } catch (err) {
      console.error(`Graph sendMail attempt ${i+1} error:`, (err as Error).message);
    }
    // backoff with jitter
    const delay = baseDelay * Math.pow(2, i) + Math.floor(Math.random() * 100);
    await new Promise((r) => setTimeout(r, delay));
  }
  return false;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  try {
    const res = await fetchWithTimeout('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
      cache: 'no-store'
    }, 8000);

    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean; score?: number };
    if (!data?.success) return false;
    if (typeof data.score === 'number' && data.score < 0.5) return false;
    return true;
  } catch (err) {
    console.error('reCAPTCHA verification error (short):', (err as Error).message);
    return false;
  }
}

async function hasMxRecords(email: string): Promise<boolean> {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  
  // Si estamos en local (desarrollo), nos saltamos la validación DNS
  if (process.env.NODE_ENV !== 'production') {
    console.log(`💻 [Local Dev] Saltando validación MX estricta para: ${domain}`);
    return true; 
  }

  try {
    const mx = await dns.resolveMx(domain);
    if (Array.isArray(mx) && mx.length > 0) return true;
  } catch (err) {
    // no-op, intentamos fallback
  }

  // Fallback: algunos dominios aceptan correo en A/AAAA records (RFC)
  try {
    const a = await dns.resolve(domain);
    return Array.isArray(a) && a.length > 0;
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
    const res = await fetchWithTimeout(
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
      },
      8000
    );

    if (!res.ok) {
      console.error('Azure token error: status', res.status);
      return null;
    }

    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error('Failed to get Graph token (short):', (err as Error).message);
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

  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeEmpresa = escapeHtml(empresa || 'No especificada');
  const safeTelefono = escapeHtml(telefono || 'No especificado');
  const safeMensajeHtml = escapeHtml(mensaje).replace(/\n/g, '<br>');
  const safeMensajeText = mensaje;

  const headerSafeName = sanitizeHeaderValue(nombre);
  const headerSafeEmail = sanitizeHeaderValue(email);

  const htmlContent = `
    <h2>Nuevo contacto desde CSCloudSolutions</h2>
    <p><strong>Nombre:</strong> ${safeNombre}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Empresa:</strong> ${safeEmpresa}</p>
    <p><strong>Teléfono:</strong> ${safeTelefono}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${safeMensajeHtml}</p>
    <hr>
    <p style="color: #666; font-size: 12px;">Enviado desde el formulario de contacto del sitio web</p>
    <div style="margin-top:12px;font-family:monospace;white-space:pre-wrap;background:#f8f8f8;padding:8px;border-radius:6px;color:#111;">
      Plain text version:\n${escapeHtml(safeMensajeText)}
    </div>
  `;

  // Limit attachment size to 32KB to avoid large emails
  const MAX_ATTACHMENT_BYTES = 32 * 1024;
  let plainText = safeMensajeText;
  if (Buffer.byteLength(plainText, 'utf8') > MAX_ATTACHMENT_BYTES) {
    // truncate preserving UTF-8
    const buf = Buffer.from(plainText, 'utf8').slice(0, MAX_ATTACHMENT_BYTES);
    plainText = buf.toString('utf8') + '\n\n[Mensaje truncado por tamaño]';
  }
  const attachmentContent = Buffer.from(plainText, 'utf8').toString('base64');

  const emailBody = {
    message: {
      subject: `Nuevo contacto desde el sitio web — ${headerSafeName}`,
      body: {
        contentType: 'HTML',
        content: htmlContent
      },
      toRecipients: [{ emailAddress: { address: recipientEmail } }],
      replyTo: [{ emailAddress: { address: headerSafeEmail, name: headerSafeName } }],
      attachments: [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: 'message.txt',
          contentBytes: attachmentContent,
          contentType: 'text/plain'
        }
      ]
    },
    saveToSentItems: true
  };

  try {
    const success = await sendMailWithRetries(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody),
        cache: 'no-store'
      },
      3
    );

    return success;
  } catch (err) {
    console.error('Failed to send email via Graph after retries:', (err as Error).message);
    return false;
  }
}

// Nueva función para enviar el mail automático al usuario
async function sendAutoReplyViaGraph(nombre: string, userEmail: string): Promise<boolean> {
  const token = await getGraphAccessToken();
  if (!token) return false;

  const senderEmail = process.env.AZURE_SENDER_EMAIL;

  if (!senderEmail) {
    console.error('Missing sender email config for auto-reply');
    return false;
  }

  const safeNombre = escapeHtml(nombre);
  const safeEmail = sanitizeHeaderValue(userEmail);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px;">
      <h2>¡Hola ${safeNombre}!</h2>
      <p>Hemos recibido tu consulta de forma satisfactoria a través de nuestro sitio web.</p>
      <p>En breve, uno de nuestros asesores se pondrá en contacto contigo al correo <strong>${safeEmail}</strong> para brindarte la ayuda que necesitas.</p>
      <br>
      <p>Saludos cordiales,</p>
      <p><strong>El equipo de CSCloudSolutions</strong></p>
    </div>
  `;

  const emailBody = {
    message: {
      subject: `Hemos recibido tu consulta - CSCloudSolutions`,
      body: {
        contentType: 'HTML',
        content: htmlContent
      },
      toRecipients: [{ emailAddress: { address: safeEmail } }],
    },
    saveToSentItems: true
  };

  try {
    const success = await sendMailWithRetries(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody),
        cache: 'no-store'
      },
      2 // Menos reintentos para la respuesta automática para no penalizar tanto si falla
    );
    return success;
  } catch (err) {
    console.error('Failed to send auto-reply via Graph:', (err as Error).message);
    return false;
  }
}

export async function submitContact(payload: ContactFormInput): Promise<ActionResult> {
  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, message: 'Revisá los datos e intentá nuevamente.' };
  }

  const { nombre, email, empresa, telefono, mensaje, recaptchaToken } = parsed.data;

  // Rate limiting by email (avoids reading request headers from server action)
  try {
    const key = email.toLowerCase();
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (entry) {
      if (now - entry.firstRequestAt <= RATE_LIMIT_WINDOW_MS) {
        if (entry.count >= RATE_LIMIT_MAX) {
          return { ok: false, message: 'Demasiadas solicitudes desde esta dirección de correo. Probá nuevamente más tarde.' };
        }
        entry.count += 1;
      } else {
        // window expired
        rateLimitMap.set(key, { count: 1, firstRequestAt: now });
      }
    } else {
      rateLimitMap.set(key, { count: 1, firstRequestAt: now });
    }
  } catch (err) {
    // If rate limiting fails for any reason, continue without blocking the request
    console.warn('Rate limiting skipped:', (err as Error).message);
  }

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
    // Si el correo a la empresa se mandó exitosamente, enviamos la respuesta al usuario.
    // Usamos 'await' para asegurar el flujo de la petición, o podrías lanzarlo sin 'await' para que sea más rápido.
    await sendAutoReplyViaGraph(nombre, email);
    
    return { ok: true, message: '¡Listo! Te respondemos a la brevedad.' };
  }

  return { ok: false, message: 'No pudimos enviar la consulta. Probá nuevamente.' };
}
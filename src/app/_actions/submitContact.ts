'use server';

import dns from 'node:dns/promises';
import https from 'node:https';
import {z} from 'zod';

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
  if (!secret) {
    // If not configured, fail closed.
    return false;
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({secret, response: token}).toString(),
    cache: 'no-store'
  });

  const data = (await res.json()) as {success?: boolean; score?: number};
  if (!data?.success) return false;
  // Score is only present for v3.
  if (typeof data.score === 'number' && data.score < 0.5) return false;
  return true;
}

async function hasMxRecords(email: string): Promise<boolean> {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  try {
    const mx = await dns.resolveMx(domain);
    return Array.isArray(mx) && mx.length > 0;
  } catch {
    return false;
  }
}

export async function submitContact(payload: ContactFormInput): Promise<ActionResult> {
  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return {ok: false, message: 'Revisá los datos e intentá nuevamente.'};
  }

  const {nombre, email, empresa, telefono, mensaje, recaptchaToken} = parsed.data;

  const recaptchaOk = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaOk) {
    return {ok: false, message: 'Validación de seguridad fallida. Probá de nuevo en unos segundos.'};
  }

  const mxOk = await hasMxRecords(email);
  if (!mxOk) {
    return {ok: false, message: 'Ese correo no parece válido (dominio sin MX). Usá un email corporativo.'};
  }

  const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL;
  if (!webhookUrl) {
    return {ok: false, message: 'Integración no configurada en el servidor.'};
  }

  const agent = new https.Agent({rejectUnauthorized: false});

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nombre, email, empresa, telefono, mensaje, source: 'website'}),
      // @ts-expect-error Node fetch supports agent
      agent
    });

    if (res.ok) {
      return {ok: true, message: '¡Listo! Te respondemos a la brevedad.'};
    }

    return {ok: false, message: 'No pudimos enviar la consulta. Probá nuevamente.'};
  } catch {
    return {ok: false, message: 'Error de red al enviar. Probá nuevamente.'};
  }
}

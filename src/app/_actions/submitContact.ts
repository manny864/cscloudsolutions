'use server';

import dns from 'node:dns/promises';
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
  debug?: string; // Temporal para troubleshooting
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({secret, response: token}).toString(),
    cache: 'no-store'
  });

  const data = (await res.json()) as {success?: boolean; score?: number};
  if (!data?.success) return false;
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

async function getGraphAccessToken(): Promise<{token: string | null; error?: string}> {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    const missing = [];
    if (!tenantId) missing.push('AZURE_TENANT_ID');
    if (!clientId) missing.push('AZURE_CLIENT_ID');
    if (!clientSecret) missing.push('AZURE_CLIENT_SECRET');
    const error = `Missing env: ${missing.join(', ')}`;
    console.error('[Graph] ' + error);
    return {token: null, error};
  }

  try {
    const res = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
      const errorText = await res.text();
      console.error('[Graph] Token error:', res.status, errorText);
      return {token: null, error: `Auth failed: ${res.status}`};
    }

    const data = (await res.json()) as {access_token?: string; error?: string; error_description?: string};
    
    if (data.error) {
      console.error('[Graph] Token error:', data.error, data.error_description);
      return {token: null, error: data.error_description || data.error};
    }

    return {token: data.access_token ?? null};
  } catch (err) {
    const error = String(err);
    console.error('[Graph] Exception:', error);
    return {token: null, error};
  }
}

async function sendEmailViaGraph(
  nombre: string,
  email: string,
  empresa: string,
  telefono: string,
  mensaje: string
): Promise<{ok: boolean; error?: string}> {
  const {token, error: authError} = await getGraphAccessToken();
  if (!token) {
    return {ok: false, error: authError || 'Auth failed'};
  }

  const senderEmail = process.env.AZURE_SENDER_EMAIL;
  const recipientEmail = process.env.AZURE_RECIPIENT_EMAIL || senderEmail;

  if (!senderEmail) {
    const error = 'Missing AZURE_SENDER_EMAIL';
    console.error('[Graph]', error);
    return {ok: false, error};
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
      toRecipients: [{emailAddress: {address: recipientEmail}}],
      replyTo: [{emailAddress: {address: email, name: nombre}}]
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
      const errorText = await res.text();
      console.error('[Graph] sendMail error:', res.status, errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        const graphError = errorJson?.error?.message || errorJson?.error?.code || `HTTP ${res.status}`;
        return {ok: false, error: graphError};
      } catch {
        return {ok: false, error: `HTTP ${res.status}`};
      }
    }

    console.log('[Graph] Email sent successfully');
    return {ok: true};
  } catch (err) {
    const error = String(err);
    console.error('[Graph] Exception:', error);
    return {ok: false, error};
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
    return {
      ok: false, 
      message: 'Validación de seguridad fallida. Probá de nuevo en unos segundos.',
      debug: 'reCAPTCHA failed'
    };
  }

  const mxOk = await hasMxRecords(email);
  if (!mxOk) {
    return {
      ok: false, 
      message: 'Ese correo no parece válido (dominio sin MX). Usá un email corporativo.',
      debug: 'MX check failed'
    };
  }

  const {ok, error} = await sendEmailViaGraph(nombre, email, empresa, telefono, mensaje);

  if (ok) {
    return {ok: true, message: '¡Listo! Te respondemos a la brevedad.'};
  }

  return {
    ok: false, 
    message: 'No pudimos enviar la consulta. Probá nuevamente.',
    debug: error || 'Unknown error'
  };
}
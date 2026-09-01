'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { submitContact } from '@/app/_actions/submitContact';

type Status = { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string };

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      ready: (cb: () => void) => void;
    };
  }
}

async function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') return;
  if (window.grecaptcha) return;

  const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
  if (existingScript) return;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

async function getRecaptchaToken(siteKey: string): Promise<string> {
  await loadRecaptchaScript(siteKey);

  let attempts = 0;
  while (!window.grecaptcha && attempts < 30) {
    await new Promise((r) => setTimeout(r, 100));
    attempts++;
  }

  return new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) return reject(new Error('recaptcha-not-loaded'));
    g.ready(async () => {
      try {
        resolve(await g.execute(siteKey, { action: 'submit' }));
      } catch (e) {
        reject(e);
      }
    });
  });
}

export function ContactForm({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', telefono: '', mensaje: '' });
  const formRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Precargar reCAPTCHA de manera eficiente
  useEffect(() => {
    if (siteKey) {
      loadRecaptchaScript(siteKey).catch(console.error);
    }
  }, [siteKey]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: 'loading' });
    try {
      if (!siteKey) throw new Error('missing-site-key');
      const token = await getRecaptchaToken(siteKey);
      const res = await submitContact({ ...form, recaptchaToken: token });
      if (res.ok) {
        setStatus({ kind: 'success', message: res.message });
        setForm({ nombre: '', email: '', empresa: '', telefono: '', mensaje: '' });
      } else {
        setStatus({ kind: 'error', message: res.message });
      }
    } catch {
      setStatus({ kind: 'error', message: t('errorGeneric') });
    }
  }

  const inputClass = `w-full rounded-xl border border-[color:var(--gray-200)] bg-white px-4 py-3 text-sm text-[color:var(--gray-800)] placeholder-[color:var(--gray-400)] outline-none transition focus:border-[color:var(--cyan)] focus:ring-2 focus:ring-[color:rgba(0,174,239,0.15)] ${
    variant === 'compact' ? 'py-2.5' : ''
  }`;

  return (
    <div ref={formRef} className="w-full">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1.5 block text-xs font-semibold text-[color:var(--navy)]">
              {t('name')}
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
              placeholder={t('namePh')}
              value={form.nombre}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[color:var(--navy)]">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('emailPh')}
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="empresa" className="mb-1.5 block text-xs font-semibold text-[color:var(--navy)]">
              {t('company')}
            </label>
            <input
              id="empresa"
              name="empresa"
              type="text"
              autoComplete="organization"
              placeholder={t('companyPh')}
              value={form.empresa}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="mb-1.5 block text-xs font-semibold text-[color:var(--navy)]">
              {t('phone')}
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder={t('phonePh')}
              value={form.telefono}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-1.5 block text-xs font-semibold text-[color:var(--navy)]">
            {t('message')}
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={variant === 'compact' ? 3 : 4}
            placeholder={t('messagePh')}
            value={form.mensaje}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        {status.kind === 'error' && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {status.message}
          </div>
        )}

        {status.kind === 'success' && (
          <div
            role="alert"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700"
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.kind === 'loading'}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[color:var(--navy)] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition duration-200 hover:bg-[color:var(--cyan-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.kind === 'loading' ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{t('sending')}</span>
            </>
          ) : (
            <span>{t('send')}</span>
          )}
        </button>

        <p className="text-center text-[10px] text-[color:var(--gray-500)]">
          {t('note')}{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[color:var(--cyan)]"
          >
            Privacy
          </a>{' '}
          &amp;{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[color:var(--cyan)]"
          >
            Terms
          </a>
        </p>
      </form>
    </div>
  );
}
'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {submitContact} from '@/app/_actions/submitContact';

type Status = {kind: 'idle' | 'loading' | 'success' | 'error'; message?: string};

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, opts: {action: string}) => Promise<string>;
      ready: (cb: () => void) => void;
    };
  }
}

async function getRecaptchaToken(siteKey: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) return reject(new Error('recaptcha-not-loaded'));

    g.ready(async () => {
      try {
        const token = await g.execute(siteKey, {action: 'submit'});
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  });
}

export function ContactForm({variant = 'default'}: {variant?: 'default' | 'compact'}) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const [form, setForm] = useState({nombre: '', email: '', empresa: '', telefono: '', mensaje: ''});

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({kind: 'loading'});

    try {
      if (!siteKey) throw new Error('missing-site-key');
      const token = await getRecaptchaToken(siteKey);

      const res = await submitContact({
        ...form,
        recaptchaToken: token
      });

      if (res.ok) {
        setStatus({kind: 'success', message: res.message});
        setForm({nombre: '', email: '', empresa: '', telefono: '', mensaje: ''});
      } else {
        setStatus({kind: 'error', message: res.message});
      }
    } catch {
      setStatus({kind: 'error', message: t('errorGeneric')});
    }
  }

  const compact = variant === 'compact';

  return (
    <form onSubmit={onSubmit} className={`rounded-3xl bg-white p-8 shadow-sm ${compact ? 'p-7' : ''}`}>
      <h3 className="text-xl font-extrabold text-[color:var(--navy)]">{t('formTitle')}</h3>
      <p className="mt-2 text-sm text-[color:var(--gray-600)]">{t('formSub')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold text-[color:var(--gray-800)]">
          {t('name')}
          <input
            required
            value={form.nombre}
            onChange={(e) => setForm((s) => ({...s, nombre: e.target.value}))}
            className="h-11 rounded-xl border border-[color:var(--gray-200)] px-4 text-sm outline-none transition focus:border-[color:var(--cyan)]"
            placeholder={t('namePh')}
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2 text-xs font-bold text-[color:var(--gray-800)]">
          {t('email')}
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({...s, email: e.target.value}))}
            className="h-11 rounded-xl border border-[color:var(--gray-200)] px-4 text-sm outline-none transition focus:border-[color:var(--cyan)]"
            placeholder={t('emailPh')}
            autoComplete="email"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold text-[color:var(--gray-800)]">
          {t('company')}
          <input
            value={form.empresa}
            onChange={(e) => setForm((s) => ({...s, empresa: e.target.value}))}
            className="h-11 rounded-xl border border-[color:var(--gray-200)] px-4 text-sm outline-none transition focus:border-[color:var(--cyan)]"
            placeholder={t('companyPh')}
            autoComplete="organization"
          />
        </label>

        <label className="grid gap-2 text-xs font-bold text-[color:var(--gray-800)]">
          {t('phone')}
          <input
            value={form.telefono}
            onChange={(e) => setForm((s) => ({...s, telefono: e.target.value}))}
            className="h-11 rounded-xl border border-[color:var(--gray-200)] px-4 text-sm outline-none transition focus:border-[color:var(--cyan)]"
            placeholder={t('phonePh')}
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-xs font-bold text-[color:var(--gray-800)]">
        {t('message')}
        <textarea
          value={form.mensaje}
          onChange={(e) => setForm((s) => ({...s, mensaje: e.target.value}))}
          className="min-h-[96px] resize-y rounded-xl border border-[color:var(--gray-200)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--cyan)]"
          placeholder={t('messagePh')}
        />
      </label>

      <button
        type="submit"
        disabled={status.kind === 'loading'}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-4 text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.kind === 'loading' ? t('sending') : t('send')}
      </button>

      {status.kind === 'success' ? (
        <div className="mt-4 rounded-xl border border-[color:rgba(34,197,94,0.30)] bg-[color:rgba(34,197,94,0.10)] px-4 py-3 text-sm font-bold text-[color:var(--success)]">
          {status.message}
        </div>
      ) : null}

      {status.kind === 'error' ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {status.message}
        </div>
      ) : null}

      <p className="mt-3 text-center text-[11px] font-semibold text-[color:var(--gray-400)]">
        {t('note')}
      </p>
    </form>
  );
}

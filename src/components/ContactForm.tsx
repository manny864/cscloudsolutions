'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { submitContact } from '@/app/_actions/submitContact';

type Status = { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string };


export function ContactForm({ 
  variant = 'default',
  origen = '',
  origenLabel,
  defaultMessage = ''
}: { 
  variant?: 'default' | 'compact';
  origen?: string;
  origenLabel?: string;
  defaultMessage?: string;
}) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [form, setForm] = useState({ 
    nombre: '', 
    email: '', 
    empresa: '', 
    telefono: '', 
    mensaje: defaultMessage,
    origen: origen
  });
  const [interacted, setInteracted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInteracted(true);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInteracted(true);
    setStatus({ kind: 'loading' });
    try {
      const res = await submitContact(form);
      if (res.ok) {
        setStatus({ kind: 'success', message: res.message });
        setForm({ nombre: '', email: '', empresa: '', telefono: '', mensaje: '', origen });
      } else {
        setStatus({ kind: 'error', message: res.message });
      }
    } catch (err) {
      console.error('[ContactForm] Error al enviar:', err);
      setStatus({ kind: 'error', message: t('errorGeneric') });
    }
  }

  const inputClass = `w-full rounded-xl border border-[color:var(--gray-200)] bg-white px-4 py-3 text-sm text-[color:var(--gray-800)] placeholder-[color:var(--gray-400)] outline-none transition focus:border-[color:var(--cyan)] focus:ring-2 focus:ring-[color:rgba(0,174,239,0.15)] ${
    variant === 'compact' ? 'py-2.5' : ''
  }`;

  return (
    <div ref={formRef}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-3xl bg-white p-8 shadow-sm"
      >
        <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold text-[color:var(--navy)]">
          {t('formTitle')}
        </h3>
        <p className="mt-1 text-sm text-[color:var(--gray-600)]">{t('formSub')}</p>

        {origen && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[color:var(--cyan)]/30 bg-[color:var(--cyan)]/10 px-4 py-2.5 text-xs font-bold text-[color:var(--navy)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--cyan)] text-white text-[10px]">
              ✓
            </span>
            <span>
              {t('consultingFor')}: <strong className="text-[color:var(--cyan)]">{origenLabel || origen}</strong>
            </span>
          </div>
        )}

        <input type="hidden" name="origen" value={form.origen} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cf-nombre" className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-600)]">
              {t('name')}
            </label>
            <input
              id="cf-nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              required
              value={form.nombre}
              onChange={handleChange}
              onFocus={() => setInteracted(true)}
              placeholder={t('namePh')}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cf-email" className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-600)]">
              {t('email')}
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={() => setInteracted(true)}
              placeholder={t('emailPh')}
              className={inputClass}
            />
          </div>

          {/* Empresa */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cf-empresa" className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-600)]">
              {t('company')}
            </label>
            <input
              id="cf-empresa"
              name="empresa"
              type="text"
              autoComplete="organization"
              value={form.empresa}
              onChange={handleChange}
              onFocus={() => setInteracted(true)}
              placeholder={t('companyPh')}
              className={inputClass}
            />
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-1">
            <label htmlFor="cf-telefono" className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-600)]">
              {t('phone')}
            </label>
            <input
              id="cf-telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              value={form.telefono}
              onChange={handleChange}
              onFocus={() => setInteracted(true)}
              placeholder={t('phonePh')}
              className={inputClass}
            />
          </div>
        </div>

        {/* Mensaje */}
        <div className="mt-4 flex flex-col gap-1">
          <label htmlFor="cf-mensaje" className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-600)]">
            {t('message')}
          </label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            rows={4}
            value={form.mensaje}
            onChange={handleChange}
            onFocus={() => setInteracted(true)}
            placeholder={t('messagePh')}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Error */}
        {status.kind === 'error' && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {status.message}
          </p>
        )}

        {/* Éxito */}
        {status.kind === 'success' && (
          <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {status.message}
          </p>
        )}

        {/* Submit */}
        <button
          id="contact-form-submit-btn"
          type="submit"
          disabled={status.kind === 'loading' || status.kind === 'success'}
          className="mt-6 w-full rounded-[5px] bg-[color:var(--cyan)] px-6 py-4 text-sm font-extrabold text-white shadow-[0_8px_30px_rgba(0,174,239,0.25)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.kind === 'loading' ? t('sending') : t('send')}
        </button>

        <p className="mt-3 text-center text-[11px] font-semibold text-[color:var(--gray-400)]">
          {t('note')}
        </p>
      </form>
    </div>
  );
}
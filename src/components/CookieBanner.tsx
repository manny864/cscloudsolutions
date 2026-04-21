'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type CookieOptionProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  desc: string;
};

export function CookieBanner() {
  const t = useTranslations('cookies'); // <- Inyectamos las traducciones
  
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [consent, setConsent] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setIsOpen(true);
  }, []);

  const saveConsent = (data: typeof consent) => {
    localStorage.setItem('cookie-consent', JSON.stringify(data));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[color:rgba(0,174,239,0.2)] bg-[color:rgba(11,30,61,0.95)] p-6 shadow-2xl backdrop-blur-xl md:p-8 text-white">
        {!showConfig ? (
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold">{t('title')}</h3>
              <p className="mt-2 text-sm text-white/70">
                {t('desc')}
                {/* Nota: En un futuro, el enlace a /politica-de-privacidad también debería ser dinámico si tienes una ruta para cada idioma */}
                <Link href="/politica-de-privacidad" className="text-[color:var(--cyan)] underline">
                  {t('policy')}
                </Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button onClick={() => setShowConfig(true)} className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold hover:bg-white/10 transition">
                {t('btnConfig')}
              </button>
              <button onClick={() => saveConsent({necessary: true, analytics: true, marketing: true})} className="rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-black text-[color:var(--navy)] hover:bg-[color:var(--cyan-light)] transition">
                {t('btnAccept')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold">{t('configTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <CookieOption label={t('lblNecessary')} checked disabled desc={t('descNecessary')} />
              <CookieOption label={t('lblAnalytics')} checked={consent.analytics} onChange={(v: boolean) => setConsent({...consent, analytics: v})} desc={t('descAnalytics')} />
              <CookieOption label={t('lblMarketing')} checked={consent.marketing} onChange={(v: boolean) => setConsent({...consent, marketing: v})} desc={t('descMarketing')} />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-white/10">
              <button onClick={() => setShowConfig(false)} className="text-sm font-bold text-white/60 hover:text-white transition">
                {t('btnBack')}
              </button>
              <button onClick={() => saveConsent(consent)} className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold transition hover:bg-white/20">
                {t('btnSave')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieOption({ label, checked, onChange, disabled, desc }: CookieOptionProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">{label}</span>
        <input 
          type="checkbox" 
          checked={checked} 
          disabled={disabled} 
          onChange={(e) => onChange?.(e.target.checked)} 
          className={`h-4 w-4 accent-[color:var(--cyan)] ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} 
        />
      </div>
      <p className="text-[10px] text-white/50">{desc}</p>
    </div>
  );
}
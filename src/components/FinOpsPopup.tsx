'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  IconX,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconShieldCheck,
  IconStarFilled,
  IconAward,
  IconLock,
  IconArrowsMaximize,
  IconTable,
} from '@tabler/icons-react';
import { FinOpsCapabilitiesTable } from './FinOpsCapabilitiesTable';

const COOKIE_NAME = 'finops_popup_shown';
const STORAGE_KEY = 'finops-popup-shown';
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const TWENTY_FOUR_HOURS_SEC = 24 * 60 * 60; // 86400 segundos

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function hasSeenPopup(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    // 1. Validar cookie de 24 horas
    if (getCookie(COOKIE_NAME)) return true;

    // 2. Validar timestamp en localStorage (fallback confiable si cookies están limitadas)
    const storedTimestamp = localStorage.getItem(STORAGE_KEY);
    if (storedTimestamp) {
      const time = parseInt(storedTimestamp, 10);
      if (!isNaN(time) && Date.now() - time < TWENTY_FOUR_HOURS_MS) {
        return true;
      }
    }

    // 3. Validar sessionStorage
    if (sessionStorage.getItem(STORAGE_KEY)) return true;

    return false;
  } catch {
    return false;
  }
}

function markPopupAsSeen() {
  if (typeof window === 'undefined') return;
  try {
    setCookie(COOKIE_NAME, '1', TWENTY_FOUR_HOURS_SEC);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Ignorar si el almacenamiento está restringido
  }
}

export function FinOpsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'fullscreen'>('cards');

  const t = useTranslations('finopsPopup');
  const locale = useLocale();
  const finopsLocale = locale === 'pt-BR' ? 'pt-BR' : locale === 'en' ? 'en' : 'es';
  const finopsUrl = `https://finops.cscloudsolutions.com.ar/${finopsLocale}/upgrade`;

  const handleClose = useCallback(() => {
    markPopupAsSeen();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Listener para apertura manual desde cualquier botón del sitio
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-finops-modal', handleOpenEvent);

    // Apertura automática a los 5 segundos solo en la primera visita (cookie 24h)
    let timer: NodeJS.Timeout;
    try {
      if (!hasSeenPopup()) {
        timer = setTimeout(() => {
          if (!hasSeenPopup()) {
            markPopupAsSeen();
            setIsOpen(true);
          }
        }, 5000);
      }
    } catch {
      // Fallback
    }

    return () => {
      window.removeEventListener('open-finops-modal', handleOpenEvent);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  if (viewMode === 'fullscreen') {
    return (
      <FinOpsCapabilitiesTable
        onRevert={() => setViewMode('cards')}
        onClose={handleClose}
        finopsUrl={finopsUrl}
      />
    );
  }

  const proFeatures = (t.raw('pro.features') as string[]) || [];
  const businessFeatures = (t.raw('business.features') as string[]) || [];
  const enterpriseFeatures = (t.raw('enterprise.features') as string[]) || [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="finops-popup-title"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-slate-50/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 border border-white/40 custom-scrollbar">
        {/* Botón de Cierre */}
        <button
          id="finops-popup-close-btn"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[70] p-2.5 text-gray-500 hover:text-gray-900 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all hover:scale-105 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
          aria-label={t('fullscreenClose')}
        >
          <IconX className="w-5 h-5 text-gray-700" stroke={2.5} />
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 pt-2 sm:pt-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--cyan)]/30 bg-[color:var(--cyan)]/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--navy)] mb-3 sm:mb-4">
              <IconSparkles className="w-3.5 h-3.5 text-[color:var(--cyan-dark)]" stroke={2} />
              <span>CSCloud FinOps Platform</span>
            </div>
            <h2 id="finops-popup-title" className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-heading">
              {t('title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              {t('subtitle')}
            </p>

            {/* Acceso directo a la Matriz Comparativa a Pantalla Completa */}
            <div className="mt-4 flex justify-center">
              <button
                id="finops-popup-compare-matrix-btn"
                type="button"
                onClick={() => setViewMode('fullscreen')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100/90 border border-slate-300 shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <IconTable className="w-4 h-4 text-blue-600" />
                <span>{t('compareFullscreen')}</span>
                <IconArrowsMaximize className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Grid de 3 Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* 1. PROFESSIONAL */}
            <div className="bg-white/95 rounded-2xl shadow-md border border-gray-200/90 p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:border-blue-300 relative overflow-hidden">
              <div>
                <div className="flex flex-wrap items-center gap-2 justify-between mb-3">
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-200">
                    <IconAward className="w-3.5 h-3.5 text-blue-700" stroke={2} />
                    <span>{t('pro.badge')}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {t('pro.trial')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{t('pro.name')}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">{t('pro.desc')}</p>

                <div className="h-px bg-gray-100 mb-5" />

                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  {proFeatures.slice(0, 8).map((f, i) => (
                    <li key={i} className="flex items-start">
                      <IconCheck className="w-4 h-4 text-[color:var(--cyan-dark)] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                      <span className={i === 0 ? 'font-semibold text-gray-900' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {proFeatures.length > 8 && (
                <button
                  id="finops-popup-pro-more-btn"
                  type="button"
                  onClick={() => setViewMode('fullscreen')}
                  className="mt-4 pt-2 text-xs font-bold text-[color:var(--cyan-dark)] hover:text-blue-800 transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
                >
                  <span>{t('viewMore', { count: proFeatures.length })}</span>
                  <IconArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    stroke={2.5}
                  />
                </button>
              )}
            </div>

            {/* 2. BUSINESS (Featured) */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[color:var(--navy)] p-6 flex flex-col justify-between relative overflow-hidden transform md:-translate-y-2 ring-4 ring-blue-500/10">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[color:var(--navy)] via-[color:var(--cyan)] to-[color:var(--navy)]" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[color:var(--navy)] text-white text-xs font-extrabold px-3 py-1 rounded-md tracking-wide uppercase">
                    <IconStarFilled className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('business.badge')}</span>
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[color:var(--navy)] mb-2">{t('business.name')}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">{t('business.desc')}</p>

                <div className="h-px bg-gray-100 mb-5" />

                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  {businessFeatures.slice(0, 8).map((f, i) => (
                    <li key={i} className="flex items-start">
                      <IconCheck className="w-4 h-4 text-[color:var(--navy)] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                      <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-gray-900' : ''}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {businessFeatures.length > 8 && (
                <button
                  id="finops-popup-business-more-btn"
                  type="button"
                  onClick={() => setViewMode('fullscreen')}
                  className="mt-4 pt-2 text-xs font-bold text-[color:var(--navy)] hover:text-blue-900 transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
                >
                  <span>{t('viewMore', { count: businessFeatures.length })}</span>
                  <IconArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    stroke={2.5}
                  />
                </button>
              )}
            </div>

            {/* 3. ENTERPRISE (Dark Luxury - Full White Accents for Badge, Text and Checks) */}
            <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white rounded-2xl shadow-xl border border-slate-700 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-md border border-white/20">
                    <IconShieldCheck className="w-3.5 h-3.5 text-white" stroke={2} />
                    <span className="text-white font-bold">{t('enterprise.badge')}</span>
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">{t('enterprise.name')}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">{t('enterprise.desc')}</p>

                <div className="h-px bg-slate-700 mb-5" />

                <ul className="space-y-3 text-xs sm:text-sm text-white">
                  {enterpriseFeatures.slice(0, 8).map((f, i) => (
                    <li key={i} className="flex items-start">
                      <IconCheck className="w-4 h-4 text-white mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                      <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-white' : 'text-slate-100'}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {enterpriseFeatures.length > 8 && (
                <button
                  id="finops-popup-enterprise-more-btn"
                  type="button"
                  onClick={() => setViewMode('fullscreen')}
                  className="mt-4 pt-2 text-xs font-bold text-white hover:text-white/80 transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
                >
                  <span>{t('viewMore', { count: enterpriseFeatures.length })}</span>
                  <IconArrowRight
                    className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1"
                    stroke={2.5}
                  />
                </button>
              )}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="mt-8 sm:mt-10 text-center flex flex-col items-center justify-center gap-3">
            <a
              id="finops-popup-main-cta"
              href={finopsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[color:var(--navy)] to-[#0054A6] hover:from-[#002244] hover:to-[color:var(--navy)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {t('popupCta')}
            </a>
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <IconLock className="w-3.5 h-3.5 text-gray-400" stroke={2} />
              <span>{t('trustBadge')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

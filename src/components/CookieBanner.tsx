'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Leemos si el usuario ya aceptó antes
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    saveConsent(allAccepted);
  };

  const handleSaveSelection = () => {
    saveConsent(consent);
  };

  const saveConsent = (data: typeof consent) => {
    localStorage.setItem('cookie-consent', JSON.stringify(data));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      {/* Estética de tarjeta oscura: Bordes sutiles y fondo semitransparente como las Bento Cards */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[color:rgba(0,174,239,0.22)] bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
        {!showConfig ? (
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold text-white">
                Privacidad y Cookies
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido relevante.
                Podés aceptar todas, rechazarlas o configurar tus preferencias. Revisá nuestra{' '}
                <Link href="/politica-de-privacidad" className="font-bold text-[color:var(--cyan)] underline transition hover:text-[color:var(--cyan-light)]">
                  Política de Privacidad
                </Link>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
              <button
                onClick={() => setShowConfig(true)}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-[color:var(--cyan)]/50 hover:bg-white/10"
              >
                Configurar
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-extrabold text-[color:var(--navy)] shadow-[0_8px_30px_rgba(0,174,239,0.25)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-light)]"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold text-white">
                Configuración de Cookies
              </h3>
              <p className="mt-1 text-sm text-white/75">
                Seleccioná qué cookies permitís que usemos. Las necesarias no se pueden desactivar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Necesarias */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">Necesarias</span>
                  <input type="checkbox" checked readOnly className="h-4 w-4 accent-[color:var(--cyan)] cursor-not-allowed opacity-50" />
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-white/60">Esenciales para el funcionamiento seguro y correcto del sitio.</p>
              </div>

              {/* Analíticas */}
              <div className="rounded-2xl border border-[color:rgba(0,174,239,0.15)] bg-white/5 p-5 transition hover:bg-white/10 cursor-pointer" onClick={() => setConsent({ ...consent, analytics: !consent.analytics })}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">Analíticas</span>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="h-4 w-4 accent-[color:var(--cyan)] cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-white/60">Nos ayudan a entender cómo usás la web para poder mejorarla.</p>
              </div>

              {/* Marketing */}
              <div className="rounded-2xl border border-[color:rgba(0,174,239,0.15)] bg-white/5 p-5 transition hover:bg-white/10 cursor-pointer" onClick={() => setConsent({ ...consent, marketing: !consent.marketing })}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">Marketing</span>
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                    className="h-4 w-4 accent-[color:var(--cyan)] cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-white/60">Para mostrarte anuncios y contenido personalizado en otras plataformas.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => setShowConfig(false)}
                className="px-6 py-3 text-sm font-bold text-white/70 hover:text-white transition"
              >
                Volver atrás
              </button>
              <button
                onClick={handleSaveSelection}
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/20 border border-transparent"
              >
                Guardar selección
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
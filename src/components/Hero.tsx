'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { Link } from '@/i18n/routing';
import { BackgroundOrbs } from './BackgroundOrbs';
import { StatCounter } from './StatCounter';

export function Hero() {
  const t = useTranslations('home.hero');
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Carga diferida del vídeo tras renderizado crítico inicial (1s delay / idle)
    const timer = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        setVideoSrc('/videos/CSCS-Interactivo.mp4');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[color:var(--navy)]">
      {/* CAPA 1 (Video de fondo diferido) */}
      {videoSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              isVideoLoaded ? 'opacity-40' : 'opacity-0'
            }`}
          />
        </div>
      )}

      {/* CAPA 2 (Overlay de degradado corporativo navy para contraste perfecto WCAG) */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-r from-[color:var(--navy)]/90 via-[color:var(--navy)]/75 to-[color:var(--navy)]/80" 
        aria-hidden="true" 
      />

      {/* CAPA 3 (Decoración con orbes) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <BackgroundOrbs />
      </div>

      {/* CAPA 4 (Contenido) */}
      <Container className="relative z-20 grid min-h-[92dvh] items-center gap-12 py-16 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(0,174,239,0.35)] bg-[color:rgba(0,174,239,0.12)] px-4 py-2 text-[12px] sm:text-[11px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm">
            {t('badge')}
          </div>

          <h1 className="mt-6 font-[family:var(--font-heading)] text-[2.75rem] font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {t('titleA')}<br />
            <span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h1>

          <p className="mt-5 max-w-xl text-[1.125rem] sm:text-[17px] leading-relaxed text-white/80">
            {t('sub')}
          </p>

          <div className="mt-8 flex w-full flex-col sm:w-auto sm:flex-row flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#contacto"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-6 py-4 text-base sm:text-sm font-extrabold text-white shadow-[0_16px_45px_rgba(0,79,138,0.30)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-dark)]"
            >
              {t('ctaPrimary')}
            </a>
            <Link
              href="/azure"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-[5px] border border-white/25 bg-white/0 px-6 py-4 text-base sm:text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 lg:justify-start">
            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-white">
                <StatCounter target={20} prefix="+" duration={2000} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s1l')}
              </div>
            </div>

            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-white">
                <StatCounter target={99.9} decimals={1} suffix="%" duration={2500} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s2l')}
              </div>
            </div>

            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-white">
                <StatCounter target={24} duration={1500} />/<StatCounter target={7} duration={1500} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s3l')}
              </div>
            </div>

          </div>
        </div>

        {/* Tarjeta de Auditoría (H2 Corregido) */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(14,26,43,0.25)] flex flex-col items-center text-center lg:items-start lg:text-left mt-8 lg:mt-0">
          <h2 className="text-2xl sm:text-xl font-extrabold text-[color:var(--navy)]">{t('cardTitle')}</h2>
          <p className="mt-3 sm:mt-2 text-base sm:text-sm leading-relaxed text-gray-600">{t('cardSub')}</p>

          <ul className="mt-6 sm:mt-6 space-y-3 sm:space-y-2 text-[15px] sm:text-[13px] text-[color:var(--navy)]/90 text-left w-full max-w-sm lg:max-w-none">
            {t.raw('cardBullets').map((item: string) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 sm:mt-7 w-full rounded-2xl bg-white/0">
            <a
              href="/finops_assesment/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-6 py-4 sm:py-4 text-base sm:text-sm font-extrabold text-white transition hover:bg-[color:var(--cyan-dark)]"
            >
              {t('cardButton')}
            </a>
            <p className="mt-4 sm:mt-3 text-center text-[12px] sm:text-[11px] font-semibold text-gray-500">{t('cardNote')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  IconHome,
  IconArrowLeft,
  IconBrandWindows,
  IconBrandAzure,
  IconShieldCheck,
  IconChartBar,
  IconHeadset,
  IconArrowUpRight,
  IconSparkles,
} from '@tabler/icons-react';

interface NotFoundContentProps {
  translations?: {
    badge?: string;
    status?: string;
    title?: string;
    description?: string;
    backHome?: string;
    goBack?: string;
    contactSupport?: string;
    exploreTitle?: string;
    services?: {
      m365?: { title: string; desc: string };
      azure?: { title: string; desc: string };
      security?: { title: string; desc: string };
      finops?: { title: string; desc: string };
    };
  };
  locale?: string;
}

export function NotFoundContent({ translations, locale = 'es' }: NotFoundContentProps) {
  const router = useRouter();

  // Fallbacks predeterminados elegantes
  const t = {
    badge: translations?.badge || 'Error 404 · Ruta no encontrada',
    status: translations?.status || 'Sistemas Cloud 100% Operativos',
    title: translations?.title || 'Parece que te has perdido en la nube',
    description:
      translations?.description ||
      'La página que buscas no existe, ha cambiado de enlace o se encuentra temporalmente fuera de ruta. No te preocupes, nuestra infraestructura sigue activa.',
    backHome: translations?.backHome || 'Volver al Inicio',
    goBack: translations?.goBack || 'Página Anterior',
    contactSupport: translations?.contactSupport || '¿Necesitas asistencia urgente? Contactar a Soporte',
    exploreTitle: translations?.exploreTitle || 'Explora nuestras soluciones cloud principales',
    services: {
      m365: {
        title: translations?.services?.m365?.title || 'Microsoft 365',
        desc:
          translations?.services?.m365?.desc ||
          'Migraciones seguras, colaboración moderna y licenciamiento corporativo.',
      },
      azure: {
        title: translations?.services?.azure?.title || 'Infraestructura Azure',
        desc:
          translations?.services?.azure?.desc ||
          'Arquitectura cloud resiliente, backup y continuidad operativa.',
      },
      security: {
        title: translations?.services?.security?.title || 'Ciberseguridad & SOC',
        desc:
          translations?.services?.security?.desc ||
          'Protección proactiva de identidades, auditorías y cumplimiento normativo.',
      },
      finops: {
        title: translations?.services?.finops?.title || 'Plataforma FinOps',
        desc:
          translations?.services?.finops?.desc ||
          'Visibilidad, detección de anomalías y reducción del gasto cloud.',
      },
    },
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push('/');
      }
    }
  };

  const serviceCards = [
    {
      href: '/microsoft-365',
      title: t.services.m365.title,
      desc: t.services.m365.desc,
      icon: <IconBrandWindows className="w-6 h-6 text-sky-400" />,
      gradient: 'from-sky-500/20 via-sky-500/10 to-transparent',
      borderColor: 'group-hover:border-sky-400/50',
      badge: 'Productividad',
    },
    {
      href: '/azure',
      title: t.services.azure.title,
      desc: t.services.azure.desc,
      icon: <IconBrandAzure className="w-6 h-6 text-blue-400" />,
      gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
      borderColor: 'group-hover:border-blue-400/50',
      badge: 'Cloud Enterprise',
    },
    {
      href: '/seguridad',
      title: t.services.security.title,
      desc: t.services.security.desc,
      icon: <IconShieldCheck className="w-6 h-6 text-cyan-400" />,
      gradient: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
      borderColor: 'group-hover:border-cyan-400/50',
      badge: 'Zero Trust',
    },
    {
      href: '/finops',
      title: t.services.finops.title,
      desc: t.services.finops.desc,
      icon: <IconChartBar className="w-6 h-6 text-indigo-400" />,
      gradient: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'group-hover:border-indigo-400/50',
      badge: 'Cost Intelligence',
    },
  ];

  return (
    <div className="relative min-h-[85dvh] overflow-hidden bg-[color:var(--navy)] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* CAPA 1: Orbes de luz ambientales en tonos azules y cyan corporativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Orbe superior izquierdo */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full animate-blob-7 blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(0, 174, 239, 0.45) 0%, transparent 70%)' }}
        />
        {/* Orbe superior derecho */}
        <div
          className="absolute top-[5%] -right-[10%] w-[550px] h-[550px] rounded-full animate-blob-8 blur-3xl opacity-35"
          style={{ background: 'radial-gradient(circle, rgba(0, 79, 138, 0.6) 0%, transparent 70%)' }}
        />
        {/* Orbe central inferior */}
        <div
          className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full animate-blob-9 blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(31, 111, 168, 0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* CAPA 2: Malla geométrica tecnológica y viñeta radial */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
        aria-hidden="true"
      />

      {/* CAPA 3: Contenido Principal */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Insignia y Logotipo Corporativo */}
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all hover:border-[color:var(--cyan-light)]/60">
          <div className="flex items-center gap-2">
            <Image
              src="/images/LogoCS.png"
              alt="CSCloudSolutions Emblem"
              width={669}
              height={451}
              priority
              className="h-6 w-auto drop-shadow-[0_0_12px_rgba(0,174,239,0.6)]"
            />
            <span className="text-xs sm:text-sm font-black tracking-wide text-white">
              CS<span className="text-[color:var(--cyan-light)] font-medium">CloudSolutions</span>
            </span>
          </div>

          <div className="h-3.5 w-px bg-white/20" />

          {/* Indicador de estado de infraestructura cloud activa */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline text-white/80">{t.status}</span>
          </div>
        </div>

        {/* Tipografía Monumental 404 con degradado e iluminación */}
        <div className="relative mt-6 sm:mt-8 select-none">
          {/* Brillo difuso detrás del número */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-black tracking-tighter text-[color:var(--cyan-light)] opacity-20 blur-2xl pointer-events-none"
            aria-hidden="true"
          >
            404
          </div>

          {/* Número 404 principal */}
          <span
            className="relative font-[family:var(--font-heading)] text-[6.5rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] font-black leading-none tracking-tight bg-gradient-to-b from-white via-sky-100 to-[color:var(--cyan-light)] bg-clip-text text-transparent drop-shadow-[0_15px_35px_rgba(0,174,239,0.3)]"
          >
            404
          </span>
        </div>

        {/* Chip de Notificación */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,174,239,0.2)]">
          <IconSparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>{t.badge}</span>
        </div>

        {/* Titular y Descripción Explicativa */}
        <h1 className="mt-4 font-[family:var(--font-heading)] text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          {t.title}
        </h1>

        <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-normal">
          {t.description}
        </p>

        {/* Botones de Acción (Rescue CTA Hub) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[color:var(--cyan-light)] to-[color:var(--cyan)] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_0_30px_rgba(0,174,239,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,174,239,0.55)] hover:brightness-110 active:translate-y-0"
          >
            <IconHome className="w-4 h-4" />
            <span>{t.backHome}</span>
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-5 py-3.5 text-sm font-bold text-white/90 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.14] hover:text-white active:translate-y-0 cursor-pointer"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>{t.goBack}</span>
          </button>
        </div>

        {/* Enlace rápido de asistencia técnica */}
        <div className="mt-6">
          <Link
            href="/soporte"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sky-300/80 hover:text-sky-200 transition-colors group"
          >
            <IconHeadset className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="underline underline-offset-4 decoration-sky-400/40 group-hover:decoration-sky-300">
              {t.contactSupport}
            </span>
            <IconArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cuadrícula de Navegación a Soluciones Clave */}
        <div className="mt-14 w-full pt-10 border-t border-white/10">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-white/25" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/60">
              {t.exploreTitle}
            </h2>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-white/25" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {serviceCards.map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${service.borderColor}`}
              >
                {/* Degradado sutil en esquina superior */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-200">
                      {service.icon}
                    </div>
                    <IconArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-white/60 line-clamp-2">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400/80">
                    {service.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-white/50 group-hover:text-white transition-colors">
                    Explorar ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { Link } from '@/i18n/routing';
import { BackgroundOrbs } from './BackgroundOrbs';
import { StatCounter } from './StatCounter';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-[#0B1E3D]">
      
      {/* CAPA 1 (Fondo) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.svg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* CAPA 2 (Filtro) */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(11,30,61,0.10),rgba(26,50,96,0.96))]" />

      {/* CAPA 3 (Decoración) */}
      <div className="absolute inset-0 z-10">
        <BackgroundOrbs />
      </div>

      {/* CAPA 4 (Contenido) */}
      <Container className="relative z-20 grid min-h-[92dvh] items-center gap-12 py-16 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(0,174,239,0.35)] bg-[color:rgba(0,174,239,0.12)] px-4 py-2 text-[12px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)]">
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
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-4 text-base sm:text-sm font-extrabold text-[color:var(--navy)] shadow-[0_16px_45px_rgba(0,174,239,0.30)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-light)]"
            >
              {t('ctaPrimary')}
            </a>
            <Link
              href="/azure"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/25 bg-white/0 px-6 py-4 text-base sm:text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 lg:justify-start">
            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-[color:var(--cyan)]">
                <StatCounter target={20} prefix="+" duration={2000} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s1l')}
              </div>
            </div>

            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-[color:var(--cyan)]">
                <StatCounter target={99.9} decimals={1} suffix="%" duration={2500} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s2l')}
              </div>
            </div>

            <div className="min-w-[120px] text-center">
              <div className="text-3xl font-extrabold text-[color:var(--cyan)]">
                <StatCounter target={24} duration={1500} />/<StatCounter target={7} duration={1500} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/80">
                {t('stats.s3l')}
              </div>
            </div>

          </div>
        </div>

        {/* Tarjeta de Auditoría (H2 Corregido) */}
        <div className="rounded-3xl border border-[color:rgba(0,174,239,0.22)] bg-white/5 p-6 sm:p-8 backdrop-blur flex flex-col items-center text-center lg:items-start lg:text-left mt-8 lg:mt-0">
          <h2 className="text-2xl sm:text-xl font-extrabold text-white">{t('cardTitle')}</h2>
          <p className="mt-3 sm:mt-2 text-base sm:text-sm leading-relaxed text-white/80">{t('cardSub')}</p>

          <ul className="mt-6 sm:mt-6 space-y-3 sm:space-y-2 text-[15px] sm:text-[13px] text-white/90 text-left w-full max-w-sm lg:max-w-none">
            {t.raw('cardBullets').map((item: string) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:rgba(0,174,239,0.18)] text-[color:var(--cyan)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 sm:mt-7 w-full rounded-2xl bg-white/0">
            <a
              href="#contacto"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-4 sm:py-4 text-base sm:text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)]"
            >
              {t('cardButton')}
            </a>
            <p className="mt-4 sm:mt-3 text-center text-[12px] sm:text-[11px] font-semibold text-white/65">{t('cardNote')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
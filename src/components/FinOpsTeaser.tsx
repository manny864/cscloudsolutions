'use client';

import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { Link } from '@/i18n/routing';

const FINOPS_DEMO_URL = 'https://finops.cscloudsolutions.com.ar';

export function FinOpsTeaser() {
  const t = useTranslations('home.finopsTeaser');

  const handleOpenPopup = () => {
    window.dispatchEvent(new CustomEvent('open-finops-modal'));
  };

  return (
    <section className="bg-[color:var(--navy)] py-16">
      <Container className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white mb-4">
            {t('badge')}
          </div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{t('title')}</h2>
          <p className="mt-3 text-white/75 leading-relaxed">{t('sub')}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row shrink-0">
          <button
            type="button"
            onClick={handleOpenPopup}
            className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[color:var(--cyan-dark)] shadow-md hover:scale-105"
          >
            {t('ctaDemo')}
          </button>
          <a
            href="/finops_assesment/cliente.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[5px] border border-[color:var(--cyan)]/40 bg-[color:var(--cyan)]/10 px-6 py-4 text-sm font-bold text-[color:var(--cyan)] transition hover:bg-[color:var(--cyan)]/20 hover:border-[color:var(--cyan)]"
          >
            {t('ctaSprint')}
          </a>
          <Link
            href="/finops"
            className="inline-flex items-center justify-center rounded-[5px] border border-white/25 px-6 py-4 text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
          >
            {t('ctaLearnMore')}
          </Link>
        </div>
      </Container>
    </section>
  );
}

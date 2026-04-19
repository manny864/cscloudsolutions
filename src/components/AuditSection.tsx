'use client';

import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {MotionDiv} from './Motion';

export function AuditSection() {
  const t = useTranslations('home.audit');
  const points = t.raw('points') as string[];

  return (
    <section className="bg-[color:var(--navy)] py-20 text-white">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white">
            {t('badge')}
          </div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t('titleA')} <span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">{t('sub')}</p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-[color:rgba(0,174,239,0.10)] p-7">
            <p className="text-lg font-extrabold">{t('calloutTitle')}</p>
            <p className="mt-2 text-sm text-white/75">{t('calloutSub')}</p>
            <a
              href="#contacto"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)]"
            >
              {t('calloutCta')}
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {points.map((p, idx) => (
            <MotionDiv
              key={p}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.45, delay: idx * 0.03}}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="min-w-8 text-[color:var(--cyan)] font-extrabold">{String(idx + 1).padStart(2, '0')}</div>
              <p className="text-sm leading-snug text-white/75">{p}</p>
            </MotionDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}

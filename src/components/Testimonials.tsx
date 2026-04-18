'use client';

import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {MotionDiv} from './Motion';

type Testi = {quote: string; name: string; role: string; initials: string};

export function Testimonials() {
  const t = useTranslations('home.testimonials');
  const items = t.raw('items') as Testi[];

  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-[color:rgba(0,174,239,0.22)] bg-[color:rgba(0,174,239,0.10)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-dark)]">
            {t('badge')}
          </div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
            {t('titleA')} <span className="text-[color:var(--cyan-dark)]">{t('titleB')}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it, idx) => (
            <MotionDiv
              key={it.name}
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.55, delay: idx * 0.06}}
              className="rounded-2xl border border-[color:var(--gray-200)] bg-white p-8"
            >
              <div className="text-[13px] text-amber-500">★★★★★</div>
              <blockquote className="mt-4 text-sm italic leading-relaxed text-[color:var(--gray-600)]">“{it.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--cyan),var(--navy))] text-sm font-extrabold text-white">
                  {it.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[color:var(--navy)]">{it.name}</div>
                  <div className="text-[12px] text-[color:var(--gray-400)]">{it.role}</div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}

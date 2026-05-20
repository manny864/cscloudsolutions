import {useTranslations} from 'next-intl';
import {Container} from './Container';

type QA = {q: string; a: string};

export function FAQ() {
  const t = useTranslations('home.faq');
  const items = t.raw('items') as QA[];

  return (
    <section className="bg-[color:var(--gray-50)] py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start">
        <div>
          <div className="inline-flex items-center rounded-full border border-[color:rgba(0,174,239,0.22)] bg-[color:rgba(0,174,239,0.10)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--navy)]">
            {t('badge')}
          </div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
            {t('titleA')} <span className="text-[color:var(--cyan-dark)]">{t('titleB')}</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[color:var(--gray-600)]">{t('sub')}</p>
          <a
            href="#contacto"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)]"
          >
            {t('cta')}
          </a>
        </div>

        <div className="space-y-3">
          {items.map((it, idx) => (
            <details 
              key={it.q} 
              name="faq-accordion"
              open={idx === 0 ? true : undefined}
              className="group overflow-hidden rounded-2xl border border-[color:var(--gray-200)] bg-white"
            >
              <summary
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-bold text-[color:var(--navy)] hover:bg-[color:var(--gray-50)] list-none cursor-pointer [&::-webkit-details-marker]:hidden focus-visible:outline-none"
              >
                <span>{it.q}</span>
                <span className="text-xl text-[color:var(--cyan)] transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm leading-relaxed text-[color:var(--gray-600)]">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
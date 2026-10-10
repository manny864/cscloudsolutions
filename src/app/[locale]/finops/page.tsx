import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { ContactSection } from '@/components/ContactSection';
import { StatCounter } from '@/components/StatCounter';
import { Metadata } from 'next';
import { SITE, absoluteUrl } from '@/lib/seo';

const FINOPS_DEMO_URL = 'https://finops.cscloudsolutions.com.ar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.finops' });
  const path = locale === 'es' ? '/finops' : `/${locale}/finops`;

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t.raw('meta.keywords') as string[],
    alternates: {
      canonical: path,
      languages: { es: '/finops', en: '/en/finops', 'pt-BR': '/pt-BR/finops', 'x-default': '/finops' }
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: absoluteUrl(path),
      siteName: SITE.name,
      locale: locale === 'es' ? 'es_AR' : locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function FinOpsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.finops' });
  const pillars = t.raw('pillars.items') as { icon: string; title: string; desc: string }[];
  const features = t.raw('features.items') as { icon: string; title: string; desc: string }[];
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE.url}/finops/#software`,
        name: `${SITE.name} FinOps Platform`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t('meta.description'),
        url: absoluteUrl(locale === 'es' ? '/finops' : `/${locale}/finops`),
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script>/g, '<\\/script>') }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(0,174,239,0.1),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="inline-flex rounded-full border border-white bg-[color:var(--cyan)]/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white mb-6">
            {t('hero.badge')}
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl">
            {t('hero.title')}
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 font-light">
            {t('hero.sub')}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              id="finops-hero-cta-demo"
              href={FINOPS_DEMO_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-white shadow-[0_16px_45px_rgba(0,79,138,0.30)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-dark)]"
            >
              {t('hero.ctaDemo')}
            </a>
            <a
              id="finops-hero-cta-consult"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-[5px] border border-white/25 px-8 py-4 text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
            >
              {t('hero.ctaConsult')}
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-8 sm:gap-12">
            <div className="min-w-[120px]">
              <div className="text-white text-4xl font-extrabold">
                <StatCounter target={35} suffix="%" duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('hero.stat1')}</div>
            </div>
            <div className="min-w-[120px]">
              <div className="text-white text-4xl font-extrabold">
                <StatCounter target={25} suffix="+" duration={1500} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('hero.stat2')}</div>
            </div>
            <div className="min-w-[160px]">
              <div className="text-white text-4xl font-extrabold">100%</div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('hero.stat3')}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* PILARES */}
      <section className="bg-[color:var(--gray-50)] py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              {t('pillars.titleA')} <span className="text-[color:var(--cyan)]">{t('pillars.titleB')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">{t('pillars.sub')}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-xl">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--cyan)]/10 text-3xl">
                  {p.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-[color:var(--navy)]">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              {t('features.titleA')}<br />
              <span className="text-[color:var(--cyan)]">{t('features.titleB')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">{t('features.sub')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-[color:var(--cyan)] to-[#33C3FF] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--cyan)]/10 text-3xl">
                  {f.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[color:var(--navy)]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COPILOT */}
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white mb-6">
              {t('copilot.badge')}
            </div>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--cyan)]/10 text-4xl">
              🤖
            </div>
            <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">{t('copilot.title')}</h2>
            <p className="text-lg leading-relaxed text-white/75">{t('copilot.sub')}</p>
          </div>
        </Container>
      </section>

      {/* TIERS TEASER */}
      <section className="bg-[color:var(--gray-50)] py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              {t('tiers.titleA')} <span className="text-[color:var(--cyan)]">{t('tiers.titleB')}</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{t('tiers.sub')}</p>
            <a
              id="finops-tiers-cta"
              href={`${FINOPS_DEMO_URL}/es/upgrade`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--navy)] px-8 py-4 text-sm font-extrabold text-white transition hover:bg-[color:var(--navy-light)]"
            >
              {t('tiers.cta')}
            </a>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-[5px] bg-[color:var(--navy)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white">
              {t('faq.badge')}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              {t('faq.titleA')} <span className="text-[color:var(--cyan-dark)]">{t('faq.titleB')}</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((it, idx) => (
              <details
                key={it.q}
                id={`finops-faq-item-${idx}`}
                open={idx === 0 ? true : undefined}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <summary id={`finops-faq-summary-${idx}`} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-bold text-[color:var(--navy)] hover:bg-[color:var(--gray-50)] list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                  <span>{it.q}</span>
                  <span className="text-xl text-[color:var(--cyan)] transition duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600">{it.a}</div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[color:var(--navy)] py-20">
        <Container className="text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{t('finalCta.title')}</h2>
          <p className="mb-8 text-lg text-white/75">{t('finalCta.sub')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              id="finops-final-cta-demo"
              href={FINOPS_DEMO_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-white transition hover:bg-[color:var(--cyan-dark)]"
            >
              {t('finalCta.ctaDemo')}
            </a>
            <a
              id="finops-final-cta-consult"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-[5px] border border-white/25 px-8 py-4 text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
            >
              {t('finalCta.ctaConsult')}
            </a>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}

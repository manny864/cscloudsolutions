import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { ContactSection } from '@/components/ContactSection';
import { StatCounter } from '@/components/StatCounter';
import { Metadata } from 'next';
import { SITE, absoluteUrl } from '@/lib/seo';

const FINOPS_LOGIN_URL = 'https://finops.cscloudsolutions.com.ar/es?utm_source=cscloudsolutions&utm_medium=hero_demo&utm_campaign=finops_platform';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.finopsPlatform' });
  const path = locale === 'es' ? '/finops/plataforma' : `/${locale}/finops/plataforma`;
  const ogImage = absoluteUrl('/images/finops/finops-azure-whiteboard-dashboard.png');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t.raw('meta.keywords') as string[],
    alternates: {
      canonical: path,
      languages: {
        es: '/finops/plataforma',
        en: '/en/finops/plataforma',
        'pt-BR': '/pt-BR/finops/plataforma',
        pt: '/pt-BR/finops/plataforma',
        'x-default': '/finops/plataforma',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: absoluteUrl(path),
      siteName: SITE.name,
      locale: locale === 'es' ? 'es_AR' : locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 680,
          alt: t('meta.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [ogImage],
    },
  };
}

export default async function FinOpsPlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.finopsPlatform' });
  const path = locale === 'es' ? '/finops/plataforma' : `/${locale}/finops/plataforma`;

  const pillars = t.raw('pillars.items') as {
    id: string;
    badge: string;
    h2: string;
    geoAnswer: string;
    title: string;
    desc: string;
    features: string[];
    imgAlt: string;
  }[];

  const comparisonRows = t.raw('comparison.rows') as {
    feature: string;
    cscloud: string;
    legacy: string;
    native: string;
  }[];

  const faqItems = t.raw('faq.items') as { q: string; a: string }[];

  const pillarImages: Record<string, string> = {
    visibilidad: '/images/finops/finops-azure-cost-allocation-perspectives.png',
    optimizacion: '/images/finops/finops-azure-zombie-resources-cleanup.png',
    gobernanza: '/images/finops/finops-azure-shift-left-terraform-governance.png',
    copilot: '/images/finops/finops-copilot-ai-cost-optimization.png',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE.url}${path}#software`,
        name: 'CSCloud FinOps Platform',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t('meta.description'),
        url: absoluteUrl(path),
        provider: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
          logo: absoluteUrl(SITE.defaultOgImage),
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '0',
          offerCount: '3',
          offers: [
            {
              '@type': 'Offer',
              name: 'Professional',
              price: '0',
              priceCurrency: 'USD',
              url: FINOPS_LOGIN_URL,
            },
            {
              '@type': 'Offer',
              name: 'Business',
              url: FINOPS_LOGIN_URL,
            },
            {
              '@type': 'Offer',
              name: 'Enterprise',
              url: FINOPS_LOGIN_URL,
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}${path}#faq`,
        mainEntity: faqItems.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: it.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script>/g, '<\\/script>') }}
      />

      {/* STICKY SUB-NAV / QUICK JUMP BAR */}
      <nav
        aria-label="Navegación secundaria de producto"
        className="sticky top-20 z-40 hidden md:block border-b border-black/10 bg-white/90 backdrop-blur-md shadow-xs"
      >
        <Container className="flex items-center justify-between py-3">
          <div className="flex items-center gap-1 sm:gap-4 text-xs font-bold text-[color:var(--navy)]/80">
            <span className="font-extrabold text-[color:var(--cyan)] uppercase tracking-wider hidden lg:inline mr-2">
              FinOps SaaS:
            </span>
            <a href="#overview" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.overview')}
            </a>
            <a href="#visibilidad" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.visibility')}
            </a>
            <a href="#optimizacion" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.optimization')}
            </a>
            <a href="#gobernanza" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.governance')}
            </a>
            <a href="#copilot" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.copilot')}
            </a>
            <a href="#comparativa" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.comparison')}
            </a>
            <a href="#faq" className="px-2.5 py-1 rounded-md transition hover:text-[color:var(--cyan)] hover:bg-[color:var(--cyan)]/10">
              {t('nav.faq')}
            </a>
          </div>

          <a
            id="subnav-cta-demo"
            href="#contacto"
            className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-4 py-1.5 text-xs font-black text-white shadow-xs transition hover:bg-[color:var(--cyan-dark)]"
          >
            {t('hero.ctaDemo')}
          </a>
        </Container>
      </nav>

      {/* HERO SECTION */}
      <section id="overview" className="relative overflow-hidden bg-[color:var(--navy)] pt-20 pb-28 sm:pt-28 sm:pb-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,174,239,0.18),transparent_75%)]" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[color:var(--cyan)]/20 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-light)] mb-6 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[color:var(--success)] animate-pulse" />
            {t('hero.badge')}
          </div>

          {/* H1 */}
          <h1 className="mx-auto max-w-5xl text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-8 text-white tracking-tight">
            {t('hero.title')}
          </h1>

          {/* GEO / AEO Direct Definition Block */}
          <div className="mx-auto max-w-3xl mb-10 rounded-2xl border border-[color:var(--cyan-light)]/40 bg-white/5 p-6 backdrop-blur-md text-left shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-extrabold uppercase tracking-wider text-[color:var(--cyan-light)]">
              <span className="text-base">📌</span> Resumen Ejecutivo / Definición FinOps:
            </div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
              {t('hero.geoDefinition')}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            <a
              id="finops-platform-hero-demo-cta"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-white shadow-[0_16px_45px_rgba(0,79,138,0.40)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-dark)]"
            >
              {t('hero.ctaDemo')}
            </a>
            <a
              id="finops-platform-hero-login-cta"
              href={FINOPS_LOGIN_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-[5px] border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20 hover:border-white"
            >
              {t('hero.ctaLogin')}
            </a>
            <a
              id="finops-platform-hero-doc-cta"
              href="#visibilidad"
              className="inline-flex items-center justify-center rounded-[5px] px-6 py-4 text-sm font-bold text-white/80 hover:text-white transition"
            >
              {t('hero.ctaDocumentation')}
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-6">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <StatCounter target={35} suffix="%" duration={2000} />
              </div>
              <div className="mt-1 text-xs font-medium text-white/70">{t('hero.stat1.lbl')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                <StatCounter target={25} suffix="+" duration={1800} />
              </div>
              <div className="mt-1 text-xs font-medium text-white/70">{t('hero.stat2.lbl')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
              <div className="mt-1 text-xs font-medium text-white/70">{t('hero.stat3.lbl')}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[color:var(--cyan-light)]">FOCUS 1.1</div>
              <div className="mt-1 text-xs font-medium text-white/70">{t('hero.stat4.lbl')}</div>
            </div>
          </div>

          {/* Hero Visual: WhiteBoard Browser Mockup */}
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-white/20 bg-[#0E1A2B]/80 p-2 sm:p-3 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <div className="relative w-full overflow-hidden rounded-xl bg-[#0A121E]">
                <Image
                  src="/images/finops/finops-azure-whiteboard-dashboard.png"
                  alt="Dashboard ejecutivo de FinOps para Azure con visibilidad de costos, ahorro potencial y KPIs financieros en tiempo real"
                  width={1200}
                  height={680}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Trust Badges Bar */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-semibold text-white/70">
            <div className="flex items-center gap-2">
              <span className="text-[color:var(--success)]">✓</span> {t('hero.trust.entra')}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[color:var(--success)]">✓</span> {t('hero.trust.focus')}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[color:var(--success)]">✓</span> {t('hero.trust.lighthouse')}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[color:var(--success)]">✓</span> {t('hero.trust.readonly')}
            </div>
          </div>
        </Container>
      </section>

      {/* PILLARS SECTION (DEEP FUNCTIONAL DIVE) */}
      <section className="bg-[color:var(--gray-50)] py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <div className="inline-flex rounded-full border border-[color:var(--cyan)] bg-[color:var(--cyan)]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)] mb-4">
              {t('pillars.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--navy)] leading-tight mb-4">
              {t('pillars.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {t('pillars.sub')}
            </p>
          </div>

          <div className="space-y-28">
            {pillars.map((pillar, idx) => {
              const isEven = idx % 2 === 0;
              const imageSrc = pillarImages[pillar.id] || '/images/finops/finops-azure-whiteboard-dashboard.png';

              return (
                <article
                  key={pillar.id}
                  id={pillar.id}
                  className="scroll-mt-32 grid gap-12 lg:grid-cols-12 lg:items-center"
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="inline-flex items-center rounded-full bg-[color:var(--cyan)]/10 border border-[color:var(--cyan)]/30 px-3.5 py-1 text-xs font-extrabold text-[color:var(--cyan)] mb-4">
                      {pillar.badge}
                    </div>

                    {/* GEO H2 Question */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[color:var(--navy)] leading-tight mb-4">
                      {pillar.h2}
                    </h2>

                    {/* GEO Direct Answer Box */}
                    <div className="mb-6 rounded-xl border-l-4 border-[color:var(--cyan)] bg-white p-4 shadow-xs">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Respuesta Directa (AEO):
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700 font-medium">
                        {pillar.geoAnswer}
                      </p>
                    </div>

                    <h3 className="text-lg font-bold text-[color:var(--navy)] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-6">
                      {pillar.desc}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8 text-sm text-gray-700">
                      {pillar.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--cyan)] text-white text-[10px] font-bold">
                            ✓
                          </span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-4">
                      <a
                        id={`pillar-cta-${pillar.id}`}
                        href="#contacto"
                        className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--navy)] px-6 py-3 text-xs sm:text-sm font-extrabold text-white transition hover:bg-[color:var(--navy-light)] shadow-xs"
                      >
                        {t('hero.ctaDemo')}
                      </a>
                    </div>
                  </div>

                  {/* Visual Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="rounded-2xl border border-gray-200 bg-white p-2.5 sm:p-3 shadow-xl transition-all duration-300 hover:shadow-2xl">
                      <div className="relative w-full overflow-hidden rounded-xl bg-[#0A121E]">
                        <Image
                          src={imageSrc}
                          alt={pillar.imgAlt}
                          width={1000}
                          height={580}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SPECIALIZED MODULES (VISUAL SHOWCASE: BASES DE DATOS & CONTENEDORES) */}
      <section className="bg-white py-24 sm:py-32 border-t border-gray-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex rounded-full border border-[color:var(--cyan)] bg-[color:var(--cyan)]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)] mb-4">
              {t('specialized.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--navy)] mb-4">
              {t('specialized.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t('specialized.sub')}
            </p>
          </div>

          {/* Visual Showcase: 2 Featured Cards with Real SaaS Screenshots */}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {/* Database MySQL Showcase */}
            <div className="rounded-2xl border border-gray-200 bg-[color:var(--gray-50)] p-6 transition-all hover:border-[color:var(--cyan)] hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex rounded-full bg-[color:var(--cyan)]/10 px-3 py-1 text-xs font-extrabold text-[color:var(--cyan)]">
                  {t('specialized.mysql.badge')}
                </span>
                <span className="text-xs font-semibold text-gray-500">{t('specialized.mysql.tag')}</span>
              </div>
              <h3 className="text-xl font-bold text-[color:var(--navy)] mb-2">
                {t('specialized.mysql.title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {t('specialized.mysql.desc')}
              </p>
              <div className="rounded-xl border border-gray-200 bg-[#0E1A2B] p-2 shadow-md overflow-hidden">
                <Image
                  src="/images/finops/finops-azure-databases-mysql-cost.png"
                  alt={t('specialized.mysql.imgAlt')}
                  width={1000}
                  height={580}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Contenedores Showcase */}
            <div className="rounded-2xl border border-gray-200 bg-[color:var(--gray-50)] p-6 transition-all hover:border-[color:var(--cyan)] hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex rounded-full bg-[color:var(--cyan)]/10 px-3 py-1 text-xs font-extrabold text-[color:var(--cyan)]">
                  {t('specialized.contenedores.badge')}
                </span>
                <span className="text-xs font-semibold text-gray-500">{t('specialized.contenedores.tag')}</span>
              </div>
              <h3 className="text-xl font-bold text-[color:var(--navy)] mb-2">
                {t('specialized.contenedores.title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {t('specialized.contenedores.desc')}
              </p>
              <div className="rounded-xl border border-gray-200 bg-[#0E1A2B] p-2 shadow-md overflow-hidden">
                <Image
                  src="/images/finops/finops-azure-contenedores-cost.png"
                  alt={t('specialized.contenedores.imgAlt')}
                  width={1000}
                  height={580}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Complementary Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-[color:var(--cyan)]">
              <div className="mb-3 text-2xl">🔐</div>
              <h4 className="text-base font-bold text-[color:var(--navy)] mb-1">
                {t('specialized.credentials.title')}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                {t('specialized.credentials.desc')}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-[color:var(--cyan)]">
              <div className="mb-3 text-2xl">⏳</div>
              <h4 className="text-base font-bold text-[color:var(--navy)] mb-1">
                {t('specialized.lifecycle.title')}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                {t('specialized.lifecycle.desc')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUE COMPARISON TABLE (BENCHMARK COMPETITIVO) */}
      <section id="comparativa" className="bg-[color:var(--gray-50)] py-24 sm:py-32 border-t border-gray-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex rounded-full border border-[color:var(--cyan)] bg-[color:var(--cyan)]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)] mb-4">
              {t('comparison.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--navy)] mb-4">
              {t('comparison.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              {t('comparison.subtitle')}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto italic">
              {t('comparison.geoContext')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[color:var(--navy)] text-white text-xs sm:text-sm">
                  <th className="py-4 px-6 font-bold w-1/4">{t('comparison.headers.feature')}</th>
                  <th className="py-4 px-6 font-extrabold bg-[color:var(--cyan)] text-white w-1/3">
                    {t('comparison.headers.cscloud')}
                  </th>
                  <th className="py-4 px-6 font-semibold text-white/80 w-1/4">{t('comparison.headers.legacy')}</th>
                  <th className="py-4 px-6 font-semibold text-white/80 w-1/4">{t('comparison.headers.native')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="py-4 px-6 font-bold text-[color:var(--navy)]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-bold text-[color:var(--cyan-dark)] bg-[color:var(--cyan)]/5">
                      <div className="flex items-start gap-2">
                        <span className="text-[color:var(--success)] font-extrabold text-base">✓</span>
                        <span>{row.cscloud}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {row.legacy}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {row.native}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* FAQ SECTION (GEO / AEO) */}
      <section id="faq" className="bg-white py-24 sm:py-32 border-t border-gray-200">
        <Container className="grid gap-12 lg:grid-cols-[1fr_600px] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-[5px] bg-[color:var(--navy)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white mb-4">
              {t('faq.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--navy)] mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {t('faq.sub')}
            </p>
            <div className="rounded-xl border border-gray-200 bg-[color:var(--gray-50)] p-5">
              <div className="text-xs font-bold text-[color:var(--navy)] uppercase tracking-wider mb-2">
                ¿Necesitás resolver un escenario particular?
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Nuestros arquitectos de soluciones pueden auditar tu arquitectura actual y modelar el ROI proyectado para tu organización.
              </p>
              <a
                id="faq-help-consult-cta"
                href="#contacto"
                className="inline-flex items-center text-xs font-bold text-[color:var(--cyan)] hover:underline"
              >
                Coordinar sesión técnica con un especialista →
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {faqItems.map((it, idx) => (
              <details
                key={it.q}
                id={`finops-platform-faq-item-${idx}`}
                open={idx === 0 ? true : undefined}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition hover:border-[color:var(--cyan)]"
              >
                <summary
                  id={`finops-platform-faq-summary-${idx}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-bold text-[color:var(--navy)] hover:bg-[color:var(--gray-50)] list-none cursor-pointer [&::-webkit-details-marker]:hidden"
                >
                  <span>{it.q}</span>
                  <span className="text-xl text-[color:var(--cyan)] transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-4">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-24 sm:py-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,174,239,0.2),transparent_70%)]" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-light)] mb-6">
            {t('finalCta.badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
            {t('finalCta.title')}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('finalCta.sub')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              id="finops-platform-final-demo-cta"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-[5px] bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-dark)]"
            >
              {t('finalCta.ctaDemo')}
            </a>
            <a
              id="finops-platform-final-login-cta"
              href={FINOPS_LOGIN_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-[5px] border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20 hover:border-white"
            >
              {t('finalCta.ctaLogin')}
            </a>
            <a
              id="finops-platform-final-consult-cta"
              href="#contacto"
              className="inline-flex items-center justify-center rounded-[5px] px-8 py-4 text-sm font-bold text-white/80 hover:text-white transition"
            >
              {t('finalCta.ctaConsult')}
            </a>
          </div>
        </Container>
      </section>

      {/* GLOBAL CONTACT SECTION WITH INQUIRY SOURCE ATTRIBUTION */}
      <ContactSection 
        badge={t('contact.badge')}
        titleA={t('contact.titleA')}
        titleB={t('contact.titleB')}
        sub={t('contact.sub')}
        origen="Agendar Demo - Plataforma FinOps SaaS"
        origenLabel={t('contact.badgeDemo')}
        defaultMessage={t('contact.defaultMessage')}
      />
    </>
  );
}

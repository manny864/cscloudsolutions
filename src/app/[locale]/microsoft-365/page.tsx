import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { ContactSection } from '@/components/ContactSection';
import { StatCounter } from '@/components/StatCounter';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.m365' });
  return createPageMetadata({
    locale,
    path: '/microsoft-365',
    title: t.has('meta.title') ? t('meta.title') : t('title'),
    description: t.has('meta.description') ? t('meta.description') : t('sub'),
  });
}

export default async function M365Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.m365' });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(0,174,239,0.1),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="inline-flex rounded-full border border-white bg-[color:var(--cyan)]/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white mb-6">
            {t('badge')}
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-light">
            {t('sub')}
          </p>
          
          <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
            <div className="min-w-[120px]">
              <div className="text-white text-4xl font-extrabold">
                <StatCounter target={40} prefix="+" duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('stats.migrations')}</div>
            </div>
            <div className="min-w-[120px]">
              <div className="text-white text-4xl font-extrabold">
                <StatCounter target={0} duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('stats.downtime')}</div>
            </div>
            <div className="min-w-[120px]">
              <div className="text-white text-4xl font-extrabold">
                <StatCounter target={100} suffix="%" duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">{t('stats.accompaniment')}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Características / Tarjetas con microinteracciones */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              {t('section.headingPart1')}<br />
              <span className="text-[color:var(--cyan)]">{t('section.headingPart2')}</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">{t('section.sub')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.raw('features').map((feature: any, idx: number) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-[color:var(--cyan)] to-[#33C3FF] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--cyan)]/10 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[color:var(--navy)]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Flujo de Conversión Directo */}
      <ContactSection />
    </>
  );
}
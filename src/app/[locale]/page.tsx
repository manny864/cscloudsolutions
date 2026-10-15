import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { ServiceBento } from '@/components/ServiceBento';
import { AuditSection } from '@/components/AuditSection';
import { FinOpsTeaser } from '@/components/FinOpsTeaser';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { ContactSection } from '@/components/ContactSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE, createPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return createPageMetadata({
    locale,
    path: '/',
    title: { absolute: t('homeTitle') },
    description: t('homeDescription'),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'structured' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ConsultingService',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: 'CSCloudSolutions',
        url: SITE.url,
        description: t('orgDescription'),
        email: SITE.email,
        address: { '@type': 'PostalAddress', addressCountry: 'AR' },
        serviceArea: [
          { '@type': 'Country', name: 'AR' },
          { '@type': 'GeoShape', name: 'Latin America' },
          { '@type': 'Country', name: 'US' },
          { '@type': 'Country', name: 'ES' },
          { '@type': 'Place', name: 'World' },
        ],
        knowsAbout: t.raw('knowsAbout'),
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.raw('faq'),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script>/g, '<\\/script>') }}
      />
      <Hero />
      <ServiceBento />
      <AuditSection />
      <FinOpsTeaser />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}

import {Hero} from '@/components/Hero';
import {ServiceBento} from '@/components/ServiceBento';
import {AuditSection} from '@/components/AuditSection';
import {Testimonials} from '@/components/Testimonials';
import {FAQ} from '@/components/FAQ';
import {ContactSection} from '@/components/ContactSection';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {SITE, absoluteUrl} from '@/lib/seo';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'structured'});

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
        address: {'@type': 'PostalAddress', addressCountry: 'AR'},
        serviceArea: [
          {'@type': 'Country', name: 'AR'},
          {'@type': 'GeoShape', name: 'Latin America'},
          {'@type': 'Country', name: 'US'},
          {'@type': 'Country', name: 'ES'},
          {'@type': 'Place', name: 'World'}
        ],
        knowsAbout: t.raw('knowsAbout')
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.raw('faq')
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/<\/script>/g, '<\\/script>') }} />
      <Hero />
      <ServiceBento />
      <AuditSection />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}

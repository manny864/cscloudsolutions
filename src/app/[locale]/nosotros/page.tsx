import {setRequestLocale, getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {Container} from '@/components/Container';
import {ContactSection} from '@/components/ContactSection';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'pages.about'});

  return (
    <>
      <section className="bg-[color:var(--navy)] py-20 text-white">
        <Container>
          <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest">
            {t('badge')}
          </div>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-white/75">{t('sub')}</p>
          <div className="mt-8 relative h-40 w-full overflow-hidden rounded-2xl border border-white/10">
            /og/og-default.png
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}

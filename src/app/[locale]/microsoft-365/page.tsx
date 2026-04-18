import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/Container';
import {ContactSection} from '@/components/ContactSection';

export default async function M365Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: 'pages.m365'});

  return (
    <>
      <section className="bg-[color:var(--navy)] py-20 text          <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest">      <section className="bg-[color:var(--navy)] py-20 text-white">
            {t('badge')}
          </div>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-white/75">{t('sub')}</p>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
        <Container>

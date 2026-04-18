import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {fontBody, fontHeading} from '../fonts';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {SITE, absoluteUrl} from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  const title = t('homeTitle');
  const description = t('homeDescription');

  return {
    title,
    description,
    alternates: {
      canonical: locale === 'es' ? absoluteUrl('/') : absoluteUrl('/en'),
      languages: {
        es: absoluteUrl('/'),
        en: absoluteUrl('/en')
      }
    },
    openGraph: {
      title,
      description,
      url: locale === 'es' ? absoluteUrl('/') : absoluteUrl('/en'),
      siteName: SITE.name,
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      images: [{url: absoluteUrl('/og/og-default.png'), width: 1200, height: 630, alt: `${SITE.name} — ${title}`}]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og/og-default.png')]
    }
  };
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    // next-intl middleware should prevent this, but keep safe
    setRequestLocale('es');
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="min-h-dvh bg-[color:var(--white)] text-[color:var(--gray-800)]">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-[70dvh]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

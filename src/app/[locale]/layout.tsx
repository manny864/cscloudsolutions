import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {fontBody, fontMono} from '../fonts';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {CookieBanner} from '@/components/CookieBanner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    metadataBase: new URL('https://cscloudsolutions.com.ar'),
    title: {
      default: 'CSCloudSolutions',
      template: '%s | CSCloudSolutions'
    },
    description: t('homeDescription'),
    alternates: {
      canonical: locale === 'es' ? '/' : '/en',
      languages: { es: '/', en: '/en' }
    },
    verification: {
      google: 'FXWGTuJKHNAxiW38Ti-DUn_1ltz7zHhWMStgIaMUlAw',
    },
    // Configuración global para Redes Sociales (LinkedIn, WhatsApp, etc.)
    openGraph: {
      title: 'CSCloudSolutions',
      description: t('homeDescription'),
      url: 'https://cscloudsolutions.com.ar',
      siteName: 'CSCloudSolutions',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
    // Configuración global para Twitter/X
    twitter: {
      card: 'summary_large_image',
      title: 'CSCloudSolutions',
      description: t('homeDescription'),
    },
  };
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) setRequestLocale('es');
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${fontBody.variable} ${fontMono.variable}`}>
      <body className="min-h-dvh bg-white text-[color:var(--gray-800)] antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-[70dvh]">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
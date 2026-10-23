import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import {fontBody, fontMono} from '../fonts';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {CookieBanner} from '@/components/CookieBanner';
import {FinOpsPopup} from '@/components/FinOpsPopup';
import Script from 'next/script';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    metadataBase: new URL('https://cscloudsolutions.com.ar'),
    title: {
      default: t('homeTitle'),
      template: '%s | CSCloudSolutions'
    },
    description: t('homeDescription'),
    verification: {
      google: 'FXWGTuJKHNAxiW38Ti-DUn_1ltz7zHhWMStgIaMUlAw',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: locale === 'es' ? 'https://cscloudsolutions.com.ar' : `https://cscloudsolutions.com.ar/${locale}`,
      siteName: 'CSCloudSolutions',
      locale: locale === 'es' ? 'es_AR' : locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://cscloudsolutions.com.ar/images/Logo_CSCloudSolutions.png',
          width: 1200,
          height: 630,
          alt: t('homeTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: ['https://cscloudsolutions.com.ar/images/Logo_CSCloudSolutions.png'],
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
          <FinOpsPopup />
        </NextIntlClientProvider>

        {/* Google Consent Mode v2 Default Settings */}
        <Script id="google-analytics-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            let consentObj = null;
            try {
              consentObj = JSON.parse(localStorage.getItem('cookie-consent'));
            } catch(e) {}
            
            gtag('consent', 'default', {
              'analytics_storage': (consentObj && consentObj.analytics) ? 'granted' : 'denied',
              'ad_storage': (consentObj && consentObj.marketing) ? 'granted' : 'denied',
              'ad_user_data': (consentObj && consentObj.marketing) ? 'granted' : 'denied',
              'ad_personalization': (consentObj && consentObj.marketing) ? 'granted' : 'denied'
            });
          `}
        </Script>

        {/* Google Analytics Tag - Postergado para no afectar PageSpeed */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-64ZDRF4MGK`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-64ZDRF4MGK', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Apollo Tracker Tag */}
        <Script id="apollo-tracker" strategy="lazyOnload">
          {`
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"6a4bc7e6c53b0b0020bb4678"})},
            document.head.appendChild(o)}initApollo();
          `}
        </Script>
      </body>
    </html>
  );
}

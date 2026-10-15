import { useTranslations, useLocale } from 'next-intl';
import { NotFoundContent } from '@/components/NotFoundContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada | CSCloudSolutions',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  const translations = {
    badge: t('badge'),
    status: t('status'),
    title: t('title'),
    description: t('description'),
    backHome: t('backHome'),
    goBack: t('goBack'),
    contactSupport: t('contactSupport'),
    exploreTitle: t('exploreTitle'),
    services: {
      m365: {
        title: t('services.m365.title'),
        desc: t('services.m365.desc'),
      },
      azure: {
        title: t('services.azure.title'),
        desc: t('services.azure.desc'),
      },
      security: {
        title: t('services.security.title'),
        desc: t('services.security.desc'),
      },
      finops: {
        title: t('services.finops.title'),
        desc: t('services.finops.desc'),
      },
    },
  };

  return <NotFoundContent translations={translations} locale={locale} />;
}
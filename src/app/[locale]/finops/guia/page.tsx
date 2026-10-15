import FinOpsPlatformPage, { generateMetadata as generatePlatformMetadata } from '../plataforma/page';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = await generatePlatformMetadata({ params });
  const canonicalPath = locale === 'es' ? '/finops/plataforma' : `/${locale}/finops/plataforma`;
  return {
    ...meta,
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: '/finops/plataforma',
        en: '/en/finops/plataforma',
        'pt-BR': '/pt-BR/finops/plataforma',
        pt: '/pt-BR/finops/plataforma',
        'x-default': '/finops/plataforma',
      },
    },
  };
}

export default FinOpsPlatformPage;

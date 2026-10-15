import FinOpsPlatformPage, { generateMetadata as generatePlatformMetadata } from '../plataforma/page';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const meta = await generatePlatformMetadata({ params });
  return {
    ...meta,
    alternates: {
      canonical: '/finops/plataforma',
      languages: {
        es: '/finops/plataforma',
        en: '/en/finops/plataforma',
        'pt-BR': '/pt-BR/finops/plataforma',
        'x-default': '/finops/plataforma',
      },
    },
  };
}

export default FinOpsPlatformPage;

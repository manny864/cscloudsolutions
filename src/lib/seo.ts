import type { Metadata } from 'next';

export type Locale = 'es' | 'en' | 'pt-BR';

export const SITE = {
  name: 'CSCloudSolutions',
  domain: 'cscloudsolutions.com.ar',
  url: 'https://cscloudsolutions.com.ar',
  email: 'sales@cscloudsolutions.com.ar',
  whatsapp: '+5492320670178',
  whatsappLink: 'https://wa.me/5492320670178',
  defaultOgImage: '/images/Logo_CSCloudSolutions.png',
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function getLocalizedPath(path: string, locale: string): string {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  if (locale === 'es') {
    return cleanPath || '/';
  }
  return `/${locale}${cleanPath}`;
}

export interface PageMetadataOptions {
  locale: string;
  path: string;
  title: string | { absolute: string };
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = SITE.defaultOgImage,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const canonicalPath = getLocalizedPath(path, locale);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const plainTitle = typeof title === 'string' ? title : title.absolute;

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: getLocalizedPath(path, 'es'),
        en: getLocalizedPath(path, 'en'),
        'pt-BR': getLocalizedPath(path, 'pt-BR'),
        pt: getLocalizedPath(path, 'pt-BR'),
        'x-default': getLocalizedPath(path, 'es'),
      },
    },
    openGraph: {
      title: plainTitle,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: SITE.name,
      locale: locale === 'es' ? 'es_AR' : locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: plainTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: plainTitle,
      description,
      images: [imageUrl],
    },
  };
}

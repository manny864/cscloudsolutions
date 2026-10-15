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

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[], locale: string = 'es') {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(getLocalizedPath(item.path, locale)),
    })),
  };
}

export interface ServiceJsonLdOptions {
  name: string;
  description: string;
  path: string;
  locale: string;
  serviceType?: string;
  areaServed?: string[];
  image?: string;
}

export function createServiceJsonLd({
  name,
  description,
  path,
  locale,
  serviceType = 'Cloud Consulting & Managed Services',
  areaServed = ['Latin America', 'Argentina', 'United States', 'Europe'],
  image = SITE.defaultOgImage,
}: ServiceJsonLdOptions) {
  const serviceUrl = absoluteUrl(getLocalizedPath(path, locale));
  return {
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name,
    description,
    url: serviceUrl,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.defaultOgImage),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.whatsapp,
        contactType: 'sales',
        email: SITE.email,
        availableLanguage: ['es', 'en', 'pt'],
      },
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} Solutions`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            description,
          },
        },
      ],
    },
  };
}

export interface BlogPostingJsonLdOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}

export function createBlogPostingJsonLd({
  title,
  description,
  path,
  locale,
  datePublished,
  dateModified,
  image = SITE.defaultOgImage,
  authorName,
}: BlogPostingJsonLdOptions) {
  const postUrl = absoluteUrl(getLocalizedPath(path, locale));
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const formattedPublish = datePublished.includes('T') ? datePublished : `${datePublished}T09:00:00Z`;
  const formattedModified = (dateModified || datePublished).includes('T')
    ? dateModified || datePublished
    : `${dateModified || datePublished}T09:00:00Z`;

  return {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: title,
    description,
    image: [imageUrl],
    datePublished: formattedPublish,
    dateModified: formattedModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: [
      {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(SITE.defaultOgImage),
        },
      },
      ...(authorName && authorName !== SITE.name
        ? [
            {
              '@type': 'Person',
              name: authorName,
            },
          ]
        : []),
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.defaultOgImage),
      },
    },
  };
}

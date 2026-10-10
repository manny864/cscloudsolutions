import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/admin',
        '/en/admin/',
        '/pt-BR/admin/',
        '/finops_assesment/lib/',
      ],
    },
    sitemap: 'https://cscloudsolutions.com.ar/sitemap.xml',
  };
}
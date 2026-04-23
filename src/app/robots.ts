import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'], // Evitamos que indexe rutas técnicas
    },
    sitemap: 'https://cscloudsolutions.com.ar/sitemap.xml',
  };
}
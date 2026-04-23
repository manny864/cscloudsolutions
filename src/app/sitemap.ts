import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cscloudsolutions.com.ar';
  const locales = ['es', 'en'];

  // 1. Páginas Estáticas (Servicios, Nosotros, etc.)
  const staticPaths = [
    '',
    '/microsoft-365',
    '/azure',
    '/seguridad',
    '/modern-workplace',
    '/power-platform',
    '/soporte',
    '/automations',
    '/agentic-ai',
    '/finops',
    '/nosotros',
    '/blog',
  ];

  const staticEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      staticEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });
  });

  // 2. Páginas Dinámicas del Blog
  const blogEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const posts = await getPosts(locale);
    posts.forEach((post) => {
      blogEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.meta.date),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  }

  return [...staticEntries, ...blogEntries];
}
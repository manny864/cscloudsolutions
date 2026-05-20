import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cscloudsolutions.com.ar';
  const locales = ['es', 'en'];

  // 1. Definimos todas las rutas base del sitio
  const routes = [
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
    '/politica-de-privacidad',
    '/terminos-y-condiciones',
  ];

  // 2. Generamos las entradas para las páginas estáticas (Combinando local + ruta)
  const staticEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      staticEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  // 3. Generamos las entradas para los artículos del blog
  const blogEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    try {
      const posts = getAllPosts(locale);
      posts.forEach((post) => {
        blogEntries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.meta.date),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      });
    } catch (error) {
      console.error(`Error generando sitemap para el blog en idioma: ${locale}`, error);
    }
  }

  // Unimos todo en un solo array
  return [...staticEntries, ...blogEntries];
}
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { blogMapping } from '@/lib/blog-mapping';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cscloudsolutions.com.ar';
  const locales = ['es', 'en', 'pt-BR'];

  // 1. Todas las rutas estáticas públicas del sitio
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
    '/partners',
    '/politica-de-privacidad',
    '/terminos-y-condiciones',
    '/politica-de-reembolso',
  ];

  // 2. Entradas para páginas estáticas (localePrefix: 'as-needed')
  const staticEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url =
        locale === 'es'
          ? `${baseUrl}${route || '/'}`
          : `${baseUrl}/${locale}${route}`;

      staticEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/politica') || route.startsWith('/terminos') ? 0.3 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}${route || '/'}`,
            en: `${baseUrl}/en${route}`,
            'pt-BR': `${baseUrl}/pt-BR${route}`,
            'x-default': `${baseUrl}${route || '/'}`,
          },
        },
      });
    });
  });

  // 3. Entradas para artículos del blog
  const blogEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    try {
      const posts = await getAllPosts(locale);
      posts.forEach((post) => {
        // En caso de estar en borrador, no indexar en el sitemap
        if ((post as any).status === 'draft' || post.meta?.status === 'draft') return;

        const rawDate = post.meta?.date ? new Date(post.meta.date) : new Date();
        const lastModified = isNaN(rawDate.getTime()) ? new Date() : rawDate;

        const url =
          locale === 'es'
            ? `${baseUrl}/blog/${post.slug}`
            : `${baseUrl}/${locale}/blog/${post.slug}`;

        // Obtener mapeo alternativo de idiomas si existe
        const mapping = Object.values(blogMapping).find(
          (m) => m.es === post.slug || m.en === post.slug || m['pt-BR'] === post.slug
        );

        const languages: Record<string, string> = {
          es: `${baseUrl}/blog/${mapping ? mapping.es : post.slug}`,
          en: `${baseUrl}/en/blog/${mapping ? mapping.en : post.slug}`,
          'pt-BR': `${baseUrl}/pt-BR/blog/${mapping ? mapping['pt-BR'] : post.slug}`,
          'x-default': `${baseUrl}/blog/${mapping ? mapping.es : post.slug}`,
        };

        blogEntries.push({
          url,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages,
          },
        });
      });
    } catch (error) {
      console.error(`Error generando sitemap para el blog en idioma: ${locale}`, error);
    }
  }

  return [...staticEntries, ...blogEntries];
}
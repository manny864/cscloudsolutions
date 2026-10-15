import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'Googlebot',
    'Bingbot',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'Google-Extended',
  ];

  const standardDisallow = [
    '/api/',
    '/_next/',
    '/admin/',
    '/admin',
    '/en/admin/',
    '/pt-BR/admin/',
    '/finops_assesment/lib/',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: standardDisallow,
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: standardDisallow,
      })),
    ],
    sitemap: 'https://cscloudsolutions.com.ar/sitemap.xml\n# AI Crawlers Context\nLLMs-Txt: https://cscloudsolutions.com.ar/llms.txt',
  };
}
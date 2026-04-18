export type Locale = 'es' | 'en';

export const SITE = {
  name: 'CSCloudSolutions',
  domain: 'cscloudsolutions.com.ar',
  url: 'https://cscloudsolutions.com.ar',
  email: 'soporte@cscloudsolutions.com.ar',
  whatsapp: '+54 9 2320 67-0178',
  whatsappLink: 'https://wa.me/5492320670178'
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

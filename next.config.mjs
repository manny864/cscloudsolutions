import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Detectamos si estamos en desarrollo
const isDev = process.env.NODE_ENV !== 'production';

// Construimos la directiva de scripts dinámicamente.
// Agregamos 'unsafe-eval' SOLAMENTE en desarrollo para que funcione el Fast Refresh.
const scriptSrc = `script-src 'self' 'unsafe-inline' https://cdn.ampproject.org https://*.ampproject.org https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://gstatic.com https://*.gstatic.com https://www.gstatic.com https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://widget.clutch.co https://clutch.co https://googletagmanager.com https://*.googletagmanager.com https://www.googletagmanager.com https://google-analytics.com https://*.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://assets.apollo.io https://*.apollo.io https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://cloudflareinsights.com ${isDev ? "'unsafe-eval'" : ""}`;

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com https://www.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' https://api.producthunt.com blob: data: https://cscloudsolutions.com.ar https://clutch.co https://*.clutch.co https://gstatic.com https://*.gstatic.com https://www.gstatic.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://google-analytics.com https://*.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://recaptcha.net https://*.recaptcha.net https://static.cloudflareinsights.com https://*.cloudflareinsights.com",
      "frame-src 'self' https://cdn.ampproject.org https://*.ampproject.org https://login.microsoftonline.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://clutch.co https://*.clutch.co https://widget.clutch.co https://td.doubleclick.net https://*.doubleclick.net",
      "connect-src 'self' https://cdn.ampproject.org https://*.ampproject.org https://login.microsoftonline.com https://management.azure.com https://graph.microsoft.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://googletagmanager.com https://*.googletagmanager.com https://www.googletagmanager.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://*.doubleclick.net https://apollo.io https://*.apollo.io https://aplo-evnt.com https://*.aplo-evnt.com https://cloudflareinsights.com https://*.cloudflareinsights.com https://static.cloudflareinsights.com https://*.ingest.sentry.io",
      "object-src 'none'",
    ].join('; '),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    qualities: [60],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // 1. Redirecciones 301 permanentes para eliminar el prefijo /es/ (localePrefix: 'as-needed')
      {
        source: '/es',
        destination: '/',
        permanent: true,
      },
      {
        source: '/es/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // 2. Redirección de alias de idioma portugués /pt hacia /pt-BR
      {
        source: '/pt',
        destination: '/pt-BR',
        permanent: true,
      },
      {
        source: '/pt/:path*',
        destination: '/pt-BR/:path*',
        permanent: true,
      },
      // 3. Redirecciones 301 de URLs legadas de blog (sin prefijo /blog/) hacia su ruta canónica actual
      {
        source: '/5-razones-por-que-tu-pyme-necesita-backup-en-azure',
        destination: '/blog/backup-y-disaster-recovery-en-azure',
        permanent: true,
      },
      {
        source: '/5-razones-por-que-tu-pyme-necesita-backup-en-azure/',
        destination: '/blog/backup-y-disaster-recovery-en-azure',
        permanent: true,
      },
      {
        source: '/por-que-migrar-tu-correo-corporativo-a-microsoft-365',
        destination: '/blog/por-que-migrar-correo-corporativo',
        permanent: true,
      },
      {
        source: '/por-que-migrar-tu-correo-corporativo-a-microsoft-365/',
        destination: '/blog/por-que-migrar-correo-corporativo',
        permanent: true,
      },
      {
        source: '/backup-y-disaster-recovery-en-azure',
        destination: '/blog/backup-y-disaster-recovery-en-azure',
        permanent: true,
      },
      {
        source: '/backup-y-disaster-recovery-en-azure/',
        destination: '/blog/backup-y-disaster-recovery-en-azure',
        permanent: true,
      },
      {
        source: '/azure-nat-gateway-vs-firewall',
        destination: '/blog/azure-nat-gateway-vs-firewall',
        permanent: true,
      },
      {
        source: '/azure-nat-gateway-vs-firewall/',
        destination: '/blog/azure-nat-gateway-vs-firewall',
        permanent: true,
      },
      {
        source: '/migracion-a-azure-un-caso-de-exito',
        destination: '/blog/migracion-azure-caso-exito-manufactura',
        permanent: true,
      },
      {
        source: '/migracion-a-azure-un-caso-de-exito/',
        destination: '/blog/migracion-azure-caso-exito-manufactura',
        permanent: true,
      },
      {
        source: '/post-type-page-sitemap-1.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/migracion-azure-caso-exito-manufactura',
        destination: '/blog/migracion-azure-caso-exito-manufactura',
        permanent: true,
      },
      {
        source: '/migracion-azure-caso-exito-manufactura/',
        destination: '/blog/migracion-azure-caso-exito-manufactura',
        permanent: true,
      },
      {
        source: '/guia-adopcion-caf-azure',
        destination: '/blog/guia-adopcion-caf-azure',
        permanent: true,
      },
      {
        source: '/guia-adopcion-caf-azure/',
        destination: '/blog/guia-adopcion-caf-azure',
        permanent: true,
      },
      {
        source: '/deteccion-de-discos-huerfanos-en-azure',
        destination: '/blog/deteccion-de-discos-huerfanos-en-azure',
        permanent: true,
      },
      {
        source: '/deteccion-de-discos-huerfanos-en-azure/',
        destination: '/blog/deteccion-de-discos-huerfanos-en-azure',
        permanent: true,
      },
      {
        source: '/ia-agentica-en-azure-la-guia-definicion-para-la-autonomia-empresarial',
        destination: '/blog/ia-agentica-en-azure-la-guia-definicion-para-la-autonomia-empresarial',
        permanent: true,
      },
      {
        source: '/ia-agentica-en-azure-la-guia-definicion-para-la-autonomia-empresarial/',
        destination: '/blog/ia-agentica-en-azure-la-guia-definicion-para-la-autonomia-empresarial',
        permanent: true,
      },
      {
        source: '/migracion-correo-exchange-online',
        destination: '/blog/migracion-correo-exchange-online',
        permanent: true,
      },
      {
        source: '/migracion-correo-exchange-online/',
        destination: '/blog/migracion-correo-exchange-online',
        permanent: true,
      },
      {
        source: '/azure-virtual-desktop-solucion-escritorios',
        destination: '/blog/azure-virtual-desktop-solucion-escritorios',
        permanent: true,
      },
      {
        source: '/azure-virtual-desktop-solucion-escritorios/',
        destination: '/blog/azure-virtual-desktop-solucion-escritorios',
        permanent: true,
      },
      {
        source: '/por-que-migrar-correo-corporativo',
        destination: '/blog/por-que-migrar-correo-corporativo',
        permanent: true,
      },
      {
        source: '/por-que-migrar-correo-corporativo/',
        destination: '/blog/por-que-migrar-correo-corporativo',
        permanent: true,
      },
      {
        source: '/reducir-costos-azure-con-finops',
        destination: '/blog/reducir-costos-azure-con-finops',
        permanent: true,
      },
      {
        source: '/reducir-costos-azure-con-finops/',
        destination: '/blog/reducir-costos-azure-con-finops',
        permanent: true,
      },
      {
        source: '/unattached-disks-cost-reduction',
        destination: '/blog/unattached-disks-cost-reduction',
        permanent: true,
      },
      {
        source: '/unattached-disks-cost-reduction/',
        destination: '/blog/unattached-disks-cost-reduction',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/finops_assesment',
        destination: '/finops_assesment/index.html',
      },
      {
        source: '/finops_assesment/',
        destination: '/finops_assesment/index.html',
      },
      {
        source: '/:locale(en|pt-BR)/finops_assesment',
        destination: '/finops_assesment/index.html',
      },
      {
        source: '/:locale(en|pt-BR)/finops_assesment/',
        destination: '/finops_assesment/index.html',
      },
      {
        source: '/:locale(en|pt-BR)/finops_assesment/:path*',
        destination: '/finops_assesment/:path*',
      },
      {
        source: '/cliente.html',
        destination: '/finops_assesment/cliente.html',
      },
      {
        source: '/lib/:path*',
        destination: '/finops_assesment/lib/:path*',
      },
      {
        source: '/img/:path*',
        destination: '/finops_assesment/img/:path*',
      },
      {
        source: '/redirect.html',
        destination: '/finops_assesment/redirect.html',
      },
      {
        source: '/config.js',
        destination: '/finops_assesment/config.js',
      },
    ];
  },
  async headers() {
    return [
      { 
        // 1. Aplica tus cabeceras de seguridad a todas las rutas
        source: '/(.*)', 
        headers: securityHeaders 
      },
      {
        // 2. Previene el guardado en caché del HTML (soluciona el error al hacer push en Hostinger).
        // Excluye las carpetas estáticas y de assets para no perjudicar la velocidad de carga.
        source: '/:path*((?!_next/static|_next/image|images|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      }
    ];
  },
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  {
    silent: true,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);

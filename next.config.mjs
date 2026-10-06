import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Detectamos si estamos en desarrollo
const isDev = process.env.NODE_ENV !== 'production';

// Construimos la directiva de scripts dinámicamente.
// Agregamos 'unsafe-eval' SOLAMENTE en desarrollo para que funcione el Fast Refresh.
const scriptSrc = `script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://gstatic.com https://*.gstatic.com https://www.gstatic.com https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://widget.clutch.co https://clutch.co https://googletagmanager.com https://*.googletagmanager.com https://www.googletagmanager.com https://google-analytics.com https://*.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://assets.apollo.io https://*.apollo.io https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://cloudflareinsights.com ${isDev ? "'unsafe-eval'" : ""}`;

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.gstatic.com https://www.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' https://api.producthunt.com blob: data: https://cscloudsolutions.com.ar https://clutch.co https://*.clutch.co https://gstatic.com https://*.gstatic.com https://www.gstatic.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://google-analytics.com https://*.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://recaptcha.net https://*.recaptcha.net https://static.cloudflareinsights.com https://*.cloudflareinsights.com",
      "frame-src 'self' https://login.microsoftonline.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://clutch.co https://*.clutch.co https://widget.clutch.co https://td.doubleclick.net https://*.doubleclick.net",
      "connect-src 'self' https://login.microsoftonline.com https://management.azure.com https://graph.microsoft.com https://google.com https://*.google.com https://www.google.com https://google.com.ar https://*.google.com.ar https://www.google.com.ar https://recaptcha.net https://*.recaptcha.net https://www.recaptcha.net https://google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://googletagmanager.com https://*.googletagmanager.com https://www.googletagmanager.com https://googleadservices.com https://*.googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://*.doubleclick.net https://apollo.io https://*.apollo.io https://aplo-evnt.com https://*.aplo-evnt.com https://cloudflareinsights.com https://*.cloudflareinsights.com https://static.cloudflareinsights.com https://*.ingest.sentry.io",
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
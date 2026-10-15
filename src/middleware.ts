import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const handleI18nRouting = createMiddleware(routing);

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-content-crawler',
  'chrome-lighthouse',
  'telegrambot',
  'gptbot',
  'claudebot',
  'perplexitybot',
];

export default function middleware(request: NextRequest) {
  // Asegura que las peticiones se procesen con localeDetection: false
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/',
    '/(es|en|pt-BR)/:path*',
    '/((?!api|_next|_vercel|finops_assesment|sitemap\\.xml|robots\\.txt|llms\\.txt|llms-full\\.txt|images|icon\\.png|opengraph-image\\.png|favicon\\.ico|.*\\..*).*)'
  ]
};
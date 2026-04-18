declare module 'next-intl/server' {
  export function getRequestConfig(
    fn: (args: {requestLocale: Promise<string | undefined>}) => Promise<{
      locale: string;
      messages: Record<string, unknown>;
    }>
  ): unknown;
}

declare module 'next-intl/middleware' {
  type RoutingConfig = {
    locales: string[];
    defaultLocale: string;
    localePrefix?: 'always' | 'as-needed' | 'never';
  };

  export default function createMiddleware(config: RoutingConfig): unknown;
}
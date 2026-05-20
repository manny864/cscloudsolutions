export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || '',
      tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.05'),
      environment: process.env.NODE_ENV || 'development',
      sendDefaultPii: false,
    });
  }
}

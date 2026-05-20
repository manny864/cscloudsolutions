'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--navy)] text-white p-6 font-sans">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-black mb-4">Ha ocurrido un error inesperado</h2>
          <p className="text-white/70 text-sm mb-8">
            El sistema ha detectado un problema de renderizado. El reporte de error ha sido enviado automáticamente a nuestro equipo de soporte.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-extrabold text-[color:var(--navy)] hover:bg-[color:var(--cyan-light)] transition"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}

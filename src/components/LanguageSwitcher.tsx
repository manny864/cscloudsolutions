'use client';

import {usePathname, Link} from '@/i18n/routing';
import {useLocale} from 'next-intl';

// Definimos las etiquetas para cada idioma
const labels: Record<string, {short: string; full: string}> = {
  es: {short: 'ES', full: 'Español'},
  en: {short: 'EN', full: 'English'}
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Determinamos cuál es el idioma opuesto al que se encuentra el usuario actualmente
  const otherLocale = locale === 'es' ? 'en' : 'es';

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur hover:bg-white/10 focus-visible:outline-none transition"
      aria-label={`Cambiar idioma a ${labels[otherLocale].full}`}
    >
      {/* Mostramos solo la etiqueta del idioma al que se puede cambiar */}
      {labels[otherLocale].short}
    </Link>
  );
}
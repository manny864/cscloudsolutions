'use client';

import {usePathname, useRouter} from '@/i18n/routing';
import {useLocale} from 'next-intl';

const labels: Record<string, {short: string; full: string}> = {
  es: {short: 'ES', full: 'Español'},
  en: {short: 'EN', full: 'English'}
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function setLocale(nextLocale: 'es' | 'en') {
    router.replace(pathname, {locale: nextLocale});
  }

  const current = (locale === 'en' ? 'en' : 'es') as 'es' | 'en';
  const other = current === 'es' ? 'en' : 'es';

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur hover:bg-white/10 focus-visible:outline-none"
      aria-label={`Cambiar idioma a ${labels[other].full}`}
    >
      {labels[current].short} / {labels[other].short}
    </button>
  );
}

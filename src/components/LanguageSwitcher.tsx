'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const labels: Record<string, string> = {
  es: '🇪🇸 ES',
  en: '🇺🇸 EN',
  'pt-BR': '🇧🇷 PT-BR'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <select
      id="language-switcher-select"
      value={locale}
      onChange={handleChange}
      aria-label="Cambiar idioma / Change language / Mudar idioma"
      className="inline-flex items-center rounded-[5px] border border-black/15 bg-black/[0.03] px-3 py-2 text-xs font-semibold tracking-wide text-[color:var(--navy)] hover:bg-black/[0.06] focus-visible:outline-none transition cursor-pointer"
    >
      {Object.entries(labels).map(([code, label]) => (
        <option key={code} value={code} className="text-[color:var(--navy)]">
          {label}
        </option>
      ))}
    </select>
  );
}

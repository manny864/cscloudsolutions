import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // TODO: agregar 'pt' cuando exista messages/pt.json completo (todas las
  // claves de es.json/en.json traducidas) — next-intl requiere el archivo
  // entero del locale, no solo las secciones nuevas como pages.finops.
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

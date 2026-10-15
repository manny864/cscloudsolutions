import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en', 'pt-BR'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: false
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

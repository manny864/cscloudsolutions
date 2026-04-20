'use client';

import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {Container} from './Container';
import {Logo} from './Logo';
import {LanguageSwitcher} from './LanguageSwitcher';

type NavItem = {href: string; key: string};

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'es' | 'en';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Aquí está el cambio: movimos 'about' (Nosotros) al final de la lista
  const items: NavItem[] = [
    {href: '/', key: 'home'},
    {href: '/azure', key: 'azure'},
    {href: '/microsoft-365', key: 'm365'},
    {href: '/seguridad', key: 'security'},
    {href: '/nosotros', key: 'about'}
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-all ${scrolled ? 'border-white/10 bg-[color:rgba(11,30,61,0.92)] shadow-[0_10px_30px_rgba(0,0,0,0.12)]' : 'border-white/0 bg-[color:rgba(11,30,61,0.78)]'} backdrop-blur`}>
      <div className="bg-[color:var(--navy)] text-[color:var(--gray-300)]">
        <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-[12px]">
          <span className="text-white/90">{t('topbarEmail')}: <a className="font-semibold text-[color:var(--cyan)] hover:underline" href="mailto:soporte@cscloudsolutions.com.ar">soporte@cscloudsolutions.com.ar</a></span>
          <span className="hidden sm:inline">{t('topbarTagline')}</span>
          <a className="font-semibold text-[color:var(--cyan)] hover:underline" href="https://wa.me/5492320670178" target="_blank" rel="noreferrer">WhatsApp: +54 9 2320 67-0178</a>
        </Container>
      </div>

      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav aria-label={t('aria')} className="hidden items-center gap-1 lg:flex">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.key}
                href={it.href}
                locale={locale}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-white/10 text-[color:var(--cyan)]' : 'text-white/85 hover:bg-white/10 hover:text-[color:var(--cyan)]'}`}
              >
                {t(it.key)}
              </Link>
            );
          })}
          {/* El botón CTA siempre se renderiza después de los items */}
          <Link
            href="/#contacto"
            locale={locale}
            className="ml-2 inline-flex items-center rounded-lg bg-[color:var(--cyan)] px-4 py-2 text-sm font-extrabold text-[color:var(--navy)] shadow-[0_10px_30px_rgba(0,174,239,0.25)] transition hover:bg-[color:var(--cyan-light)]"
          >
            {t('cta')}
          </Link>
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <a
            href="#contacto"
            className="inline-flex items-center rounded-lg bg-[color:var(--cyan)] px-4 py-2 text-sm font-extrabold text-[color:var(--navy)]"
          >
            {t('cta')}
          </a>
        </div>
      </Container>
    </header>
  );
}
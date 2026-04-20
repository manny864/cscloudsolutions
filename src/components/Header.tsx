'use client';
import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {Container} from './Container';
import {Logo} from './Logo';
import {LanguageSwitcher} from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'es' | 'en';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    {href: '/', key: 'home'},
    {href: '/microsoft-365', key: 'm365'},
    {href: '/azure', key: 'azure'},
    {href: '/seguridad', key: 'security'},
    {href: '/nosotros', key: 'about'} // Nosotros al final
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-[color:rgba(11,30,61,0.95)] shadow-xl' : 'bg-[color:var(--navy)]'} backdrop-blur-md`}>
      <Container className="flex h-20 items-center justify-between">
        <Logo locale={locale} />
        <nav className="hidden lg:flex items-center gap-2">
          {items.map((it) => (
            <Link key={it.key} href={it.href} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${pathname === it.href ? 'text-[color:var(--cyan)] bg-white/5' : 'text-white/80 hover:text-white'}`}>
              {t(it.key)}
            </Link>
          ))}
          <Link href="/#contacto" className="ml-4 rounded-xl bg-[color:var(--cyan)] px-6 py-2.5 text-sm font-black text-[color:var(--navy)]">
            {t('cta')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </Container>
    </header>
  );
}
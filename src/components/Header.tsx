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
  
  // 1. Añadimos el estado para controlar si el menú de celular está abierto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    {href: '/nosotros', key: 'about'},
    {href: '/blog', key: 'blog'},
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-[color:rgba(11,30,61,0.95)] shadow-xl' : 'bg-[color:var(--navy)]'} backdrop-blur-md`}>
      <Container className="flex h-20 items-center justify-between">
        <Logo locale={locale} />
        
        {/* NAVEGACIÓN DESKTOP (Solo visible en pantallas grandes) */}
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

        {/* BOTÓN HAMBURGUESA (Solo visible en celular/tablet) */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                /* Icono de Cruz (Cerrar) */
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                /* Icono de Hamburguesa (Abrir) */
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* MENÚ DESPLEGABLE MOBILE */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[color:var(--navy)] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl lg:hidden animate-in slide-in-from-top-5 duration-300">
          {items.map((it) => (
            <Link 
              key={it.key} 
              href={it.href} 
              onClick={() => setIsMobileMenuOpen(false)} // Cierra el menú al hacer clic
              className={`text-lg font-bold ${pathname === it.href ? 'text-[color:var(--cyan)]' : 'text-white'}`}
            >
              {t(it.key)}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-white/10">
            <Link 
              href="/#contacto" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex w-full justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-3.5 text-base font-black text-[color:var(--navy)]"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
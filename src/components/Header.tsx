'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Container } from './Container';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'es' | 'en';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const serviceLinks = [
    { href: '/microsoft-365', key: 'm365' },
    { href: '/azure', key: 'azure' },
    { href: '/seguridad', key: 'security' },
    { href: '/modern-workplace', key: 'modern' },
    { href: '/power-platform', key: 'power' },
    { href: '/soporte', key: 'support' },
    { href: '/automations', key: 'automations' }, 
    { href: '/agentic-ai', key: 'agentic' },    
    { href: '/finops', key: 'finops' },          
  ];

  const mainLinks = [
    { href: '/', key: 'home' },
    { href: '/nosotros', key: 'about' },
    { href: '/blog', key: 'blog' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-[color:rgba(11,30,61,0.95)] shadow-xl' : 'bg-[color:var(--navy)]'} backdrop-blur-md`}>
      <Container className="flex h-20 items-center justify-between">
        <Logo locale={locale} />
        
        <nav className="hidden lg:flex items-center gap-2">
          <Link href="/" className={`rounded-lg px-4 py-2 text-sm font-bold transition ${pathname === '/' ? 'text-[color:var(--cyan)] bg-white/5' : 'text-white/80 hover:text-white'}`}>
            {t('home')}
          </Link>

          <div className="group relative">
            <button className="rounded-lg px-4 py-2 text-sm font-bold text-white/80 transition hover:text-white flex items-center gap-1">
              {t('services')}
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute top-full left-0 hidden w-56 flex-col gap-1 rounded-xl border border-white/10 bg-[color:var(--navy)] p-3 shadow-2xl group-hover:flex">
              {serviceLinks.map((it) => (
                <Link key={it.key} href={it.href} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${pathname === it.href ? 'text-[color:var(--cyan)] bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'}`}>
                  {t(it.key)}
                </Link>
              ))}
            </div>
          </div>

          {mainLinks.slice(1).map((it) => (
            <Link key={it.key} href={it.href} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${pathname === it.href ? 'text-[color:var(--cyan)] bg-white/5' : 'text-white/80 hover:text-white'}`}>
              {t(it.key)}
            </Link>
          ))}

          <Link href="/#contacto" className="ml-4 rounded-xl bg-[color:var(--cyan)] px-6 py-2.5 text-sm font-black text-[color:var(--navy)] hover:bg-[#33C3FF] transition">
            {t('cta')}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[color:var(--navy)] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl lg:hidden animate-in slide-in-from-top-5 duration-300 overflow-y-auto max-h-[80vh]">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/' ? 'text-[color:var(--cyan)]' : 'text-white'}`}>
            {t('home')}
          </Link>
          
          <div className="text-sm font-bold uppercase tracking-widest text-white/70 mt-2">{t('services')}</div>
          <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
            {serviceLinks.map((it) => (
              <Link key={it.key} href={it.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === it.href ? 'text-[color:var(--cyan)]' : 'text-white/80'}`}>
                {t(it.key)}
              </Link>
            ))}
          </div>

          <Link href="/nosotros" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold mt-2 ${pathname === '/nosotros' ? 'text-[color:var(--cyan)]' : 'text-white'}`}>
            {t('about')}
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/blog' ? 'text-[color:var(--cyan)]' : 'text-white'}`}>
            {t('blog')}
          </Link>

          <div className="pt-4 mt-2 border-t border-white/10">
            <Link href="/#contacto" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex w-full justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-3.5 text-base font-black text-[color:var(--navy)]">
              {t('cta')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
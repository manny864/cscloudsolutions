'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from './Container';
import Script from 'next/script';

export function Footer() {
  const t = useTranslations('footer');
  const certifications = t.raw('certs') as string[];

  return (
    <footer className="bg-[color:var(--navy)] text-white/80 border-t border-white/10 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl font-black tracking-tight text-white flex items-center">
              CS<span className="text-[color:var(--cyan)]">CloudSolutions</span>
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              {t('brand')}
            </p>

            {/* Widget cargado pasivamente para NO bloquear el CPU ni generar CLS */}
            <div className="pt-2 block min-h-[65px]">
              <Script 
                src="https://widget.clutch.co/static/js/widget.js" 
                strategy="lazyOnload"
              />
              <div 
                className="clutch-widget" 
                data-url="https://widget.clutch.co" 
                data-widget-type="7" 
                data-height="65" 
                data-nofollow="false" 
                data-expandifr="true" 
                data-scale="100" 
                data-clutchcompany-id="2655696"
              ></div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              {t('company')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/nosotros" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="space-y-4 max-w-[260px]">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                {t('certTitle')}
              </h4>
              <ul className="space-y-2 text-xs text-white/70">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2 leading-relaxed">
                    <span className="shrink-0">{cert.split(' ')[0]}</span>
                    <span>{cert.substring(cert.indexOf(' ') + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 shrink-0">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 inline-block overflow-hidden max-w-full">
                <iframe 
                  width="160" 
                  height="160" 
                  src="https://clutch.co/share/badges/2655696/7925?utm_source=clutch_top_company_badge&utm_medium=image_embed" 
                  title="Top Clutch Cybersecurity Company Buenos Aires 2026"
                  className="border-0 block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/70">
          <div>
            &copy; {new Date().getFullYear()} CSCloudSolutions. {t('rights')}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">
              {t('afip')}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
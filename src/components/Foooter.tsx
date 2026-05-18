'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from './Container';

export function Footer() {
  const t = useTranslations('footer');

  // Recuperamos el array de certificaciones del archivo de traducción
  const certifications = t.raw('certs') as string[];

  return (
    <footer className="bg-[color:var(--navy)] text-white/80 border-t border-white/10 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Columna 1: Branding e Información de la Firma */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              CS<span className="text-[color:var(--cyan)]">CloudSolutions</span>
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              {t('brand')}
            </p>
          </div>

          {/* Columna 2: Enlaces de Navegación y Páginas Legales */}
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

          {/* Columna 3: Credenciales de Microsoft y Badge de Clutch */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-4">
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

            {/* Integración del Badge Oficial de Clutch */}
            <div className="pt-2 flex justify-start items-center">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 inline-block overflow-hidden max-w-full">
                <iframe 
                  width="220" 
                  height="220" 
                  src="https://clutch.co/share/badges/2655696/7925?utm_source=clutch_top_company_badge&utm_medium=image_embed" 
                  title="Top Clutch Cybersecurity Company Buenos Aires 2026"
                  className="border-0 block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Barra Inferior de Copyright y Regulaciones */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
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
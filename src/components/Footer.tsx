import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {Link} from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const certs = t.raw('certs') as string[];

  return (
    <footer className="border-t border-white/10 bg-[#060F1E] py-16 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/Logo_CSCloudSolutions.avif"
              alt="CSCloudSolutions"
              width={180}
              height={52}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{t('brand')}</p>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-white">{t('company')}</div>
            <div className="mt-4 space-y-2">
              <Link href="/nosotros" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">{t('about')}</Link>
              <a href="https://cscloudsolutions.com.ar/blog/" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">{t('blog')}</a>
              <a href="https://cscloudsolutions.com.ar/politica-de-privacidad/" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">{t('privacy')}</a>
              <a href="https://cscloudsolutions.com.ar/terminos-y-condiciones/" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">{t('terms')}</a>
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-white">{t('contact')}</div>
            <div className="mt-4 space-y-2">
              <a href="https://www.linkedin.com/company/cscloudsolutions/" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">LinkedIn</a>
              <a href="https://www.instagram.com/cscloudsolutions/" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">Instagram</a>
              <a href="https://wa.me/5492320670178" target="_blank" rel="noreferrer" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">WhatsApp</a>
              <a href="mailto:soporte@cscloudsolutions.com.ar" className="block text-sm text-white/65 hover:text-[color:var(--cyan)]">soporte@cscloudsolutions.com.ar</a>
            </div>
          </div>

          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-white">{t('certTitle')}</div>
            <div className="mt-4 flex flex-col gap-2">
              {certs.map((c) => (
                <span key={c} className="rounded-lg border border-[color:rgba(0,174,239,0.30)] bg-white/5 px-3 py-2 text-[12px] font-bold text-[color:var(--cyan-light)]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/60">© {year} CSCloudSolutions. {t('rights')}</p>
          <a
            href="http://qr.afip.gob.ar/?qr=2p7AhQ5dXrOZoD0kq46YNg,,"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-white/60 hover:text-[color:var(--cyan)]"
          >
            {t('afip')}
          </a>
        </div>
      </Container>
    </footer>
  );
}

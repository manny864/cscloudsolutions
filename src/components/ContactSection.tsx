import Script from 'next/script';
import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {ContactForm} from './ContactForm';
import {SITE} from '@/lib/seo';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contacto" className="bg-[color:var(--navy)] py-20 text-white">
      <Script
        id="recaptcha-v3"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}`}
        strategy="afterInteractive"
      />

      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white">
            {t('badge')}
          </div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold sm:text-4xl">
            {t('titleA')} <span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">{t('sub')}</p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl">📱</div>
              <div>
                <div className="text-sm font-extrabold">{t('whatsTitle')}</div>
                <a className="text-sm font-bold text-[color:var(--cyan)] hover:underline" href={SITE.whatsappLink} target="_blank" rel="noreferrer">{SITE.whatsapp}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl">📧</div>
              <div>
                <div className="text-sm font-extrabold">{t('emailTitle')}</div>
                <a className="text-sm font-bold text-white/80 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}

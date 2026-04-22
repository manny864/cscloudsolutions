import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {ContactForm} from './ContactForm';
import {SITE} from '@/lib/seo';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contacto" className="bg-[color:var(--navy)] py-20 text-white">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffffff]/5 text-[#ffffff]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </div>
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
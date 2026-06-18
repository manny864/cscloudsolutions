import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';

export default function RefundPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('refundPolicy');

  return (
    <div className="py-24 bg-[color:var(--navy)] min-h-screen text-white/90">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">{t('title')}</h1>
          <p className="text-sm text-white/50 mb-8">{t('updated')}</p>
          <p className="text-lg leading-relaxed text-white/80 mb-12">{t('intro')}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('saasTitle')}</h2>
              <p className="text-white/70 leading-relaxed mb-2">{t('saasContent1')}</p>
              <ul className="list-disc pl-5 text-white/70 space-y-2">
                <li><strong>{t('saasTrial').split(':')[0]}:</strong>{t('saasTrial').split(':')[1]}</li>
                <li><strong>{t('saasAfter').split(':')[0]}:</strong>{t('saasAfter').split(':')[1]}</li>
                <li><strong>{t('saasCancel').split(':')[0]}:</strong>{t('saasCancel').split(':')[1]}</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('consultingTitle')}</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>{t('consultingContent1')}</p>
                <p>{t('consultingContent2')}</p>
                <p>{t('consultingContent3')}</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('paymentsTitle')}</h2>
              <p className="text-white/70 leading-relaxed">{t('paymentsContent')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('exceptionsTitle')}</h2>
              <p className="text-white/70 leading-relaxed">{t('exceptionsContent')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('contactTitle')}</h2>
              <p className="text-white/70 leading-relaxed">
                {t('contactContent')}
                <a href="mailto:soporte@cscloudsolutions.com.ar" className="text-[color:var(--cyan)] hover:underline ml-1">
                  soporte@cscloudsolutions.com.ar
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}

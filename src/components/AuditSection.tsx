import {useTranslations} from 'next-intl';
import {Container} from './Container';

export function AuditSection() {
  const t = useTranslations('home.audit');

  return (
    <section className="relative overflow-hidden bg-[color:var(--navy)] py-24">
      <Container className="relative z-20">
        <div className="grid items-center gap-16 lg:grid-cols-2 text-white">
          <div>
            <div className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">{t('badge')}</div>
            <h2 className="mt-8 font-heading text-4xl font-extrabold sm:text-6xl">{t('titleA')} <br/><span className="text-[color:var(--cyan)]">{t('titleB')}</span></h2>
            <p className="mt-6 text-lg text-white/80">{t('sub')}</p>
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a href="#contacto" className="rounded-[5px] bg-[color:var(--cyan)] px-8 py-4 font-black text-white shadow-2xl hover:bg-[color:var(--cyan-dark)] transition inline-flex items-center">
                {t('calloutCta')}
              </a>
              <a
                href="/finops_assesment/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[5px] border border-white/30 bg-white/10 px-8 py-4 font-bold text-white shadow-xl hover:bg-white/20 hover:border-white/50 transition inline-flex items-center gap-2"
              >
                {t('calloutFinops')}
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.raw('points').map((point: string, idx: number) => (
              <div key={idx} className="group rounded-2xl border border-white bg-white/5 p-6 backdrop-blur-sm hover:border-[color:var(--cyan)] transition">
                <div className="text-2xl font-black text-white opacity-40 transition group-hover:opacity-100">{(idx + 1).toString().padStart(2, '0')}</div>
                <h3 className="mt-3 font-bold text-white/90">{point}</h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
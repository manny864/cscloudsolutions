import {useTranslations} from 'next-intl';
import {Container} from './Container';
import Image from 'next/image';

export function AuditSection() {
  const t = useTranslations('home.audit');

  return (
    <section className="relative overflow-hidden bg-[#060F1E] py-24">
      <div className="absolute inset-0 z-0 opacity-90">
        <Image src="/images/section-bg.svg" alt="" aria-hidden="true" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 z-10 bg-[rgba(11,30,61,0.15)]" />
      <Container className="relative z-20">
        <div className="grid items-center gap-16 lg:grid-cols-2 text-white">
          <div>
            <div className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[color:var(--cyan-light)]">{t('badge')}</div>
            <h2 className="mt-8 font-heading text-4xl font-extrabold sm:text-6xl">{t('titleA')} <br/><span className="text-[color:var(--cyan)]">{t('titleB')}</span></h2>
            <p className="mt-6 text-lg text-white/70">{t('sub')}</p>
            <div className="mt-10"><a href="#contacto" className="rounded-xl bg-[color:var(--cyan)] px-10 py-5 font-black text-[color:var(--navy)] shadow-2xl">{t('calloutCta')}</a></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.raw('points').map((point: string, idx: number) => (
              <div key={idx} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[color:var(--cyan)]/50 transition">
                <div className="text-2xl font-black text-[color:var(--cyan)] opacity-40 transition group-hover:opacity-100">{(idx + 1).toString().padStart(2, '0')}</div>
                <h3 className="mt-3 font-bold text-white/90">{point}</h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
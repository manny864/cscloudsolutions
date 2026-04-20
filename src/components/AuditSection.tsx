import {useTranslations} from 'next-intl';
import {Container} from './Container';
import Image from 'next/image';

export function AuditSection() {
  const t = useTranslations('home.audit');

  return (
    <section className="relative overflow-hidden bg-[#060F1E] py-24">
      
      {/* CAPA 1: La imagen de fondo SVG */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg.svg"
          alt=""
          fill
          className="object-cover opacity-90" // Opacidad ajustada al 90%
        />
      </div>

      {/* CAPA 2: El filtro oscuro */}
      <div className="absolute inset-0 z-10 bg-[rgba(11,30,61,0.10)]" />

      {/* CAPA 3: El Contenido */}
      <Container className="relative z-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-[color:rgba(0,174,239,0.30)] bg-[color:rgba(0,174,239,0.10)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-light)]">
              {t('badge')}
            </div>
            <h2 className="mt-6 font-[family:var(--font-heading)] text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t('titleA')} <br />
              <span className="text-[color:var(--cyan)]">{t('titleB')}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {t('sub')}
            </p>
            
            <div className="mt-10">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-[color:var(--navy)] shadow-[0_20px_50px_rgba(0,174,239,0.20)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-light)]"
              >
                {/* Aquí está el cambio clave: calloutCta */}
                {t('calloutCta')}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.raw('points').map((p: {id: string; title: string}, idx: number) => (
              <div
                key={p.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[color:var(--cyan)]/50 hover:bg-white/10"
              >
                <div className="text-xl font-black text-[color:var(--cyan)] opacity-40 transition group-hover:opacity-100">
                  {p.id}
                </div>
                <h4 className="mt-2 text-[15px] font-bold text-white/90">
                  {p.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
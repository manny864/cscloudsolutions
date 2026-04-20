import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {Link} from '@/i18n/routing';
import {BackgroundOrbs} from './BackgroundOrbs';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-[#0B1E3D]">
      
      {/* CAPA 1 (Fondo): La imagen SVG original */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* CAPA 2 (Filtro): El gradiente oscuro superpuesto a la imagen para que el texto sea legible */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(11,30,61,0.10),rgba(26,50,96,0.96))]" />

      {/* CAPA 3 (Decoración): Los orbes animados */}
      <div className="absolute inset-0 z-10">
        <BackgroundOrbs />
      </div>

      {/* CAPA 4 (Contenido): El texto y los botones al frente de todo */}
      <Container className="relative z-20 grid min-h-[92dvh] items-center gap-12 py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(0,174,239,0.35)] bg-[color:rgba(0,174,239,0.12)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)]">
            {t('badge')}
          </div>

          <h1 className="mt-6 font-[family:var(--font-heading)] text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {t('titleA')}<br />
            <span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
            {t('sub')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-4 text-sm font-extrabold text-[color:var(--navy)] shadow-[0_16px_45px_rgba(0,174,239,0.30)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-light)]"
            >
              {t('ctaPrimary')}
            </a>
            <Link
              href="/azure"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/0 px-6 py-4 text-sm font-bold text-white/95 transition hover:border-[color:var(--cyan)] hover:bg-white/5 hover:text-[color:var(--cyan)]"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            {[
              {n: t('stats.s1n'), l: t('stats.s1l')},
              {n: t('stats.s2n'), l: t('stats.s2l')},
              {n: t('stats.s3n'), l: t('stats.s3l')}
            ].map((s) => (
              <div key={s.l} className="min-w-[120px] text-center">
                <div className="text-3xl font-extrabold text-[color:var(--cyan)]">{s.n}</div>
                <div className="mt-1 text-[12px] font-semibold text-white/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[color:rgba(0,174,239,0.22)] bg-white/5 p-8 backdrop-blur">
          <h3 className="text-xl font-extrabold text-white">{t('cardTitle')}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">{t('cardSub')}</p>

          <ul className="mt-6 space-y-2 text-[13px] text-white/80">
            {t.raw('cardBullets').map((item: string) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:rgba(0,174,239,0.18)] text-[color:var(--cyan)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl bg-white/0">
            <a
              href="#contacto"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-4 text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)]"
            >
              {t('cardButton')}
            </a>
            <p className="mt-3 text-center text-[11px] font-semibold text-white/65">{t('cardNote')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
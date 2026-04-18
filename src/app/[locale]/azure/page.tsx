
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Container} from '@/components/Container';
import Image from 'next/image';
import {ContactSection} from '@/components/ContactSection';

export default async function AzurePage({{params}}: {{params: Promise<{locale: string}>}}) {{
  const {{locale}} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({{locale, namespace: 'pages.azure'}});

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-20 text-white">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Image src="/images/section-bg.svg" alt="" fill className="object-cover" />
        </div>
        <Container>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest">{{t('badge')}}</div>
          <h1 className="mt-4 max-w-3xl font-[family:var(--font-heading)] text-3xl font-extrabold sm:text-5xl">{{t('title')}}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">{{t('sub')}}</p>
          <div className="mt-10 flex flex-wrap gap-8">
            {{(t.raw('stats') as any[]).map((s) => (
              <div key={s.l} className="min-w-[140px] text-center">
                <div className="text-3xl font-extrabold text-[color:var(--cyan)]">{s.n}</div>
                <div className="mt-1 text-[12px] font-semibold text-white/70">{s.l}</div>
              </div>
            ))}}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="inline-flex items-center rounded-full border border-[color:rgba(0,174,239,0.22)] bg-[color:rgba(0,174,239,0.10)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-dark)]">{{t('featuresBadge')}}</div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">{{t('featuresTitleA')}} <span className="text-[color:var(--cyan-dark)]">{{t('featuresTitleB')}}</span></h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {{(t.raw('features') as any[]).map((f) => (
              <div key={f.t} className="rounded-2xl border border-[color:var(--gray-200)] bg-white p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,174,239,0.12),rgba(0,174,239,0.06))] text-2xl">{f.i}</div>
                <h3 className="mt-5 text-lg font-extrabold text-[color:var(--navy)]">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--gray-600)]">{f.d}</p>
              </div>
            ))}}
          </div>

          <div className="mt-14 rounded-3xl border border-[color:rgba(0,174,239,0.20)] bg-[color:var(--gray-50)] p-10">
            <h3 className="text-xl font-extrabold text-[color:var(--navy)]">{{t('ctaTitle')}}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--gray-600)]">{{t('ctaSub')}}</p>
            <a href="#contacto" className="mt-6 inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-6 py-3 text-sm font-extrabold text-[color:var(--navy)] transition hover:bg-[color:var(--cyan-light)]">{{t('ctaButton')}}</a>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}}

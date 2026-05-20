import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tPages = await getTranslations({ locale, namespace: 'pages.about' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });
  return {
    title: tPages('title'),
    description: tAbout('hero.sub'),
  };
}

export default async function NosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tPages = await getTranslations({ locale, namespace: 'pages.about' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });

  return (
    <main className="bg-white min-h-screen">
      {/* ENCABEZADO MAESTRO (Lado a lado, Proporción original) */}
      <section className="bg-[color:var(--navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Image src="/images/hero-bg.svg" alt="" fill className="object-cover" />
        </div>
        
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Imagen del Hero (Lado Izquierdo) */}
            <div className="w-full md:w-[400px] flex-shrink-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                  src={tAbout('hero.image')} 
                  alt={tPages('title')}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Texto del Hero (Lado Derecho) */}
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-[color:rgba(0,174,239,0.15)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[color:var(--cyan)] ring-1 ring-inset ring-[color:rgba(0,174,239,0.3)]">
                {tPages('title')}
              </span>
              <h1 className="mt-6 font-[family:var(--font-heading)] text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
                {tAbout('hero.title')}<span className="text-[color:var(--cyan)]">{tAbout('hero.titleAccent')}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80 max-w-xl">
                {tAbout('hero.sub')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENIDO ESTRATÉGICO (SEO e IA Friendly) */}
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Historia con Imagen a la Derecha */}
            <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
              <div className="flex-1">
                <h2 className="font-[family:var(--font-heading)] text-3xl font-extrabold text-[color:var(--navy)] mb-6">
                  {tAbout('content.history_title')}
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-[color:var(--gray-600)]">
                  <p>{tAbout('content.history_p1')}</p>
                  <p>{tAbout('content.history_p2')}</p>
                </div>
              </div>
              <div className="w-full md:w-[320px] flex-shrink-0 order-first md:order-last">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                   <Image 
                    src="/images/blog/Comunicacion-Clara-y-Transparente.avif" 
                    alt="Estrategia Cloud" 
                    width={400} height={400} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Pilares Centrados para IA (AIO/GEO) */}
            <div className="text-center mb-16">
              <h2 className="font-[family:var(--font-heading)] text-3xl font-extrabold text-[color:var(--navy)]">
                {tAbout('content.approach_title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[color:var(--gray-50)] p-8 rounded-3xl border border-gray-100 transition-transform hover:-translate-y-1">
                  <div className="w-10 h-10 bg-[color:var(--navy)] text-white rounded-full flex items-center justify-center font-bold mb-6">
                    0{i}
                  </div>
                  <h3 className="font-[family:var(--font-heading)] text-lg font-bold text-[color:var(--navy)] mb-3">
                    {tAbout(`content.m${i}_t` as any)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--gray-600)]">
                    {tAbout(`content.m${i}_d` as any)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
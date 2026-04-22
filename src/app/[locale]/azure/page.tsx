import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { ContactSection } from '@/components/ContactSection';
import { StatCounter } from '@/components/StatCounter';

export default async function AzurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.azure' });

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--navy)] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(0,174,239,0.1),transparent_70%)]" />
        <Container className="relative z-10">
          <div className="inline-flex rounded-full border border-white/15 bg-[color:var(--cyan)]/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan)] mb-6">
            {t('badge')}
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-light">
            {t('sub')}
          </p>
          
          <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
            <div className="min-w-[120px]">
              <div className="text-[color:var(--cyan)] text-4xl font-extrabold">
                <StatCounter target={99.9} decimals={1} suffix="%" duration={2500} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">SLA Operativo</div>
            </div>
            <div className="min-w-[120px]">
              <div className="text-[color:var(--cyan)] text-4xl font-extrabold">
                <StatCounter target={35} suffix="%" duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">Ahorro Promedio (FinOps)</div>
            </div>
            <div className="min-w-[120px]">
              <div className="text-[color:var(--cyan)] text-4xl font-extrabold">
                <StatCounter target={100} suffix="%" duration={2000} />
              </div>
              <div className="mt-1 text-sm font-semibold text-white/80">Adaptabilidad</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl">
              El poder de las grandes corporaciones,<br />
              <span className="text-[color:var(--cyan)]">adaptado a tu escala</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Comprar servidores físicos ya no es rentable ni seguro. Te ayudamos a modernizar tu centro de datos migrando a Azure. Pagas solo por lo que consumes, con la tranquilidad de estar respaldado por la nube más robusta del mundo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🖥️', title: 'Servidores Virtuales (IaaS)', desc: 'Migramos tus servidores locales (Windows/Linux) a la nube. Ideal para sistemas ERP y directorios activos, con escalabilidad elástica.' },
              { icon: '🗄️', title: 'Bases de Datos Gestionadas', desc: 'Olvídate del mantenimiento tedioso. Implementamos SQL Database (PaaS) con copias de seguridad automáticas y alta disponibilidad.' },
              { icon: '🌐', title: 'Redes y Conectividad Híbrida', desc: 'Conectamos tu oficina directamente a Azure mediante VPNs seguras, con arquitecturas de red de alto rendimiento.' },
              { icon: '💾', title: 'Disaster Recovery y Backup', desc: 'Aseguramos la continuidad de tu negocio. Orquestamos la recuperación para que tu empresa se levante en la nube en tiempo récord.' },
              { icon: '💻', title: 'Azure Virtual Desktop (AVD)', desc: 'Escritorios virtuales para que tu equipo acceda a su entorno (Windows 11) desde cualquier dispositivo, de forma segura.' },
              { icon: '💰', title: 'Optimización de Costos (FinOps)', desc: 'Monitorizamos tu consumo. Aplicamos Right-sizing e instancias reservadas para que cada dólar invertido genere valor.' },
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-[color:var(--cyan)] to-[#33C3FF] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--cyan)]/10 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[color:var(--navy)]">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
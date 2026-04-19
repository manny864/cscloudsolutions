'use client';

import {useTranslations} from 'next-intl';
import {Container} from './Container';
import {MotionDiv} from './Motion';
import {Link} from '@/i18n/routing';

type Item = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  label: string; 
};

// 1. Definimos la animación del contenedor (la grilla)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Tiempo de espera entre cada tarjeta
    },
  },
};

// 2. Definimos la animación de cada tarjeta individual
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export function ServiceBento() {
  const t = useTranslations('home.services');

  const items: Item[] = [
    {icon: '📧', title: t('m365.title'),     desc: t('m365.desc'),     href: '/microsoft-365',    label: t('m365.title')},
    {icon: '☁️', title: t('azure.title'),    desc: t('azure.desc'),    href: '/azure',             label: t('azure.title')},
    {icon: '🔐', title: t('security.title'), desc: t('security.desc'), href: '/seguridad',         label: t('security.title')},
    {icon: '💼', title: t('modern.title'),   desc: t('modern.desc'),   href: '/modern-workplace',  label: t('modern.title')},
    {icon: '⚡', title: t('power.title'),    desc: t('power.desc'),    href: '/power-platform',    label: t('power.title')},
    {icon: '🛠️', title: t('support.title'),  desc: t('support.desc'),  href: '/soporte',           label: t('support.title')}
  ];

  return (
    <section className="bg-[color:var(--gray-50)] py-20">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-[color:rgba(0,174,239,0.22)] bg-[color:rgba(0,174,239,0.10)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-dark)]">
            {t('badge')}
          </div>
          <h2 className="mt-4 font-[family:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-4xl">
            {t('titleA')} <span className="text-[color:var(--cyan-dark)]">{t('titleB')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[color:var(--gray-600)]">
            {t('sub')}
          </p>
        </div>

        {/* 3. Convertimos el div de la grilla en un MotionDiv para controlar los hijos */}
        <MotionDiv 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => (
            <MotionDiv
              key={it.title}
              variants={itemVariants} // 4. Cada hijo hereda el disparador del padre
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--gray-200)] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-[0_20px_60px_rgba(0,174,239,0.12)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,var(--cyan),var(--cyan-light))] transition group-hover:scale-x-100" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(0,174,239,0.12),rgba(0,174,239,0.06))] text-2xl">
                {it.icon}
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-[color:var(--navy)]">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--gray-600)]">{it.desc}</p>
              <Link
                href={it.href}
                aria-label={`${t('more')} ${it.label}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--cyan-dark)] transition group-hover:gap-3"
              >
                {t('more')} <span aria-hidden>→</span>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </Container>
    </section>
  );
}
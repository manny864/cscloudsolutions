import { readFileSync } from 'fs';
import path from 'path';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import './partners.css';
import { PartnersCalculator } from './PartnersCalculator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.partners' });
  return { title: t('title'), description: t('description') };
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const html = readFileSync(path.join(process.cwd(), 'src/content/partners', `${locale}.html`), 'utf8');

  return (
    <div className="partners-page">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <PartnersCalculator locale={locale} />
    </div>
  );
}

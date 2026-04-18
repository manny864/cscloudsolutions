import {Container} from '@/components/Container';
import {Link} from '@/i18n/routing';
import {useLocale} from 'next-intl';

export default function NotFound() {
  const locale = useLocale() as 'es' | 'en';

  return (
    <div className="py-20">
      <Container>
        <h1 className="text-3xl font-extrabold text-[color:var(--navy)]">404</h1>
        <p className="mt-3 text-[color:var(--gray-600)]">Página no encontrada.</p>
        <Link href="/" locale={locale} className="mt-6 inline-flex rounded-xl bg-[color:var(--cyan)] px-6 py-3 font-extrabold text-[color:var(--navy)]">Volver al inicio</Link>
      </Container>
    </div>
  );
}

import Image from 'next/image';
import {Link} from '@/i18n/routing';

export function Logo({locale}: {locale: 'es' | 'en'}) {
  return (
    <Link href="/" locale={locale} className="flex items-center gap-3" aria-label="CSCloudSolutions">
      <Image
        src="/images/Logo_Nombre_CSCloudSolutions-150x84.avif"
        alt="CSCloudSolutions"
        width={150}
        height={84}
        priority
        className="h-10 w-auto"
      />
      <span className="sr-only">CSCloudSolutions</span>
    </Link>
  );
}

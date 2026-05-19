import Image from 'next/image';
import {Link} from '@/i18n/routing';

export function Logo({locale}: {locale: 'es' | 'en'}) {
  return (
    <Link href="/" locale={locale} className="flex items-center gap-3">
      <Image
        src="/images/Logo_Nombre_CSCloudSolutions.avif"
        alt="CSCloudSolutions Logo"
        width={230}
        height={128}
        sizes="(max-width: 768px) 200px, 230px"
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
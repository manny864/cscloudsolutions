import Image from 'next/image';
import {Link} from '@/i18n/routing';

export function Logo({locale}: {locale: 'es' | 'en'}) {
  return (
    <Link href="/" locale={locale} className="flex items-center gap-3" aria-label="CSCloudSolutions">
      <Image
        src="/images/logo.png"
        alt="CSCloudSolutions"
        width={180}
        height={52}
        priority
        className="h-10 w-auto"
      />
      <span className="sr-only">CSCloudSolutions</span>
    </Link>
  );
}

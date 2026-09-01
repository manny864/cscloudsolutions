import Image from 'next/image';
import {Link} from '@/i18n/routing';

export function Logo({locale = 'es'}: {locale?: 'es' | 'en' | 'pt-BR'}) {
  return (
    <Link href="/" locale={locale} className="flex flex-shrink-0 items-center gap-2 min-w-0">
      <Image
        src="/images/LogoCS.png"
        alt="CS"
        width={669}
        height={451}
        priority
        className="h-9 w-auto flex-shrink-0 sm:h-11"
      />
      <Image
        src="/images/CSCloudSolutionsText.png"
        alt="CloudSolutions"
        width={1107}
        height={135}
        priority
        className="h-5 w-auto sm:h-6"
      />
    </Link>
  );
}
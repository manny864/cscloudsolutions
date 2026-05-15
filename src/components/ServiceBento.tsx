import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { InteractiveVideoCard } from './InteractiveVideoCard';

export function ServiceBento() {
  const t = useTranslations('home.services');

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-16 max-w-2xl">
          <h2 className="font-heading text-4xl font-extrabold text-[color:var(--navy)] sm:text-5xl">
            {t('headingPart1')} <span className="text-[color:var(--cyan)]">{t('headingPart2')}</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InteractiveVideoCard 
            badge={t('card1.badge')}
            title={t('card1.title')}
            description={t('card1.desc')}
            videoSrc="/videos/Trabajo_Colaborativo.webm" 
            posterSrc="/images/Trabajo_Colaborativo.webp"
            href="/microsoft-365"
          />
          <InteractiveVideoCard 
            badge={t('card2.badge')}
            title={t('card2.title')}
            description={t('card2.desc')}
            videoSrc="/videos/Futuristic_Server_Room_Motion_Graphics.webm" 
            posterSrc="/images/Futuristic_Server_Room_Motion_Graphics.webp"
            href="/azure"
          />
          <InteractiveVideoCard 
            badge={t('card3.badge')}
            title={t('card3.title')}
            description={t('card3.desc')}
            videoSrc="/videos/Ciberseguridad_Escudo_Digital.webm" 
            posterSrc="/images/Ciberseguridad_Escudo_Digital.webp"
            href="/seguridad"
          />
        </div>
      </Container>
    </section>
  );
}
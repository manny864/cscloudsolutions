import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { InteractiveVideoCard } from './InteractiveVideoCard';

export function ServiceBento() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-16 max-w-2xl">
          <h2 className="font-heading text-4xl font-extrabold text-[color:var(--navy)] sm:text-5xl">
            Soluciones <span className="text-[color:var(--cyan)]">Cloud & Security</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InteractiveVideoCard 
            badge="Productividad"
            title="Microsoft 365" 
            description="Colaboración total y gestión moderna del workplace."
            videoSrc="/videos/Trabajo_Colaborativo.webm" 
            href="/microsoft-365"
          />
          <InteractiveVideoCard 
            badge="Infraestructura"
            title="Azure Cloud" 
            description="Migración y escalabilidad con arquitectura de clase mundial."
            videoSrc="/videos/Futuristic_Server_Room_Motion_Graphics.webm" 
            href="/azure"
          />
          <InteractiveVideoCard 
            badge="Seguridad"
            title="Ciberseguridad" 
            description="Protección de datos bajo estándares internacionales de cumplimiento."
            videoSrc="/videos/Ciberseguridad_Escudo_Digital.webm" 
            href="/seguridad"
          />
        </div>
      </Container>
    </section>
  );
}
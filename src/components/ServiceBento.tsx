import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { InteractiveVideoCard } from './InteractiveVideoCard'; // Importamos la nueva tarjeta

export function ServiceBento() {
  const t = useTranslations('home.services'); // Ajusta esta llave si en tu JSON se llama distinto

  return (
    <section className="bg-white py-24">
      <Container>
        {/* Título de la Sección */}
        <div className="mb-16 max-w-2xl">
          <h2 className="font-[family:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-5xl">
            Soluciones Tecnológicas <br/>
            <span className="text-[color:var(--cyan)]">a tu medida</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--gray-600)]">
            Transformamos la manera en que tu empresa opera, integrando seguridad, nube y colaboración en un solo lugar.
          </p>
        </div>

        {/* Cuadrícula de Tarjetas Interactivas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Tarjeta 1: Microsoft 365 */}
          <InteractiveVideoCard 
            badge="Productividad"
            title="Microsoft 365" 
            description="Lleva la colaboración de tu equipo al siguiente nivel. Implementamos y gestionamos el ecosistema completo de Microsoft para el trabajo moderno."
            videoSrc="/videos/Trabajo_Colaborativo.webm" 
            href="/microsoft-365"
          />

          {/* Tarjeta 2: Microsoft Azure */}
          <InteractiveVideoCard 
            badge="Cloud"
            title="Microsoft Azure" 
            description="Migración, arquitectura y gestión de infraestructura en la nube. Escalabilidad infinita y alta disponibilidad para tus aplicaciones."
            videoSrc="/videos/Futuristic_Server_Room_Motion_Graphics.webm" 
            href="/azure"
          />

          {/* Tarjeta 3: Seguridad */}
          <InteractiveVideoCard 
            badge="Protección"
            title="Ciberseguridad" 
            description="Protegemos tus datos y dispositivos contra amenazas modernas utilizando las herramientas de seguridad nativas más avanzadas del mercado."
            videoSrc="/videos/Ciberseguridad_Escudo_Digital.webm" 
            href="/seguridad"
          />

        </div>
      </Container>
    </section>
  );
}
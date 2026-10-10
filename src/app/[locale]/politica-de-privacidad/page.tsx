import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, { title: string; description: string }> = {
    es: {
      title: 'Política de Privacidad',
      description: 'Política de privacidad y protección de datos personales de CSCloudSolutions.',
    },
    'pt-BR': {
      title: 'Política de Privacidade',
      description: 'Política de privacidade e proteção de dados pessoais da CSCloudSolutions.',
    },
    en: {
      title: 'Privacy Policy',
      description: 'Privacy policy and personal data protection of CSCloudSolutions.',
    },
  };
  const meta = titles[locale] || titles.es;
  return createPageMetadata({
    locale,
    path: '/politica-de-privacidad',
    title: meta.title,
    description: meta.description,
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEs = locale === 'es';

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <Container className="max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl mb-4">
            {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          <p className="text-sm text-gray-500 mb-10 font-medium">
            {isEs ? 'Última actualización: 22 de abril de 2026' : 'Last updated: April 22, 2026'}
          </p>

          <div className="prose prose-blue max-w-none text-gray-600">
            {isEs ? (
              <>
                <h2>1. Introducción y Responsable del Tratamiento</h2>
                <p>En <strong>CSCloudSolutions</strong> (en adelante, &ldquo;Nosotros&rdquo; o &ldquo;el Responsable&rdquo;), nos tomamos muy en serio la privacidad de nuestros clientes y visitantes del sitio web.</p>
                <p>Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información personal que usted (el &ldquo;Usuario&rdquo;) nos proporciona al navegar por nuestro sitio web o al interactuar con nuestros servicios de consultoría IT.</p>
                <p>El responsable del tratamiento de sus datos personales es <strong>CSCloudSolutions</strong>, con domicilio legal en la <strong>Provincia de Buenos Aires, República Argentina</strong>. El tratamiento de sus datos se realiza en estricto cumplimiento de la <strong>Ley de Protección de Datos Personales N° 25.326</strong> de la República Argentina y sus normas complementarias.</p>

                <h2>2. Qué Información Recopilamos</h2>
                <p>Podemos recopilar los siguientes tipos de información:</p>
                <ul>
                  <li><strong>Información proporcionada directamente por el Usuario:</strong> Son los datos que usted nos entrega voluntariamente al completar formularios en nuestro sitio web (por ejemplo, formularios de &ldquo;Contacto&rdquo;, solicitud de auditorías o suscripción).</li>
                </ul>

                <h2>3. Uso de la Información</h2>
                <p>Utilizamos sus datos personales principalmente para responder a sus consultas, enviarle información solicitada sobre nuestros servicios cloud, procesar auditorías y, si usted lo ha aceptado, enviarle comunicaciones comerciales relevantes.</p>

                <h2>4. Derechos del Usuario</h2>
                <p>Usted tiene derecho a <strong>acceder, rectificar, actualizar o suprimir</strong> (eliminar) sus datos de nuestra base. Para ejercer cualquiera de estos derechos, puede enviar una solicitud acreditando su identidad a nuestro correo electrónico.</p>

                <h2>5. Contacto</h2>
                <p>Si tiene preguntas o inquietudes sobre esta Política de Privacidad, por favor contáctenos en: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Publicado el 22 de abril de 2026</p>
              </>
            ) : (
              <>
                <h2>1. Introduction and Data Controller</h2>
                <p>At <strong>CSCloudSolutions</strong> (hereinafter, &ldquo;We&rdquo; or &ldquo;the Controller&rdquo;), we take the privacy of our clients and website visitors very seriously.</p>
                <p>This Privacy Policy describes how we collect, use, store, and protect the personal information that you (the &ldquo;User&rdquo;) provide to us when browsing our website or interacting with our IT consulting services.</p>
                <p>The controller of your personal data is <strong>CSCloudSolutions</strong>, legally domiciled in the <strong>Province of Buenos Aires, Argentine Republic</strong>. The processing of your data is carried out in strict compliance with the <strong>Personal Data Protection Law No. 25.326</strong> of the Argentine Republic.</p>

                <h2>2. What Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li><strong>Information provided directly by the User:</strong> This is the data you voluntarily provide when filling out forms on our website (e.g., &ldquo;Contact&rdquo; forms, audit requests, or subscriptions).</li>
                </ul>

                <h2>3. Use of Information</h2>
                <p>We use your personal data primarily to respond to your inquiries, send you requested information about our cloud services, process audits, and, if you have consented, send you relevant commercial communications.</p>

                <h2>4. User Rights</h2>
                <p>You have the right to <strong>access, rectify, update, or delete</strong> your data from our database. To exercise any of these rights, you can send a request proving your identity to our email address.</p>

                <h2>5. Contact</h2>
                <p>If you have questions or concerns about this Privacy Policy, please contact us at: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Published on April 22, 2026</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

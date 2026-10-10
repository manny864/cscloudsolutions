import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, { title: string; description: string }> = {
    es: {
      title: 'Términos y Condiciones',
      description: 'Términos y condiciones de uso del sitio web y servicios de CSCloudSolutions.',
    },
    'pt-BR': {
      title: 'Termos e Condições',
      description: 'Termos e condições de uso do site e serviços da CSCloudSolutions.',
    },
    en: {
      title: 'Terms and Conditions',
      description: 'Terms and conditions of use of the website and services of CSCloudSolutions.',
    },
  };
  const meta = titles[locale] || titles.es;
  return createPageMetadata({
    locale,
    path: '/terminos-y-condiciones',
    title: meta.title,
    description: meta.description,
  });
}

export default async function TermsConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEs = locale === 'es';

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <Container className="max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-[color:var(--navy)] sm:text-4xl mb-4">
            {isEs ? 'Términos y Condiciones' : 'Terms and Conditions'}
          </h1>
          <p className="text-sm text-gray-500 mb-10 font-medium">
            {isEs ? 'Última actualización: 22 de abril de 2026' : 'Last updated: April 22, 2026'}
          </p>

          <div className="prose prose-blue max-w-none text-gray-600">
            {isEs ? (
              <>
                <h2>1. Introducción y Aceptación</h2>
                <p>Bienvenido al sitio web de <strong>CSCloudSolutions</strong> (en adelante, &ldquo;el Sitio Web&rdquo; o &ldquo;Nosotros&rdquo;).</p>
                <p>El acceso y uso de este Sitio Web implica la aceptación plena y sin reservas de los presentes Términos y Condiciones de Uso (los &ldquo;Términos&rdquo;). Si usted (el &ldquo;Usuario&rdquo;) no está de acuerdo con estos Términos, le rogamos que se abstenga de utilizar el Sitio Web.</p>
                <p>Estos Términos regulan el acceso y la utilización del Sitio Web. No obstante, la contratación de servicios específicos de consultoría IT se regirá por contratos de prestación de servicios particulares.</p>

                <h2>2. Servicios y Contenidos</h2>
                <p>CSCloudSolutions es una consultora de tecnología de la información especializada en soluciones en la nube (Cloud Computing).</p>

                <h2>3. Enlaces a Terceros</h2>
                <p>El Sitio Web puede contener enlaces a sitios externos de terceros. CSCloudSolutions no tiene control sobre dichos sitios y no asume responsabilidad alguna por su contenido.</p>

                <h2>4. Modificaciones y Jurisdicción</h2>
                <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Estos Términos se rigen por las leyes de la República Argentina. Para cualquier controversia, las partes se someten a los Tribunales de la <strong>Provincia de Buenos Aires</strong>.</p>

                <h2>5. Contacto</h2>
                <p>Si tiene alguna duda sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros en: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Publicado el 22 de abril de 2026</p>
              </>
            ) : (
              <>
                <h2>1. Introduction and Acceptance</h2>
                <p>Welcome to the <strong>CSCloudSolutions</strong> website (hereinafter, &ldquo;the Website&rdquo; or &ldquo;We&rdquo;).</p>
                <p>Access and use of this Website implies full acceptance of these Terms and Conditions (the &ldquo;Terms&rdquo;). If you (the &ldquo;User&rdquo;) do not agree with these Terms, please refrain from using the Website.</p>
                <p>These Terms govern the access and use of the Website. Specific IT consulting services will be governed by separate service contracts.</p>

                <h2>2. Services and Content</h2>
                <p>CSCloudSolutions is an information technology consulting firm specializing in cloud computing solutions.</p>

                <h2>3. Third-Party Links</h2>
                <p>The Website may contain links to third-party sites. CSCloudSolutions has no control over these sites and assumes no responsibility for their content.</p>

                <h2>4. Modifications and Jurisdiction</h2>
                <p>We reserve the right to modify these Terms at any time. These Terms are governed by the laws of the Argentine Republic. Any dispute will be handled by the courts of the <strong>Province of Buenos Aires</strong>.</p>

                <h2>5. Contact</h2>
                <p>If you have any questions about these Terms, please contact us at: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Published on April 22, 2026</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

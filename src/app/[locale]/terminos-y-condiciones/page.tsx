import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';

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
                <p>Bienvenido al sitio web de <strong>CSCloudSolutions</strong> (en adelante, “el Sitio Web” o “Nosotros”).</p>
                <p>El acceso y uso de este Sitio Web implica la aceptación plena y sin reservas de los presentes Términos y Condiciones de Uso (los “Términos”). Si usted (el “Usuario”) no está de acuerdo con estos Términos, le rogamos que se abstenga de utilizar el Sitio Web.</p>
                <p>Estos Términos regulan el acceso y la utilización del Sitio Web. No obstante, la contratación de servicios específicos de consultoría IT (como migraciones a la nube, auditorías de costos, etc.) se regirá por contratos de prestación de servicios particulares que se firmarán oportunamente entre el cliente y CSCloudSolutions.</p>

                <h2>2. Servicios y Contenidos</h2>
                <p>CSCloudSolutions es una consultora de tecnología de la información especializada en soluciones en la nube (Cloud Computing), incluyendo, pero no limitado a migraciones a Microsoft 365 y Azure, y auditorías de optimización de costos.</p>

                <h2>3. Enlaces a Terceros</h2>
                <p>El Sitio Web puede contener enlaces a sitios externos de terceros. CSCloudSolutions no tiene control sobre dichos sitios y no asume responsabilidad alguna por su contenido o políticas de privacidad. El acceso a estos sitios es bajo el propio riesgo del Usuario.</p>

                <h2>4. Modificaciones y Jurisdicción</h2>
                <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Estos Términos se rigen e interpretan de acuerdo con las leyes de la República Argentina. Para cualquier controversia, las partes se someten a la jurisdicción exclusiva de los Tribunales Ordinarios competentes con asiento en la <strong>Provincia de Buenos Aires</strong>, República Argentina.</p>

                <h2>5. Contacto</h2>
                <p>Si tiene alguna duda sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros a través del correo electrónico: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Publicado el 22 de abril de 2026</p>
              </>
            ) : (
              <>
                <h2>1. Introduction and Acceptance</h2>
                <p>Welcome to the <strong>CSCloudSolutions</strong> website (hereinafter, "the Website" or "We").</p>
                <p>Access and use of this Website implies full and unreserved acceptance of these Terms and Conditions of Use (the "Terms"). If you (the "User") do not agree with these Terms, please refrain from using the Website.</p>
                <p>These Terms govern access to and use of the Website. However, the contracting of specific IT consulting services (such as cloud migrations, cost audits, etc.) will be governed by specific service provision contracts to be signed in due course between the client and CSCloudSolutions.</p>

                <h2>2. Services and Content</h2>
                <p>CSCloudSolutions is an information technology consulting firm specializing in cloud computing solutions, including but not limited to Microsoft 365 and Azure migrations, and cost optimization audits.</p>

                <h2>3. Third-Party Links</h2>
                <p>The Website may contain links to external third-party sites. CSCloudSolutions has no control over such sites and assumes no responsibility for their content or privacy policies. Access to these sites is at the User's own risk.</p>

                <h2>4. Modifications and Jurisdiction</h2>
                <p>We reserve the right to modify these Terms at any time. These Terms are governed by and construed in accordance with the laws of the Argentine Republic. For any dispute, the parties submit to the exclusive jurisdiction of the competent Ordinary Courts sitting in the <strong>Province of Buenos Aires</strong>, Argentine Republic.</p>

                <h2>5. Contact</h2>
                <p>If you have any questions about these Terms and Conditions, you can contact us via email at: <a href="mailto:info@cscloudsolutions.com.ar" className="font-bold text-[color:var(--cyan)]">info@cscloudsolutions.com.ar</a></p>
                <p className="italic text-sm mt-8 text-gray-400">Published on April 22, 2026</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
import json
import os
from datetime import datetime

# Paths
base_dir = '/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions'
en_path = os.path.join(base_dir, 'messages/en.json')
es_path = os.path.join(base_dir, 'messages/es.json')
footer_path = os.path.join(base_dir, 'src/components/Footer.tsx')
page_dir = os.path.join(base_dir, 'src/app/[locale]/politica-de-reembolso')
page_path = os.path.join(page_dir, 'page.tsx')

# 1. Update JSON
def update_json(path, refund_data, refund_footer_label):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['refundPolicy'] = refund_data
    if 'footer' in data:
        data['footer']['refund'] = refund_footer_label
        
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

today = datetime.now().strftime('%d/%m/%Y')

en_data = {
    "title": "Refund and Cancellation Policy",
    "updated": f"Last updated: {today}",
    "intro": "This Refund and Cancellation Policy governs purchases made through CSCloudSolutions (cscloudsolutions.com.ar) and our cloud financial management platform CSCloud FinOps (finops.cscloudsolutions.com.ar).",
    "saasTitle": "1. SaaS Subscriptions (CSCloud FinOps)",
    "saasContent1": "Our software as a service (SaaS) is offered with a monthly or annual billing structure. To ensure our platform fits your needs, we offer a 14-day free trial on our Professional and Business plans.",
    "saasTrial": "During the trial period: You can cancel your subscription at any time before the 14 days end without any charge to your credit card.",
    "saasAfter": "After the trial period: Due to the nature of digital products and the free evaluation period provided, we do not offer refunds once the subscription charge has been processed (whether monthly or annually).",
    "saasCancel": "Cancellations: You can cancel your subscription at any time from your account administration panel. Cancellation will stop future charges, and you will retain access to the platform until the end of your current billing cycle.",
    "consultingTitle": "2. Consulting and Infrastructure Services (CSCloudSolutions)",
    "consultingContent1": "For consulting services, migrations to Azure, Microsoft 365, custom FinOps audits, or Azure Virtual Desktop implementations, refunds are governed by the Service Level Agreement (SLA) or Statement of Work (SOW) signed by both parties.",
    "consultingContent2": "Consulting hours already executed, technical diagnoses performed, and cloud resources deployed in the client's tenant are non-refundable.",
    "consultingContent3": "If a project is canceled before completion, only the work completed up to the date of written notification will be billed.",
    "paymentsTitle": "3. Payment Processors (Merchant of Record)",
    "paymentsContent": "Our subscription payments are securely processed through our authorized partners (Merchant of Record). By making a purchase, you also agree to the terms and conditions of our payment processor. Any billing dispute should first be communicated to our team to attempt an amicable resolution.",
    "exceptionsTitle": "4. Exceptions",
    "exceptionsContent": "We may make exceptions to this policy at our sole discretion if we consider that there has been a technical error on our part that prevented full use of the platform for an extended period.",
    "contactTitle": "5. Contact",
    "contactContent": "If you have any questions about your billing, wish to cancel your account, or believe there has been an error in your charge, please contact us by writing to: "
}
es_data = {
    "title": "Política de Reembolsos y Cancelaciones",
    "updated": f"Última actualización: {today}",
    "intro": "Esta Política de Reembolsos y Cancelaciones rige las compras realizadas a través de CSCloudSolutions (cscloudsolutions.com.ar) y nuestra plataforma de gestión financiera en la nube CSCloud FinOps (finops.cscloudsolutions.com.ar).",
    "saasTitle": "1. Suscripciones SaaS (CSCloud FinOps)",
    "saasContent1": "Nuestro software como servicio (SaaS) se ofrece con una estructura de facturación mensual o anual. Para garantizar que nuestra plataforma se adapte a sus necesidades, ofrecemos un período de prueba gratuito de 14 días en nuestros planes Professional y Business.",
    "saasTrial": "Durante el período de prueba: Puede cancelar su suscripción en cualquier momento antes de que finalicen los 14 días sin que se realice ningún cargo en su tarjeta de crédito.",
    "saasAfter": "Después del período de prueba: Debido a la naturaleza de los productos digitales y al período de evaluación gratuito otorgado, no ofrecemos reembolsos una vez que se ha procesado el cargo de la suscripción (ya sea mensual o anual).",
    "saasCancel": "Cancelaciones: Puede cancelar su suscripción en cualquier momento desde el panel de administración de su cuenta. La cancelación detendrá los cobros futuros, y usted mantendrá el acceso a la plataforma hasta el final de su ciclo de facturación actual.",
    "consultingTitle": "2. Servicios de Consultoría e Infraestructura (CSCloudSolutions)",
    "consultingContent1": "Para los servicios de consultoría, migraciones a Azure, Microsoft 365, auditorías FinOps personalizadas o implementaciones de Azure Virtual Desktop, los reembolsos se rigen por el Acuerdo de Nivel de Servicio (SLA) o la Propuesta Comercial (SOW) firmada por ambas partes.",
    "consultingContent2": "Las horas de consultoría ya ejecutadas, los diagnósticos técnicos realizados y los recursos de nube desplegados en el tenant del cliente no son reembolsables.",
    "consultingContent3": "Si un proyecto se cancela antes de su finalización, se facturará únicamente el trabajo completado hasta la fecha de la notificación por escrito.",
    "paymentsTitle": "3. Procesadores de Pago (Merchant of Record)",
    "paymentsContent": "Nuestros pagos de suscripción son procesados de manera segura a través de nuestros socios autorizados (Merchant of Record). Al realizar una compra, usted también acepta los términos y condiciones de nuestro procesador de pagos. Cualquier disputa de facturación debe ser comunicada primero a nuestro equipo para intentar una resolución amistosa.",
    "exceptionsTitle": "4. Excepciones",
    "exceptionsContent": "Podemos hacer excepciones a esta política a nuestra entera discreción si consideramos que ha habido un error técnico por nuestra parte que haya impedido el uso completo de la plataforma durante un período prolongado.",
    "contactTitle": "5. Contacto",
    "contactContent": "Si tiene alguna pregunta sobre su facturación, desea cancelar su cuenta o cree que ha habido un error en su cargo, comuníquese con nosotros escribiendo a: "
}

update_json(en_path, en_data, "Refund Policy")
update_json(es_path, es_data, "Política de Reembolso")

# 2. Update Footer
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

target = """<li>
                <Link href="/terminos-y-condiciones" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('terms')}
                </Link>
              </li>"""
replacement = """<li>
                <Link href="/terminos-y-condiciones" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-reembolso" className="hover:text-[color:var(--cyan)] transition-colors">
                  {t('refund')}
                </Link>
              </li>"""

if "{t('refund')}" not in footer_content:
    footer_content = footer_content.replace(target, replacement)
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(footer_content)

# 3. Create Page
os.makedirs(page_dir, exist_ok=True)
page_content = """import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';

export default function RefundPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('refundPolicy');

  return (
    <div className="py-24 bg-[color:var(--navy)] min-h-screen text-white/90">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">{t('title')}</h1>
          <p className="text-sm text-white/50 mb-8">{t('updated')}</p>
          <p className="text-lg leading-relaxed text-white/80 mb-12">{t('intro')}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('saasTitle')}</h2>
              <p className="text-white/70 leading-relaxed mb-2">{t('saasContent1')}</p>
              <ul className="list-disc pl-5 text-white/70 space-y-2">
                <li><strong>{t('saasTrial').split(':')[0]}:</strong>{t('saasTrial').split(':')[1]}</li>
                <li><strong>{t('saasAfter').split(':')[0]}:</strong>{t('saasAfter').split(':')[1]}</li>
                <li><strong>{t('saasCancel').split(':')[0]}:</strong>{t('saasCancel').split(':')[1]}</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('consultingTitle')}</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>{t('consultingContent1')}</p>
                <p>{t('consultingContent2')}</p>
                <p>{t('consultingContent3')}</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('paymentsTitle')}</h2>
              <p className="text-white/70 leading-relaxed">{t('paymentsContent')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('exceptionsTitle')}</h2>
              <p className="text-white/70 leading-relaxed">{t('exceptionsContent')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t('contactTitle')}</h2>
              <p className="text-white/70 leading-relaxed">
                {t('contactContent')}
                <a href="mailto:soporte@cscloudsolutions.com.ar" className="text-[color:var(--cyan)] hover:underline ml-1">
                  soporte@cscloudsolutions.com.ar
                </a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
"""
with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Done")

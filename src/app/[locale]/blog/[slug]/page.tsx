import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { blogMapping } from '@/lib/blog-mapping';
import { notFound, redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

// Generación de Metadata con Alternate Links para evitar 404 al cambiar idioma
export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // Buscamos si el slug actual tiene una traducción manual en nuestro diccionario
  const mapping = Object.values(blogMapping).find(m => m.es === slug || m.en === slug);
  
  // Determinamos cuál sería el slug en el idioma opuesto
  const alternateSlug = mapping 
    ? (locale === 'es' ? mapping.en : mapping.es) 
    : slug; // Si no hay mapeo, asumimos que el slug es igual (futuros posts)

  return {
    alternates: {
      languages: {
        es: `/es/blog/${locale === 'es' ? slug : alternateSlug}`,
        en: `/en/blog/${locale === 'en' ? slug : alternateSlug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const slugsEs = getPostSlugs('es').map((slug) => ({
    locale: 'es',
    slug: slug.replace(/\.md$/, ''),
  }));
  const slugsEn = getPostSlugs('en').map((slug) => ({
    locale: 'en',
    slug: slug.replace(/\.md$/, ''),
  }));
  return [...slugsEs, ...slugsEn];
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  let post;
  try {
    post = getPostBySlug(slug, locale);
  } catch (e) {
    // LÓGICA DE REDIRECCIÓN INTELIGENTE SI NO SE ENCUENTRA EL POST
    
    // 1. Intentamos buscar si el slug pertenece al OTRO idioma mediante el diccionario
    const mapping = Object.values(blogMapping).find(m => (locale === 'es' ? m.en : m.es) === slug);
    
    if (mapping) {
      const correctSlug = locale === 'es' ? mapping.es : mapping.en;
      redirect(`/${locale}/blog/${correctSlug}`);
    }

    // 2. Si no está en el mapa, pero quizás el slug es idéntico en ambos idiomas (futuros posts)
    // Next.js ya lo habría encontrado arriba, así que si llega aquí es que realmente no existe.
    notFound(); 
  }

  let imageIndex = 0;

  return (
    <div className="bg-white px-6 py-24 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
          {post.meta.image && (
            <div className="w-full md:w-[350px] flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[color:var(--gray-100)] bg-gray-50">
                <Image 
                  src={post.meta.image} 
                  alt={post.meta.title} 
                  width={800}
                  height={450}
                  className="w-full h-auto object-contain" 
                  priority 
                />
              </div>
            </div>
          )}
          <div className="flex-1 pt-4 md:pt-0">
            <div className="flex items-center gap-x-4 mb-4">
              <span className="rounded-full bg-[color:rgba(0,174,239,0.1)] px-3 py-1 text-sm font-bold text-[color:var(--cyan-dark)] uppercase tracking-wide border border-[color:rgba(0,174,239,0.2)]">
                {post.meta.category}
              </span>
              <time dateTime={post.meta.date} className="text-sm text-[color:var(--gray-500)] font-medium">
                {post.meta.date}
              </time>
            </div>
            <h1 className="font-[family:var(--font-heading)] text-3xl md:text-4xl font-extrabold tracking-tight text-[color:var(--navy)] leading-tight mb-6">
              {post.meta.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[color:var(--navy)] text-white flex items-center justify-center font-bold text-xs uppercase">
                {post.meta.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </span>
              <p className="text-base text-[color:var(--gray-600)] font-medium">Por {post.meta.author}</p>
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-[color:var(--gray-100)] mb-16" />

        {/* CONTENIDO */}
        <div className="prose prose-lg prose-blue max-w-none text-[color:var(--gray-700)] 
          prose-headings:font-[family:var(--font-heading)] prose-headings:font-extrabold prose-headings:text-[color:var(--navy)]
          prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[color:var(--gray-100)] prose-h2:pb-2 prose-h2:clear-both
          prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[color:var(--cyan-dark)] prose-h3:clear-both
          prose-a:text-[color:var(--cyan-dark)] prose-a:font-semibold hover:prose-a:text-[color:var(--cyan)]
          prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-table:clear-both
          prose-th:bg-[color:var(--navy)] prose-th:text-white prose-th:p-4 prose-td:p-4 prose-td:border prose-tr:nth-child(even):bg-[color:var(--gray-50)]
          prose-li:marker:text-[color:var(--cyan)]">
          
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => {
                imageIndex++;
                const isEven = imageIndex % 2 === 0;
                return (
                  <span className={`block md:inline-block w-full md:w-[380px] mb-8 ${isEven ? 'md:float-right md:ml-8' : 'md:float-left md:mr-8'}`}>
                    <span className="block w-full rounded-2xl overflow-hidden shadow-lg border border-[color:var(--gray-100)] bg-gray-50">
                      <Image 
                        src={String(props.src || '')} 
                        alt={String(props.alt || '')} 
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </span>
                    {props.alt && (
                      <span className="block mt-2 text-center text-xs text-gray-500 italic">
                        {String(props.alt)}
                      </span>
                    )}
                  </span>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>

        </div>

        <div className="mt-20 pt-10 border-t border-[color:var(--gray-200)] flex justify-between items-center clear-both">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--navy)] hover:text-[color:var(--cyan)] transition-colors px-6 py-3 rounded-xl bg-[color:var(--gray-50)] border border-[color:var(--gray-200)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {locale === 'es' ? 'Volver al Blog' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    </div>
  );
}
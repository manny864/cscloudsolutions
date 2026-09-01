import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { blogMapping } from '@/lib/blog-mapping';
import { notFound, redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import MarkdownImage from '@/components/MarkdownImage';

// Generación de Metadata con Alternate Links y Etiquetas Open Graph
export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  const mapping = Object.values(blogMapping).find(m => m.es === slug || m.en === slug || m['pt-BR'] === slug);

  let post;
  try {
    // Obtenemos la información del post para generar las tarjetas sociales
    post = await getPostBySlug(slug, locale);
  } catch (e) {
    post = null;
  }

  const alternates = {
    languages: {
      es: `/es/blog/${mapping ? mapping.es : slug}`,
      en: `/en/blog/${mapping ? mapping.en : slug}`,
      'pt-BR': `/pt-BR/blog/${mapping ? mapping['pt-BR'] : slug}`,
    },
  };

  if (!post) {
    return { alternates };
  }

  return {
    metadataBase: new URL('https://cscloudsolutions.com.ar'),
    title: post.meta.title,
    description: post.meta.excerpt || post.meta.title,
    alternates,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.title,
      type: 'article',
      url: `https://cscloudsolutions.com.ar/${locale}/blog/${slug}`,
      images: post.meta.image ? [
        {
          url: post.meta.image,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.title,
      images: post.meta.image ? [post.meta.image] : [],
    },
  };
}

export async function generateStaticParams() {
  return ['es', 'en', 'pt-BR'].flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({
      locale,
      slug: slug.replace(/\.md$/, ''),
    }))
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  let post;
  try {
    post = await getPostBySlug(slug, locale);
  } catch (e) {
    const mapping = Object.values(blogMapping).find(m => m.es === slug || m.en === slug || m['pt-BR'] === slug);

    if (mapping) {
      const correctSlug = mapping[locale as 'es' | 'en' | 'pt-BR'];
      if (correctSlug) redirect(`/${locale}/blog/${correctSlug}`);
    }

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
                {post.meta.author
                  ? post.meta.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
                  : 'CS'}
              </span>
              <p className="text-base text-[color:var(--gray-600)] font-medium">
                {locale === 'en' ? 'By' : 'Por'} {post.meta.author || 'CS Cloud Solutions'}
              </p>
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
                  <MarkdownImage 
                    src={String(props.src || '')} 
                    alt={String(props.alt || '')} 
                    isEven={isEven} 
                  />
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
            className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--navy)] hover:text-[color:var(--cyan)] transition-colors px-6 py-3 rounded-[5px] bg-[color:var(--gray-50)] border border-[color:var(--gray-200)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            {locale === 'en' ? 'Back to Blog' : locale === 'pt-BR' ? 'Voltar ao Blog' : 'Volver al Blog'}
          </Link>
        </div>
      </div>
    </div>
  );
}

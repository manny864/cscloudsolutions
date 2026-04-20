import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/routing';

// Obligatorio para Hostinger (Static Export)
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (e) {
    notFound(); 
  }

  return (
    <div className="bg-white px-6 py-24 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        
        {/* ENCABEZADO ESTILO TARJETA (Imagen a la izquierda, Texto a la derecha) */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          
          {/* Imagen de Portada (Tamaño fijo 300x300 en desktop) */}
          {post.meta.image && (
            <div className="w-full md:w-[300px] flex-shrink-0">
              <div className="aspect-square md:w-[300px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg border border-[color:var(--gray-100)] bg-gray-50">
                <img 
                  className="w-full h-full object-cover" 
                  src={post.meta.image} 
                  alt={post.meta.title} 
                />
              </div>
            </div>
          )}

          {/* Textos del Encabezado */}
          <div className="flex-1 flex flex-col justify-center min-h-[300px] pt-4 md:pt-0">
            <div className="flex items-center gap-x-4 mb-4">
              <span className="rounded-full bg-[color:rgba(0,174,239,0.1)] px-3 py-1 text-sm font-bold text-[color:var(--cyan-dark)] uppercase tracking-wide border border-[color:rgba(0,174,239,0.2)]">
                {post.meta.category}
              </span>
              <time dateTime={post.meta.date} className="text-sm text-[color:var(--gray-500)] font-medium">
                {post.meta.date}
              </time>
            </div>
            
            <h1 className="font-[family:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[color:var(--navy)] leading-tight mb-6">
              {post.meta.title}
            </h1>
            
            <p className="text-base text-[color:var(--gray-600)] font-medium flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[color:var(--navy)] text-white flex items-center justify-center font-bold text-xs">
                {/* Extrae las iniciales del autor automáticamente */}
                {post.meta.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </span>
              Por {post.meta.author}
            </p>
          </div>
        </div>

        {/* Separador elegante */}
        <hr className="border-t-2 border-[color:var(--gray-100)] mb-16" />

        {/* CONTENIDO MARKDOWN RENDERIZADO */}
        <div className="prose prose-lg prose-blue max-w-none text-[color:var(--gray-700)] 
          prose-headings:font-[family:var(--font-heading)] prose-headings:font-extrabold prose-headings:text-[color:var(--navy)]
          prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[color:var(--gray-100)] prose-h2:pb-2
          prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[color:var(--cyan-dark)]
          prose-a:text-[color:var(--cyan-dark)] prose-a:font-semibold hover:prose-a:text-[color:var(--cyan)]
          prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
          prose-table:w-full prose-table:border-collapse prose-table:my-8
          prose-th:bg-[color:var(--navy)] prose-th:text-white prose-th:p-4 prose-th:text-left
          prose-td:p-4 prose-td:border prose-td:border-[color:var(--gray-200)] prose-tr:nth-child(even):bg-[color:var(--gray-50)]
          prose-li:marker:text-[color:var(--cyan)]">
          
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>

        </div>

        {/* FOOTER DEL ARTÍCULO (Botón de volver) */}
        <div className="mt-20 pt-10 border-t border-[color:var(--gray-200)] flex justify-between items-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--navy)] hover:text-[color:var(--cyan)] transition-colors px-6 py-3 rounded-xl bg-[color:var(--gray-50)] hover:bg-[color:rgba(0,174,239,0.05)] border border-[color:var(--gray-200)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al Blog
          </Link>
          
          
        </div>

      </div>
    </div>
  );
}
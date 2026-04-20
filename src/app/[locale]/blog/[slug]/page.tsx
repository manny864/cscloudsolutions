import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Link } from '@/i18n/routing';

// Obligatorio para Hostinger (Static Export): Le dice a Next.js qué URLs de blog pre-construir
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
    notFound(); // Si alguien escribe una URL que no existe, muestra tu página 404
  }

  return (
    <div className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        
        {/* Cabecera del Artículo */}
        <p className="text-base font-bold leading-7 text-[color:var(--cyan)] uppercase tracking-wide">
          {post.meta.category}
        </p>
        <h1 className="mt-2 font-[family:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-5xl">
          {post.meta.title}
        </h1>
        <p className="mt-6 text-sm text-gray-500 font-medium">
          Publicado el {post.meta.date} • Por {post.meta.author}
        </p>

        {/* Imagen de Portada (Opcional) */}
        {post.meta.image && (
          <figure className="mt-10 mb-14">
            <img className="aspect-video rounded-2xl object-cover bg-gray-50" src={post.meta.image} alt={post.meta.title} />
          </figure>
        )}

        {/* Contenido Markdown Renderizado */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 
          prose-headings:font-[family:var(--font-heading)] prose-headings:font-extrabold prose-headings:text-[color:var(--navy)]
          prose-a:text-[color:var(--cyan-dark)] hover:prose-a:text-[color:var(--cyan)]
          prose-img:rounded-xl prose-img:shadow-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Botón de volver */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/blog" className="text-sm font-bold text-[color:var(--navy)] hover:text-[color:var(--cyan)] transition-colors">
            ← Volver al Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
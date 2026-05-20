import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${t('titleA')}${t('titleB')}`,
    description: t('subtitle'),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* CABECERA CENTRADA */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h1 className="font-[family:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-5xl">
            {t('titleA')}<span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h1>
          <p className="mt-4 text-lg leading-8 text-[color:var(--gray-600)]">
            {t('subtitle')}
          </p>
        </div>

        {/* REJILLA DE ARTÍCULOS */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col items-center text-center group">
              
              {/* CONTENEDOR DE IMAGEN: Tamaño uniforme garantizado */}
              <Link href={`/blog/${post.slug}`} className="relative w-full mb-8 block">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100">
                  <Image
                    src={post.meta.image}
                    alt={post.meta.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="w-full">
                {/* Metadatos */}
                <div className="flex items-center justify-center gap-x-4 text-xs mb-4">
                  <time dateTime={post.meta.date} className="text-gray-500 font-medium">
                    {post.meta.date}
                  </time>
                  <span className="rounded-full bg-[color:rgba(0,174,239,0.1)] px-3 py-1 font-bold text-[color:var(--cyan-dark)] border border-[color:rgba(0,174,239,0.1)]">
                    {post.meta.category}
                  </span>
                </div>

                {/* Título y Excerpt */}
                <h3 className="font-[family:var(--font-heading)] text-xl font-extrabold leading-tight text-[color:var(--navy)] group-hover:text-[color:var(--cyan)] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.meta.title}
                  </Link>
                </h3>
                
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {post.meta.excerpt}
                </p>

                {/* Autor Centrado */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[color:var(--navy)] text-white flex items-center justify-center font-bold text-[10px] uppercase">
                    {post.meta.author
                       ? post.meta.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)
                      : 'CS'}
                  </span>
                  <span className="text-xs font-bold text-[color:var(--navy)]">
                    {post.meta.author || 'CS Cloud Solutions'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </div>
  );
}
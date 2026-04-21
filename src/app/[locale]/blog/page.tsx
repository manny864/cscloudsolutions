import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  // Recuperamos el idioma actual de la URL
  const { locale } = await params;
  
  // Cargamos las traducciones específicas de la sección "blog"
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  // Buscamos los posts de la carpeta correspondiente (en o es)
  const posts = getAllPosts(locale);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Cabecera dinámica usando traducciones */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-[family:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-5xl">
            {t('titleA')}<span className="text-[color:var(--cyan)]">{t('titleB')}</span>
          </h1>
          <p className="mt-4 text-lg leading-8 text-[color:var(--gray-600)]">
            {t('subtitle')}
          </p>
        </div>

        {/* Listado de Artículos */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col items-start justify-between group">
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden rounded-2xl">
                <Image
                  src={post.meta.image}
                  alt={post.meta.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="bg-gray-100 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 pointer-events-none" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.meta.date} className="text-gray-500 font-medium">
                    {post.meta.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-[color:rgba(0,174,239,0.1)] px-3 py-1.5 font-bold text-[color:var(--cyan-dark)]">
                    {post.meta.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 font-[family:var(--font-heading)] text-xl font-extrabold leading-tight text-[color:var(--navy)] group-hover:text-[color:var(--cyan)] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.meta.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.meta.excerpt}
                  </p>
                </div>
                <div className="relative mt-6 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-bold text-[color:var(--navy)]">
                      {post.meta.author}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </div>
  );
}
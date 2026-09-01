import Link from 'next/link';
import { getAdminPosts } from '@/app/_actions/cmsActions';
import {
  IconArticle,
  IconPlus,
  IconDatabase,
  IconPhoto,
  IconArrowUpRight,
  IconClock,
  IconChecklist,
} from '@tabler/icons-react';

export default async function AdminDashboardPage() {
  const posts = await getAdminPosts();
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">
            Panel de Control CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestión centralizada de artículos, contenidos e infraestructura web
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
        >
          <IconPlus className="w-4 h-4" stroke={2.5} />
          <span>Crear Nuevo Artículo</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Artículos</p>
            <p className="text-3xl font-extrabold text-white mt-1">{posts.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <IconArticle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Publicados (En Vivo)</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-1">{publishedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <IconChecklist className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Borradores</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">{draftCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <IconClock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Conexión MySQL</p>
            <p className="text-sm font-bold text-[color:var(--cyan)] mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Azure Backend VNet</span>
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">
            <IconDatabase className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts Table (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Artículos Recientes</h2>
            <Link
              href="/admin/posts"
              className="text-xs font-bold text-[color:var(--cyan)] hover:underline flex items-center gap-1"
            >
              <span>Ver todos</span>
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <IconArticle className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p>No hay artículos creados aún en la base de datos.</p>
              <p className="text-xs text-slate-600 mt-1">
                Los 25+ artículos preexistentes de Markdown continúan sirviéndose como respaldo.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{post.slug}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString('es-AR')} • {post.author}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      post.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tools (1 Col) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Accesos Rápidos</h2>

          <Link
            href="/admin/posts/new"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white transition border border-slate-700/50"
          >
            <div className="p-2 rounded-lg bg-[color:var(--cyan)]/20 text-[color:var(--cyan)]">
              <IconPlus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Redactar Post</p>
              <p className="text-[11px] text-slate-400">Editor con soporte ES, EN y PT-BR</p>
            </div>
          </Link>

          <Link
            href="/admin/media"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white transition border border-slate-700/50"
          >
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <IconPhoto className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Subir Imágenes</p>
              <p className="text-[11px] text-slate-400">Guardado directo en Azure Blob</p>
            </div>
          </Link>

          <Link
            href="/es/blog"
            target="_blank"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white transition border border-slate-700/50"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <IconArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Ver Blog Público</p>
              <p className="text-[11px] text-slate-400">Revisa cómo se ve en producción</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

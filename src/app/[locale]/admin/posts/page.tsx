import Link from 'next/link';
import { getAdminPosts, deletePost } from '@/app/_actions/cmsActions';
import {
  IconPlus,
  IconArticle,
  IconTrash,
  IconExternalLink,
  IconChecklist,
  IconClock,
  IconEdit,
} from '@tabler/icons-react';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Gestor de Artículos de Blog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Publica, edita y administra artículos y borradores ({posts.length} totales)
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
        >
          <IconPlus className="w-4 h-4" stroke={2.5} />
          <span>Redactar Artículo</span>
        </Link>
      </div>

      {/* Table Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            <IconArticle className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-50" />
            <p className="font-bold text-slate-300">No hay artículos dinámicos en la base de datos.</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Crea tu primer artículo o borrador arriba. Los artículos preexistentes de Markdown continúan activos en la web.
            </p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[color:var(--cyan)] text-xs font-bold transition"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Crear el primer artículo</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Artículo / Slug</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Autor</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-bold text-white text-sm hover:text-[color:var(--cyan)] transition"
                      >
                        {post.slug}
                      </Link>
                      {post.featuredImage && (
                        <p className="text-[10px] text-[color:var(--cyan)] mt-0.5 truncate max-w-xs">
                          Imagen asignada en Azure Blob
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {post.category ? (
                        <span className="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-[color:var(--cyan)]/10 text-[color:var(--cyan)] border border-[color:var(--cyan)]/20">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-slate-300">{post.author}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          post.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {post.status === 'published' ? (
                          <>
                            <IconChecklist className="w-3.5 h-3.5" />
                            <span>Publicado</span>
                          </>
                        ) : (
                          <>
                            <IconClock className="w-3.5 h-3.5" />
                            <span>Borrador</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString('es-AR')}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex p-2 rounded-lg bg-slate-800 hover:bg-[color:var(--cyan)] hover:text-white text-slate-300 transition"
                        title="Editar artículo"
                      >
                        <IconEdit className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title={post.status === 'draft' ? 'Vista previa del borrador' : 'Ver en vivo'}
                      >
                        <IconExternalLink className="w-4 h-4" />
                      </Link>

                      <form
                        action={async () => {
                          'use server';
                          await deletePost(post.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition"
                          title="Eliminar artículo"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

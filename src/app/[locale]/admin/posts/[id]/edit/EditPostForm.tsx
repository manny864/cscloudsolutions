'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/_actions/cmsActions';
import {
  IconArrowLeft,
  IconUpload,
  IconCheck,
  IconLoader2,
  IconPhoto,
  IconX,
  IconRefresh,
  IconEye,
} from '@tabler/icons-react';
import Link from 'next/link';

interface Translation {
  id: number;
  postId: number;
  locale: string;
  title: string;
  description: string;
  content: string;
}

interface PostData {
  id: number;
  slug: string;
  featuredImage: string | null;
  author: string;
  tags: string[] | null;
  status: 'draft' | 'published' | 'archived';
  translations: Translation[];
}

interface MediaItem {
  filename: string;
  url: string;
  sizeBytes: number;
  createdAt: string;
}

export default function EditPostForm({ post }: { post: PostData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'es' | 'en' | 'pt'>('es');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Translations extraction
  const esTr = post.translations.find((t) => t.locale === 'es');
  const enTr = post.translations.find((t) => t.locale === 'en');
  const ptTr = post.translations.find((t) => t.locale === 'pt-BR');

  // Media Picker Modal State
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [libraryMedia, setLibraryMedia] = useState<MediaItem[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  // Form State
  const [titleEs, setTitleEs] = useState(esTr?.title || '');
  const [descEs, setDescEs] = useState(esTr?.description || '');
  const [contentEs, setContentEs] = useState(esTr?.content || '');

  const [titleEn, setTitleEn] = useState(enTr?.title || '');
  const [descEn, setDescEn] = useState(enTr?.description || '');
  const [contentEn, setContentEn] = useState(enTr?.content || '');

  const [titlePt, setTitlePt] = useState(ptTr?.title || '');
  const [descPt, setDescPt] = useState(ptTr?.description || '');
  const [contentPt, setContentPt] = useState(ptTr?.content || '');

  const [slug, setSlug] = useState(post.slug || '');
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || '');
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(post.tags) ? post.tags.join(', ') : 'Azure, Cloud, Microsoft 365'
  );
  const [status, setStatus] = useState<'published' | 'draft'>(
    post.status === 'draft' ? 'draft' : 'published'
  );

  const fetchLibrary = async () => {
    setLoadingLibrary(true);
    try {
      const res = await fetch('/api/cms/media');
      if (res.ok) {
        const data = await res.json();
        setLibraryMedia(data);
      }
    } catch (err) {
      console.error('Error cargando biblioteca de medios:', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleOpenLibrary = () => {
    setShowMediaPicker(true);
    fetchLibrary();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');

      setFeaturedImage(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEs || !descEs || !contentEs) {
      setError('El título, descripción y contenido en Español son obligatorios.');
      return;
    }

    setLoading(true);
    setError(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await createPost({
      id: post.id,
      titleEs,
      descEs,
      contentEs,
      titleEn,
      descEn,
      contentEn,
      titlePt,
      descPt,
      contentPt,
      slug,
      featuredImage,
      tags,
      status,
    });

    if (res.success) {
      router.push('/admin/posts');
      router.refresh();
    } else {
      setError(res.error || 'Error al guardar el artículo');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span>Volver al listado</span>
        </Link>

        <Link
          href={`/es/blog/${post.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700"
        >
          <IconEye className="w-3.5 h-3.5 text-[color:var(--cyan)]" />
          <span>Ver en la web</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Editar Artículo: <span className="text-[color:var(--cyan)]">{post.slug}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Modifica contenido, imágenes y estado de publicación
          </p>
        </div>

        {/* Idioma Selector Tabs */}
        <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('es')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'es'
                ? 'bg-[color:var(--cyan)] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇪🇸 Español (Principal)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'en'
                ? 'bg-[color:var(--cyan)] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇺🇸 English
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'pt'
                ? 'bg-[color:var(--cyan)] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇧🇷 Português
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
            <IconX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contenido en Español */}
        {activeTab === 'es' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-base">🇪🇸</span>
              <h2 className="text-sm font-extrabold text-white">Contenido en Español (Requerido)</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Título del Artículo *
              </label>
              <input
                type="text"
                required
                value={titleEs}
                onChange={(e) => setTitleEs(e.target.value)}
                placeholder="Ej: Guía Completa de Optimización de Costos en Azure FinOps"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Descripción / Resumen (SEO & Tarjeta) *
              </label>
              <textarea
                required
                rows={3}
                value={descEs}
                onChange={(e) => setDescEs(e.target.value)}
                placeholder="Breve resumen para el feed del blog y meta descripción..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Cuerpo del Artículo (Soporta Markdown completo) *
              </label>
              <textarea
                required
                rows={12}
                value={contentEs}
                onChange={(e) => setContentEs(e.target.value)}
                placeholder="# Introducción&#10;&#10;Escribe tu artículo usando Markdown..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>
          </div>
        )}

        {/* Contenido en Inglés */}
        {activeTab === 'en' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-base">🇺🇸</span>
              <h2 className="text-sm font-extrabold text-white">English Content (Optional)</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Post Title</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Ex: Complete Guide to Azure FinOps Cost Optimization"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Description / Summary
              </label>
              <textarea
                rows={3}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="Short summary for the blog card and SEO..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Article Body (Markdown)
              </label>
              <textarea
                rows={12}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="# Introduction&#10;&#10;Write in English using Markdown..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>
          </div>
        )}

        {/* Contenido en Portugués */}
        {activeTab === 'pt' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-base">🇧🇷</span>
              <h2 className="text-sm font-extrabold text-white">Conteúdo em Português (Opcional)</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Título do Artigo
              </label>
              <input
                type="text"
                value={titlePt}
                onChange={(e) => setTitlePt(e.target.value)}
                placeholder="Ex: Guia Completo de Otimização de Custos no Azure FinOps"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Descrição / Resumo
              </label>
              <textarea
                rows={3}
                value={descPt}
                onChange={(e) => setDescPt(e.target.value)}
                placeholder="Breve resumo para o card do blog..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Corpo do Artigo (Markdown)
              </label>
              <textarea
                rows={12}
                value={contentPt}
                onChange={(e) => setContentPt(e.target.value)}
                placeholder="# Introdução&#10;&#10;Escreva em Português usando Markdown..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>
          </div>
        )}

        {/* Metadatos y Multimedia */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
            Configuración y Multimedia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="guia-arquitectura-zero-trust"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Etiquetas / Tags (Separadas por comas)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Azure, Seguridad, Zero Trust"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
            </div>
          </div>

          {/* Imagen Destacada con Azure Blob Upload & Biblioteca */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Imagen Destacada (Azure Blob Storage)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/api/media/..."
                className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />

              <button
                type="button"
                onClick={handleOpenLibrary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition shrink-0"
              >
                <IconPhoto className="w-4 h-4 text-[color:var(--cyan)]" />
                <span>Elegir de la Biblioteca</span>
              </button>

              <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--cyan)]/20 hover:bg-[color:var(--cyan)]/30 text-[color:var(--cyan)] hover:text-white text-xs font-bold cursor-pointer border border-[color:var(--cyan)]/40 transition shrink-0">
                {uploadingImage ? (
                  <IconLoader2 className="w-4 h-4 animate-spin text-[color:var(--cyan)]" />
                ) : (
                  <IconUpload className="w-4 h-4" />
                )}
                <span>{uploadingImage ? 'Subiendo...' : 'Subir Nueva'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {featuredImage && (
              <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 max-w-md">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={featuredImage}
                    alt="Preview"
                    className="w-14 h-14 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-700"
                  />
                  <div className="overflow-hidden text-xs">
                    <p className="font-bold text-white truncate">Imagen Seleccionada</p>
                    <p className="text-slate-400 text-[11px] truncate">{featuredImage}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                  title="Quitar imagen"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Estado de Publicación */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Estado del Artículo
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-white">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={() => setStatus('published')}
                  className="text-[color:var(--cyan)] focus:ring-[color:var(--cyan)] bg-slate-800 border-slate-700"
                />
                <span className="font-bold">Publicar Inmediatamente (Visible en la Web)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                  className="text-[color:var(--cyan)] focus:ring-[color:var(--cyan)] bg-slate-800 border-slate-700"
                />
                <span>Guardar como Borrador (Oculto)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/posts"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? (
              <IconLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <IconCheck className="w-4 h-4" />
            )}
            <span>{loading ? 'Guardando...' : status === 'published' ? 'Actualizar y Publicar' : 'Actualizar Borrador'}</span>
          </button>
        </div>
      </form>

      {/* Modal Selector de Biblioteca de Medios */}
      {showMediaPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <IconPhoto className="w-5 h-5 text-[color:var(--cyan)]" />
                <h3 className="text-base font-extrabold text-white">
                  Seleccionar Imagen de Azure Storage
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchLibrary}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Recargar"
                >
                  <IconRefresh className={`w-4 h-4 ${loadingLibrary ? 'animate-spin text-[color:var(--cyan)]' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto flex-1 min-h-[250px]">
              {loadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-xs gap-3">
                  <IconLoader2 className="w-8 h-8 animate-spin text-[color:var(--cyan)]" />
                  <p>Cargando imágenes de Azure Blob Storage...</p>
                </div>
              ) : libraryMedia.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs">
                  <IconPhoto className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
                  <p className="font-bold text-slate-300">No hay imágenes en la biblioteca.</p>
                  <p className="text-slate-500 mt-1">
                    Sube una nueva imagen usando el botón &quot;Subir Nueva&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {libraryMedia.map((item) => {
                    const isSelected = featuredImage === item.url;
                    return (
                      <button
                        key={item.filename}
                        type="button"
                        onClick={() => {
                          setFeaturedImage(item.url);
                          setShowMediaPicker(false);
                        }}
                        className={`group relative rounded-xl bg-slate-800/80 border overflow-hidden text-left transition hover:scale-[1.02] ${
                          isSelected
                            ? 'border-[color:var(--cyan)] ring-2 ring-[color:var(--cyan)]/40 shadow-lg shadow-cyan-500/20'
                            : 'border-slate-700/60 hover:border-slate-500'
                        }`}
                      >
                        <div className="aspect-video bg-slate-950 flex items-center justify-center overflow-hidden relative">
                          <img
                            src={item.url}
                            alt={item.filename}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                            loading="lazy"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 p-1 rounded-md bg-[color:var(--cyan)] text-white shadow">
                              <IconCheck className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="text-[11px] font-bold text-white truncate" title={item.filename}>
                            {item.filename}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-0.5">
                            {(item.sizeBytes / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/50">
              <p className="text-xs text-slate-400">
                {libraryMedia.length} imagen{libraryMedia.length !== 1 ? 'es' : ''} disponible{libraryMedia.length !== 1 ? 's' : ''}
              </p>
              <button
                type="button"
                onClick={() => setShowMediaPicker(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

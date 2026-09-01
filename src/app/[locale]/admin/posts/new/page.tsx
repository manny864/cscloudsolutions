'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/_actions/cmsActions';
import {
  IconArrowLeft,
  IconUpload,
  IconSparkles,
  IconCheck,
  IconLoader2,
  IconWorld,
  IconPhoto,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'es' | 'en' | 'pt'>('es');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [titleEs, setTitleEs] = useState('');
  const [descEs, setDescEs] = useState('');
  const [contentEs, setContentEs] = useState('');

  const [titleEn, setTitleEn] = useState('');
  const [descEn, setDescEn] = useState('');
  const [contentEn, setContentEn] = useState('');

  const [titlePt, setTitlePt] = useState('');
  const [descPt, setDescPt] = useState('');
  const [contentPt, setContentPt] = useState('');

  const [slug, setSlug] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [tagsInput, setTagsInput] = useState('Azure, Cloud, Microsoft 365');
  const [status, setStatus] = useState<'published' | 'draft'>('published');

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
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Redactar Nuevo Artículo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Publicación multilingüe con revalidación instantánea en la web
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
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Multilingual Content Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[color:var(--cyan)]">
            <IconWorld className="w-4 h-4" />
            <span>
              Contenido en {activeTab === 'es' ? 'Español' : activeTab === 'en' ? 'Inglés' : 'Portugués'}
            </span>
          </div>

          {activeTab === 'es' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Título del Artículo (Español) *
                </label>
                <input
                  type="text"
                  value={titleEs}
                  onChange={(e) => setTitleEs(e.target.value)}
                  placeholder="Ej: Guía de Arquitectura Zero Trust en Azure"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Descripción Corta (Extracto para SEO y Tarjetas) *
                </label>
                <textarea
                  value={descEs}
                  onChange={(e) => setDescEs(e.target.value)}
                  rows={2}
                  placeholder="Resumen del artículo que aparecerá en el listado del blog..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Cuerpo del Artículo (Formato Markdown / HTML) *
                </label>
                <textarea
                  value={contentEs}
                  onChange={(e) => setContentEs(e.target.value)}
                  rows={14}
                  placeholder="# Introducción&#10;&#10;Escribe tu artículo aquí usando formato Markdown..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                  required
                />
              </div>
            </>
          )}

          {activeTab === 'en' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Article Title (English)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Zero Trust Architecture Guide in Azure"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Short Description (English)
                </label>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  rows={2}
                  placeholder="Brief summary for English readers..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Article Body (English Markdown)
                </label>
                <textarea
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  rows={14}
                  placeholder="# Introduction in English..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>
            </>
          )}

          {activeTab === 'pt' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Título do Artigo (Português)
                </label>
                <input
                  type="text"
                  value={titlePt}
                  onChange={(e) => setTitlePt(e.target.value)}
                  placeholder="Ex: Guia de Arquitetura Zero Trust no Azure"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Descrição Curta (Português)
                </label>
                <textarea
                  value={descPt}
                  onChange={(e) => setDescPt(e.target.value)}
                  rows={2}
                  placeholder="Resumo para leitores em português..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Conteúdo do Artigo (Português Markdown)
                </label>
                <textarea
                  value={contentPt}
                  onChange={(e) => setContentPt(e.target.value)}
                  rows={14}
                  placeholder="# Introdução em Português..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                />
              </div>
            </>
          )}
        </div>

        {/* Metadata & Media Settings Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
            Configuración y Multimedia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                URL Slug (Opcional - se genera automáticamente del título)
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

          {/* Imagen Destacada con Azure Blob Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Imagen Destacada (Azure Blob Storage)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://cscsfinopsprodwestus2sa.blob.core.windows.net/cms-media/..."
                className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
              />
              <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer border border-slate-700 transition shrink-0">
                {uploadingImage ? (
                  <IconLoader2 className="w-4 h-4 animate-spin text-[color:var(--cyan)]" />
                ) : (
                  <IconUpload className="w-4 h-4 text-[color:var(--cyan)]" />
                )}
                <span>{uploadingImage ? 'Subiendo a Azure...' : 'Subir Imagen'}</span>
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
              <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 max-w-sm">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="overflow-hidden text-xs">
                  <p className="font-bold text-white truncate">Imagen Cargada</p>
                  <p className="text-slate-400 text-[10px] truncate">{featuredImage}</p>
                </div>
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
                  className="text-[color:var(--cyan)] focus:ring-[color:var(--cyan)]"
                />
                <span>Publicar Inmediatamente (Visible en la web)</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                  className="text-amber-400 focus:ring-amber-400"
                />
                <span>Guardar como Borrador</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/posts"
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? (
              <>
                <IconLoader2 className="w-4 h-4 animate-spin" />
                <span>Guardando y Revalidando Web...</span>
              </>
            ) : (
              <>
                <IconSparkles className="w-4 h-4" />
                <span>{status === 'published' ? 'Publicar Artículo' : 'Guardar Borrador'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

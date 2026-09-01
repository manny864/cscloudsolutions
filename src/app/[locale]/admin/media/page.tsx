'use client';

import { useState, useEffect } from 'react';
import {
  IconUpload,
  IconPhoto,
  IconCopy,
  IconCheck,
  IconLoader2,
  IconTrash,
  IconSearch,
  IconRefresh,
} from '@tabler/icons-react';

interface MediaItem {
  filename: string;
  url: string;
  sizeBytes: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error('Error cargando medios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/cms/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const newItem = await res.json();
          setMediaList((prev) => [
            {
              filename: newItem.filename,
              url: newItem.url,
              sizeBytes: newItem.sizeBytes,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      } catch (err) {
        console.error('Error subiendo imagen:', err);
      }
    }

    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`¿Estás seguro de eliminar la imagen "${filename}"?`)) return;

    setDeletingFile(filename);
    try {
      const res = await fetch(`/api/cms/media?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((item) => item.filename !== filename));
      }
    } catch (err) {
      console.error('Error eliminando imagen:', err);
    } finally {
      setDeletingFile(null);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredMedia = mediaList.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Biblioteca de Medios (Azure Blob Storage)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Imágenes almacenadas en Azure ({mediaList.length} archivos disponibles)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Recargar medios"
          >
            <IconRefresh className={`w-4 h-4 ${loading ? 'animate-spin text-[color:var(--cyan)]' : ''}`} />
          </button>

          <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white font-bold text-sm cursor-pointer transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]">
            {uploading ? (
              <IconLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <IconUpload className="w-4 h-4" stroke={2.5} />
            )}
            <span>{uploading ? 'Subiendo a Azure...' : 'Subir Imágenes'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative">
        <IconSearch className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar imagen por nombre de archivo..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
        />
      </div>

      {/* Media Grid */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-xs gap-3">
            <IconLoader2 className="w-8 h-8 animate-spin text-[color:var(--cyan)]" />
            <p>Cargando biblioteca desde Azure Blob Storage...</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            <IconPhoto className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-50" />
            <p className="font-bold text-slate-300">
              {searchQuery ? 'No se encontraron imágenes con ese criterio' : 'No hay imágenes almacenadas aún'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Haz clic en &quot;Subir Imágenes&quot; arriba para agregar medios a Azure Blob Storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.filename}
                className="group relative rounded-xl bg-slate-800/80 border border-slate-700/60 overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-video bg-slate-950 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleDelete(item.filename)}
                    disabled={deletingFile === item.filename}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow"
                    title="Eliminar de Azure Storage"
                  >
                    {deletingFile === item.filename ? (
                      <IconLoader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <IconTrash className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-white truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {(item.sizeBytes / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={() => copyToClipboard(item.url)}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-700/60 hover:bg-[color:var(--cyan)] text-white text-[11px] font-bold transition"
                  >
                    {copiedUrl === item.url ? (
                      <>
                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-3.5 h-3.5" />
                        <span>Copiar URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

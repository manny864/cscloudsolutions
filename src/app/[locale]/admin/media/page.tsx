'use client';

import { useState } from 'react';
import { IconUpload, IconPhoto, IconCopy, IconCheck, IconLoader2 } from '@tabler/icons-react';

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<
    Array<{ url: string; filename: string; sizeBytes: number }>
  >([]);

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
        const data = await res.json();
        if (res.ok) {
          setUploadedMedia((prev) => [data, ...prev]);
        }
      } catch (err) {
        console.error('Error subiendo imagen:', err);
      }
    }

    setUploading(false);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Biblioteca de Medios (Azure Blob Storage)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Sube y administra imágenes alojadas en el contenedor <code>cms-media</code>
          </p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[color:var(--cyan)] hover:bg-[color:var(--cyan-dark)] text-white font-bold text-sm cursor-pointer transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]">
          {uploading ? (
            <IconLoader2 className="w-4 h-4 animate-spin" />
          ) : (
            <IconUpload className="w-4 h-4" stroke={2.5} />
          )}
          <span>{uploading ? 'Subiendo a Azure...' : 'Subir Nuevas Imágenes'}</span>
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

      {/* Media Grid */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        {uploadedMedia.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            <IconPhoto className="w-12 h-12 mx-auto text-slate-600 mb-3 opacity-50" />
            <p className="font-bold text-slate-300">No hay imágenes en la sesión actual.</p>
            <p className="text-xs text-slate-500 mt-1">
              Haz clic en &quot;Subir Nuevas Imágenes&quot; arriba para guardar fotos directamente en Azure Blob Storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedMedia.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl bg-slate-800/80 border border-slate-700/60 overflow-hidden"
              >
                <div className="aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-white truncate">{item.filename}</p>
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

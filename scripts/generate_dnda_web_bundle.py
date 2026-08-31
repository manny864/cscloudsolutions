#!/usr/bin/env python3
"""
Script para generar la copia completa del sitio web (Estructura + Diseño)
con index.html en la raíz y todas sus subcarpetas para el registro formal en DNDA.
"""

import os
import shutil
import zipfile
import hashlib
from pathlib import Path

def calculate_sha256(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def build_dnda_web_bundle():
    root_dir = Path(__file__).resolve().parent.parent
    dist_dir = root_dir / '.dnda_web_dist'
    output_zip = root_dir / 'cscloudsolutions-dnda-web.zip'
    
    server_app_dir = root_dir / '.next' / 'server' / 'app'
    static_dir = root_dir / '.next' / 'static'
    public_dir = root_dir / 'public'

    if not server_app_dir.exists():
        print("Error: No se encontró la carpeta .next/server/app. Ejecuta 'npm run build' primero.")
        return

    # 1. Limpiar directorio temporal
    if dist_dir.exists():
        shutil.rmtree(dist_dir)
    dist_dir.mkdir(parents=True, exist_ok=True)

    # 2. Copiar index.html raíz desde es.html (Página Principal en español)
    es_home = server_app_dir / 'es.html'
    if es_home.exists():
        shutil.copy2(es_home, dist_dir / 'index.html')
        shutil.copy2(es_home, dist_dir / 'es.html')
    
    en_home = server_app_dir / 'en.html'
    if en_home.exists():
        shutil.copy2(en_home, dist_dir / 'en.html')
        
    pt_home = server_app_dir / 'pt-BR.html'
    if pt_home.exists():
        shutil.copy2(pt_home, dist_dir / 'pt-BR.html')

    # 3. Copiar subcarpetas localizadas de páginas HTML
    for lang in ['es', 'en', 'pt-BR']:
        src_lang_dir = server_app_dir / lang
        dst_lang_dir = dist_dir / lang
        if src_lang_dir.exists() and src_lang_dir.is_dir():
            for root, dirs, files in os.walk(src_lang_dir):
                rel = os.path.relpath(root, src_lang_dir)
                target_dir = dst_lang_dir / rel if rel != '.' else dst_lang_dir
                target_dir.mkdir(parents=True, exist_ok=True)

                for f in files:
                    # Copiar solo archivos HTML e imágenes
                    if f.endswith('.html') or f.endswith('.png') or f.endswith('.jpg') or f.endswith('.svg'):
                        shutil.copy2(Path(root) / f, target_dir / f)

    # 4. Copiar bundle estático (_next/static) con CSS, Chunks y Fuentes
    target_next_static = dist_dir / '_next' / 'static'
    if static_dir.exists():
        shutil.copytree(static_dir, target_next_static, dirs_exist_ok=True)

    # 5. Copiar assets de public/ (excluyendo .DS_Store)
    if public_dir.exists():
        for item in public_dir.iterdir():
            if item.name.startswith('.') or item.name == '.DS_Store':
                continue
            if item.is_dir():
                shutil.copytree(
                    item,
                    dist_dir / item.name,
                    dirs_exist_ok=True,
                    ignore=shutil.ignore_patterns('.DS_Store', 'Thumbs.db', '.*')
                )
            else:
                shutil.copy2(item, dist_dir / item.name)

    # 6. Generar el ZIP
    if output_zip.exists():
        output_zip.unlink()

    included_count = 0
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dist_dir):
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            for file in files:
                if file.startswith('.') or file == '.DS_Store' or file == 'Thumbs.db':
                    continue
                full_path = Path(root) / file
                arcname = os.path.relpath(full_path, dist_dir)
                zipf.write(full_path, arcname=arcname)
                included_count += 1

    # 7. Limpiar temporal
    shutil.rmtree(dist_dir)

    sha256_hash = calculate_sha256(output_zip)
    zip_size_bytes = output_zip.stat().st_size
    zip_size_mb = zip_size_bytes / (1024 * 1024)

    print("=" * 75)
    print("PAQUETE WEB DNDA (ESTRUCTURA + DISEÑO) GENERADO EXITOSAMENTE")
    print("=" * 75)
    print(f"Archivo de salida: {output_zip.name}")
    print(f"Ruta absoluta:    {output_zip}")
    print(f"Punto de entrada: index.html (en la raíz del zip)")
    print(f"Tamaño:           {zip_size_mb:.2f} MB ({zip_size_bytes:,} bytes)")
    print(f"Archivos en zip:  {included_count}")
    print(f"Hash SHA-256:     {sha256_hash}")
    print("=" * 75)

if __name__ == '__main__':
    build_dnda_web_bundle()

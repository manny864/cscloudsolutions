#!/usr/bin/env python3
"""
Script para generar el archivo comprimido (.zip) limpio y seguro
para el depósito de la obra en la Dirección Nacional del Derecho de Autor (DNDA).
"""

import os
import zipfile
import hashlib
import fnmatch
from pathlib import Path

# Directorios a excluir completamente
EXCLUDE_DIRS = {
    'node_modules',
    '.next',
    '.git',
    '.github',
    'graphify-out',
    '.tmp',
    'scratch',
    '.turbo',
    '.vscode',
    '.idea',
    'dist',
    'build',
    '.cache',
    '__pycache__'
}

# Patrones de archivos a excluir (secretos, temporales, zips, logs)
EXCLUDE_PATTERNS = [
    '.env*',
    '*.log',
    '*.zip',
    '*.tar.gz',
    '*.tar',
    '*.gz',
    '.DS_Store',
    'Thumbs.db',
    '*.pem',
    '*.key',
    '*.pfx',
    '*.p12',
    '*.tfstate*',
    '*.pyc',
    '.graphify_*'
]

def should_exclude_dir(dir_name):
    return dir_name in EXCLUDE_DIRS or dir_name.startswith('.git')

def should_exclude_file(file_name):
    for pattern in EXCLUDE_PATTERNS:
        if fnmatch.fnmatch(file_name, pattern):
            return True
    return False

def calculate_sha256(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def package_dnda():
    root_dir = Path(__file__).resolve().parent.parent
    output_zip_path = root_dir / 'cscloudsolutions-dnda-source.zip'

    if output_zip_path.exists():
        output_zip_path.unlink()

    included_files = []
    skipped_files = []

    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            rel_dir = os.path.relpath(dirpath, root_dir)
            path_parts = Path(rel_dir).parts

            # Filtrar subdirectorios excluidos
            if any(should_exclude_dir(part) for part in path_parts if part != '.'):
                continue
            dirnames[:] = [d for d in dirnames if not should_exclude_dir(d)]

            for filename in filenames:
                full_path = Path(dirpath) / filename
                rel_path = os.path.relpath(full_path, root_dir)

                if should_exclude_file(filename):
                    skipped_files.append(rel_path)
                    continue

                # Evitar incluir el zip que estamos generando
                if full_path.resolve() == output_zip_path.resolve():
                    continue

                zipf.write(full_path, arcname=rel_path)
                included_files.append(rel_path)

    sha256_hash = calculate_sha256(output_zip_path)
    zip_size_bytes = output_zip_path.stat().st_size
    zip_size_mb = zip_size_bytes / (1024 * 1024)

    print("=" * 70)
    print("EMPAQUETADO DNDA FINALIZADO CON ÉXITO")
    print("=" * 70)
    print(f"Archivo de salida: {output_zip_path.name}")
    print(f"Ruta absoluta:    {output_zip_path}")
    print(f"Tamaño:           {zip_size_mb:.2f} MB ({zip_size_bytes:,} bytes)")
    print(f"Archivos en zip:  {len(included_files)}")
    print(f"Archivos omitidos:{len(skipped_files)}")
    print(f"Hash SHA-256:     {sha256_hash}")
    print("=" * 70)
    print("\nResumen de módulos incluidos en el depósito legal:")
    
    modules = {}
    for f in included_files:
        top_folder = Path(f).parts[0] if len(Path(f).parts) > 1 else "(raíz)"
        modules[top_folder] = modules.get(top_folder, 0) + 1

    for mod, count in sorted(modules.items()):
        print(f"  • {mod:<15}: {count:>3} archivos")
    print("=" * 70)

if __name__ == '__main__':
    package_dnda()

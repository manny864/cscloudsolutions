import { NextRequest, NextResponse } from 'next/server';
import { getBlobBuffer } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Sanitización para prevenir path traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Archivo no válido', { status: 400 });
    }

    const result = await getBlobBuffer(filename);
    if (!result) {
      return new NextResponse('Imagen no encontrada', { status: 404 });
    }

    return new NextResponse(result.buffer, {
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('[Media Route Error]:', error);
    return new NextResponse('Error al cargar la imagen', { status: 500 });
  }
}

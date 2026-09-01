import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadToBlobStorage } from '@/lib/storage';
import { getDb, schema } from '@/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadToBlobStorage(buffer, file.name, file.type || 'image/jpeg');

    // Registrar en base de datos si está disponible
    const db = getDb();
    if (db) {
      try {
        await db.insert(schema.mediaAssets).values({
          filename: uploadResult.filename,
          blobUrl: uploadResult.url,
          sizeBytes: uploadResult.sizeBytes,
          mimeType: file.type || 'image/jpeg',
          uploadedBy: session.user.email || 'admin',
        });
      } catch (dbErr) {
        console.warn('[CMS Upload] Error guardando registro en mediaAssets:', dbErr);
      }
    }

    return NextResponse.json(uploadResult);
  } catch (error: any) {
    console.error('[CMS Upload Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Error al subir imagen a Azure Blob Storage' },
      { status: 500 }
    );
  }
}

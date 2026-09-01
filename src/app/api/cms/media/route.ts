import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { listBlobsFromStorage, deleteBlobFromStorage } from '@/lib/storage';
import { getDb, schema } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const items = await listBlobsFromStorage();
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('[CMS Media List Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Nombre de archivo no especificado' }, { status: 400 });
    }

    await deleteBlobFromStorage(filename);

    const db = getDb();
    if (db) {
      try {
        await db.delete(schema.mediaAssets).where(eq(schema.mediaAssets.filename, filename));
      } catch (err) {
        console.warn('[CMS Media Delete DB]:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[CMS Media Delete Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb, schema, ensureTablesExist } from '@/db';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export interface PostInput {
  titleEs: string;
  descEs: string;
  contentEs: string;

  titleEn?: string;
  descEn?: string;
  contentEn?: string;

  titlePt?: string;
  descPt?: string;
  contentPt?: string;

  slug?: string;
  featuredImage?: string;
  author?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
}

export async function createPost(input: PostInput) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: 'No autorizado. Se requiere sesión en Microsoft Entra ID.' };
  }

  try {
    // Garantizar que las tablas existen en la base de datos
    await ensureTablesExist();

    const db = getDb();
    if (!db) {
      return { success: false, error: 'Base de datos MySQL no conectada en este entorno.' };
    }

    const rawSlug = input.slug || input.titleEs;
    const finalSlug = slugify(rawSlug, { lower: true, strict: true });
    const cleanImage = input.featuredImage && input.featuredImage.trim() !== '' ? input.featuredImage.trim() : null;
    const cleanTags = Array.isArray(input.tags) ? input.tags : [];

    // 1. Insertar post principal
    const [result] = await db.insert(schema.posts).values({
      slug: finalSlug,
      featuredImage: cleanImage,
      author: input.author || session.user.name || 'CSCloud Solutions Team',
      tags: cleanTags,
      status: input.status || 'published',
      publishedAt: new Date(),
    });

    const postId = (result as any).insertId;

    // 2. Insertar traducciones
    // Español
    await db.insert(schema.postTranslations).values({
      postId,
      locale: 'es',
      title: input.titleEs,
      description: input.descEs,
      content: input.contentEs,
    });

    // Inglés (si existe)
    if (input.titleEn && input.titleEn.trim() !== '') {
      await db.insert(schema.postTranslations).values({
        postId,
        locale: 'en',
        title: input.titleEn,
        description: input.descEn || input.descEs,
        content: input.contentEn || input.contentEs,
      });
    }

    // Portugués (si existe)
    if (input.titlePt && input.titlePt.trim() !== '') {
      await db.insert(schema.postTranslations).values({
        postId,
        locale: 'pt-BR',
        title: input.titlePt,
        description: input.descPt || input.descEs,
        content: input.contentPt || input.contentEs,
      });
    }

    // 3. Revalidación instantánea (On-Demand ISR)
    revalidatePath('/[locale]/blog', 'page');
    revalidatePath('/[locale]/blog/[slug]', 'page');
    revalidatePath('/[locale]', 'page');

    return { success: true, postId, slug: finalSlug };
  } catch (error: any) {
    console.error('[CMS Create Post Error]:', error);
    const detail = error.cause?.sqlMessage || error.cause?.message || error.sqlMessage || error.message || 'Error desconocido al guardar el artículo';
    return { success: false, error: detail };
  }
}

export async function getAdminPosts() {
  const db = getDb();
  if (!db) return [];

  try {
    await ensureTablesExist();
    const allPosts = await db.select().from(schema.posts).orderBy(desc(schema.posts.createdAt));
    return allPosts;
  } catch (err) {
    console.warn('[CMS getAdminPosts]:', err);
    return [];
  }
}

export async function deletePost(id: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: 'No autorizado' };
  }

  const db = getDb();
  if (!db) return { success: false, error: 'No hay conexión a la base de datos' };

  try {
    await db.delete(schema.postTranslations).where(eq(schema.postTranslations.postId, id));
    await db.delete(schema.posts).where(eq(schema.posts.id, id));

    revalidatePath('/[locale]/blog', 'page');
    revalidatePath('/[locale]/blog/[slug]', 'page');

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

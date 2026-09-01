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

  // Garantizar que las tablas existen en la base de datos
  await ensureTablesExist();

  const db = getDb();
  if (!db) {
    return { success: false, error: 'Base de datos MySQL no conectada en este entorno.' };
  }

  try {
    const rawSlug = input.slug || input.titleEs;
    const finalSlug = slugify(rawSlug, { lower: true, strict: true });

    // 1. Insertar post principal
    const [result] = await db.insert(schema.posts).values({
      slug: finalSlug,
      featuredImage: input.featuredImage || null,
      author: input.author || session.user.name || 'CSCloud Solutions Team',
      tags: input.tags || [],
      status: input.status || 'published',
      publishedAt: new Date(),
    });

    const postId = result.insertId;

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
    if (input.titleEn) {
      await db.insert(schema.postTranslations).values({
        postId,
        locale: 'en',
        title: input.titleEn,
        description: input.descEn || input.descEs,
        content: input.contentEn || input.contentEs,
      });
    }

    // Portugués (si existe)
    if (input.titlePt) {
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
    return { success: false, error: error.message || 'Error al crear el artículo' };
  }
}

export async function getAdminPosts() {
  const db = getDb();
  if (!db) return [];

  try {
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

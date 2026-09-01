import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getDb, schema } from '@/db';
import { eq, and } from 'drizzle-orm';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs(locale: string) {
  const folderPath = path.join(process.cwd(), `src/content/blog/${locale}`);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath);
}

export async function getPostBySlug(slug: string, locale: string) {
  if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) throw new Error('Invalid slug');

  const realSlug = slug.replace(/\.md$/, '');

  // 1. Intentar consultar desde MySQL CMS primero si está disponible
  const db = getDb();
  if (db) {
    try {
      const [dbPost] = await db
        .select()
        .from(schema.posts)
        .where(and(eq(schema.posts.slug, realSlug), eq(schema.posts.status, 'published')));

      if (dbPost) {
        const [translation] = await db
          .select()
          .from(schema.postTranslations)
          .where(
            and(
              eq(schema.postTranslations.postId, dbPost.id),
              eq(schema.postTranslations.locale, locale)
            )
          );

        if (translation) {
          return {
            slug: realSlug,
            meta: {
              title: translation.title,
              description: translation.description,
              date: dbPost.publishedAt ? new Date(dbPost.publishedAt).toISOString().split('T')[0] : new Date(dbPost.createdAt).toISOString().split('T')[0],
              author: dbPost.author,
              image: dbPost.featuredImage || '/images/blog/default.jpg',
              tags: dbPost.tags || [],
            },
            content: translation.content,
          };
        }
      }
    } catch (dbErr) {
      console.warn('[getPostBySlug] Fallback a archivos Markdown por error en DB:', dbErr);
    }
  }

  // 2. Fallback a archivos locales Markdown
  const fullPath = path.join(postsDirectory, locale, `${realSlug}.md`);
  const resolved = path.resolve(fullPath);
  const baseResolved = path.resolve(path.join(postsDirectory, locale));
  if (!resolved.startsWith(baseResolved + path.sep) && resolved !== baseResolved) throw new Error('Invalid slug path');

  if (!fs.existsSync(fullPath)) throw new Error('Post not found');

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export async function getAllPosts(locale: string) {
  const localSlugs = getPostSlugs(locale);
  const localPosts = localSlugs
    .map((slug) => {
      try {
        const realSlug = slug.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, locale, slug);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { slug: realSlug, meta: data, content };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as Array<{ slug: string; meta: any; content: string }>;

  // Intentar consultar posts dinámicos desde MySQL
  const db = getDb();
  if (db) {
    try {
      const dbPosts = await db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.status, 'published'));

      for (const p of dbPosts) {
        const [tr] = await db
          .select()
          .from(schema.postTranslations)
          .where(
            and(eq(schema.postTranslations.postId, p.id), eq(schema.postTranslations.locale, locale))
          );

        if (tr) {
          localPosts.unshift({
            slug: p.slug,
            meta: {
              title: tr.title,
              description: tr.description,
              date: p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : new Date(p.createdAt).toISOString().split('T')[0],
              author: p.author,
              image: p.featuredImage || '/images/blog/default.jpg',
              tags: p.tags || [],
            },
            content: tr.content,
          });
        }
      }
    } catch (err) {
      console.warn('[getAllPosts] Fallback a Markdown:', err);
    }
  }

  return localPosts.sort((p1, p2) => (p1.meta.date > p2.meta.date ? -1 : 1));
}
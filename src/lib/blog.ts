import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs(locale: string) {
  const folderPath = path.join(process.cwd(), `src/content/blog/${locale}`);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath);
}

export function getPostBySlug(slug: string, locale: string) {
  // Reject obvious path traversal attempts
  if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) throw new Error('Invalid slug');

  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, locale, `${realSlug}.md`);

  // Prevent path traversal: ensure fullPath is inside the posts directory
  const resolved = path.resolve(fullPath);
  const baseResolved = path.resolve(path.join(postsDirectory, locale));
  if (!resolved.startsWith(baseResolved + path.sep) && resolved !== baseResolved) throw new Error('Invalid slug path');

  if (!fs.existsSync(fullPath)) throw new Error("Post not found");

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts(locale: string) {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
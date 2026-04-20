import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPostSlugs(locale: string) {
  const folderPath = path.join(process.cwd(), `src/content/blog/${locale}`);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath);
}

export function getPostBySlug(slug: string, locale: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(process.cwd(), `src/content/blog/${locale}`, `${realSlug}.md`);
  
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
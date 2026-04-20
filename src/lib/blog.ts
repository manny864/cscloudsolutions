import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Ruta a nuestra carpeta de artículos
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // gray-matter separa los metadatos (data) del contenido del artículo (content)
  const { data, content } = matter(fileContents);
  
  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Ordenar los posts por fecha (del más nuevo al más viejo)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Ruta a la carpeta de artículos
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getPosts(locale: string) {
  const localeDirectory = path.join(postsDirectory, locale);

  // Si la carpeta no existe todavía, devolvemos un array vacío
  if (!fs.existsSync(localeDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(localeDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Extraemos los metadatos del archivo .md
      const { data } = matter(fileContents);

      return {
        slug,
        meta: {
          title: data.title || 'Sin título',
          date: data.date || '2024-01-01',
          author: data.author || '',
          category: data.category || 'General',
          image: data.image || '',
          excerpt: data.excerpt || '',
        },
      };
    });

  // Ordenar por fecha descendente
  return posts.sort((a, b) => (new Date(a.meta.date) < new Date(b.meta.date) ? 1 : -1));
}

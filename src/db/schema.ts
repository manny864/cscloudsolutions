import { mysqlTable, serial, varchar, text, int, timestamp, mysqlEnum, json } from 'drizzle-orm/mysql-core';

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  featuredImage: text('featured_image'),
  author: varchar('author', { length: 255 }).default('CSCloud Solutions Team').notNull(),
  tags: json('tags').$type<string[]>().default([]),
  status: mysqlEnum('status', ['draft', 'published', 'archived']).default('published').notNull(),
  publishedAt: timestamp('published_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const postTranslations = mysqlTable('post_translations', {
  id: serial('id').primaryKey(),
  postId: int('post_id').notNull(),
  locale: varchar('locale', { length: 10 }).notNull(), // 'es', 'en', 'pt-BR'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const mediaAssets = mysqlTable('media_assets', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  blobUrl: text('blob_url').notNull(),
  sizeBytes: int('size_bytes').default(0),
  mimeType: varchar('mime_type', { length: 100 }).default('image/jpeg'),
  uploadedBy: varchar('uploaded_by', { length: 255 }).default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const siteSections = mysqlTable('site_sections', {
  id: serial('id').primaryKey(),
  sectionKey: varchar('section_key', { length: 100 }).notNull(),
  locale: varchar('locale', { length: 10 }).notNull(),
  contentJson: json('content_json').$type<Record<string, any>>().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

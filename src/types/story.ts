export interface WebStoryPage {
  id: string;
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  bullets?: string[];
  ctaText?: string;
  ctaUrl?: string;
  bgGradient?: 'dark' | 'navy' | 'cyan' | 'slate';
}

export interface WebStory {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
  authorJobTitle?: string;
  authorUrl?: string;
  authorLinkedIn?: string;
  posterPortrait: string; // Vertical 9:16 (ej. 720x1280)
  publisherName?: string;
  publisherLogo?: string;
  pages: WebStoryPage[];
}

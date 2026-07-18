import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants/site';
import { getAllArticleSlugs } from '@/services/articleService';
import { getAllCategorySlugs } from '@/services/categoryService';
import { getAllTagSlugs } from '@/services/tagService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleSlugs, categorySlugs, tagSlugs] = await Promise.all([
    getAllArticleSlugs(),
    getAllCategorySlugs(),
    getAllTagSlugs(),
  ]);

  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${base}/articles/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${base}/categories/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tagSlugs.map((slug) => ({
    url: `${base}/tags/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...categoryPages, ...tagPages];
}

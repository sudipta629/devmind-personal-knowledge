/**
 * Tag Service
 *
 * All data fetching for tags goes through this service.
 * Replace mock implementations with API calls when backend is ready.
 */

import type { Tag } from '@/types';
import { MOCK_TAGS } from '@/lib/mockData';

/**
 * Get all tags.
 * Replace with: GET /api/tags
 */
export async function getTags(): Promise<Tag[]> {
  return MOCK_TAGS;
}

/**
 * Get a single tag by slug.
 * Replace with: GET /api/tags/:slug
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  return MOCK_TAGS.find((t) => t.slug === slug) ?? null;
}

/**
 * Get the most popular tags by article count.
 * Replace with: GET /api/tags?sort=articleCount&order=desc&limit=N
 */
export async function getPopularTags(limit = 15): Promise<Tag[]> {
  return [...MOCK_TAGS]
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, limit);
}

/**
 * Get all tag slugs — used for static generation.
 * Replace with: GET /api/tags/slugs
 */
export async function getAllTagSlugs(): Promise<string[]> {
  return MOCK_TAGS.map((t) => t.slug);
}

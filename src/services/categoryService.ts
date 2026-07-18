/**
 * Category Service
 *
 * All data fetching for categories goes through this service.
 * Replace mock implementations with API calls when backend is ready.
 */

import type { Category } from '@/types';
import { CATEGORIES } from '@/constants/categories';

/**
 * Get all categories.
 * Replace with: GET /api/categories
 */
export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

/**
 * Get a single category by slug.
 * Replace with: GET /api/categories/:slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

/**
 * Get featured categories for the home page.
 * Replace with: GET /api/categories?featured=true
 */
export async function getFeaturedCategories(limit = 6): Promise<Category[]> {
  return CATEGORIES.filter((c) => c.featured).slice(0, limit);
}

/**
 * Get all category slugs — used for static generation.
 * Replace with: GET /api/categories/slugs
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  return CATEGORIES.map((c) => c.slug);
}

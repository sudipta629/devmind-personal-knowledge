/**
 * Article Service
 *
 * All data fetching for articles goes through this service.
 * Currently returns mock data — replace function bodies with real API calls
 * when backend is ready. UI components should NEVER be changed.
 */

import type { Article, ArticleListItem, ArticleFilters, PaginatedArticles } from '@/types';
import { MOCK_ARTICLES } from '@/lib/mockData';
import { PAGINATION } from '@/constants/site';

function toListItem(article: Article): ArticleListItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content: _c, tableOfContents: _toc, ...rest } = article;
  return rest;
}


/**
 * Get a paginated list of articles with optional filters.
 * Replace with: GET /api/articles?category=&tag=&search=&page=&limit=
 */
export async function getArticles(filters: ArticleFilters = {}): Promise<PaginatedArticles> {
  const {
    category,
    tag,
    search,
    page = 1,
    limit = PAGINATION.defaultLimit,
    featured,
  } = filters;

  let articles = MOCK_ARTICLES.map(toListItem);

  if (category) {
    articles = articles.filter((a) => a.categorySlug === category);
  }
  if (tag) {
    articles = articles.filter((a) => a.tags.includes(tag));
  }
  if (featured !== undefined) {
    articles = articles.filter((a) => a.featured === featured);
  }
  if (search) {
    const q = search.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q))
    );
  }

  const total = articles.length;
  const start = (page - 1) * limit;
  const paginated = articles.slice(start, start + limit);

  return {
    articles: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get a single article by slug including full content.
 * Replace with: GET /api/articles/:slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  return article ?? null;
}

/**
 * Get featured articles.
 * Replace with: GET /api/articles?featured=true&limit=N
 */
export async function getFeaturedArticles(limit = PAGINATION.featuredLimit): Promise<ArticleListItem[]> {
  const featured = MOCK_ARTICLES.filter((a) => a.featured).map(toListItem);
  return featured.slice(0, limit);
}

/**
 * Get the latest articles sorted by date.
 * Replace with: GET /api/articles?sort=publishedAt&order=desc&limit=N
 */
export async function getLatestArticles(limit = 6): Promise<ArticleListItem[]> {
  return [...MOCK_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
    .map(toListItem);
}

/**
 * Get related articles by matching category or tags.
 * Replace with: GET /api/articles/:slug/related
 */
export async function getRelatedArticles(
  slug: string,
  limit = PAGINATION.relatedLimit
): Promise<ArticleListItem[]> {
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) return [];

  return MOCK_ARTICLES.filter(
    (a) =>
      a.slug !== slug &&
      (a.categorySlug === article.categorySlug ||
        a.tags.some((t) => article.tags.includes(t)))
  )
    .slice(0, limit)
    .map(toListItem);
}

/**
 * Get all article slugs — used for static generation.
 * Replace with: GET /api/articles/slugs
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  return MOCK_ARTICLES.map((a) => a.slug);
}

/**
 * Get previous and next articles for navigation.
 * Replace with: GET /api/articles/:slug/navigation
 */
export async function getArticleNavigation(slug: string): Promise<{
  previous: ArticleListItem | null;
  next: ArticleListItem | null;
}> {
  const index = MOCK_ARTICLES.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? toListItem(MOCK_ARTICLES[index - 1]) : null,
    next: index < MOCK_ARTICLES.length - 1 ? toListItem(MOCK_ARTICLES[index + 1]) : null,
  };
}

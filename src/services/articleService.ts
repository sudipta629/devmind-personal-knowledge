import type { Article, ArticleListItem, ArticleFilters, PaginatedArticles } from '@/types';
import { PAGINATION } from '@/constants/site';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

function toListItem(article: Article): ArticleListItem {
  const { content, tableOfContents, ...rest } = article;
  return rest as ArticleListItem;
}

export async function getArticles(filters: ArticleFilters = {}): Promise<PaginatedArticles> {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.tag) params.append('tag', filters.tag);
  if (filters.search) params.append('search', filters.search);
  params.append('status', 'PUBLISHED'); // Always fetch published unless specified

  const res = await fetch(`${API_BASE}/articles?${params.toString()}`, { cache: 'no-store' });
  let articles: Article[] = await res.json();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    articles = articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q) || 
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.author.name.toLowerCase().includes(q)
    );
  }
  
  if (filters.featured !== undefined) {
    articles = articles.filter(a => a.featured === filters.featured);
  }

  const listItems = articles.map(toListItem);
  const page = filters.page || 1;
  const limit = filters.limit || PAGINATION.defaultLimit;
  const total = listItems.length;
  const start = (page - 1) * limit;
  const paginated = listItems.slice(start, start + limit);

  return { articles: paginated, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE}/articles/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getFeaturedArticles(limit = PAGINATION.featuredLimit): Promise<ArticleListItem[]> {
  const res = await getArticles({ featured: true, limit });
  return res.articles;
}

export async function getLatestArticles(limit = 6): Promise<ArticleListItem[]> {
  const res = await getArticles({ limit });
  return res.articles;
}

export async function getRelatedArticles(slug: string, limit = PAGINATION.relatedLimit): Promise<ArticleListItem[]> {
  const current = await getArticleBySlug(slug);
  if (!current) return [];
  
  const allParams = new URLSearchParams({ status: 'PUBLISHED' });
  const res = await fetch(`${API_BASE}/articles?${allParams.toString()}`, { cache: 'no-store' });
  const all: Article[] = await res.json();
  
  return all
    .filter(a => a.slug !== slug && (a.categorySlug === current.categorySlug || a.tags.some(t => current.tags.includes(t))))
    .slice(0, limit)
    .map(toListItem);
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const allParams = new URLSearchParams({ status: 'PUBLISHED' });
  const res = await fetch(`${API_BASE}/articles?${allParams.toString()}`, { cache: 'no-store' });
  const all: Article[] = await res.json();
  return all.map(a => a.slug);
}

export async function getArticleNavigation(slug: string): Promise<{ previous: ArticleListItem | null; next: ArticleListItem | null; }> {
  const allParams = new URLSearchParams({ status: 'PUBLISHED' });
  const res = await fetch(`${API_BASE}/articles?${allParams.toString()}`, { cache: 'no-store' });
  const all: Article[] = await res.json();
  
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? toListItem(all[index - 1]) : null,
    next: index < all.length - 1 ? toListItem(all[index + 1]) : null,
  };
}

export async function getMyArticles(authorId: string): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/articles?authorId=${authorId}`, { cache: 'no-store' });
  return await res.json();
}

export async function publishArticle(data: Partial<Article>): Promise<Article> {
  const res = await fetch(`${API_BASE}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to publish article');
  return await res.json();
}

export async function deleteArticle(id: string): Promise<void> {
  await fetch(`${API_BASE}/articles/${id}`, { method: 'DELETE' });
}

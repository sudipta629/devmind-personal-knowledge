/**
 * Search Service
 *
 * Frontend search implementation using mock data.
 * Replace with real API calls when backend search is ready.
 */

import type { ArticleListItem } from '@/types';
import { MOCK_ARTICLES } from '@/lib/mockData';

export interface SearchResult {
  articles: ArticleListItem[];
  total: number;
  query: string;
}

/**
 * Search articles by query.
 * Replace with: GET /api/search?q=query
 */
export async function searchArticles(query: string): Promise<SearchResult> {
  if (!query.trim()) {
    return { articles: [], total: 0, query };
  }

  const q = query.toLowerCase().trim();
  const results = MOCK_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q)) ||
      a.category.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q)
  ).map(({ content, tableOfContents, ...rest }) => {
    void content;
    void tableOfContents;
    return rest as ArticleListItem;
  });

  return {
    articles: results,
    total: results.length,
    query,
  };
}

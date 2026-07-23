import type { PaginatedArticles } from '@/types';
import { getArticles } from './articleService';

export async function searchArticles(query: string, page = 1): Promise<PaginatedArticles> {
  return getArticles({ search: query, page, limit: 12 });
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  featured: boolean;
  views?: number;
  tableOfContents?: TOCItem[];
  status?: 'PUBLISHED' | 'DRAFT';
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

export interface ArticleListItem
  extends Omit<Article, 'content' | 'tableOfContents'> {}

export interface PaginatedArticles {
  articles: ArticleListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ArticleFilters {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}
